import axios from 'axios'

const API_URL = 'http://localhost:5257/api'

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
})

// ============ AUTH ENDPOINTS ============

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

export const logoutUser = async () => {
    try {
        const response = await apiClient.post('/auth/logout')
        return response.data
    } catch (error) {
        console.error('Ошибка выхода:', error)
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get('/auth/me')
        return response.data
    } catch (error) {
        console.error('Ошибка получения пользователя:', error)
        throw error
    }
}

// ============ ASSIGNMENT ENDPOINTS ============

export const getAssignments = async () => {
    try {
        const response = await apiClient.get('/assignment')
        return response.data
    } catch (error) {
        console.error('Ошибка получения задач:', error)
        throw error
    }
}

export const getAssignmentById = async (id) => {
    try {
        const response = await apiClient.get(`/assignment/${id}`)
        return response.data
    } catch (error) {
        console.error('Ошибка получения задачи:', error)
        throw error
    }
}

// ИСПРАВЛЕНО: /task -> /assignment
export const createTask = async (taskData) => {
    try {
        const response = await apiClient.post('/assignment', taskData)
        return response.data
    } catch (error) {
        console.error('Ошибка создания задачи:', error)
        throw error
    }
}

export const updateTask = async (id, taskData) => {
    try {
        const response = await apiClient.put(`/assignment/${id}`, taskData)
        return response.data
    } catch (error) {
        console.error('Ошибка обновления задачи:', error)
        throw error
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await apiClient.delete(`/assignment/${id}`)
        return response.data
    } catch (error) {
        console.error('Ошибка удаления задачи:', error)
        throw error
    }
}

export const updateTaskStatus = async (id, statusId) => {
    try {
        const response = await apiClient.patch(`/assignment/${id}/status`, statusId)
        return response.data
    } catch (error) {
        console.error('Ошибка обновления статуса:', error)
        throw error
    }
}

export const updateTaskContent = async (id, content) => {
    try {
        const response = await apiClient.patch(`/assignment/${id}/content`, content)
        return response.data
    } catch (error) {
        console.error('Ошибка обновления контента:', error)
        throw error
    }
}

export const changeTaskOwner = async (id, newUserId) => {
    try {
        const response = await apiClient.patch(`/assignment/${id}/owner`, newUserId)
        return response.data
    } catch (error) {
        console.error('Ошибка смены владельца:', error)
        throw error
    }
}

// ============ TEAM ENDPOINTS ============

export const getTeams = async () => {
    try {
        const response = await apiClient.get('/team')
        return response.data
    } catch (error) {
        console.error('Ошибка получения команд:', error)
        throw error
    }
}

export const getTeamById = async (id) => {
    try {
        const response = await apiClient.get(`/team/${id}`)
        return response.data
    } catch (error) {
        console.error('Ошибка получения команды:', error)
        throw error
    }
}

export const createTeam = async (teamData) => {
    try {
        const response = await apiClient.post('/team', teamData)
        return response.data
    } catch (error) {
        console.error('Ошибка создания команды:', error)
        throw error
    }
}

export const updateTeam = async (id, teamData) => {
    try {
        const response = await apiClient.put(`/team/${id}`, teamData)
        return response.data
    } catch (error) {
        console.error('Ошибка обновления команды:', error)
        throw error
    }
}

export const deleteTeam = async (id) => {
    try {
        const response = await apiClient.delete(`/team/${id}`)
        return response.data
    } catch (error) {
        console.error('Ошибка удаления команды:', error)
        throw error
    }
}

export const addUserToTeam = async (teamId, userId) => {
    try {
        const response = await apiClient.post(`/team/${teamId}/add-user`, userId)
        return response.data
    } catch (error) {
        console.error('Ошибка добавления пользователя:', error)
        throw error
    }
}

// ============ USER ENDPOINTS ============

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/user')
        return response.data
    } catch (error) {
        console.error('Ошибка получения пользователей:', error)
        throw error
    }
}

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/user/${id}`)
        return response.data
    } catch (error) {
        console.error('Ошибка получения пользователя:', error)
        throw error
    }
}