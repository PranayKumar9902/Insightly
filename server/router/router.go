package router

import (
	"github.com/bunty/blog-app/controller"
	"github.com/bunty/blog-app/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetUpRoute(app *fiber.App) {

	app.Post("/register", controller.SignUp)
	app.Post("/login", controller.Login)

	app.Get("/blogs", controller.GetBlogList)
	app.Post("/blogs", middleware.RequireAuth, controller.CreateBlog)
	app.Get("/blogs/:id", middleware.RequireAuth, controller.GetBlog)
	app.Put("/blogs/:id", middleware.RequireAuth, controller.UpdateBlog)
	app.Delete("/blogs/:id", middleware.RequireAuth, controller.DeleteBlog)

	app.Get("/categories", middleware.RequireAuth, controller.GetCategories)

	app.Get("/profile", middleware.RequireAuth, controller.UserProfile)
}
