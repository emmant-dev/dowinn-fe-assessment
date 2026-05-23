// src/types/index.ts
export type TaskStatus = 'Todo' | 'In Progress' | 'Done';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Project {
  id: string;
  title: string;  // Change: 'name' -> 'title' (matches backend)
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;  // Add this
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChangeLog {
  id: string;
  taskId: string;
  taskTitle: string;
  action: string;
  userId: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}