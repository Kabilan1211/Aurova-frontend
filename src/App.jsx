import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard"
import DeviceDetail from "./pages/DeviceDetail"
import OTAUpload from "./pages/OTAUpload"
import RegisterDevice from "./pages/RegisterDevice"
import RegisterSuccess from "./pages/RegisterSuccess"
import Login from "./pages/Login"
import Devices from "./pages/Devices"
import Metrics from "./pages/Metrics"

function App() {
  const { token } = useAuth()

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            token ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/device/:id" element={<DeviceDetail />} />
                  <Route path="/ota" element={<OTAUpload />} />
                  <Route path="/register" element={<RegisterDevice />} />
                  <Route path="/register/success" element={<RegisterSuccess />} />
                  <Route path="/devices" element={<Devices />} />
                  <Route path="/metrics" element={<Metrics />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App