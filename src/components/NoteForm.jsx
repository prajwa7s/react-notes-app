import { useEffect, useState } from 'react'
import ColorPicker from './ColorPicker'

function NoteForm({ onSave, onCancel, editingNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setColor(editingNote.color)
      setTags(editingNote.tags.join(', '))
    } else {
      setTitle('')
      setContent('')
      setColor('#ffffff')
      setTags('')
    }

    setError('')
  }, [editingNote])

  function handleSubmit(event) {
    event.preventDefault()

    if (!content.trim()) {
      setError('Please enter some note content.')
      return
    }

    if (title.length > 100) {
      setError('Title cannot exceed 100 characters.')
      return
    }

    if (content.length > 5000) {
      setError('Content cannot exceed 5000 characters.')
      return
    }

    const tagList = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (tagList.some((tag) => tag.length > 30)) {
      setError('Each tag must be 30 characters or fewer.')
      return
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      color,
      tags: [...new Set(tagList)],
    })

    setTitle('')
    setContent('')
    setTags('')
    setColor('#ffffff')
    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title (optional)"
        maxLength={100}
        className="w-full mb-3 text-xl font-semibold outline-none"
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note..."
        maxLength={5000}
        rows={5}
        className="w-full resize-y outline-none text-gray-700"
      />

      <div className="text-xs text-gray-400 mb-4">
        Title: {title.length}/100 · Content: {content.length}/5000
      </div>

      <input
        type="text"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
        placeholder="Tags (separate with commas)"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="mb-5">
        <p className="text-sm font-medium mb-3">
          Note colour
        </p>

        <ColorPicker
          selectedColor={color}
          onColorChange={setColor}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-3">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          {editingNote ? 'Update Note' : 'Save Note'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default NoteForm