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
  const [showFilters, setShowFilters] = useState(false); // State to toggle showing the filter modal (for mobile)
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input query

  // console.log(filters);

  // Fetch internships data from the API once when component mounts
  useEffect(() => {
    fetch("https://internshala.com/hiring/search")
      .then((res) => res.json())
      .then((data) => {
        // Convert the fetched object structure into an array of internships
        const internshipsArray = data.internship_ids.map(
          (id) => data.internships_meta[id]
        );
        setInternships(internshipsArray);
        setFiltered(internshipsArray);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(internships);

  // Main filtering logic runs whenever filters, internships, or searchQuery change
  useEffect(() => {
    // Start with the full internships list
    let updated = internships;

    // Apply profile filter if set
    if (filters.profile) {
      updated = updated.filter(
        (item) =>
          item.profile_name &&
          item.profile_name
            .toLowerCase()
            .includes(filters.profile.toLowerCase())
      );
    }

    // Apply location filter if set
    if (filters.location) {
      updated = updated.filter(
        (item) =>
          item.location_names &&
          item.location_names.some((loc) =>
            loc.toLowerCase().includes(filters.location.toLowerCase())
          )
      );
    }

    // Apply duration filter if set
    if (filters.duration) {
      updated = updated.filter(
        (item) =>
          item.duration &&
          item.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    // Apply search query if set (searching both profile and location fields)
    if (searchQuery) {
      updated = updated.filter(
        (item) =>
          (item.profile_name &&
            item.profile_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.location_names &&
            item.location_names.some((loc) =>
              loc.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
    }

    setFiltered(updated);
  }, [filters, internships, searchQuery]);

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed top search and filters bar */}
      <div className="p-4 bg-white shadow z-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
      </div>

      {/* Main content area, scrollable */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar filters on larger screens, fixed on the left */}
        <div className="hidden sm:block sm:w-1/4 bg-white p-4 border-r overflow-y-auto">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Internship list area, scrollable */}
        <div className="w-full sm:w-3/4 overflow-y-auto p-4">
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
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
