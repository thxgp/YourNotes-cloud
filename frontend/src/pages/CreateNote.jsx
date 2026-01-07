import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft, Save, Loader2, Calendar, Clock, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createNote } from '../services/api'

export default function CreateNote() {
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSave = async (e) => {
        if (e) e.preventDefault()
        if (!title.trim() && !content.trim()) return

        try {
            setIsLoading(true)
            setError('')
            await createNote({ title, content }, getToken)
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
            setError(err.message || 'Failed to save note')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col">
            <form onSubmit={handleSave} className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
                {/* Editor Toolbar/Header */}
                <div className="flex items-center justify-between py-6 px-6 md:px-0 border-b border-border/40">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate('/dashboard')}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center text-xs text-muted-foreground gap-4 mr-4">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Today</span>
                            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Uncategorized</span>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Encrypting...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Note
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-3 mx-6 md:mx-0 mt-6 rounded-lg flex items-center gap-2">
                        <Loader2 className="w-4 h-4" />
                        {error}
                    </div>
                )}

                {/* Editor Area */}
                <div className="flex-1 py-8 px-6 md:px-0 space-y-6">
                    <Input
                        placeholder="Note Title"
                        className="text-4xl md:text-5xl font-bold border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/30 bg-transparent h-auto dark:text-gray-100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    <Textarea
                        placeholder="Start typing your encrypted note..."
                        className="flex-1 min-h-[500px] resize-none border-none shadow-none px-0 text-lg leading-relaxed focus-visible:ring-0 placeholder:text-muted-foreground/30 bg-transparent font-normal text-muted-foreground focus:text-foreground transition-colors"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}
