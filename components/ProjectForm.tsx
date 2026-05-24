import Button from "./Button";
import Input from "./Input";

interface ProjectFormProps {
  onSubmit?: (data: { title: string; description: string }) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectForm({ isOpen, onClose }: ProjectFormProps) {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Project Title"
        placeholder="e.g., Website Redesign"
        autoFocus
      />

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 resize-none"
          placeholder="Briefly describe the project..."
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Project
        </Button>
      </div>
    </form>
  );
}
