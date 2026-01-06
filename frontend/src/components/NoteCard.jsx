import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

function NoteCard({ note, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id)
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="leading-tight text-xl font-semibold break-words pr-4 line-clamp-2">
                    {note.title || <span className="text-muted-foreground italic">Untitled</span>}
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" onClick={handleDelete} title="Delete note">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1">
                {note.content && (
                    <p className="text-muted-foreground whitespace-pre-wrap line-clamp-6 text-sm">
                        {note.content}
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    {formatDate(note.created_at)}
                </p>
            </CardFooter>
        </Card>
    )
}

export default NoteCard
