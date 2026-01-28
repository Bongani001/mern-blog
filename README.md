<h1>FeatherBlog: A Feather-Light Blogging Platform (API)</h1>
    <p><strong>Elevate Your Blogging Experience</strong></p>
    <p>This feather-light backend API empowers you to create stunning, interactive, and user-friendly blogs.</p>

## Features
- User authentication (register/login)
- Create, edit, and delete blog posts
- Categorize posts
- Comment system with full CRUD functionality
- RESTful API built with Express.js
- MongoDB for data persistence
- React frontend (deployed separately)

## Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  

## Project Structure
```
server/
│── controllers/
│   ├── categoryController.js
│   ├── commentController.js
│   ├── postController.js
│   ├── userController.js
│
│── middleware/
│── models/
│── routes/
│   ├── categoryRouter.js
│   ├── commentRouter.js
│   ├── indexRouter.js
│   ├── postRouter.js
│   ├── userRouter.js
│
│── utils/
│── server.js
│── package.json
```

## API Routes

Here’s a list of all available routes in the backend:

### Index Router (`/api`)
- Root entry point for all API routes

### User Routes (`/api/users`)
- `POST /register` → Register a new user  
- `POST /login` → Login user  
- `GET /profile/:id` → Get user profile  
- `PUT /profile/:id` → Update user profile  
- `DELETE /profile/:id` → Delete user  

### Post Routes (`/api/posts`)
- `POST /` → Create a new post  
- `GET /` → Get all posts  
- `GET /:id` → Get single post by ID  
- `PUT /:id` → Update post  
- `DELETE /:id` → Delete post  

### Category Routes (`/api/categories`)
- `POST /` → Create a new category  
- `GET /` → Get all categories  
- `GET /:id` → Get category by ID  
- `PUT /:id` → Update category  
- `DELETE /:id` → Delete category  

### Comment Routes (`/api/comments`)
- `POST /` → Add a new comment  
- `GET /post/:postId` → Get all comments for a post  
- `PUT /:id` → Update comment  
- `DELETE /:id` → Delete comment  

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Bongani001/mern-blog.git
   cd mern-blog/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Run the server:
   ```bash
   npm start
   ```

## License
This project is licensed under the MIT License.
