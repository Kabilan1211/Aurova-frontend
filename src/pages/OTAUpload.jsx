import { useState } from "react"
import { uploadOTA } from "../api/api"

const OTAUpload = () => {
  const [file, setFile] = useState(null)
  const [version, setVersion] = useState("")
  const [machineId, setMachineId] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append("firmware", file)
    formData.append("targetVersion", version)
    formData.append("machineId", machineId)
    await uploadOTA(formData)
    alert("Firmware deployed successfully")
  }

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-cardbg/70 backdrop-blur-xl p-12 rounded-3xl border border-white/5 shadow-glow space-y-8 transition duration-300"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Deploy Firmware
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Securely roll out OTA updates to your devices.
          </p>
        </div>

        <div className="space-y-6">
          <label className="block text-sm text-gray-400">
            Firmware File
          </label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <input
            type="text"
            placeholder="Firmware Version (1.2.0)"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <input
            type="text"
            placeholder="Target Machine ID (optional)"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            className="w-full p-4 rounded-xl bg-darkbg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-primary hover:bg-primaryDark hover:shadow-glow transition duration-300 text-lg font-medium"
        >
          Deploy Update
        </button>
      </form>
    </div>
  )
}

export default OTAUpload