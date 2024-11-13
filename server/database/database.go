package database

import (
	"log"
	"os"

	"github.com/bunty/blog-app/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectToDatabase() {
	dsn := os.Getenv("dbstring")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
		os.Exit(2)
	}
	log.Println("Connected to database")

	err = db.AutoMigrate(&model.Blog{}, &model.User{})

	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
		os.Exit(2)
	}

	Database = DbInstance{Db: db}
}
