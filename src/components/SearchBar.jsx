function SearchBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search your notes..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
      />

      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  )
}

export default SearchBar