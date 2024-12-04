import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi password
    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/user/regist", {
        name: form.fullName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
  
      // Berikan feedback jika berhasil
      alert(response.data.msg);

      navigate("/#");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Pesan error dari backend
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Daftar Akun KambingFresh
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Daftarkan akun anda agar Anda dapat mengakses akun pribadi Anda.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Kata Sandi"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Kata Sandi"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Daftar
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Sudah mempunyai akun?{" "}
            <a href="/#" className="text-blue-500 font-semibold">
              Login
            </a>
          </p>
          <p className="mt-4 text-gray-600 text-sm">Atau daftar menggunakan</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="bg-blue-600 text-white p-3 rounded-full">
              <i className="fab fa-facebook-f"></i> {/* Ikon Facebook */}
            </button>
            <button className="bg-red-500 text-white p-3 rounded-full">
              <i className="fab fa-google"></i> {/* Ikon Google */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
