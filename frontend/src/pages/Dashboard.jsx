import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import NoteCard from '../components/NoteCard'
import NoteForm from '../components/NoteForm'
import { getNotes, createNote, deleteNote } from '../services/api'

function Dashboard() {
    const { getToken } = useAuth()
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)

    // Fetch notes on mount
    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async () => {
        try {
            setIsLoading(true)
            setError('')
            const data = await getNotes(getToken)
            setNotes(data.notes || [])
        } catch (err) {
            setError(err.message || 'Failed to fetch notes')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateNote = async (noteData) => {
        const data = await createNote(noteData, getToken)
        setNotes([data.note, ...notes])
        setShowForm(false)
    }

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId, getToken)
            setNotes(notes.filter(note => note.id !== noteId))
        } catch (err) {
            setError(err.message || 'Failed to delete note')
        }
    }

    if (isLoading) {
        return (
            <div className="dashboard">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">My Notes</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Note
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {notes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3 className="empty-title">No notes yet</h3>
                    <p className="empty-desc">Create your first note to get started!</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Create Note
                    </button>
                </div>
            ) : (
                <div className="notes-grid">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <NoteForm
                    onSubmit={handleCreateNote}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    )
}

export default Dashboard
