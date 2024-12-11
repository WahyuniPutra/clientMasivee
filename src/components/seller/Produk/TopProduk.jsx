

const ProductPage = () => {
  return (
    <div className="bg-gray-100 min-h-fit max-w-screen-lg  px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Produk Saya</h1>
          <a href="/tambahproduk">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
              + Tambah Produk Baru
            </button>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b mb-4">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">
            Semua
          </button>
          <button className="text-gray-600 font-semibold pb-2">
            Belum Ditampilkan (1)
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Cari Nama Produk, SKU"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Cari Berdasarkan Kategori"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="text-center py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">
            Cari
          </button>
        </div>

        {/* Product Limit */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-teal-800 text-white px-3 py-1 rounded-lg">
            Batas Maks. Produk: 50
          </span>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-8 border-b pb-2 mb-4 text-gray-600">
          <span>Urutkan:</span>
          <button className="hover:underline">Harga</button>
          <button className="hover:underline">Stok</button>
          <button className="hover:underline">Terlaris</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
