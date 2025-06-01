function SearchBar({ searchQuery, setSearchQuery }) {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="e.g. Design, Mumbai, Infosys"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default SearchBar;
