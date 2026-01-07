import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { Plus, Search, LayoutGrid, List, SlidersHorizontal, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NoteCard from '../components/NoteCard'
import { getNotes, deleteNote } from '../services/api'
import { Card } from "@/components/ui/card"

function Dashboard() {
    const { getToken } = useAuth()
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [viewMode, setViewMode] = useState('grid')

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
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Accessing Secure Vault...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Notes</h1>
                    <p className="text-muted-foreground">Manage your encrypted thoughts.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search encrypted notes..."
                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus-visible:ring-primary/50"
                        />
                    </div>

                    <div className="flex items-center gap-1 border border-white/10 rounded-md p-1 bg-white/5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-muted-foreground'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-muted-foreground'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground">
                        <SlidersHorizontal className="w-4 h-4" />
                    </Button>

                    <Link to="/create-note">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(47,79,79,0.5)] border border-white/10">
                            <Plus className="w-4 h-4 mr-2" />
                            New Note
                        </Button>
                    </Link>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {error}
                </div>
            )}

            {notes.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-white/10 bg-transparent h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                        <Shield className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No secure notes yet</h3>
                    <p className="text-muted-foreground max-w-sm mb-8">
                        Your vault is empty. Create your first encrypted note to get started.
                    </p>
                    <Link to="/create-note">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Note
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {notes.map(note => (
                        <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
