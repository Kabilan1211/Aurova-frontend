import { useLocation, useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"

const RegisterSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const machineId = location.state?.machineId

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="bg-cardbg/70 backdrop-blur-xl p-12 rounded-3xl border border-white/5 shadow-glow max-w-xl w-full text-center space-y-8">

        <CheckCircle size={60} className="mx-auto text-primary drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]" />

        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Device Registered
          </h2>
          <p className="text-gray-400 mt-3">
            {machineId
              ? `Machine ID "${machineId}" has been successfully added to AUROVA.`
              : "Device has been successfully registered."}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primaryDark hover:shadow-glow transition"
          >
            Register Another
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl border border-gray-700 hover:border-primary transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterSuccess