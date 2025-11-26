import type { TodoTaskProps } from "../interfaces/Todo";
import { FaTrash } from "react-icons/fa";
import { useTodoActions } from "../context/TodoActionsContext";


function TodoTask({ todo }: TodoTaskProps) {
    const { handleTaskCompletion, handleDeleteTodo } = useTodoActions();
    const taskCompleted = todo.isCompleted ? 'bg-green-200' : 'bg-red-200';
  return (
      <div className={`flex gap-4 items-center justify-between ${taskCompleted}
        border border-gray-300 rounded-lg shadow-md p-4 flex-1 min-h-[80px] w-full max-w-2xl`
      }>
        <h1 className="text-xl font-semibold flex-1 break-words">{todo.description}</h1>
        <input 
          type="checkbox" 
          className="w-5 h-5 cursor-pointer flex-shrink-0" 
          checked={todo.isCompleted} 
          onChange={() => handleTaskCompletion(todo.id)} 
        />
        <button 
          className="bg-gray-400 hover:bg-red-600 text-white rounded-lg 
            transition-colors duration-200 shadow-md hover:shadow-lg 
            transform hover:scale-105 active:scale-95 p-2 flex-shrink-0"
          aria-label="Delete task"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
  )
}
export default TodoTask;
