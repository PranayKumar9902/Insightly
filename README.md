# Insightly

Welcome to **Insightly** - A comprehensive blog site to share and discover insightful articles.

## Features ✨

- **User Authentication** 🔒: Secure login and registration.
- **Rich Text Editor** 📝: Create and edit blog posts with ease.
- **Comment System** 💬: Engage with readers through comments.
- **Responsive Design** 📱: Optimized for both desktop and mobile devices.
- **Search Functionality** 🔍: Easily find articles by keywords.
- **Categories and Tags** 🏷️: Organize content for better discoverability.

## Tech Stack 🛠️

- **Frontend**: React.js , HTML, CSS
- **Backend**: Go, Fiber
- **Database**: PostgreSQL, GORM
- **Authentication**: JWT (JSON Web Tokens)

## Installation 🛠️

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Go
- PostgreSQL

### Client Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/PranayKumar9902/Insightly.git
    cd insightly/client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the client:
    ```bash
    npm start
    ```

### Server Setup

1. Navigate to the server directory:
    ```bash
    cd ../server
    ```

2. **Set up environment variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    dbstring = "host=your_host user=your_username password=your_password dbname=your_dbname port=your_port sslmode=disable TimeZone=your_timezone"
    JWT_SECRET = "your_secret_key"
    ```

3. **Install dependencies**
    ```sh
    go mod tidy
    ```

4. **Run the application**
    ```sh
    go run main.go
    ```

## ⚙️ Configuration

- **Database Configuration**: Ensure PostgreSQL is installed and running. Update the `.env` file with your database credentials.
- **JWT Configuration**: Set the `JWT_SECRET` in the `.env` file for token generation and validation.


## Usage 🚀

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Start creating, editing, and reading blog posts!


Happy Blogging! 🎉
