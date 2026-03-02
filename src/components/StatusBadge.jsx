const StatusBadge = ({ status }) => {
  const isOnline = status === "online"

  return (
    <span
      className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isOnline
          ? "bg-green-500/10 text-green-400 border border-green-500/30"
          : "bg-red-500/10 text-red-400 border border-red-500/30"
      }`}
    >
      {status.toUpperCase()}
    </span>
  )
}

export default StatusBadge