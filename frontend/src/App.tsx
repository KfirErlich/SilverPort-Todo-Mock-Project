import {useReducer, useEffect, useState, useMemo} from 'react';
import type { Todo, FilterType } from "./interfaces/Todo";
import TodoList from "./components/TodoList"
import AddTodo from './components/AddTodo';
import { todosReducer, initialTodos } from './hooks/todosReducer';
import FilterTodo from './components/FilterTodo';

function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [filter, setFilter] = useState<FilterType>('ALL');

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleAddTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const handleTaskCompletion = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  const handleFilterTodo = (filter: FilterType) => {
    setFilter(filter);
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'ALL') {
      return todos;
    } else if (filter === 'COMPLETED') {
      return todos.filter(todo => todo.isCompleted === true);
    } else {
      return todos.filter(todo => todo.isCompleted === false);
    }
  }, [todos, filter]);
    
  useEffect(() => {
    const getToDoList = async () => {
      const serverResponse = await fetch("http://localhost:3000/todos");
      if (!serverResponse.ok) {
        return;
      }
      const allTodos = await serverResponse.json();
      dispatch({ type: 'SET_TODOS', payload: allTodos });
    };

    getToDoList();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className='text-3xl font-bold p-4 text-center'>Todo List</h1>
      <AddTodo handleAddTodo={handleAddTodo} />
      <div className="flex flex-col items-center justify-center">
      <FilterTodo handleFilterTodo={handleFilterTodo} currentFilter={filter} />
      <TodoList todos={filteredTodos} handleTaskCompletion={handleTaskCompletion} handleDeleteTodo={handleDeleteTodo} />
      </div>
    </div>
  )
}

export default App
