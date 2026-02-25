const API_BASE_URL = '';

export const API_ENDPOINTS = {
  AUTH_SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  TASKS_GET_ALL: `${API_BASE_URL}/api/tasks`,
  TASKS_CREATE: `${API_BASE_URL}/api/tasks`,
  TASKS_UPDATE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  TASKS_DELETE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  TASKS_GET_TODAY: `${API_BASE_URL}/api/tasks/today`,
  TASKS_REORDER: `${API_BASE_URL}/api/tasks/reorder`,
  PROJECTS_GET_ALL: `${API_BASE_URL}/api/projects`,
  PROJECTS_CREATE: `${API_BASE_URL}/api/projects`,
  PROJECTS_GET_ONE: (id) => `${API_BASE_URL}/api/projects/${id}`,
  USER_PROFILE_GET: `${API_BASE_URL}/api/user/profile`,
  USER_SETTINGS_UPDATE: `${API_BASE_URL}/api/user/settings`
};