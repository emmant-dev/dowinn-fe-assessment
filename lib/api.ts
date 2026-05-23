import axios, { AxiosInstance } from 'axios';
import { User, Project, Task, ChangeLog, ApiResponse } from '../types/index';

const BASE_URL = 'https://m-backend.dowinnsys.com';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/testlogin', { email, password }),
  signup: (email: string, password: string, name: string) =>
    api.post<ApiResponse<User>>('/test1/create_member', { email, password, name }),
  getProfile: (id: string) =>
    api.get<ApiResponse<User>>(`/test1/get_member?id=${id}`),
  updateProfile: (id: string, data: Partial<User>) =>
    api.patch<ApiResponse<User>>('/test1/update_member', { id, ...data }),
};

// Projects
export const projectAPI = {
  create: (title: string, description?: string) =>
    api.post<ApiResponse<Project>>('/test2/create_project', { title, description }),
  getAll: () =>
    api.get<ApiResponse<Project[]>>('/test2/get_all_project'),
  getOne: (id: string) =>
    api.get<ApiResponse<Project>>(`/test2/get_project?id=${id}`),
  update: (id: string, data: Partial<Project>) =>
    api.patch<ApiResponse<Project>>('/test2/patch_project', { id, ...data }),
};

// Tasks
export const taskAPI = {
  create: (projectId: string, title: string, description?: string) =>
    api.post<ApiResponse<Task>>('/test3/create_task', { projectId, title, description, status: 'Todo' }),
  getAll: () =>
    api.get<ApiResponse<Task[]>>('/test3/get_all_task'),
  getOne: (id: string) =>
    api.get<ApiResponse<Task>>(`/test3/get_task?id=${id}`),
  update: (id: string, data: Partial<Task>) =>
    api.patch<ApiResponse<Task>>('/test3/patch_task', { id, ...data }),
};

// ChangeLogs
export const changeLogAPI = {
  create: (taskId: string, action: string) =>
    api.post<ApiResponse<ChangeLog>>('/test4/create_changelog', { taskId, action }),
  getAll: () =>
    api.get<ApiResponse<ChangeLog[]>>('/test4/get_all_change_log'),
  getOne: (id: string) =>
    api.get<ApiResponse<ChangeLog>>(`/test4/get_change_log?id=${id}`),
  update: (id: string, data: Partial<ChangeLog>) =>
    api.patch<ApiResponse<ChangeLog>>('/test4/update_change_log', { id, ...data }),
};

export default api;