import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { Project } from "../types/index";

interface ProjectFormProps {
  onSubmit?: (data: { title: string; description: string }) => void;
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  loading?: boolean;
}

export default function ProjectForm({
  isOpen,
  onClose,
  onSubmit,
  project,
  loading = false,
}: ProjectFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!title) return;
    onSubmit?.({ title, description });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? "Edit Project" : "Create Project"}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          label="Project Title"
          name="title"
          placeholder="e.g., Website Redesign"
          defaultValue={project?.title || ""}
          autoFocus
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 resize-none"
            placeholder="Briefly describe the project..."
            name="description"
            defaultValue={project?.description || ""}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : project ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
