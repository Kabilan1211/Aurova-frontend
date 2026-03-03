import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
})

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

/* =============================
   🔐 AUTO LOGOUT ON 401
============================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

/* =============================
   🔑 AUTH
============================= */

export const loginAdmin = (data) =>
  api.post("/api/auth/login", data)

/* =============================
   📦 DEVICE APIs
============================= */

export const getDevices = () =>
  api.get("/api/admin/devices")

export const getDevice = (id) =>
  api.get(`/api/admin/device/${id}`)

export const getDeviceLogs = (machineId) =>
  api.get(`/api/logs/${machineId}`)

export const registerDevice = (data) =>
  api.post("/api/device/register", data)

/* =============================
   🚀 OTA
============================= */

export const uploadOTA = (formData) =>
  api.post("/api/ota/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

export const getServerMetrics = () =>
  api.get("/metrics")

export default api