import { useState, useEffect } from "react";
import { Bookmark as BookmarkIcon, Trash2, ExternalLink } from "lucide-react";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

// คอมโพเนนต์สำหรับแสดงรายการงานที่ผู้ใช้บุ๊กมาร์ก (บันทึก) ไว้
export default function Bookmark() {
  // ดึงข้อมูลผู้ใช้ปัจจุบันที่ระบบทำการล็อกอินไว้จาก localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // สร้าง Key เฉพาะสำหรับผู้ใช้งานแต่ละคน เพื่อใช้เก็บตำแหน่งงานที่บุ๊กมาร์กไว้
  const userKey = currentUser ? `bookmarkedJobs_${currentUser.email}` : null;

  // State สำหรับเก็บรายการข้อมูลงานทั้งหมดที่ถูกผู้ใช้บันทึก
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    if (!userKey) {
      setBookmarkedJobs([]);
      return;
    }

    // ฟังก์ชันสำหรับโหลดข้อมูลงานที่บันทึกไว้จาก localStorage
    const loadBookmarks = () => {
      const data = JSON.parse(localStorage.getItem(userKey)) || [];
      setBookmarkedJobs(data);
    };

    loadBookmarks();
    window.addEventListener("storage", loadBookmarks);
    return () => window.removeEventListener("storage", loadBookmarks);
  }, [userKey]);

  // ฟังก์ชันสำหรับลบงานที่ถูกบันทึกไว้ออกไปทีละ 1 รายการ
  const handleRemoveBookmark = (jobId) => {
    if (!userKey) return;
    // กรองข้อมูลงานตัวที่ไม่ต้องการลบเพื่อสร้าง array ใหม่
    const updated = bookmarkedJobs.filter((job) => job.id !== jobId);
    // ทำการอัปเดต state ตัวใหม่
    setBookmarkedJobs(updated);
    // เขียนข้อมูลชุดใหม่ทับใน localStorage
    localStorage.setItem(userKey, JSON.stringify(updated));
    // ส่งอีเวนต์ storage แจ้งเตือนเพื่อให้ component เช่น Navbar อัปเดตยอดคงเหลือ
    window.dispatchEvent(new Event("storage"));
  };

  // ฟังก์ชันสำหรับลบตำแหน่งงานที่บันทึกไว้ทิ้งทั้งหมดในครั้งเดียว
  const handleClearAll = () => {
    if (!userKey) return;
    // เคลียร์ state ให้ว่างเปล่า
    setBookmarkedJobs([]);
    // ลบ Key ที่ผูกกับผู้ใช้นี้ออกจาก localStorage
    localStorage.removeItem(userKey);
    // ส่งอีเวนต์ storage เพื่อสั่งให้อัปเดต UI ทันที
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ส่วนหัวของหน้าและปุ่มลบทั้งหมด */}
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

        {/* ส่วนแสดงรายการงานที่บันทึกไว้ */}
        {bookmarkedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedJobs.map((job) => (
              <div key={job.id} className="relative group">
                <JobCard
                  job={job}
                  isBookmarkPage={true}
                  onDelete={handleRemoveBookmark}
                />

                {/* วันที่บันทึก */}
                {job.savedAt && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
                    <p className="text-xs text-gray-600">
                      บันทึกเมื่อ {job.savedAt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // กรณีที่ไม่มีข้อมูลงานบันทึกไว้ (สถานะว่างเปล่า)
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
