import { memo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Briefcase, Clock, Trash2 } from "lucide-react";

// คอมโพเนนต์สำหรับแสดงการ์ดรายละเอียดของตำแหน่งงานในรูปแบบของการ์ด
function JobCard({
  job, // ข้อมูลรายละเอียดงานที่ต้องการให้แสดงผลบนการ์ด
  onToggleBookmark, // ฟังก์ชันที่ทำงานเมื่อผู้ใช้กดสลับสถานะปุ่มบันทึก/บุ๊กมาร์ก (ในหน้า Home)
  isBookmarked, // ค่าบูลีนที่ให้บอกว่างานถูกบันทึกเอาไว้แล้วหรือยัง
  isBookmarkPage, // ค่าบูลีนที่ระบุว่ากำลังแสดงผลอยู่ในหน้า Bookmark หรือไม่ เพื่องดการแสดงปุ่มบันทึก
  onDelete, // ฟังก์ชันสำหรับลบตัวการ์ดงานออก (ใช้เฉพาะหน้า Bookmark)
}) {
  // ตรวจสอบข้อมูลก่อนนำไปแสดง หากตรวจสอบแล้วว่างเปล่า ให้ส่งค่ากลับเป็น null โดยไม่ทำอะไรต่อ
  if (!job) return null;

  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="bg-white border border-gray-100 hover:border-blue-500 transition-colors p-6 rounded-2xl shadow-sm relative flex flex-col h-full group">
        {!isBookmarkPage && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark && onToggleBookmark(job);
            }}
            className={`absolute top-6 right-6 transition-colors z-10 ${
              isBookmarked
                ? "text-blue-600"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        )}

        {isBookmarkPage && onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(job.id);
            }}
            className="absolute top-6 right-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors z-10"
            title="ลบออกจากรายการ"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}

        {/* แสดงไอคอนประกอบงาน หรือไอคอนบริษัทเริ่มต้น */}
        <div className="text-4xl mb-4">{job.icon || "🏢"}</div>

        {/* ชื่อตำแหน่งงานและชื่อบริษัท */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{job.company}</p>

        {/* ข้อมูลสรุป: สถานที่ทำงาน, รูปแบบงาน, และเวลาที่ประกาศ */}
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

        {/* แท็กทักษะหรือคีย์เวิร์ดที่เกี่ยวข้องกับงาน */}
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

        {/* รายได้หรือช่วงเงินเดือน */}
        <div className="text-blue-600 font-bold border-t border-gray-100 pt-4">
          {job.salary}
        </div>
      </div>
    </Link>
  );
}

export default memo(JobCard);
