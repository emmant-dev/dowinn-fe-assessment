// app/dashboard/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import KanbanBoard from "../../../components/KanbanBoard";
import ProjectForm from "../../../components/ProjectForm";
import TaskForm from "../../../components/TaskForm";
import ChangeLogPanel from "../../../components/ChangeLogPanel";
import Button from "../../../components/Button";
import Sidebar from "../../../components/Sidebar";
import { Project, Task, ChangeLog, TaskStatus } from "../../../types/index";
import { changeLogAPI, projectAPI, taskAPI } from "../../../lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [changelogs, setChangelogs] = useState<ChangeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = useCallback(async (projectIdToSelect?: string) => {
    setError("");
    try {
      const [projectRes, taskRes, logRes] = await Promise.all([
        projectAPI.getAll(),
        taskAPI.getAll(),
        changeLogAPI.getAll(),
      ]);

      const nextProjects = projectRes.data.data || [];
      setProjects(nextProjects);
      setTasks(taskRes.data.data || []);
      setChangelogs(logRes.data.data || []);

      setSelectedProject((current) => {
        if (projectIdToSelect) {
          return (
            nextProjects.find((project) => project.id === projectIdToSelect) ||
            null
          );
        }
        if (!current) return nextProjects[0] || null;
        return nextProjects.find((project) => project.id === current.id) || null;
      });
    } catch {
      setError("Unable to load dashboard data. Please check the API server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/");
      return;
    }

    queueMicrotask(() => {
      void loadData();
    });
  }, [loadData, router]);

  const selectedTasks = useMemo(() => {
    if (!selectedProject) return [];
    return tasks.filter((task) => task.projectId === selectedProject.id);
  }, [selectedProject, tasks]);

  const selectedTaskIds = useMemo(
    () => new Set(selectedTasks.map((task) => task.id)),
    [selectedTasks]
  );

  const visibleLogs = useMemo(() => {
    if (!selectedProject) return changelogs;
    return changelogs.filter((log) => selectedTaskIds.has(log.taskId));
  }, [changelogs, selectedProject, selectedTaskIds]);

  const openProjectForm = (project?: Project) => {
    setEditingProject(project || null);
    setShowProjectForm(true);
  };

  const openTaskForm = (task?: Task) => {
    setEditingTask(task || null);
    setShowTaskForm(true);
  };

  const closeProjectForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const refreshLogs = async () => {
    const logRes = await changeLogAPI.getAll();
    setChangelogs(logRes.data.data || []);
  };

  const handleProjectSubmit = async (data: {
    title: string;
    description: string;
  }) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (editingProject) {
        await projectAPI.update(editingProject.id, data);
        setMessage("Project updated.");
      } else {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/");
          return;
        }

        const projectRes = await projectAPI.create(
          data.title,
          data.description,
          userId
        );
        const createdProjectId = projectRes.data.data?.id;
        setMessage("Project created.");
        closeProjectForm();
        await loadData(createdProjectId);
        return;
      }

      closeProjectForm();
      await loadData();
    } catch {
      setError("Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleTaskSubmit = async (data: {
    title: string;
    description: string;
  }) => {
    if (!selectedProject) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (editingTask) {
        await taskAPI.update(editingTask.id, data);
        await changeLogAPI.create(editingTask.id, "Task details updated");
        setMessage("Task updated.");
      } else {
        const taskRes = await taskAPI.create(
          selectedProject.id,
          data.title,
          data.description
        );
        const createdTask = taskRes.data.data;
        if (createdTask?.id) {
          await changeLogAPI.create(createdTask.id, "Task created");
        }
        setMessage("Task created.");
      }

      closeTaskForm();
      await loadData();
    } catch {
      setError("Unable to save task.");
    } finally {
      setSaving(false);
    }
  };

  const handleMoveTask = async (task: Task, status: TaskStatus) => {
    const previousTasks = tasks;
    setTasks((current) =>
      current.map((item) => (item.id === task.id ? { ...item, status } : item))
    );
    setError("");
    setMessage("");

    try {
      await taskAPI.update(task.id, { ...task, status });
      await changeLogAPI.create(
        task.id,
        `Status changed from ${task.status} to ${status}`,
        task.status,
        status
      );
      await refreshLogs();
    } catch {
      setTasks(previousTasks);
      setError("Unable to update task status.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProject?.id}
        onSelectProject={(id) => {
          setSelectedProject(
            projects.find((project) => project.id === id) || null
          );
        }}
        onCreateProject={() => openProjectForm()}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 min-h-10">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {!error && message && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProject?.title || "Select a Project"}
            </h2>
            {selectedProject?.description && (
              <p className="mt-1 text-sm text-gray-500">
                {selectedProject.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => openProjectForm()}>
              + New Project
            </Button>
            {selectedProject && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => openProjectForm(selectedProject)}
                >
                  Edit Project
                </Button>
                <Button variant="secondary" onClick={() => openTaskForm()}>
                  + New Task
                </Button>
              </>
            )}
            <Button
              variant="secondary"
              onClick={() => setShowChangelog(!showChangelog)}
            >
              Changelog
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className={showChangelog ? "xl:col-span-3" : "xl:col-span-4"}>
            {selectedProject ? (
              <KanbanBoard
                tasks={selectedTasks}
                onAddTask={() => openTaskForm()}
                onEditTask={(task) => openTaskForm(task)}
                onMoveTask={handleMoveTask}
              />
            ) : (
              <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                Create or select a project to view tasks.
              </div>
            )}
          </div>

          {showChangelog && (
            <div className="xl:col-span-1">
              <ChangeLogPanel logs={visibleLogs} />
            </div>
          )}
        </div>
      </div>

      <ProjectForm
        isOpen={showProjectForm}
        onClose={closeProjectForm}
        onSubmit={handleProjectSubmit}
        project={editingProject}
        loading={saving}
      />
      <TaskForm
        isOpen={showTaskForm}
        onClose={closeTaskForm}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        loading={saving}
      />
    </div>
  );
}
