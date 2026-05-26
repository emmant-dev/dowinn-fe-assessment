import { Task } from "../types/index";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDragStart?: (event: React.DragEvent, task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDragStart }: TaskCardProps) {
  const badgeColors = {
    Todo: "bg-gray-100 text-gray-600 border-gray-200",
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
    Done: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
      draggable
      onDragStart={(event) => onDragStart?.(event, task)}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeColors[task.status]}`}
        >
          {task.status}
        </span>
        <button
          type="button"
          onClick={() => onEdit?.(task)}
          className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Edit ${task.title}`}
        >
          •••
        </button>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
}
