import { Navigate } from "react-router-dom";

// คอมโพเนนต์สำหรับตรวจสอบสิทธิ์การเข้าถึงหน้า (Protected Route)
export default function ProtectedRoute({ children }) {
  // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่จาก localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ถ้าไม่มีผู้ใช้ล็อกอิน ให้เปลี่ยนเส้นทางไปหน้าเข้าสู่ระบบ (login)
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // ถ้ามีสิทธิ์ ให้แสดงผลคอมโพเนนต์ด้านในตามปกติ
  return children;
}
