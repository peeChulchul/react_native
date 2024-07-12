import axios from "axios";
import { Iexpenses } from "components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL =
  "https://react-native-9a40d-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData: {
  amount: number;
  date: Date;
  description: string;
}) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: Omit<Iexpenses, "id">) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
