const API_BASE_URL = '';

export const API_ENDPOINTS = {
  GET_TASKS: `${API_BASE_URL}/api/tasks`,
  CREATE_TASK: `${API_BASE_URL}/api/tasks`,
  UPDATE_TASK: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  DELETE_TASK: (id) => `${API_BASE_URL}/api/tasks/${id}`
};