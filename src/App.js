import { useEffect, useState } from "react";
import "./App.css";
import { Menu } from "lucide-react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import InternshipList from "./components/InternshipList";

function App() {
  const [internships, setInternships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    duration: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // console.log(filters);

  useEffect(() => {
    fetch("https://internshala.com/hiring/search")
      .then((res) => res.json())
      .then((data) => {
        const internshipsArray = data.internship_ids.map(
          (id) => data.internships_meta[id]
        );
        setInternships(internshipsArray);
        setFiltered(internshipsArray);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(internships);
  useEffect(() => {
    let updated = internships;

    if (filters.profile) {
      updated = updated.filter(
        (item) =>
          item.profile_name &&
          item.profile_name
            .toLowerCase()
            .includes(filters.profile.toLowerCase())
      );
    }

    if (filters.location) {
      updated = updated.filter(
        (item) =>
          item.location_names &&
          item.location_names.some((loc) =>
            loc.toLowerCase().includes(filters.location.toLowerCase())
          )
      );
    }

    if (filters.duration) {
      updated = updated.filter(
        (item) =>
          item.duration &&
          item.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    setFiltered(updated);
  }, [filters, internships]);

  return (
    <div className="p-4">
      <SearchBar />

      {/* Mobile: Filter toggle button */}
      <div className="flex justify-between items-center mt-4 sm:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400"
        >
          <Menu className="mr-2" size={18} />
          Filters
        </button>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row">
        {/* Sidebar filters on larger screens */}
        <div className="hidden sm:block sm:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Internship list */}
        <div className="w-full sm:w-3/4">
          <InternshipList internships={filtered} />
        </div>
      </div>

      {/* Mobile filter modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-11/12 max-w-sm p-4 rounded shadow-lg overflow-y-auto max-h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {/* The Filters component will update immediately on change */}
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
