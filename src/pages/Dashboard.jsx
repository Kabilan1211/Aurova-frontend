import { useEffect, useState } from "react"
import { getDevices } from "../api/api"
import { socket } from "../socket/socket"
import DeviceCard from "../components/DeviceCard"
import StatCard from "../components/StatCard"

const Dashboard = () => {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    fetchDevices()

    socket.on("deviceUpdated", (updated) => {
      setDevices((prev) =>
        prev.map((d) =>
          d.machine_id === updated.machine_id ? updated : d
        )
      )
    })

    return () => {
      socket.off("deviceUpdated")
    }
  }, [])

  const fetchDevices = async () => {
    const res = await getDevices()
    setDevices(res.data.devices)
  }

  const online = devices.filter((d) => d.status === "online").length

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Devices" value={devices.length} />
        <StatCard title="Online" value={online} />
        <StatCard
          title="Offline"
          value={devices.length - online}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {devices.map((device) => (
          <DeviceCard key={device.machine_name} device={device} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard