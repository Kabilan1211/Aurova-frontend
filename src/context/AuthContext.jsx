import { createContext, useContext, useState, useEffect } from "react"
import { setAuthToken } from "../api/api"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  // 🔥 On app start → restore token if valid
  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)
        const currentTime = Date.now() / 1000

        // If expired → remove immediately
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token")
          setAuthToken(null)
          setToken(null)
        } else {
          setAuthToken(storedToken)
          setToken(storedToken)
        }
      } catch (err) {
        localStorage.removeItem("token")
        setAuthToken(null)
        setToken(null)
      }
    }
  }, [])

  const login = (jwt) => {
    localStorage.setItem("token", jwt)
    setAuthToken(jwt)
    setToken(jwt)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuthToken(null)
    setToken(null)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)