import { useEffect, useState } from "react"
import { getDevices } from "../api/api"
import Loader from "../components/Loader"
import StatusBadge from "../components/StatusBadge"
import { useNavigate } from "react-router-dom"

const Devices = () => {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      const res = await getDevices()
      setDevices(res.data.devices || res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-semibold">
        All Registered Devices
      </h2>

      <div className="bg-cardbg/70 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-darkbg border-b border-gray-800">
            <tr className="text-sm text-gray-400">
              <th className="p-4">Machine ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Firmware</th>
              <th className="p-4">Last Seen</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr
                key={device.machine_id}
                onClick={() => navigate(`/device/${device.machine_id}`)}
                className="border-b border-gray-800 hover:bg-darkbg cursor-pointer transition"
              >
                <td className="p-4 font-medium">
                  {device.machine_id}
                </td>
                <td className="p-4">
                  {device.machine_name}
                </td>
                <td className="p-4">
                  {device.firmware_version}
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {device.last_seen
                    ? new Date(device.last_seen).toLocaleString()
                    : "Never"}
                </td>
                <td className="p-4">
                  <StatusBadge status={device.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Devices