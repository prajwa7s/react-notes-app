import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import NoteCard from './components/NoteCard'
import NoteForm from './components/NoteForm'
import SearchBar from './components/SearchBar'

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('my-notes')
      return savedNotes ? JSON.parse(savedNotes) : []
    } catch {
      return []
    }
  })

  const [activeView, setActiveView] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [showForm, setShowForm] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    localStorage.setItem('my-notes', JSON.stringify(notes))
  }, [notes])

  function handleSave(noteData) {
    const duplicate = notes.some((note) => {
      if (note.deleted) return false

      if (editingNote && note.id === editingNote.id) {
        return false
      }

      return (
        note.title.toLowerCase() === noteData.title.toLowerCase() &&
        note.content.toLowerCase() === noteData.content.toLowerCase()
      )
    })

    if (duplicate) {
      alert('A note with the same title and content already exists.')
      return
    }

    if (editingNote) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...noteData,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      )
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        ...noteData,
        pinned: false,
        archived: false,
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setNotes((currentNotes) => [newNote, ...currentNotes])
    }

    setShowForm(false)
    setEditingNote(null)
  }

  function handleEdit(note) {
    setEditingNote(note)
    setShowForm(true)
  }

  function handleDelete(id) {
    if (!window.confirm('Move this note to Trash?')) return

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, deleted: true, pinned: false }
          : note
      )
    )
  }

  function handlePermanentDelete(id) {
    if (!window.confirm('Permanently delete this note?')) return

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    )
  }

  function handleRestore(id) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, deleted: false }
          : note
      )
    )
  }

  function handlePin(id) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    )
  }

  function handleArchive(id) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived, pinned: false }
          : note
      )
    )
  }

  let filteredNotes = notes.filter((note) => {
    if (activeView === 'all') {
      return !note.archived && !note.deleted
    }

    if (activeView === 'pinned') {
      return note.pinned && !note.archived && !note.deleted
    }

    if (activeView === 'archive') {
      return note.archived && !note.deleted
    }

    if (activeView === 'trash') {
      return note.deleted
    }

    return false
  })

  filteredNotes = filteredNotes.filter((note) => {
    const searchText = search.toLowerCase()

    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchText))
    )
  })

  filteredNotes.sort((a, b) => {
    if (sort === 'title') {
      return a.title.localeCompare(b.title)
    }

    if (sort === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }

    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const pinnedNotes = filteredNotes.filter((note) => note.pinned)
  const otherNotes = filteredNotes.filter((note) => !note.pinned)

  function openCreateForm() {
    setEditingNote(null)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingNote(null)
  }

  const viewTitles = {
    all: 'All Notes',
    pinned: 'Pinned Notes',
    archive: 'Archived Notes',
    trash: 'Trash',
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onCreate={openCreateForm} />

      <div className="flex flex-col md:flex-row">
        <Sidebar
          activeView={activeView}
          onChange={setActiveView}
          notes={notes}
        />

        <main className="flex-1 min-w-0 p-5 md:p-8">
          <div className="flex flex-col gap-5 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {viewTitles[activeView]}
            </h2>

            <SearchBar
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
            />
          </div>

          {showForm && (
            <div className="mb-8 max-w-2xl">
              <NoteForm
                onSave={handleSave}
                onCancel={closeForm}
                editingNote={editingNote}
              />
            </div>
          )}

          {filteredNotes.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-600">
                {search
                  ? 'No matching notes found'
                  : 'Nothing here yet'}
              </h3>

              <p className="text-gray-400 mt-2">
                {activeView === 'all'
                  ? 'Create your first note to get started.'
                  : 'Your notes will appear here.'}
              </p>

              {activeView === 'all' && !showForm && (
                <button
                  onClick={openCreateForm}
                  className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                  Create your first note
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {pinnedNotes.length > 0 && activeView === 'all' && (
                <section>
                  <h3 className="text-sm font-semibold text-gray-500 mb-4">
                    PINNED
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {pinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onPin={handlePin}
                        onArchive={handleArchive}
                        onRestore={handleRestore}
                        onPermanentDelete={handlePermanentDelete}
                      />
                    ))}
                  </div>
                </section>
              )}

              {otherNotes.length > 0 && (
                <section>
                  {pinnedNotes.length > 0 && activeView === 'all' && (
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                      OTHERS
                    </h3>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {otherNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onPin={handlePin}
                        onArchive={handleArchive}
                        onRestore={handleRestore}
                        onPermanentDelete={handlePermanentDelete}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App