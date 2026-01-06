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
        <div className="note-card">
            <div className="note-actions">
                <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    title="Delete note"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                </button>
            </div>

            <h3 className="note-title">{note.title}</h3>
            {note.content && <p className="note-content">{note.content}</p>}
            <p className="note-date">{formatDate(note.created_at)}</p>
        </div>
    )
}

export default NoteCard
