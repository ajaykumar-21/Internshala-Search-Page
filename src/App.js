import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch("https://internshala.com/hiring/search")
      .then((res) => res.json())
      .then((data) => {
        const internshipsArray = data.internship_ids.map(
          (id) => data.internships_meta[id]
        );
        setInternships(internshipsArray);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(internships);
  return (
    <div className="p-4">
      <SearchBar />
    </div>
  );
}

export default App;
