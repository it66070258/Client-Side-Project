import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-full shadow-lg flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto space-y-2 md:space-y-0">
      <div className="flex-1 flex items-center px-4 md:border-r border-gray-200 w-full relative">
        <Search className="text-gray-400 w-5 h-5 absolute left-4" />
        <input
          type="text"
          placeholder="เธเธทเนเธญเธ•เธณเนเธซเธเนเธเธเธฒเธ, เธเธฃเธดเธฉเธฑเธ—..."
          className="w-full pl-8 py-2 md:py-3 outline-none text-gray-900 bg-transparent"
        />
      </div>
      <div className="flex-1 flex items-center px-4 w-full relative">
        <MapPin className="text-gray-400 w-5 h-5 absolute left-4" />
        <input
          type="text"
          placeholder="เธชเธ–เธฒเธเธ—เธตเน"
          className="w-full pl-8 py-2 md:py-3 outline-none text-gray-900 bg-transparent"
        />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-full px-8 py-3 w-full md:w-auto font-medium transition-colors">
        เธเนเธเธซเธฒ
      </button>
    </div>
  );
}
