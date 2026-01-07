import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft, Save, Loader2, Calendar, Clock, Tag, Bold, Italic, Heading, Undo, Redo, Quote, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createNote, getNote, updateNote } from '../services/api'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export default function CreateNote() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(!!id)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')

    // Force re-render on editor updates to sync toolbar state
    const [_, forceUpdate] = useState(0)

    // Tiptap Editor Setup
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing your encrypted note...',
            }),
        ],
        content: '',
        onTransaction: () => {
            forceUpdate(n => n + 1)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] text-lg text-foreground font-normal',
            },
        },
    })

    // Fetch Note Data
    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                try {
                    const token = await getToken()
                    const response = await getNote(id, (() => Promise.resolve(token)))
                    const noteData = response.note || response

                    setTitle(noteData.title || '')
                    // Set editor content if it exists
                    if (editor && noteData.content) {
                        editor.commands.setContent(noteData.content)
                    }
                } catch (err) {
                    console.error(err)
                    setError('Failed to load note')
                } finally {
                    setIsFetching(false)
                }
            }
            fetchNote()
        }
    }, [id, getToken, editor]) // Depend on editor to ensure it's ready before setting content

    const handleSave = async (e) => {
        if (e) e.preventDefault()
        // Get HTML content from editor
        const content = editor ? editor.getHTML() : ''

        // Simple validation: check if empty (p tag only) or title empty
        if (!title.trim() && (editor.isEmpty || content === '<p></p>')) return

        try {
            setIsLoading(true)
            setError('')
            const token = await getToken()
            const tokenProvider = () => Promise.resolve(token)

            const noteData = {
                title,
                content // Saving HTML content
            }

            if (id) {
                await updateNote(id, noteData, tokenProvider)
            } else {
                await createNote(noteData, tokenProvider)
            }
            navigate('/dashboard')
        } catch (err) {
            console.error(err)
            setError(id ? 'Failed to update note' : 'Failed to save note')
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Decrypting note...</p>
                </div>
            </div>
        )
    }

    if (!editor) {
        return null
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
                            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {id ? 'Editing' : 'New Note'}</span>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {id ? 'Updating...' : 'Encrypting...'}
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {id ? 'Update Note' : 'Save Note'}
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
                <div className="flex-1 py-8 px-6 md:px-0 space-y-6 flex flex-col">
                    <Input
                        placeholder="Note Title"
                        className="text-4xl md:text-5xl font-bold border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/30 bg-transparent h-auto dark:text-gray-100 flex-shrink-0"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-1 border-y border-white/5 py-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`h-8 w-8 p-0 hover:text-white transition-colors ${editor.isActive('bold') ? 'text-emerald-400 bg-emerald-400/10' : 'text-muted-foreground'}`}
                        >
                            <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`h-8 w-8 p-0 hover:text-white transition-colors ${editor.isActive('italic') ? 'text-emerald-400 bg-emerald-400/10' : 'text-muted-foreground'}`}
                        >
                            <Italic className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`h-8 w-8 p-0 hover:text-white transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-emerald-400 bg-emerald-400/10' : 'text-muted-foreground'}`}
                        >
                            <Heading className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`h-8 w-8 p-0 hover:text-white transition-colors ${editor.isActive('bulletList') ? 'text-emerald-400 bg-emerald-400/10' : 'text-muted-foreground'}`}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`h-8 w-8 p-0 hover:text-white transition-colors ${editor.isActive('blockquote') ? 'text-emerald-400 bg-emerald-400/10' : 'text-muted-foreground'}`}
                        >
                            <Quote className="w-4 h-4" />
                        </Button>

                        <div className="w-px h-4 mx-2 bg-white/10" />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white disabled:opacity-30 transition-colors"
                        >
                            <Undo className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white disabled:opacity-30 transition-colors"
                        >
                            <Redo className="w-4 h-4" />
                        </Button>
                    </div>

                    <EditorContent editor={editor} className="flex-1" />

                    {/* CSS for Tiptap placeholder and prose */}
                    <style>{`
                        .tiptap p.is-editor-empty:first-child::before {
                            color: hsl(var(--muted-foreground) / 0.3);
                            content: attr(data-placeholder);
                            float: left;
                            height: 0;
                            pointer-events: none;
                        }
                        .tiptap {
                           outline: none !important;
                        }
                        .tiptap h1, .tiptap h2, .tiptap h3 {
                            color: hsl(var(--foreground));
                            font-weight: 700;
                            margin-top: 1.5em;
                            margin-bottom: 0.5em;
                        }
                        .tiptap h2 { font-size: 1.5em; }
                        .tiptap ul { list-style-type: disc; padding-left: 1.5em; }
                        .tiptap blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1em; margin-left: 0; font-style: italic; }
                    `}</style>
                </div>
            </form>
        </div>
    )
}
