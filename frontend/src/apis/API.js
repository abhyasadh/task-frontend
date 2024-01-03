import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const loginApi = (data) => Api.post('/api/user/login', data)
export const createUserApi = (data) => Api.post('/api/user/signup', data)

export const createTaskApi = (data) => Api.post('/api/task/create-task', data)
export const getAllTasksApi = () => Api.get('/api/task/get-tasks')
export const getSingleTaskApi = (id) => Api.get(`/api/task/get-task/${id}`)
export const updateTaskApi = (id, data) => Api.put(`/api/task/update-task/${id}`, data)
export const completeTaskApi = (id) => Api.put(`/api/task/update-task/${id}/complete`)
export const deleteTaskApi = (id) => Api.delete(`/api/task/delete-task/${id}`)