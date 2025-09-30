# 🍅 Tomato - Full-Stack Food Delivery App

<p align="center">
  <img src="https://user-images.githubusercontent.com/15160604/188465691-8869c279-8f05-4dc7-a859-026040857506.png" alt="Project Banner" width="800"/>
</p>

A comprehensive full-stack food delivery platform built with the MERN stack. This project features a dynamic customer-facing frontend for browsing menus and placing orders, alongside a robust admin panel for complete management of products, orders, and application data.

**Live Demo:** [Link to your deployed website]

---

## ✨ Core Features

### 👤 Customer-Facing App
* **User Authentication:** Secure user registration and login system with JWT.
* **Dynamic Food Menu:** Browse a complete list of available food items fetched from the database.
* **Interactive Cart:** Easily add or remove items from the shopping cart.
* **Seamless Ordering:** A streamlined process to place and confirm food orders.
* **Order History:** View a list of past orders and their statuses.
* **Responsive Design:** A clean and modern UI that works flawlessly on all devices.

### 🛠️ Admin Panel
* **Statistical Dashboard:** An overview of key metrics like total orders, menu items, and revenue.
* **Item Management:** A full CRUD interface to add, view, and remove food items from the menu.
* **Order Management:** A centralized view of all customer orders with the ability to update their status (e.g., "Food Processing", "Out for delivery", "Delivered").

---

## 🚀 Tech Stack

This project is built with modern technologies to ensure performance and scalability.

| Frontend                                                                                                                              | Backend                                                                                                                                   | Database                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)                                     | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)                                     | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                                     |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                         | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)                               |                                                                                                                                               |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                 |                                                                                                                                           |                                                                                                                                               |

---

## ⚙️ Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v18.x or later)
* npm
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SauravAgarwal6/food-delivery-app-mern
    cd food-delivery-app-mern
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section)
    ```

3.  **Set up the Frontend:**
    ```bash
    # Navigate to the frontend folder
    cd ../frontend

    # Install dependencies
    npm install
    ```

---

## 🔑 Environment Variables

The backend requires a `.env` file for configuration. Create a file named `.env` in the `backend` directory and add the following variables:

**`backend/.env.example`**
```env
# The port your backend server will run on
PORT=3000

# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string


## 📜 Running the Application

Once the setup is complete, you can run the application by starting both the backend and frontend servers.

### **1. Start the Backend Server**
```bash
# From the 'backend' directory
npm run dev

# From the 'frontend' directory
npm run dev

Saurav

GitHub: @SauravAgarwal6

# A secret key for JWT token generation
JWT_SECRET=your_super_secret_key
