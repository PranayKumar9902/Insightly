package controller

import (
	"github.com/bunty/blog-app/database"
	"github.com/bunty/blog-app/model"
	"github.com/gofiber/fiber/v2"
)

func GetBlogList(c *fiber.Ctx) error {

	blogs := []model.Blog{}

	if err := database.Database.Db.Find(&blogs).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(blogs)
}

func GetBlog(c *fiber.Ctx) error {

	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	blog := model.Blog{}

	if err := database.Database.Db.Find(&blog, "id = ?", id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal Server Error"})
	}

	if blog.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Record not found"})
	}

	return c.JSON(blog)
}

func CreateBlog(c *fiber.Ctx) error {

	blog := model.Blog{}

	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.Database.Db.Create(&blog).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Blog created successfully"})
}

func UpdateBlog(c *fiber.Ctx) error {

	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	blog := model.Blog{}

	database.Database.Db.Find(&blog, "id = ?", id)

	if blog.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Record not found"})
	}

	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.Database.Db.Save(&blog).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Blog updated successfully"})
}

func DeleteBlog(c *fiber.Ctx) error {

	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	blog := model.Blog{}

	if err := database.Database.Db.Delete(&blog, "id = ?", id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Blog deleted successfully"})
}

// Getting all categories of existing blogs

func GetCategories(c *fiber.Ctx) error {

	var categories []string

	if err := database.Database.Db.Model(&model.Blog{}).Distinct().Pluck("category", &categories).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"categories": categories})
}
