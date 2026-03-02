import { useState } from "react"
import { registerDevice } from "../api/api"
import { useNavigate } from "react-router-dom"

const RegisterDevice = () => {
  const [form, setForm] = useState({
    machineId: "",
    machineName: "",
    firmwareVersion: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await registerDevice(form)

    navigate("/register/success", {
      state: { machineId: form.machineId }
    })
  }

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-cardbg/70 backdrop-blur-xl p-12 rounded-3xl border border-white/5 shadow-glow space-y-8"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Register Device
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Add a new device to your AUROVA network.
          </p>
        </div>

        <div className="space-y-6">
          <input
            name="machineId"
            placeholder="Machine ID"
            value={form.machineId}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <input
            name="machineName"
            placeholder="Machine Name"
            value={form.machineName}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <input
            name="firmwareVersion"
            placeholder="Firmware Version"
            value={form.firmwareVersion}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-primary hover:bg-primaryDark hover:shadow-glow transition duration-300 text-lg font-medium"
        >
          Register Device
        </button>
      </form>
    </div>
  )
}

export default RegisterDevice