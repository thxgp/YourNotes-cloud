import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

// Helper to strip HTML tags for preview
const stripHtml = (html) => {
    if (!html) return ''
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
}

function NoteCard({ note, onDelete, viewMode }) {
    const previewContent = stripHtml(note.content) || 'No content encrypted in this note.'

    if (viewMode === 'list') {
        return (
            <Link to={`/note/${note.id}`} className="block group">
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/60 hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{note.title || 'Untitled Note'}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{previewContent}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground hidden md:flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(note.created_at).toLocaleDateString()}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault()
                                onDelete(note.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link to={`/note/${note.id}`}>
            <Card className="group flex flex-col h-[280px] bg-[#1a1a1a]/40 backdrop-blur border-white/5 hover:border-primary/20 hover:shadow-[0_0_20px_-10px_rgba(47,79,79,0.3)] transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                            {note.title || 'Untitled Encrypted Note'}
                        </CardTitle>
                        <div className="p-1.5 rounded-md bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FileText className="w-4 h-4 text-muted-foreground/70" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(note.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden relative">
                    <p className="text-muted-foreground/80 leading-relaxed text-sm whitespace-pre-wrap font-light">
                        {previewContent}
                    </p>
                    {/* Gradient fade at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a1a]/90 to-transparent pointer-events-none" />
                </CardContent>

                <CardFooter className="pt-3 border-t border-white/5 flex justify-end items-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete(note.id)
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default NoteCard
