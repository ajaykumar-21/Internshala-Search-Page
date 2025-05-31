import { useEffect, useState } from "react";
import "./App.css";
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
      <div className="flex mt-4">
        <Filters filters={filters} setFilters={setFilters} />
        <InternshipList internships={filtered} />
      </div>
    </div>
  );
}

export default App;
