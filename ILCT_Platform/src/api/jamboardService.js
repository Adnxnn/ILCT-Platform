import { getCreds } from "./creds";

// Mock data for development
let sessions = [
    {
        id: 1,
        title: 'Project Planning',
        content: {
            elements: [],
            background: '#ffffff'
        },
        lastModified: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Team Brainstorming',
        content: {
            elements: [],
            background: '#ffffff'
        },
        lastModified: new Date().toISOString()
    }
];

// Get all sessions
export const getSessions = async () => {
    try {
        // In a real application, this would be an API call
        return sessions;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return [];
    }
};

// Create a new session
export const createSession = async (title) => {
    try {
        // In a real application, this would be an API call
        const newSession = {
            id: Date.now(), // Using timestamp as a simple ID generator
            title,
            content: {
                elements: [],
                background: '#ffffff'
            },
            lastModified: new Date().toISOString()
        };
        sessions.push(newSession);
        return newSession;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

// Save/update a session
export const saveSession = async (id, content) => {
    try {
        // In a real application, this would be an API call
        const index = sessions.findIndex(session => session.id === id);
        if (index !== -1) {
            sessions[index] = {
                ...sessions[index],
                content,
                lastModified: new Date().toISOString()
            };
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving session:', error);
        throw error;
    }
};

// Delete a session
export const deleteSession = async (id) => {
    try {
        // In a real application, this would be an API call
        const initialLength = sessions.length;
        sessions = sessions.filter(session => session.id !== id);
        return sessions.length !== initialLength;
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

export const save_session = async ({ channel_id, code, sessionName } = data) => {
    const creds = getCreds()
    if (!sessionName.trim()) {
        alert('Session name cannot be empty.');
        return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/jamboard/${channel_id}/save-jamboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${creds.token}`,
            },
            body: JSON.stringify({
                channel_id: channel_id,
                code,
                name: sessionName,
            }),
        });

        if (response.ok) {
            return true;
        } else {
            alert('Failed to save the session.');
            console.log(response)
            return false
        }
    } catch (error) {
        console.error('Error saving session:', error.message);
        alert('An error occurred while saving the session.');
    }
};

export const load_session = async (channel_id) => {
    const creds = getCreds()
    const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/jamboard/${channel_id}/load-session`, {
        headers: {
            Authorization: `Bearer ${creds.token}`
        }
    })
    const result = await response.json()
    if (response.ok) {
        return result.data
    } else {
        console.log("Error loading sessions")
        return false
    }
}