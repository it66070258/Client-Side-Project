import { useState, useEffect } from "react";
import { Bookmark as BookmarkIcon, Trash2, ExternalLink } from "lucide-react";
import JobCard from "../components/JobCard";
import { Link, useNavigate } from "react-router-dom";

export default function Bookmark() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = currentUser ? `bookmarkedJobs_${currentUser.email}` : null;

  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    if (!userKey) {
      setBookmarkedJobs([]);
      return;
    }
    const loadBookmarks = () => {
      const data = JSON.parse(localStorage.getItem(userKey)) || [];
      setBookmarkedJobs(data);
    };

    loadBookmarks();
    window.addEventListener("storage", loadBookmarks);
    return () => window.removeEventListener("storage", loadBookmarks);
  }, [userKey]);

  const handleRemoveBookmark = (jobId) => {
    if (!userKey) return;
    const updated = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleClearAll = () => {
    if (!userKey) return;
    setBookmarkedJobs([]);
    localStorage.removeItem(userKey);
    window.dispatchEvent(new Event("storage"));
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

        {/* Job List */}
        {bookmarkedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedJobs.map((job) => (
              <div key={job.id} className="relative group">
                <JobCard job={job} />

                {/* Hover actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRemoveBookmark(job.id)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition"
                    title="ลบออกจากรายการ"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>

                  <Link
                    to={`/job/${job.id}`}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition"
                    title="ดูรายละเอียด"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </Link>
                </div>

                {/* วันที่บันทึก */}
                {job.savedAt && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs text-gray-600">
                      บันทึกเมื่อ {job.savedAt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Empty State
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

            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <span>ค้นหางาน</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
