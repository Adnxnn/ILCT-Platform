// Mock data for development
let notes = [
    { id: 1, title: 'Welcome Note', content: 'Welcome to ILCT Platform! Start taking notes here.' },
    { id: 2, title: 'Meeting Notes', content: 'Important points from today\'s meeting...' }
];

// Get all notes
export const getNotes = async () => {
    try {
        // In a real application, this would be an API call
        return notes;
    } catch (error) {
        console.error('Error fetching notes:', error);
        return [];
    }
};

// Create a new note
export const createNote = async (title, content) => {
    try {
        // In a real application, this would be an API call
        const newNote = {
            id: Date.now(), // Using timestamp as a simple ID generator
            title,
            content
        };
        notes.push(newNote);
        return newNote;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

// Save/update a note
export const saveNote = async (id, title, content) => {
    try {
        // In a real application, this would be an API call
        const index = notes.findIndex(note => note.id === id);
        if (index !== -1) {
            notes[index] = { ...notes[index], title, content };
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving note:', error);
        throw error;
    }
};

// Delete a note
export const deleteNote = async (id) => {
    try {
        // In a real application, this would be an API call
        const initialLength = notes.length;
        notes = notes.filter(note => note.id !== id);
        return notes.length !== initialLength;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}; 