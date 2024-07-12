import { createContext, useReducer } from "react";
import { Iexpenses } from "components/ExpensesOutput/ExpensesOutput";

interface IexpensesContextState {
  expenses: Iexpenses[];
  addExpense: (expense: Iexpenses) => void;
  deleteExpense: (id: string) => void;
  setExpense: (expenses: Iexpenses[]) => void;
  updateExpense: (
    id: string,
    { amount, date, description }: Omit<Iexpenses, "id">
  ) => void;
}

type ExpensesAction =
  | { type: "ADD"; payload: Iexpenses }
  | { type: "UPDATE"; payload: { id: string; data: Omit<Iexpenses, "id"> } }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Iexpenses[] };

export const ExpensesContext = createContext<IexpensesContextState>({
  expenses: [],
  setExpense: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(
  state: Iexpenses[],
  action: ExpensesAction
): Iexpenses[] {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "ADD":
      return [{ ...action.payload }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpense(expenses: Iexpenses[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData: Iexpenses) {
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
    setExpense,
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
