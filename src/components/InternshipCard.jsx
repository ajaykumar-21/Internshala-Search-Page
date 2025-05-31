import { MapPin, Clock } from "lucide-react";

function InternshipCard({ internship }) {
  console.log(internship.company_logo);
  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Row 1: Profile Name, Company, Hiring Badge */}
      <div className="flex flex-col mb-2">
        <h3 className="text-lg font-semibold">
          {internship.profile_name || internship.title || "N/A"}
        </h3>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 opacity-50 leading-none">
              {internship.employer_name}
            </span>

            {internship.is_active && (
              <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded-full leading-none">
                Actively Hiring
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Location, Salary, Duration */}
      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
        <div className="flex items-center space-x-1">
          <MapPin size={16} />
          <span>{internship.location_names?.join(", ") || "Location N/A"}</span>
        </div>

        <div className="flex items-center space-x-1">
          <span>
            {internship.salary?.salary ||
              internship.stipend?.salary ||
              "Stipend not disclosed"}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{internship.duration || "Duration N/A"}</span>
        </div>
      </div>

      {/* Row 3: Posted By */}
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <span className="flex items-center bg-gray-100 rounded-xl px-2 py-1">
          <Clock size={14} className="text-gray-500 mr-1" />
          {internship.posted_by_label || "Date N/A"}
        </span>
      </div>
    </div>
  );
}

export default InternshipCard;
