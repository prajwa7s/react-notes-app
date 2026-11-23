function NoteCard({
  note,
  onEdit,
  onDelete,
  onPin,
  onArchive,
  onRestore,
  onPermanentDelete,
}) {
  return (
    <article
      className="rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
      style={{ backgroundColor: note.color }}
    >
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-lg break-words">
          {note.title || 'Untitled'}
        </h3>

        {!note.deleted && (
          <button
            onClick={() => onPin(note.id)}
            title={note.pinned ? 'Unpin note' : 'Pin note'}
          >
            {note.pinned ? '📌' : '📍'}
          </button>
        )}
      </div>

      <p className="text-gray-700 whitespace-pre-wrap break-words my-4">
        {note.content}
      </p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/70 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 mb-4">
        Updated: {new Date(note.updatedAt).toLocaleString()}
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {note.deleted ? (
          <>
            <button onClick={() => onRestore(note.id)}>
              Restore
            </button>

            <button
              onClick={() => onPermanentDelete(note.id)}
              className="text-red-600"
            >
              Delete forever
            </button>
          </>
        ) : (
          <>
            {!note.archived && (
              <button onClick={() => onEdit(note)}>
                Edit
              </button>
            )}

            <button onClick={() => onArchive(note.id)}>
              {note.archived ? 'Unarchive' : 'Archive'}
            </button>

            <button
              onClick={() => onDelete(note.id)}
              className="text-red-600"
            >
              Trash
            </button>
          </>
        )}
      </div>
    </article>
  )
}

export default NoteCard