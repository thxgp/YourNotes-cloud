/**
 * API Service for SecureNotes Backend
 * Handles all HTTP requests to the backend with Clerk token authentication
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/api/notes')
 * @param {object} options - Fetch options
 * @param {function} getToken - Clerk's getToken function
 */
async function apiRequest(endpoint, options = {}, getToken) {
    const token = await getToken()

    if (!token) {
        throw new Error('Not authenticated')
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'API request failed')
    }

    return data
}

/**
 * Get all notes for the current user
 */
export async function getNotes(getToken) {
    return apiRequest('/api/notes', {}, getToken)
}

/**
 * Get a specific note by ID
 */
export async function getNote(id, getToken) {
    return apiRequest(`/api/notes/${id}`, {}, getToken)
}

/**
 * Create a new note
 */
export async function createNote(noteData, getToken) {
    return apiRequest('/api/notes', {
        method: 'POST',
        body: JSON.stringify(noteData),
    }, getToken)
}

/**
 * Delete a note by ID
 */
export async function deleteNote(id, getToken) {
    return apiRequest(`/api/notes/${id}`, {
        method: 'DELETE',
    }, getToken)
}
