import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom' // Added Link import
import NoteCard from '../components/NoteCard'
import { getNotes, deleteNote } from '../services/api'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

function Dashboard() {
    const { getToken } = useAuth()
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

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
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
                <Link to="/create-note">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Note
                    </Button>
                </Link>
            </div>

            {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">{error}</div>}

            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg bg-card/50">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
                    <p className="text-muted-foreground mb-6">Create your first note to get started!</p>
                    <Link to="/create-note">
                        <Button>Create Note</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
