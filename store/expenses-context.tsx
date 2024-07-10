import { createContext, useReducer } from "react";
import { Iexpenses } from "components/ExpensesOutput/ExpensesOutput";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

interface IexpensesContextState {
  expenses: Iexpenses[];
  addExpense: ({ description, amount, date }: Omit<Iexpenses, "id">) => void;
  deleteExpense: (id: any) => void;
  updateExpense: (
    id: any,
    { amount, date, description }: Omit<Iexpenses, "id">
  ) => void;
}

type ExpensesAction =
  | { type: "ADD"; payload: Omit<Iexpenses, "id"> }
  | { type: "UPDATE"; payload: { id: string; data: Omit<Iexpenses, "id"> } }
  | { type: "DELETE"; payload: string };

export const ExpensesContext = createContext<IexpensesContextState>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(
  state: Iexpenses[],
  action: ExpensesAction
): Iexpenses[] {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updateItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updateItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expenses) => expenses.id !== action.payload);
    default:
      return state;
  }
}

interface IexpensesContextProviderProps {
  children: React.ReactNode;
}

function ExpensesContextProvider({ children }: IexpensesContextProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Omit<Iexpenses, "id">) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseDate: Omit<Iexpenses, "id">) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseDate } });
  }

  const value: IexpensesContextState = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
