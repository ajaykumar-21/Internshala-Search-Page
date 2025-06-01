import { useState } from "react";
import { X, Filter } from "lucide-react";

function Filters({ filters, setFilters }) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Desktop filters sidebar */}
      <div className="hidden md:block p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <label className="block mb-1">Profile</label>
          <input
            name="profile"
            placeholder="e.g. Marketing"
            value={filters.profile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Location</label>
          <input
            name="location"
            placeholder="e.g. Delhi"
            value={filters.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Duration</label>
          <input
            name="duration"
            placeholder="e.g. 1,2.."
            value={filters.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Mobile filters button */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          className="p-2 border rounded flex items-center gap-2"
          onClick={() => setShowMobileFilters(true)}
          aria-label="Open filters"
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile filters modal */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
        >
          <div className="bg-white w-11/12 max-w-sm p-4 rounded shadow-lg relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 p-1"
              onClick={() => setShowMobileFilters(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>

            <h2 id="filter-modal-title" className="text-lg font-semibold mb-4">
              Filters
            </h2>

            {/* Filter inputs */}
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

            {/* Apply button closes modal */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;
