import { useNavigate } from "react-router-dom"
import StatusBadge from "./StatusBadge"

const DeviceCard = ({ device }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/device/${device.machine_id}`)}
            className="bg-cardbg p-5 rounded-2xl border border-gray-800 hover:border-primary hover:shadow-glow transition duration-300 cursor-pointer"    >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{device.machine_name}</h3>
                <StatusBadge status={device.status} />
            </div>

            <p className="text-sm text-gray-400 mt-2">
                Firmware: {device.firmware_version}
            </p>
        </div>
    )
}

export default DeviceCard