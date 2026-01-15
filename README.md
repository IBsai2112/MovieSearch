# 🎬 SaiFlix

SaiFlix is a React.js movie discovery application that allows users to search for movies by title and view detailed information instantly. The app fetches data from the OMDb API and presents it in a clean, responsive interface designed for smooth browsing.

This project was created to strengthen frontend development skills, including React hooks, API integration, and environment variable management.

# Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/
   ```

2. Navigate to the project directory:

   ```shell
   cd MovieSearch
   ```

3. 🔐 Environment Setup

To keep API keys secure, the project uses environment variables.

4. Create a .env file

Create a file named .env in the root directory of the project.

5. Paste the copied content into the `.env` file.

6. 4️⃣ Add your OMDb API key

Get your API key from:
👉 http://www.omdbapi.com/

  Like:

   ```shell
   REACT_APP_MOVIES_API_URL=http://www.omdbapi.com/?apikey=your-api-key
   ```

7. 📦 Install Dependencies

Install all required packages by running:
```shell 
npm install
```

9. ▶️ Run the App

Start the development server with:

   ```shell
   npm start
   ```

10. Open `http://localhost:3000`


# 🎥 How SaiFlix Works
Enter a movie name in the search bar
Press Enter or click the search icon
SaiFlix fetches movie details from the OMDb API
Results are displayed instantly

🤝 Contributing

Contributions are welcome!
If you have ideas, improvements, or bug fixes, feel free to open an issue or submit a pull request.

📄 License

This project is licensed under the MIT License.

⭐ Customization

You are encouraged to enhance SaiFlix by adding features such as favorites, ratings, or detailed movie views.