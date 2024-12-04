import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Untuk mengirim cookie httpOnly (refresh token)
});

export const refreshToken = async () => {
  try {
    const response = await api.post("api/user/token", {}, { withCredentials: true });
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response, // Jika respons sukses, lanjutkan
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Hindari infinite loop

      try {
        // Dapatkan access token baru
        const { data } = await api.get("api/user/token");
        const newAccessToken = data.accessToken;

        // Simpan token baru di localStorage
        localStorage.setItem("token", newAccessToken);

        // Perbarui header Authorization
        api.defaults.headers.common["Authorization"] = 'Bearer ${newAccessToken}';
        originalRequest.headers["Authorization"] = 'Bearer ${newAccessToken}';

        // Ulangi permintaan yang gagal
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Gagal memperbarui token:", refreshError);
        // Redirect ke halaman login jika refresh token juga gagal
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;