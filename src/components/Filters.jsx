function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      <div className="mb-4">
        <label className="block mb-1">Profile</label>
        <input
          name="profile"
          value={filters.profile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Location</label>
        <input
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Duration</label>
        <input
          name="duration"
          value={filters.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}

export default Filters;
