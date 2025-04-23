import axios from "axios";

export const register_user = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/auth/register`, {
            firstName,
            lastName,
            email,
            password,
        });
        return { status: response.status, data: response.data }
    } catch ({ response }) {
        return { status: 400, data: response.data }
    }
}

export const check_email = async (email) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/auth/check-email`, { email })
    return { status: response.data.code, data: response.data.message }
}