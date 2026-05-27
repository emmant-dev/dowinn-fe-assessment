import axios, { AxiosInstance } from 'axios';
import { User, Project, Task, ChangeLog, ApiResponse } from '../types/index';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://m-backend.dowinnsys.com';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

type ProjectResponse = {
  id?: string | number;
  project_id?: string | number;
  title?: string;
  name?: string;
  description?: string;
  userId?: string | number;
  user_id?: string | number;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
};

type TaskResponse = {
  id?: string | number;
  task_id?: string | number;
  projectId?: string | number;
  project_id?: string | number;
  title?: string;
  name?: string;
  description?: string;
  contents?: string;
  status?: Task['status'];
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
};

type ChangeLogResponse = {
  id?: string | number;
  changeLog_id?: string | number;
  taskId?: string | number;
  task_id?: string | number;
  taskTitle?: string;
  action?: string;
  remark?: string;
  userId?: string | number;
  user_id?: string | number;
  timestamp?: string;
  created_at?: string;
  old_status?: Task['status'];
  new_status?: Task['status'];
};

const normalizeProject = (project: ProjectResponse): Project => ({
  id: String(project.id ?? project.project_id ?? ''),
  title: project.title ?? project.name ?? '',
  description: project.description ?? '',
  userId: String(project.userId ?? project.user_id ?? ''),
  createdAt: project.createdAt ?? project.created_at ?? '',
  updatedAt: project.updatedAt ?? project.updated_at,
});

const normalizeTask = (task: TaskResponse): Task => ({
  id: String(task.id ?? task.task_id ?? ''),
  projectId: String(task.projectId ?? task.project_id ?? ''),
  title: task.title ?? task.name ?? '',
  description: task.description ?? task.contents ?? '',
  status: task.status ?? 'Todo',
  createdAt: task.createdAt ?? task.created_at ?? '',
  updatedAt: task.updatedAt ?? task.updated_at ?? '',
});

const normalizeChangeLog = (log: ChangeLogResponse): ChangeLog => ({
  id: String(log.id ?? log.changeLog_id ?? ''),
  taskId: String(log.taskId ?? log.task_id ?? ''),
  taskTitle: log.taskTitle ?? '',
  action: log.action ?? log.remark ?? '',
  userId: String(log.userId ?? log.user_id ?? ''),
  timestamp: log.timestamp ?? log.created_at ?? '',
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
  create: async (title: string, description: string | undefined, userId: string) => {
    const res = await api.post<ApiResponse<ProjectResponse>>('/test02/create_project', {
      name: title,
      description,
      user_id: userId,
    });
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeProject(res.data.data) : undefined,
      },
    };
  },
  getAll: async () => {
    const res = await api.get<ApiResponse<ProjectResponse[]>>('/test02/get_all_project');
    return {
      ...res,
      data: {
        ...res.data,
        data: (res.data.data || []).map(normalizeProject),
      },
    };
  },
  getOne: async (id: string) => {
    const res = await api.get<ApiResponse<ProjectResponse>>(`/test02/get_project?id=${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeProject(res.data.data) : undefined,
      },
    };
  },
  update: async (id: string, data: Partial<Project>) => {
    const res = await api.patch<ApiResponse<ProjectResponse>>('/test02/patch_project', {
      id,
      name: data.title,
      description: data.description,
    });
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeProject(res.data.data) : undefined,
      },
    };
  },
};

// Tasks
export const taskAPI = {
  create: async (projectId: string, title: string, description?: string) => {
    const res = await api.post<ApiResponse<TaskResponse>>('/test03/create_task', {
      project_id: projectId,
      name: title,
      contents: description,
      status: 'Todo',
    });
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeTask(res.data.data) : undefined,
      },
    };
  },
  getAll: async () => {
    const res = await api.get<ApiResponse<TaskResponse[]>>('/test03/get_all_task');
    return {
      ...res,
      data: {
        ...res.data,
        data: (res.data.data || []).map(normalizeTask),
      },
    };
  },
  getOne: async (id: string) => {
    const res = await api.get<ApiResponse<TaskResponse>>(`/test03/get_task?id=${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeTask(res.data.data) : undefined,
      },
    };
  },
  update: async (id: string, data: Partial<Task>) => {
    const res = await api.patch<ApiResponse<TaskResponse>>('/test03/patch_task', {
      task_id: id,
      name: data.title,
      contents: data.description,
      status: data.status,
    });
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeTask(res.data.data) : undefined,
      },
    };
  },
};

// ChangeLogs
export const changeLogAPI = {
  create: async (
    taskId: string,
    action: string,
    oldStatus: Task['status'] = 'Todo',
    newStatus: Task['status'] = 'Todo'
  ) => {
    const res = await api.post<ApiResponse<ChangeLogResponse>>('/test04/create_changelog', {
      task_id: taskId,
      old_status: oldStatus,
      new_status: newStatus,
      remark: action,
    });
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeChangeLog(res.data.data) : undefined,
      },
    };
  },
  getAll: async () => {
    const res = await api.get<ApiResponse<ChangeLogResponse[]>>('/test04/get_all_change_log');
    return {
      ...res,
      data: {
        ...res.data,
        data: (res.data.data || []).map(normalizeChangeLog),
      },
    };
  },
  getOne: async (id: string) => {
    const res = await api.get<ApiResponse<ChangeLogResponse>>(`/test04/get_change_log?id=${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data ? normalizeChangeLog(res.data.data) : undefined,
      },
    };
  },
};

export default api;
