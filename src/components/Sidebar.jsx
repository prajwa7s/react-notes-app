const menuItems = [
  { id: 'all', label: 'All Notes' },
  { id: 'pinned', label: 'Pinned' },
  { id: 'archive', label: 'Archive' },
  { id: 'trash', label: 'Trash' },
]

function Sidebar({ activeView, onChange, notes }) {
  return (
    <aside className="w-full md:w-56 shrink-0 bg-gray-50 p-5 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-5">
        Menu
      </h2>

      <div className="flex md:flex-col gap-2 overflow-x-auto">
        {menuItems.map((item) => {
          const count = notes.filter((note) => {
            if (item.id === 'all') {
              return !note.archived && !note.deleted
            }

            if (item.id === 'pinned') {
              return note.pinned && !note.archived && !note.deleted
            }

            if (item.id === 'archive') {
              return note.archived && !note.deleted
            }

            return note.deleted
          }).length

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg text-left whitespace-nowrap transition ${
                activeView === item.id
                  ? 'bg-green-100 text-green-800 font-semibold'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs">{count}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar