import { Task } from "../types/index";
import TaskCard from "./TaskCard";

interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const columns = ["Todo", "In Progress", "Done"] as const;

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4">
      {columns.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);

        return (
          <div
            key={status}
            className="flex-1 min-w-[280px] max-w-[350px] bg-gray-50/50 rounded-2xl p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-semibold text-gray-700 text-sm">{status}</h3>
              <span className="text-xs font-medium bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

              {/* Optional UI enhancement: Add Task placeholder button */}
              {status === "Todo" && (
                <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-medium hover:border-gray-300 hover:text-gray-600 transition">
                  + Add Task
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
