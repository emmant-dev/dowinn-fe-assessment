// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import ProjectCard from "../../../components/ProjectCard";
import KanbanBoard from "../../../components/KanbanBoard";
import ProjectForm from "../../../components/ProjectForm";
import TaskForm from "../../../components/TaskForm";
import ChangeLogPanel from "../../../components/ChangeLogPanel";
import Button from "../../../components/Button";
import { Project, Task, ChangeLog } from "../../../types/index";

export default function Dashboard() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Placeholder data (replace with API calls later)
  const projects: Project[] = [];
  const tasks: Task[] = [];
  const changelogs: ChangeLog[] = [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedProject?.title || "Select a Project"}
        </h2>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setShowProjectForm(true)}>
            + New Project
          </Button>
          {selectedProject && (
            <Button variant="secondary" onClick={() => setShowTaskForm(true)}>
              + New Task
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => setShowChangelog(!showChangelog)}
          >
            Changelog
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Kanban Board */}
        <div className="col-span-3">
          {selectedProject ? (
            <KanbanBoard tasks={tasks} />
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-gray-500">
              Select a project to view tasks
            </div>
          )}
        </div>

        {/* Changelog Panel */}
        {showChangelog && (
          <div className="col-span-1">
            <ChangeLogPanel logs={changelogs} />
          </div>
        )}
      </div>

      {/* Modals */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
      />
      <TaskForm isOpen={showTaskForm} onClose={() => setShowTaskForm(false)} />
    </div>
  );
}
