import { useState } from 'react'

function NoteForm({ onSubmit, onCancel, initialData = null }) {
    const [title, setTitle] = useState(initialData?.title || '')
    const [content, setContent] = useState(initialData?.content || '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Title is required')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            await onSubmit({ title: title.trim(), content: content.trim() })
        } catch (err) {
            setError(err.message || 'Failed to save note')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">
                    {initialData ? 'Edit Note' : 'Create New Note'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title..."
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            className="form-textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note content here..."
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (initialData ? 'Update' : 'Create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteForm
