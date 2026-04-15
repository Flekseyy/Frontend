import axios from 'axios'

const API_URL = 'http://localhost:5257/api' 

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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