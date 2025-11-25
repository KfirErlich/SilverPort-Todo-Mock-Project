export interface TodoListProps {
    todos: Todo[];
    handleTaskCompletion: (id: string) => void 
  }

export interface TodoTaskProps {
    todo: Todo;
    handleTaskCompletion: (id: string) => void 
  }

export interface Todo {
    id: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
}

export interface AddTodoProps {
  handleAddTodo: (todo: Todo) => void;
}
