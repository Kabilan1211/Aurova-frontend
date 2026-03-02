import { useAuth } from "../context/AuthContext"


const Header = () => {
  const { logout } = useAuth()
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-cardbg">
      <h2 className="text-lg font-semibold">
        IoT Control Center
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          Production Live
        </span>

        <button
          onClick={logout}
          className="text-sm border border-gray-700 px-4 py-1 rounded-lg hover:border-primary transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header