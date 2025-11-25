import { useState, type FormEvent } from "react";
import type { AddTodoProps, Todo } from "../interfaces/Todo";

export default function AddTodo({handleAddTodo}: AddTodoProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: description.trim(),
      isCompleted: false,
      createdAt: new Date(),
    };

    handleAddTodo(newTodo);
    setDescription("");
  };

  return (
    <form
      className="flex gap-2 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new todo"
        className="border border-gray-300 rounded-lg shadow-md p-2 flex-1 text-center"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
}