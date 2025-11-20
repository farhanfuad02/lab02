## Task Management
A simple Node.js/Express REST API for managing tasks, including features for listing all tasks, retrieving a task by ID, creating new tasks, and checking application health.

### Setup & Run Instructions
1. Clone the repository (if using Git):
   ```
   git clone https://github.com/farhanfuad02/lab02.git
   cd <your-project-folder>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. API will be available at:
   ```
   http://localhost:3000
   ```
### API Endpoints
1. GET / <br>
   Returns a welcome message.
2. GET /tasks <br>
   - Description: Returns a list of all tasks (each with id, title, completed, priority, and createdAt).
   - Response:
     ```
     {
      "success": true,
      "data": [
      {
      "id": 1,
      "title": "Sample Task 1",
      "completed": false,
      "priority": "high",
      "createdAt": "2025-11-16T09:00:00.000Z"
      },
      ...
      ]
     }

     ```
3. GET /tasks/:id
   - Description: Returns a single task by ID.
   - Success response:
     ```
     {
      "id": 1,
      "title": "Sample Task 1",
      "completed": false,
      "priority": "high",
      "createdAt": "2025-11-16T09:00:00.000Z"
      }

     ```
   - Error (invalid id):
     ```
     { "error": "Invalid ID format" }

     ```
4. GET /health
   - Description: Health check for the API.
   - Response:
     ```
     { "status": "healthy", "uptime": 12.34 }

     ```
   
