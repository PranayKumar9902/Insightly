package model

type User struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Username string `json:"username" gorm:"not null;column:username;size:255;unique"`
	Password string `json:"password" gorm:"not null;size:255"`
	Email    string `json:"email"  gorm:"not null;size:255"`
}
