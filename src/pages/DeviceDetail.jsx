import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDevice, getDeviceLogs } from "../api/api"
import { socket } from "../socket/socket"
import StatusBadge from "../components/StatusBadge"
import Loader from "../components/Loader"

const DeviceDetail = () => {
  const { id } = useParams()

  const [device, setDevice] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()

    socket.on("deviceUpdated", (updated) => {
      if (updated.machine_id === id) {
        setDevice(updated)
      }
    })

    socket.on("newLog", (log) => {
      if (log.machine_id === id) {
        setLogs((prev) => [log, ...prev])
      }
    })

    return () => {
      socket.off("deviceUpdated")
      socket.off("newLog")
    }
  }, [id])

  const fetchData = async () => {
    try {
      const deviceRes = await getDevice(id)
      const logsRes = await getDeviceLogs(id)

      setDevice(deviceRes.data)
      setLogs(logsRes.data.logs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  if (!device)
    return (
      <div className="text-center mt-20 text-gray-400">
        Device not found
      </div>
    )

  return (
    <div className="space-y-12">

      {/* Device Info */}
      <div className="bg-cardbg/70 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-glow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {device.machine_name || device.machine_id}
            </h2>

            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <p>Machine ID: {device.machine_id}</p>
              <p>Firmware: {device.firmware_version}</p>
              <p>
                Last Seen:{" "}
                {device.last_seen
                  ? new Date(device.last_seen).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>

          <StatusBadge status={device.status} />
        </div>
      </div>

      {/* Logs Section */}
      <div>
        <h3 className="text-xl font-semibold mb-6">
          Device Logs
        </h3>

        <div className="bg-cardbg/70 backdrop-blur-xl p-6 rounded-3xl border border-white/5 h-[500px] overflow-y-auto space-y-4">

          {logs.length === 0 && (
            <p className="text-gray-500 text-sm">
              No logs available
            </p>
          )}

          {logs.map((log) => (
            <div
              key={log.id}
              className="p-5 rounded-2xl bg-darkbg border border-gray-800 hover:border-primary/30 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    log.level === "ERROR"
                      ? "text-red-400"
                      : log.level === "WARN"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {log.level}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(log.created_at).toLocaleTimeString()}
                </span>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                {log.message}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default DeviceDetail