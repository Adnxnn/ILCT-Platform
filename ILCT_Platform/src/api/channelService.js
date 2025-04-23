import axios from "axios";
import { getCreds } from "./creds";

export const fetchChannels = async () => {
    const creds = getCreds()
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/channels`, {
            headers: { Authorization: `Bearer ${creds.token}` }, userId: creds.user_id
        });
        return data
    } catch (error) {
        console.error(error.response.status);
        return []
    }
};

export const renameChannel = async (channelId, newName, isPrivate) => {
    const creds = getCreds()
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/rename-channel/${channelId}`, { newName, isPrivate }, {
            headers: {
                'Authorization': `Bearer ${creds.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log('Channel renamed successfully.');
        } else {
            console.error('Failed to rename channel:', response.statusText);
        }
    } catch (error) {
        console.error('Error renaming channel:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    }
}

export const deleteChannel = async (channelId) => {
    const creds = getCreds()
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/delete-channel/${channelId}`, {
            headers: {
                'Authorization': `Bearer ${creds.token}`
            }
        });
        if (response.status === 200) {
            return true
        } else {
            console.error('Failed to delete channel:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting channel:', error.message);
    }
};

export const channel_members = async (channelId) => {
    const creds = getCreds()
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/members/${channelId}`, {
            headers: {
                'Authorization': `Bearer ${creds.token}`
            }
        })
        if (response.status == 200) {
            return response.data
        } else {
            console.error('Failed to load members: ', response.statusText)
        }
    } catch (error) {
        console.error('Error fetching channel members: ', error.message)
    }
}

export const searchChannels = async (channel_name) => {
    const creds = getCreds()
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/search`, { channel_name }, {
            headers: { Authorization: `Bearer ${creds.token}` }
        });
        return data
    } catch (error) {
        console.error(error.response.status);
        return []
    }
};

export const joinChannel = async (channel_id) => {
    const creds = getCreds()
    const response = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/join`, { channel_id }, {
        headers: { Authorization: `Bearer ${creds.token}` }
    })
    const { code } = response.data
    if (code == 200) return true
    return false
}