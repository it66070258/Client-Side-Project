import { useState, useEffect } from "react";
import { Search } from "lucide-react";

// คอมโพเนนต์แบบฟอร์มสำหรับการค้นหางาน
export default function SearchBar({ onSearch, searchQuery = "" }) {
  // สถานะช่องกรอกข้อความสำหรับการค้นหางาน
  const [jobQuery, setJobQuery] = useState(searchQuery);

  useEffect(() => {
    setJobQuery(searchQuery);
  }, [searchQuery]);

  // ฟังก์ชันเมื่อผู้ใช้กดยืนยันการค้นหา หรือ กด Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(jobQuery);
    }
  };

  // ฟังก์ชันบันทึกตัวอักษรที่พิมพ์ลงในกล่องข้อความ
  const handleChange = (e) => {
    setJobQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 md:p-3 rounded-xl shadow-lg flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto space-y-2 md:space-y-0"
    >
      {/* ไอคอนและช่อง Input สำหรับพิมพ์ข้อความค้นหา */}
      <div className="flex-1 flex items-center px-4 w-full relative">
        <Search className="text-gray-400 w-5 h-5 absolute left-4" />
        <input
          type="text"
          placeholder="ค้นหาชื่อตำแหน่งงาน, บริษัท, ทักษะ..."
          value={jobQuery}
          onChange={handleChange}
          className="w-full pl-8 py-2 md:py-3 outline-none text-gray-900 bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-full px-8 py-3 w-full md:w-auto font-bold transition-colors shadow-md hover:shadow-lg ml-2"
      >
        ค้นหา
      </button>
    </form>
  );
}
