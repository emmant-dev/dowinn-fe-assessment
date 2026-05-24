import { Project } from "../types/index";
import Button from "./Button";

interface SidebarProps {
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (id: string) => void;
}

export default function Sidebar({
  projects,
  selectedProjectId,
  onSelectProject,
}: SidebarProps) {
  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-gray-50/50 flex flex-col p-4">
      <div className="mb-6">
        <Button
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
        >
          <span>+</span> Create Project
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          Your Projects
        </h3>
        <ul className="space-y-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                  selectedProjectId === project.id
                    ? "bg-white shadow-sm border border-gray-200 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                }`}
              >
                {project.title}
              </button>
            </li>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-gray-400 px-3 italic">
              No projects yet.
            </p>
          )}
        </ul>
      </div>
    </aside>
  );
}
