import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

// คอมโพเนนต์สำหรับหน้าเข้าสู่ระบบ
export default function Login() {
  // สถานะสำหรับเก็บข้อมูลอีเมล
  const [email, setEmail] = useState("");
  // สถานะสำหรับเก็บข้อมูลรหัสผ่าน
  const [password, setPassword] = useState("");
  // สถานะสำหรับเก็บข้อความแจ้งเตือนข้อผิดพลาด
  const [error, setError] = useState("");

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (นำทาง)
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้กดปุ่มเข้าสู่ระบบ
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ดึง users จาก localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // หา user ที่ตรง
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      // เก็บสถานะ login
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));

      // ไปหน้า home
      navigate("/");
    } else {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* ส่วนหัวของรูปแบบฟอร์มเข้าสู่ระบบ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-600">ยินดีต้อนรับกลับสู่ JobPortal</p>
        </div>

        {/* กล่องแบบฟอร์มให้กรอกอีเมลและรหัสผ่าน */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              อีเมล
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              รหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* ตรวจสอบและแสดงข้อความสีแดงเมื่อป้อนรหัสผิด */}
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center border border-red-200">
              {error}
            </div>
          )}

          {/* ตัวเลือกจดจำเข้าสู่ระบบอัตโนมัติและลืมรหัสผ่าน */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">จดจำฉันไว้</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* ลิงก์นำทางไปยังหน้าสมัครสมาชิกสำหรับผู้ไม่มีบัญชี */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ยังไม่มีบัญชี?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
