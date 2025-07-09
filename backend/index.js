import e from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


import { loginUser, registerUser, setLimit } from "./controllers/UserController.js";
import { addExpense, getAllExpenses, editExpense, deleteExpense } from "./controllers/ExpenseController.js"


const PORT = process.env.PORT || 9000;
const app = e();

app.use(cors());
  
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(e.json());
app.use(e.urlencoded({ extended: true }));


app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/api/setLimit", setLimit)
app.post("/api/expenses", addExpense);
app.get("/api/expenses", getAllExpenses);
app.put("/api/expenses", editExpense);
app.delete("/api/expenses", deleteExpense);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
