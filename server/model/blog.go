package model

type Blog struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Author    string `json:"author" gorm:"not null;column:author;size:255"`
	Title     string `json:"title" gorm:"not null;column:title;size:255"`
	Category  string `json:"category" gorm:"not null;column:category;size:255"`
	Content   string `json:"content" gorm:"not null;column:content"`
	UserRefer int    `json:"user_id"`
	User      User   `gorm:"foreignKey:UserRefer"`
}
