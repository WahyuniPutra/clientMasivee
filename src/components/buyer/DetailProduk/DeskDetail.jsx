import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams untuk mengambil parameter dari URL

function ProductDescription() {
  const { productId } = useParams(); // Ambil parameter idproduk dari URL
  const [product, setProduct] = useState(null); // State untuk menyimpan data produk

  useEffect(() => {
    // Fungsi untuk mengambil data produk berdasarkan idproduk
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/products/${productId}`); // Ganti dengan endpoint API Anda
        const data = await response.json();
        setProduct(data); // Simpan data produk ke state
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct(); // Panggil fungsi untuk mengambil data produk
  }, [productId]); // Efek dijalankan setiap kali idproduk berubah

  // Pastikan data produk sudah tersedia sebelum menampilkan konten
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-fit flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
        {/* Judul */}
        <div className="bg-[#1C464F] text-white font-bold text-lg text-center py-3 rounded-t-lg">
          Deskripsi Produk
        </div>

        {/* Konten Deskripsi */}
        <div className="p-4 text-gray-800">
          {/* Deskripsi Produk */}
          <h3 className="font-semibold mb-2">-. Deskripsi Produk:</h3>
          <p className="mb-4">{product.description}</p> {/* Menampilkan deskripsi produk */}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
