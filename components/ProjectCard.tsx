import { Project } from "../types/index";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>
      {project.description ? (
        <p className="text-sm text-gray-500 line-clamp-2">
          {project.description}
        </p>
      ) : (
        <p className="text-sm text-gray-400 italic">No description provided.</p>
      )}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <button className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View Board →
        </button>
      </div>
    </div>
  );
}
