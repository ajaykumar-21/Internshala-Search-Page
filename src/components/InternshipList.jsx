import InternshipCard from "./InternshipCard";

function InternshipList({ internships }) {
  return (
    <div className="w-full p-4 grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
      {internships.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No internships found.
        </p>
      ) : (
        internships.map((item) => (
          <InternshipCard key={item.id} internship={item} />
        ))
      )}
    </div>
  );
}

export default InternshipList;
