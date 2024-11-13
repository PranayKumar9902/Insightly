package controller

import (
	"os"
	"time"

	"github.com/bunty/blog-app/database"
	"github.com/bunty/blog-app/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

//register function

func SignUp(c *fiber.Ctx) error {

	login_user := model.User{}
	if err := c.BodyParser(&login_user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	if login_user.Username == "" || login_user.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Name and password are required",
		})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(login_user.Password), 10)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to hash password",
		})
	}

	login_user.Password = string(hash)

	if err := database.Database.Db.Create(&login_user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not create user",
		})
	}

	return c.JSON(fiber.Map{"message": "User created"})
}

//login function

func Login(c *fiber.Ctx) error {

	body := model.User{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	var user model.User

	if err := database.Database.Db.Find(&user, "username = ?", body.Username).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if user.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Username,
		"id":  user.ID,
		"exp": time.Now().Add(time.Hour * 48).Unix(),
	})

	secret := os.Getenv("secret")
	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "nonce",
		Value:    tokenString,
		Expires:  time.Now().Add(time.Hour * 48),
		HTTPOnly: true,
	})

	return c.JSON(fiber.Map{
		"token": tokenString,
		"user":  user,
	})
}

//fetch User Profile and Blogs

func UserProfile(c *fiber.Ctx) error {

	user := c.Locals("user").(model.User)

	userId := user.ID

	userProfile := model.UserProfile{}

	blogs := []model.Blog{}

	if err := database.Database.Db.Find(&blogs, "user_refer = ?", userId).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	userProfile.Blogs = blogs

	uniqueCategories := make(map[string]bool)

	for _, blog := range blogs {
		uniqueCategories[blog.Category] = true
	}

	userProfile.Categories = make([]string, 0, len(uniqueCategories))
	for category := range uniqueCategories {
		userProfile.Categories = append(userProfile.Categories, category)
	}

	userProfile.ID = uint(user.ID)
	userProfile.Username = user.Username
	userProfile.Email = user.Email

	return c.JSON(fiber.Map{"userProfile": userProfile})
}
