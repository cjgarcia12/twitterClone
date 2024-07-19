# Twitter Clone

## Getting Started

Follow these steps to clone the repository, install dependencies, and run both the backend and frontend of the application.

### Prerequisites

Ensure you have the following software installed on your machine:
- Git
- Node.js (which includes npm)

### Steps to Run the Application

1. **Clone the Repository**
   ```sh
   git clone https://github.com/cjgarcia12/twitterClone.git or git@github.com:cjgarcia12/twitterClone.git
   ```

2. **Navigate to the Backend Directory**
   ```sh
   cd twitterClone/backend
   ```

3. **Install Backend Dependencies**
   ```sh
   npm install
   ```

4. **Run the Backend Server**
   ```sh
   npx nodemon server.js
   ```

5. **Open a New Terminal and Navigate to the Main Repository**
   ```sh
   cd ..
   ```

6. **Install Frontend Dependencies**
   ```sh
   npm install
   ```

7. **Run the Frontend Development Server**
   ```sh
   npm run dev
   ```

8. **Open Your Browser and Navigate to the React App**

   The React app should be hosted at:
   ```
   http://localhost:5731 
   ```
   but the number could be different

## Additional Information

- The backend server will automatically restart if any changes are detected in the `server.js` file, thanks to `nodemon`.
- Ensure both the backend and frontend servers are running concurrently for the app to function correctly.

### Troubleshooting

- If you encounter any issues, ensure all dependencies are installed correctly and that you are running the commands in the correct directories.
- Check for any error messages in the terminal and address them as needed.

