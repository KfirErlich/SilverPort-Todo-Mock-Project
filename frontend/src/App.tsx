import {useState, useEffect} from 'react';
import type {Todo} from "./interfaces/Todo"
import TodoList from "./components/TodoList"
import AddTodo from './components/AddTodo';
function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo])
  }

  const handleTaskCompletion = (id: string) => {
    const updatedTodo = todos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    setTodos(updatedTodo)
  }
    
    useEffect(() => {
        const getToDoList =async () => {
          const serverResponse = await fetch("http://localhost:3000/todos")
          if(!serverResponse.ok){

          }
          const allTodos = await serverResponse.json()
          setTodos(allTodos)
        }

      getToDoList()
    },[])


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className='text-3xl font-bold p-4 text-center'>Todo List</h1>
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} handleTaskCompletion={handleTaskCompletion} />
    </div>
  )
}

export default App
