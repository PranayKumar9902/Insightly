package model

type UserProfile struct {
	ID         uint     `json:"id"`
	Username   string   `json:"username"`
	Email      string   `json:"email"`
	Blogs      []Blog   `json:"blogs"`
	Categories []string `json:"categories"`
}
