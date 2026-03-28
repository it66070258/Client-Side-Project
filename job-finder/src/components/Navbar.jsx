import { Link } from "react-router-dom";
import { Briefcase, Home, Bookmark, User, UserPlus, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white top-0 z-50 sticky px-4 md:px-8 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center space-x-2 text-blue-600 font-bold text-2xl"
      >
        <Briefcase className="w-8 h-8" />
        <span>JobPortal</span>
      </Link>

      <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <Link to="/" className="flex items-center text-blue-600 space-x-2">
          <Home className="w-5 h-5" /> <span>หน้าแรก</span>
        </Link>
        <Link
          to="/bookmark"
          className="flex items-center hover:text-blue-600 space-x-2"
        >
          <Bookmark className="w-5 h-5" /> <span>งานที่บันทึก</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center hover:text-blue-600 space-x-2"
        >
          <User className="w-5 h-5" /> <span>โปรไฟล์</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="flex items-center font-medium text-gray-700 hover:text-blue-600 space-x-2 px-2"
        >
          <LogIn className="w-5 h-5 md:hidden" />
          <span className="hidden md:inline">เข้าสู่ระบบ</span>
        </Link>
        <Link
          to="/register"
          className="flex items-center bg-[#0a192f] text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 space-x-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />{" "}
          <span className="hidden md:inline">สมัครสมาชิก</span>
        </Link>
      </div>
    </nav>
  );
}
