package middleware

import (
	"fmt"
	"os"
	"time"

	"github.com/bunty/blog-app/database"
	"github.com/bunty/blog-app/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func RequireAuth(c *fiber.Ctx) error {

	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Missing Authorization header",
		})
	}

	tokenString := ""
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		tokenString = authHeader[7:]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid Authorization header format",
		})
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		secret := os.Getenv("secret")
		return []byte(secret), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {

		if float64(claims["exp"].(float64)) < float64(time.Now().Unix()) {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Expired token",
			})
		}

		var user model.User

		if err := database.Database.Db.Find(&user, "username = ?", claims["sub"]).Error; err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}

		c.Locals("user", user)
		return c.Next()
	}

	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"error": "Unauthorized",
	})
}
