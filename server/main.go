package main

import (
	"log"

	"github.com/bunty/blog-app/database"
	"github.com/bunty/blog-app/middleware"
	"github.com/bunty/blog-app/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {

	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {

	database.ConnectToDatabase()

	psqldb, err := database.Database.Db.DB()

	if err != nil {
		panic("failed to connect to database " + err.Error())
	}

	defer psqldb.Close()
	app := fiber.New()

	app.Use(logger.New())

	app.Use(middleware.CORS())

	router.SetUpRoute(app)
	log.Fatal(app.Listen(":7777"))
}
