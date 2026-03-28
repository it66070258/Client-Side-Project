import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(jobQuery);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 md:p-3 rounded-xl shadow-lg flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto space-y-2 md:space-y-0"
    >
      <div className="flex-1 flex items-center px-4 md:border-r border-gray-200 w-full relative">
        <Search className="text-gray-400 w-5 h-5 absolute left-4" />
        <input
          type="text"
          placeholder="ชื่อตำแหน่งงาน, บริษัท, ทักษะ..."
          value={jobQuery}
          onChange={(e) => setJobQuery(e.target.value)}
          className="w-full pl-8 py-2 md:py-3 outline-none text-gray-900 bg-transparent"
        />
      </div>
      <div className="flex-1 flex items-center px-4 w-full relative">
        <MapPin className="text-gray-400 w-5 h-5 absolute left-4" />
        <input
          type="text"
          placeholder="สถานที่"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          className="w-full pl-8 py-2 md:py-3 outline-none text-gray-900 bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-full px-8 py-3 w-full md:w-auto font-bold transition-colors shadow-md hover:shadow-lg"
      >
        ค้นหา
      </button>
    </form>
  );
}
