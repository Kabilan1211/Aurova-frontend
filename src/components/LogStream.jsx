const LogStream = ({ logs }) => {
  return (
    <div className="bg-cardbg p-4 rounded-2xl border border-gray-800 h-96 overflow-y-auto">
      {logs.map((log) => (
        <div key={log.id} className="mb-3 text-sm">
          <span className="text-gray-500">
            {new Date(log.created_at).toLocaleTimeString()}
          </span>{" "}
          <span className="font-semibold">{log.level}</span>{" "}
          {log.message}
        </div>
      ))}
    </div>
  )
}

export default LogStream