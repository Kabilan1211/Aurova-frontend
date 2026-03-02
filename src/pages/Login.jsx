import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../api/api"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginAdmin({ email, password })
      login(res.data.token)
      navigate("/")
    } catch (err) {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-cardbg/80 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-glow space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
        />

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-primary hover:bg-primaryDark hover:shadow-glow transition text-lg"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login