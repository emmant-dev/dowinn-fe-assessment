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
  login: (user_id: string, password: string) =>
    api.post<ApiResponse<string>>('/testlogin', { user_id, password }),
  signup: (user_id: string, email: string, password: string) =>
    api.post<ApiResponse<User>>('/test01/create_member', { user_id, email, password }),
  getProfile: (id: string) =>
    api.get<ApiResponse<User>>(`/test01/get_member?id=${id}`),
  updateProfile: (id: string, data: Partial<User>) =>
    api.patch<ApiResponse<User>>('/test01/update_member', { id, ...data }),
};

// Projects
export const projectAPI = {
  create: (title: string, description?: string) =>
    api.post<ApiResponse<Project>>('/test02/create_project', { title, description }),
  getAll: () =>
    api.get<ApiResponse<Project[]>>('/test02/get_all_project'),
  getOne: (id: string) =>
    api.get<ApiResponse<Project>>(`/test02/get_project?id=${id}`),
  update: (id: string, data: Partial<Project>) =>
    api.patch<ApiResponse<Project>>('/test02/patch_project', { id, ...data }),
};

// Tasks
export const taskAPI = {
  create: (projectId: string, title: string, description?: string) =>
    api.post<ApiResponse<Task>>('/test03/create_task', { projectId, title, description, status: 'Todo' }),
  getAll: () =>
    api.get<ApiResponse<Task[]>>('/test03/get_all_task'),
  getOne: (id: string) =>
    api.get<ApiResponse<Task>>(`/test03/get_task?id=${id}`),
  update: (id: string, data: Partial<Task>) =>
    api.patch<ApiResponse<Task>>('/test03/patch_task', { id, ...data }),
};

// ChangeLogs
export const changeLogAPI = {
  create: (taskId: string, action: string) =>
    api.post<ApiResponse<ChangeLog>>('/test04/create_changelog', { taskId, action }),
  getAll: () =>
    api.get<ApiResponse<ChangeLog[]>>('/test04/get_all_change_log'),
  getOne: (id: string) =>
    api.get<ApiResponse<ChangeLog>>(`/test04/get_change_log?id=${id}`),
};

export default api;