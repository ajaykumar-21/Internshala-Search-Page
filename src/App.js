import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";

function App() {
  const [internships, setInternships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    duration: "",
  });

  console.log(filters);

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

  // console.log(internships);

  return (
    <div className="p-4">
      <SearchBar />
      <div className="flex mt-4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

export default App;
