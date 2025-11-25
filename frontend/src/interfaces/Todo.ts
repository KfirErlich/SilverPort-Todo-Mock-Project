export interface TodoListProps {
    todos: Todo[];
    handleTaskCompletion: (id: string) => void 
    handleDeleteTodo: (id: string) => void 
  }

export interface TodoTaskProps {
    todo: Todo;
    handleTaskCompletion: (id: string) => void 
    handleDeleteTodo: (id: string) => void 
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

export interface FilterTodoProps{
  handleFilterTodo: (filter: FilterType) => void;
  currentFilter: FilterType;
}

export type ActionMap = {
  DELETE_TODO: string; 
  ADD_TODO: Todo;
  TOGGLE_TODO: string;
  SET_TODOS: Todo[];
};

export type TodoAction<K extends keyof ActionMap> = {
  type: K;
  payload: ActionMap[K];
};


export type TodoActions = 
  | TodoAction<'DELETE_TODO'>
  | TodoAction<'ADD_TODO'>
  | TodoAction<'TOGGLE_TODO'>
  | TodoAction<'SET_TODOS'>

export type FilterType = 'ALL' | 'COMPLETED' | 'NOT_COMPLETED';
