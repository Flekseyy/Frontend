import axios from 'axios'

const API_URL = 'http://localhost:5257/api'

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

// Интерцептор для автоматической подстановки токена
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData)
        return response.data
    } catch (error) {
        console.error('Ошибка регистрации:', error)
        throw error
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials)
        return response.data
    } catch (error) {
        console.error('Ошибка входа:', error)
        throw error
    }
}

export const createTask = async (taskData, token) => {
    try {
        const response = await apiClient.post('/tasks', taskData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Ошибка создания задачи:', error)
        throw error
    }
}

export const createTeam = async (teamData) => {
    try {
        const response = await apiClient.post('/teams', teamData)
        return response.data
    } catch (error) {
        console.error('Ошибка создания команды:', error)
        throw error
    }
}
