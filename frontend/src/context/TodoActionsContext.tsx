import { createContext, useContext, type ReactNode } from "react";

type TodoActionsContextType = {
  handleTaskCompletion: (id: string) => void | Promise<void>;
  handleDeleteTodo: (id: string) => void | Promise<void>;
};

const TodoActionsContext = createContext<TodoActionsContextType | undefined>(
  undefined
);

type TodoActionsProviderProps = {
  value: TodoActionsContextType;
  children: ReactNode;
};

export function TodoActionsProvider({
  value,
  children,
}: TodoActionsProviderProps) {
  return (
    <TodoActionsContext.Provider value={value}>
      {children}
    </TodoActionsContext.Provider>
  );
}

export function useTodoActions() {
  const context = useContext(TodoActionsContext);
  if (!context) {
    throw new Error("useTodoActions must be used within a TodoActionsProvider");
  }
  return context;
}


