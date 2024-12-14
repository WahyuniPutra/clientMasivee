import { useEffect, useRef, useState } from "react";
import { AiTwotoneShop } from "react-icons/ai";
import { IoIosSearch, IoMdCart, IoMdNotifications } from "react-icons/io";
import api from "../utils/api"; // Pastikan path sesuai

const Navbar = () => {
  const [images, setImages] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasStore, setHasStore] = useState(() => {
    const savedStatus = localStorage.getItem("hasStore");
    return savedStatus === "true";
  });
  const [fullName, setFullName] = useState("Hijau Mandala"); // State untuk nama pengguna
  const [profileImage, setProfileImage] = useState(""); // State untuk avatar pengguna

  const menuRef = useRef(null);

  // Memuat gambar statis
  useEffect(() => {
    const loadImages = async () => {
      const importedImages = import.meta.glob(
        "../assets/imgs/*.{png,jpg,jpeg,svg}"
      );
      const imageEntries = await Promise.all(
        Object.entries(importedImages).map(async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.replace("../assets/imgs/", "");
          return [fileName, module.default];
        })
      );
      setImages(Object.fromEntries(imageEntries));
    };

    loadImages();
  }, []);

  // Fetch status toko dari backend
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get("api/seller/status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHasStore(response.data.hasStore);
        localStorage.setItem("hasStore", response.data.hasStore);
      } catch (error) {
        console.error(
          "Gagal mengambil status toko:",
          error.response?.data || error.message
        );
        setHasStore(false);
        localStorage.removeItem("hasStore");
      }
    };

    fetchStoreStatus();
  }, []);

  // Fetch user dashboard untuk nama dan gambar
  useEffect(() => {
    const fetchUserDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get("/api/dashboard/dapat", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dashboardData = response.data.data;
        setFullName(dashboardData.full_name); // Set nama pengguna
        setProfileImage(dashboardData.avatar); // Set avatar
      } catch (error) {
        console.error(
          "Gagal mengambil data user:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserDashboard();
  }, []);

  // Handle click outside untuk menutup menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 bg-[#1C464F] text-white shadow-md">
        {/* Logo dan Nama Brand */}
        <a href="/utama">
          <div className="flex items-center space-x-2">
            <img src={images["logo.png"]} alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-bold">KambingFresh</span>
          </div>
        </a>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-lg px-4 py-2 bg-gray-200 rounded-full">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Pencarian"
            className="w-full ml-2 bg-transparent outline-none text-gray-600 placeholder-gray-500"
          />
        </div>

        {/* Ikon dan Profil */}
        <div className="flex items-center space-x-4 relative">
          {/* Ikon Toko */}
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AiTwotoneShop className="w-6 h-6" />
          </button>

          <a href="/keranjang">
            <button className="text-gray-300 hover:text-white">
              <IoMdCart className="w-6 h-6" />
            </button>
          </a>
          <button className="text-gray-300 hover:text-white">
            <IoMdNotifications className="w-6 h-6" />
          </button>

          {/* Nama Pengguna */}
          <div className="flex items-center space-x-2">
            <img
              src={
                profileImage
                  ? `http://localhost:5000/${profileImage}`
                  : "https://idnpacific.com/wp-content/uploads/2022/06/Kosong-dan-Simpel.png"
              } // Gunakan default jika avatar kosong
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <a href="/profilebuyyer">
              <span className="text-sm">{fullName}</span>
            </a>
          </div>

          {/* Popup Menu */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-10 left-0 w-48 bg-white shadow-lg rounded-lg p-4 z-50"
              style={{ top: "100%", left: "-20px", zIndex: 50 }}
            >
              {hasStore ? (
                <>
                  <p className="text-center text-gray-700 font-medium">
                    Toko Anda
                  </p>
                  <a href="/home">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-md w-full">
                      Masuk Toko
                    </button>
                  </a>
                </>
              ) : (
                <>
                  <p className="text-center text-gray-700 font-medium">
                    Anda Belum Memiliki Toko
                  </p>
                  <a href="/pendaftarantoko">
                    <button className="bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded-md w-full">
                      Daftar Toko
                    </button>
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
