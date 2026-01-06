import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createNote } from '../services/api'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function CreateNote() {
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSave = async () => {
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
        <div className="container max-w-3xl mx-auto py-10 px-4 min-h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" className="-ml-4" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Note
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-4 flex-1 flex flex-col">
                <Input
                    placeholder="Note Title"
                    className="text-4xl font-bold border-none focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground/50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Start writing..."
                    className="flex-1 resize-none border-none focus-visible:ring-0 px-0 text-lg leading-relaxed placeholder:text-muted-foreground/50 p-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    )
}
