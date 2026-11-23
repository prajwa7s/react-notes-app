function Navbar({ onCreate }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <h1 className="text-2xl font-bold text-green-700">
        My Notes
      </h1>

      <button
        onClick={onCreate}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        + Create Note
      </button>
    </nav>
  )
}

export default Navbar