import { memo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Briefcase, Clock } from "lucide-react";

function JobCard({ job }) {
  if (!job) return null;

  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="bg-white border border-gray-100 hover:border-blue-500 transition-colors p-6 rounded-2xl shadow-sm relative flex flex-col h-full group">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Implement bookmark functionality
          }}
          className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition-colors z-10"
        >
          <Bookmark className="w-5 h-5" />
        </button>

        <div className="text-4xl mb-4">{job.icon || "🏢"}</div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{job.company}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
            {job.type}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            {job.postedAt}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 flex-grow content-start pt-2">
          {job.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-blue-600 font-bold border-t border-gray-100 pt-4">
          {job.salary}
        </div>
      </div>
    </Link>
  );
}

export default memo(JobCard);
