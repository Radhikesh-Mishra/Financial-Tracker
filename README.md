# 💰 Financial Tracker App

A full-stack Financial Tracker application that allows users to manage and analyze their expenses effectively. Built with **Node.js**, **Express.js**, **React.js**, **Redux**, **Tailwind CSS**, **MongoDB**, and **JWT** for secure authentication. It also integrates **Chart.js** for visual reports and a **Flask API** for smart spending suggestions.

---

## 🚀 Features

### 👤 User Authentication
- Secure **Register** and **Login** functionality using **JWT**.

### 🧾 Expense Management
Users can:
- ✅ **Add**, **Edit**, and **Delete** expenses.
- Each expense includes:
  - **Amount** (e.g., ₹1200)
  - **Category** (e.g., Food, Rent, Shopping, etc.)
  - **Date**
  - **Payment Method** (e.g., UPI, Credit Card, Cash)
  - **Notes** (optional)

### 🔍 Filters & Budgeting
- Filter expenses by **category**
- Set **monthly spending limits** per category
- Alert when spending exceeds **80%** of the limit

### 📊 Reports and Insights
- Total **money spent** in the current month
- The **most spent** category
- **Top 3 payment methods** used
- **Pie chart** of category-wise spending (powered by **Chart.js**)

---

## 🧠 Smart Suggestions with Flask API

A Python Flask microservice is integrated for analyzing user spending patterns using **Pandas**.

### Flask API Capabilities:
- Accepts expense data via POST
- Analyzes spending over the **last 30 days**
- Returns personalized suggestions like:
  - “You’re spending a lot on Food. Try to reduce it by 15%.”
  - “Your travel expenses increased a lot this month.”

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Data & Auth        | Analysis       |
|-----------------|-----------------|--------------------|----------------|
| React.js        | Node.js         | MongoDB            | Python (Flask) |
| Redux           | Express.js      | JWT Authentication | Pandas         |
| Tailwind CSS    | Axios           | Mongoose           |                |
| Chart.js        |                 |                    |                |

---

### Steps to Run the Project
#### 1. Clone the Repository
```sh
 git clone https://github.com/your-username/bp-expert-system.git
 cd bp-expert-system
```

#### 2. Backend Setup (Node + Express)
```sh
cd server
npm install
npm run dev
```

#### 3. Flask Backend Setup (For Analysis and Smart suggestions)
```sh
 cd flask-backend
 python -m venv myenv  # Create a virtual environment
 source myenv/bin/activate  # (Linux/macOS)
 myenv\Scripts\activate  # (Windows)
 pip install -r requirements.txt  # Install dependencies
 python server.py  # Start the Flask server
```

#### 4. Frontend (React + Vite)
```sh
cd client
npm install
npm run dev
```

#### 5. Setup Environment Variables in backend for JWT_SECRET_KEY, MONGODB_URL, PORT

## Some images of the features of Financial Tracker
#### 1. SignIn user
![Signin](https://github.com/user-attachments/assets/cc56a051-2103-46bc-b42d-ec90e65540b4)
#### 2. Login User
![Login](https://github.com/user-attachments/assets/065497dd-c269-4741-af61-46ccd109d83e)
#### 3. Dashboard for User
![Dashboard](https://github.com/user-attachments/assets/7b325126-ed58-44f6-9773-555e8c43b06d)
#### 4. Dashboard with Alert message
![Dashboard with alert](https://github.com/user-attachments/assets/bde1f530-38bf-4be2-bcfc-43b0b7eceb1f)
#### 5. Expense Report - Total money spent, Most used payment method, Most spent category, and Pie Chart for the spendings 
![Expense Report](https://github.com/user-attachments/assets/5e077adb-fb23-4dcf-acb5-f7c26af7fb0d)
#### 6. Pie Chart for spendings in each category
![Pie Chart](https://github.com/user-attachments/assets/b2539678-1c4a-42c7-a68c-c4d962da4318)
#### 7. Modal to set Budget limit for each category
![Set limit](https://github.com/user-attachments/assets/9b647824-7336-49a9-b8d7-f32aacd401d9)
#### 8. Expense Table with smart suggestions based on expenses
![Expense Table](https://github.com/user-attachments/assets/75c0a14c-1b52-4caf-9e88-2a0f43a74d9a)
#### 9. Modal for adding new expenses
![Add new Expense](https://github.com/user-attachments/assets/2869e026-9819-485e-a964-551ce20381b5)
#### 10. Modal for editing an existing expense
![Edit Expense](https://github.com/user-attachments/assets/5d5a748b-63e7-4ff8-8591-9fe3a826aaaf)
