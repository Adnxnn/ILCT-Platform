import axios from "axios";
import socket from "../utils/socket";
import { getCreds } from "./creds";

export const fetchMessages = async (channelId) => {
    const creds = getCreds()
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBAL}/message/channels/${channelId}/`, {
            headers: {
                Authorization: `Bearer ${creds.token}`,
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

export const sendMessage = async (channelId, newMessage) => {
    const creds = getCreds()
    if (newMessage.trim() !== '') {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/message/channels/${channelId}/`, {
                content: {
                    user_id: creds.user_id,
                    message: newMessage,
                    email: creds.user_email,
                    socketID: socket.id
                },
            }, {
                headers: {
                    Authorization: `Bearer ${creds.token}`,
                },
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
};
