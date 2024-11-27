import { useState, useEffect } from "react";
import axios from "axios"; // Import axios untuk mengirimkan HTTP request

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Menangani error

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirim request login ke backend
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      }, {
        withCredentials: true, // Menyertakan cookie (refresh token)
      });

      // Ambil access token dari response
      const { accessToken } = response.data;

      // Simpan access token ke localStorage untuk penggunaan selanjutnya
      localStorage.setItem("accessToken", accessToken);

      // Redirect user ke halaman utama (misalnya halaman dashboard)
      window.location.href = "/utama"; // Ganti dengan route yang sesuai
    } catch (error) {
      // Jika ada error (misalnya password salah atau email tidak ditemukan)
      setError(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };
  const [images, setImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const importedImages = import.meta.glob('../../assets/imgs/*.{png,jpg,jpeg,svg}');
      const imageEntries = await Promise.all(
        Object.entries(importedImages).map(async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.replace('../../assets/imgs/', ''); // Sesuaikan nama file
          return [fileName, module.default];
        })
      );
      setImages(Object.fromEntries(imageEntries));
    };

    loadImages();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-md flex max-w-4xl w-full">
        
        {/* Bagian Kiri dengan Gambar */}
        <div className="w-1/2">
          <img
            src={images["5.jpg"]}
            alt="Image"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        
        {/* Bagian Kanan dengan Form Login */}
        <div className="w-1/2 p-8 bg-white rounded-r-lg justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ml-12">Masuk ke KambingFresh</h2>
          <p className="text-gray-600 mb-6 ml-10">Silahkan Masukkan Email dan Kata Sandi</p>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="KambingFresh@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Kata Sandi</label>
              <input
                type="password"
                placeholder="Kata Sandi"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Ingat Saya
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition duration-300"
            >
              Masuk
            </button>
          </form>

          <p className="text-gray-600 mt-4 text-center">
            Belum mempunyai akun? <a href="/singup" className="text-blue-600 hover:underline">Daftar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
