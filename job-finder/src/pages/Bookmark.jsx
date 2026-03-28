import { useState } from "react";
import { Bookmark as BookmarkIcon, Trash2, ExternalLink } from "lucide-react";
import JobCard from "../components/JobCard";

export default function Bookmark() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Innovation Co.",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "2 วันที่แล้ว",
      salary: "60,000 - 80,000 บาท",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      icon: "🏢",
      savedAt: "3 วันที่แล้ว",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio Ltd.",
      location: "เชียงใหม่",
      type: "Full-time",
      postedAt: "1 สัปดาห์ที่แล้ว",
      salary: "40,000 - 55,000 บาท",
      tags: ["Figma", "UI Design", "User Research"],
      icon: "🎨",
      savedAt: "5 วันที่แล้ว",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Digital Solutions Inc.",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "3 วันที่แล้ว",
      salary: "50,000 - 70,000 บาท",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      icon: "💻",
      savedAt: "1 สัปดาห์ที่แล้ว",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Startup Ventures",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      postedAt: "2 สัปดาห์ที่แล้ว",
      salary: "70,000 - 90,000 บาท",
      tags: ["Product Strategy", "Agile", "Jira"],
      icon: "🚀",
      savedAt: "2 สัปดาห์ที่แล้ว",
    },
  ]);

  const handleRemoveBookmark = (jobId) => {
    setBookmarkedJobs(bookmarkedJobs.filter((job) => job.id !== jobId));
  };

  const handleClearAll = () => {
    if (window.confirm("คุณต้องการลบงานที่บันทึกไว้ทั้งหมดใช่หรือไม่?")) {
      setBookmarkedJobs([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookmarkIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                งานที่บันทึกไว้
              </h1>
              <p className="text-gray-600">
                คุณมีงานที่บันทึกไว้ {bookmarkedJobs.length} ตำแหน่ง
              </p>
            </div>
          </div>
          {bookmarkedJobs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>ลบทั้งหมด</span>
            </button>
          )}
        </div>

        {/* Bookmarked Jobs */}
        {bookmarkedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedJobs.map((job) => (
              <div key={job.id} className="relative group">
                <JobCard job={job} />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRemoveBookmark(job.id)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition"
                    title="ลบออกจากรายการ"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <button
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition"
                    title="ดูรายละเอียด"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <p className="text-xs text-gray-600">
                    บันทึกเมื่อ {job.savedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <BookmarkIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ยังไม่มีงานที่บันทึกไว้
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              เริ่มบันทึกงานที่คุณสนใจเพื่อให้ง่ายต่อการกลับมาดูภายหลัง
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <span>ค้นหางาน</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Tips Section */}
        {bookmarkedJobs.length > 0 && (
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              💡 เคล็ดลับ
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  บันทึกงานที่คุณสนใจไว้เพื่อง่ายต่อการเปรียบเทียบและตัดสินใจ
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  ตรวจสอบงานที่บันทึกไว้เป็นประจำ เพราะบางตำแหน่งอาจปิดรับสมัคร
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  กดปุ่มบันทึกที่มุมบนขวาของการ์ดงานเพื่อเพิ่มในรายการ
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
