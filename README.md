# 🌍 TripMate - Travel & Trip Management Backend API

TripMate is a RESTful API backend for a travel-based application where users can create trips, join others' trips, and explore new destinations. The application supports role-based access, secure authentication, dynamic filtering, and trip management functionality.

## 🚀 Features

-   🧳 Create and manage personal trip events
-   🤝 Request to join others' trips
-   🔐 Role-based access control (Admin, User)
-   🔎 Advanced trip search, filtering, sorting & pagination
-   ✅ Trip owner can accept/decline join requests
-   🧑‍💼 Admin dashboard with full user/trip management
-   🔒 JWT-based authentication and authorization
-   📚 RESTful APIs with proper route separation and structure

---

## 🛠️ Technologies Used

| Technology | Description                     |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | Web framework for Node.js       |
| MongoDB    | NoSQL database                  |
| Mongoose   | ODM for MongoDB                 |
| JWT        | Authentication                  |
| dotenv     | Environment variable management |
| bcryptjs   | Password hashing                |
| cors       | Cross-origin resource sharing   |
| nodemailer | Send email                      |

---

## 🔐 Authentication & Authorization

-   JWT-based login system
-   Passwords hashed using `bcryptjs`
-   Role-based route protection:
    -   `admin`: can manage users and all trips
    -   `user`: can create, update, or join trips

---

## 🔍 API Features

-   **Auth**
    -   Register / Login / Logout
    -   JWT Token-based access
-   **Trip**
    -   Create, Read, Update, Delete (CRUD)
    -   Search by title/destination
    -   Filter by date, location, category
    -   Sort by date, popularity, etc.
    -   Pagination support
-   **Join Request**
    -   Request to join other's trip
    -   Accept or reject join request
-   **Admin**
    -   View all trips and users
    -   Ban/unban users or remove trips

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NiharMondal/trip-mate-backend
cd tripmate-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Create a `.env` File

`NODE_ENV`  
`FRONT_END_URL`  
`MONGO_URI`  
`JWT_SECRET`  
`EMAIL` #your app password email  
`PASSWORD` #app password credentials

### 4. Run the Server

```bash
npm run dev
```

The server will start on http://localhost:5000

## 📌 Future Improvements

-   Email notifications
-   Payment gateway integration
-   Real-time updates using WebSocket (e.g., join request notifications)

## 🧑 Author

**Nihar Mondal**  
[LinkedIn](https://www.linkedin.com/in/developer-nihar/) | [Portfolio](https://github.com/NiharMondal) | [GitHub](https://github.com/NiharMondal)

## API Routes

-   **Root API**: http://localhost:5000/api/v1

### Public Routes

-   **Get Related Trips**
    ```http
    GET /related-trip/:id
    ```
-   **Get Freshly Added Trips**
    ```http
    GET /freshly-added
    ```
-   **Get Popular Trips**
    ```http
    GET /popular-trip
    ```
-   **Get Trip by ID**
    ```http
    GET /by-id/:id
    ```
-   **Get Trip by Slug**

    ```http
    GET /:slug
    ```

-   **Get Top Destination**
    ```http
    GET /top-destination
    ```

#### User Authentication

-   **Register**
    ```http
    POST /auth/register
    ```
-   **Login**
    ```http
    POST /auth/login
    ```
-   **Update Profile**
    ```http
    PATCH /user/profile/:userId
    ```

#### User Trip Management

-   **Get User's Trips**
    ```http
    GET /my-trip/:userId
    ```
-   **Create a Trip**
    ```http
    POST /trip
    ```
-   **Update a Trip**
    ```http
    PATCH /trip/:id
    ```
-   **Delete a Trip**
    ```http
    DELETE /trip/:id
    ```

#### Buddy Requests

-   **Send Buddy Request**
    ```http
    POST /buddy-request
    ```
-   **Accept Buddy Request**
    ```http
    PATCH /buddy-request/:id/accept
    ```

#### Reviews & Approval

-   **Submit a Review**
    ```http
    POST /reviews
    ```
-   **Admin Approve Review**
    ```http
    PATCH /reviews/:id/approve
    ```

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/tripmate-backend.git
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up environment variables in `.env` file.
4. Start the server:
    ```sh
    npm start
    ```

## Technologies Used

-   **Node.js**
-   **Express.js**
-   **MongoDB** (via Mongoose)
-   **JWT Authentication**
-   **Validation Middleware**

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
