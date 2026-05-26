import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { Task } from "../types/index";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; description: string }) => void;
  task?: Task | null;
  loading?: boolean;
}
export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  task,
  loading = false,
}: TaskFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!title) return;
    onSubmit?.({ title, description });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? "Edit Task" : "Add Task"}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          label="Task Title"
          name="title"
          placeholder="e.g., Setup database schema"
          defaultValue={task?.title || ""}
          autoFocus
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder="Task details..."
            name="description"
            defaultValue={task?.description || ""}
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : task ? "Save Changes" : "Add Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
