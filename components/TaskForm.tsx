import Button from "./Button";
import Input from "./Input";

interface TaskFormProps {
  onSubmit?: (data: any) => void;
  onClose: () => void;
}

export default function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Task Title"
        placeholder="e.g., Setup database schema"
        autoFocus
      />

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          placeholder="Task details..."
        />
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Task
        </Button>
      </div>
    </form>
  );
}
