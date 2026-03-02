import { NavLink } from "react-router-dom"
import { LayoutDashboard, Upload, PlusSquare } from "lucide-react"
import { Server } from "lucide-react"

const Sidebar = () => {
    return (
        <aside className="w-64 bg-cardbg border-r border-gray-800 p-6">
            <h1 className="text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,106,0,0.8)] mb-10">        AUROVA
            </h1>

            <nav className="space-y-4">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition"
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/ota"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition"
                >
                    <Upload size={20} />
                    OTA Upload
                </NavLink>

                <NavLink
                    to="/register"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition"
                >
                    <PlusSquare size={20} />
                    Register Device
                </NavLink>
                <NavLink
                    to="/devices"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition"
                >
                    <Server size={18} />
                    Devices
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar