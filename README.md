# MERN Vehicle Information Management System

This _Vehicle Management System_ (VMS) delivers streamlined vehicle management services. It features a user-friendly interface for _**displaying vehicle lists**_, providing easy access to essential details such as _**vehicle type**_, _**plate number**_, and _**owner information**_. Admins can effortlessly `add, edit, or delete` vehicle records, with built-in confirmation prompts for safe deletion.

## Prerequisites

Before running the application, ensure you have the following installed:

1. Node.js
2. git

# Getting Started

Follow these steps to run the application locally:

1. create a folder with a new any name(e.g: Vehicle Information Management System) and open it in vscode and open the terminal using `ctrl + ~`
2. Clone the repository:

   `git clone https://github.com/aynuayex/vehicle-management-system .
`

## Setting up the Frontend

1. Navigate to the project directory:
   `cd frontend
`
2. Install dependencies:
   `npm install`

3. Go to [Clerk](https://dashboard.clerk.com/apps/new) and create a new Application and obtain the `VITE_CLERK_PUBLISHABLE_KEY` secret key and in the root of the **frontend** folder create a `.env.local` file if it didn't already exist and inside paste the secret and also add the `VITE_BASE_API` like shown below.so, it should look like this:
   ```
   VITE_BASE_API=http://localhost:3000
   VITE_CLERK_PUBLISHABLE_KEY=paste_your_secret_key_here
   ```
4. Start the frontend:
   `npm run dev`

## Setting up the API

1. Navigate to the project directory:
   `cd backend
`
2. Install dependencies:
   `npm install`

3. Go to [Mongodb](https://cloud.mongodb.com/) and create a new Project and obtain the database URL connection string
   and in the root of the **backend** folder create a `.env` file and inside paste to the value of **DATABASE_URI** and also add the PORT like shown below.so, it should look like this:
   ```
   PORT=3000
   DATABASE_URI="mongodb+srv://yourusername:yourpassword@cluster0.ozx0o.mongodb.net/Vehicle?retryWrites=true&w=majority&appName=Cluster0"
   ```
4. Start the backend server:
   `npm start`
