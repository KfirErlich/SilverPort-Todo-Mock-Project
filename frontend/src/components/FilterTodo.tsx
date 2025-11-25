import type { FilterTodoProps, FilterType } from "../interfaces/Todo";

export default function FilterTodo({ handleFilterTodo, currentFilter }: FilterTodoProps) {
    const baseButtonClass = "px-4 py-2 rounded-lg shadow-md transition-colors";
    const inactiveButtonClass = "bg-blue-300 text-white hover:bg-blue-600";
    const activeButtonClass = "bg-blue-500 text-white font-bold ring-2 ring-blue-300";
    
    const getButtonClass = (filterType: FilterType) => {
        return `${baseButtonClass} ${currentFilter === filterType ? activeButtonClass : inactiveButtonClass}`;
    };

  return (
    <div className="flex gap-2">
      <button onClick={() => handleFilterTodo("ALL" as FilterType)} className={getButtonClass("ALL")}>
        All
      </button>
      <button onClick={() => handleFilterTodo("NOT_COMPLETED" as FilterType)} className={getButtonClass("NOT_COMPLETED")}>
        Not Completed
      </button>
      <button onClick={() => handleFilterTodo("COMPLETED" as FilterType)} className={getButtonClass("COMPLETED")}>
        Completed
      </button>
    </div>
  );
}