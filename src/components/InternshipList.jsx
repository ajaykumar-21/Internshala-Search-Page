import InternshipCard from "./InternshipCard";

function InternshipList({ internships }) {
  return (
    <div className="w-3/4 p-4 grid gap-4">
      {internships.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        internships.map((item) => (
          <InternshipCard key={item.id} internship={item} />
        ))
      )}
    </div>
  );
}

export default InternshipList;
