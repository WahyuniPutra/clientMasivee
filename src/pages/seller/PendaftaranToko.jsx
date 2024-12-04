import axios from "axios";
import  { useState } from "react";
console.log(localStorage.getItem("token"));

function PendaftaranToko() {
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
  
      // Set default Authorization header untuk semua request berikutnya
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      // Lakukan request untuk mendaftarkan toko
      const response = await axios.post(
        "http://localhost:5000/api/seller/register", // URL endpoint
        formData // Data yang akan dikirimkan
      );
  
      alert(response.data.msg); // Tampilkan pesan sukses
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Gagal mendaftarkan toko, cek kembali data Anda."); // Tampilkan pesan error
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Ayo Daftarkan Tokomu Sekarang!
        </h2>
        <h3 className="text-xl font-semibold text-center mb-6">
          Masukkan Informasi Toko
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Masukkan Nama Lengkap"
            className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            placeholder="Masukkan Nama Toko"
            className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Masukkan Alamat Lengkap Toko"
            className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan Email"
            className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Masukkan No. Handphone"
            className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <div className="text-sm text-gray-600">
            <input type="checkbox" className="mr-2" required />
            Dengan ini, Anda telah menyetujui{" "}
            <a href="#" className="text-blue-500 underline">
              Syarat & Ketentuan
            </a>{" "}
            serta{" "}
            <a href="#" className="text-blue-500 underline">
              Kebijakan Privasi
            </a>{" "}
            Pendaftaran Toko.
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
}

export default PendaftaranToko;
