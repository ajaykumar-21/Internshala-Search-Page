function InternshipCard({ internship }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold">
        {internship.title || internship.profile_name}
      </h2>
      {/* <p className="text-gray-600">{internship.company_name}</p> */}
      <p className="text-gray-500">
        {internship.location_names && internship.location_names.join(", ")}
      </p>
      <p className="text-green-600 font-medium">
        {internship.stipend?.salary || "Not specified"}
      </p>
      <p className="text-sm text-gray-700">{internship.duration}</p>
      <p className="text-xs text-gray-400">
        Posted: {internship.posted_by_label}
      </p>
    </div>
  );
}

export default InternshipCard;
