import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // ดึง users เดิมจาก localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // เช็ค email ซ้ำ
    const emailExists = users.find((u) => u.email === formData.email);
    if (emailExists) {
      setError("อีเมลนี้ถูกใช้งานแล้ว");
      return;
    }

    // สร้าง user ใหม่ (ไม่ต้องเก็บ confirmPassword)
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    // เพิ่ม user ใหม่
    users.push(newUser);

    // บันทึกลง localStorage
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.dispatchEvent(new Event("storage"));

    // ไปหน้า login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h1>
          <p className="text-gray-600">
            สร้างบัญชีเพื่อเริ่มค้นหางานที่ใช่สำหรับคุณ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ชื่อ-นามสกุล
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="ชื่อ-นามสกุล"
                required
              />
            </div>
          </div>

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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              เบอร์โทรศัพท์
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="08X-XXX-XXXX"
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ยืนยันรหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center border border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-start">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label className="ml-2 text-sm text-gray-600">
              ฉันยอมรับ{" "}
              <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                ข้อกำหนดและเงื่อนไข
              </Link>{" "}
              และ{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                นโยบายความเป็นส่วนตัว
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            สมัครสมาชิก
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
