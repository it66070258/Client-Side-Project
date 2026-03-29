import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  Home,
  Bookmark,
  User,
  UserPlus,
  LogIn,
  LogOut,
} from "lucide-react";

// คอมโพเนนต์แถบเมนูนำทางด้านบน (Navbar)
export default function Navbar() {
  // สถานะสำหรับเก็บข้อมูลผู้ใช้งานที่ล็อกอินอยู่
  const [user, setUser] = useState(null);
  // สถานะสำหรับเปิด/ปิดเมนู Dropdown โปรไฟล์
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // ฟังก์ชันสำหรับโหลดและตรวจสอบข้อมูลผู้ใช้อยู่เสมอ
  useEffect(() => {
    const loadUser = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(currentUser);
    };

    loadUser();

    // ดักจับการเปลี่ยนแปลงสถานะใน localStorage เพื่อให้ Navbar อัปเดตทันที
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // ฟังก์ชันจัดการการออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);

    // อัปเดตการทำงานผ่าน Event Storage เพื่อให้รีเฟรชสถานะได้ทั่วแอพฯ
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  // ฟังก์ชันเช็คว่าหน้าปัจจุบันเป็น Active หรือไม่ เพื่อปรับสีปุ่มกระตุ้น
  const isActive = (path) => location.pathname === path;

  return (
    // แถบนำทางด้านบนสุด Fix ไว้ด้านบน
    <nav className="border-b bg-white top-0 z-50 sticky px-4 md:px-8 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center space-x-2 text-blue-600 font-bold text-2xl"
      >
        <Briefcase className="w-8 h-8" />
        <span>JobFinder</span>
      </Link>

      {/* เมนูนำทางตรงกลาง (แสดงเฉพาะจอขนาดกลางขึ้นไป) */}
      <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <Link
          to="/"
          className={`flex items-center space-x-2 ${
            isActive("/")
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Home className="w-5 h-5" /> <span>หน้าแรก</span>
        </Link>
        <Link
          to="/bookmark"
          className={`flex items-center space-x-2 ${
            isActive("/bookmark")
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Bookmark className="w-5 h-5" /> <span>งานที่บันทึก</span>
        </Link>
      </div>

      {/* โซนขวาของ Navbar: ปุ่มสมาชิก / โปรไฟล์ผู้ใช้งาน */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <span className="hidden md:inline">{user.fullName}</span>
              <User className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>โปรไฟล์</span>
                </Link>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center font-medium text-gray-700 hover:text-blue-600 space-x-2 px-2"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden md:inline">เข้าสู่ระบบ</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center bg-[#0a192f] text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 space-x-2 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span className="hidden md:inline">สมัครสมาชิก</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
