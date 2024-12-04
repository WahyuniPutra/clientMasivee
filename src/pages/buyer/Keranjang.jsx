import { useState, useEffect } from "react";
import api from "../../utils/api";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get("api/cart/getcart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Gagal mengambil data keranjang:", error.response?.data || error.message);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleUpdateQuantity = async (id, operation) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");
  
      // Update quantity di backend
      await api.put(
        "api/cart/update",
        { productId: id, operation }, // Kirim operation ("increment" atau "decrement")
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Update di frontend
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: operation === "increment" ? item.quantity + 1 : item.quantity - 1,
                totalPrice:
                  operation === "increment"
                    ? (item.quantity + 1) * item.product.price
                    : (item.quantity - 1) * item.product.price,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Gagal memperbarui jumlah produk:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const incrementQuantity = (id) => {
    handleUpdateQuantity(id, "increment");
  };
  
  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(id, "decrement");
    } else {
      removeItem(id); // Hapus jika kuantitas = 1
    }
  };
  

  const removeItem = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      // Hapus produk di backend
      await api.delete("api/cart/remove", {
        data: { productId: id },
        headers: { Authorization: `Bearer ${token}` },
      });

      // Hapus dari frontend
      setCartItems((prev) => prev.filter((item) => item.product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Keranjang</h1>

      {cartItems.map((item) => (
        <div
          key={item.product.id}
          className="bg-white p-4 rounded-lg shadow-lg mb-4 flex items-center"
        >
          <img
            src={`http://localhost:5000/${item.product.imageUrl}`}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-lg mr-4"
          />
          <div className="flex-1">
            <h2 className="font-bold">{item.product.name}</h2>
            <p>Rp. {item.product.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 bg-gray-200 rounded-l"
              onClick={() => decrementQuantity(item.product.id, item.quantity)}
              disabled={loading}
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-r"
              onClick={() => incrementQuantity(item.product.id, item.quantity)}
              disabled={loading}
            >
              +
            </button>
          </div>
          <button
            className="text-red-500 font-bold ml-4"
            onClick={() => removeItem(item.product.id)}
            disabled={loading}
          >
            Hapus
          </button>
        </div>
      ))}

      {/* Total Harga */}
      <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Total Harga</h2>
        <p className="text-lg font-semibold">
          Rp. {calculateTotalPrice().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CartPage;
