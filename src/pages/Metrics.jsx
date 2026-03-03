import { useEffect, useState } from "react"
import { getServerMetrics } from "../api/api"
import Loader from "../components/Loader"

const formatMB = (bytes) => (bytes / 1024 / 1024).toFixed(2)

const formatUptime = (seconds) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return `${hrs}h ${mins}m`
}

const Metrics = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      const res = await getServerMetrics()
      setMetrics(res.data)
    } catch (err) {
      console.error("Metrics fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  if (!metrics)
    return (
      <div className="text-gray-400 mt-10">
        Failed to load metrics
      </div>
    )

  return (
    <div className="space-y-10">

      <h2 className="text-2xl font-semibold">
        Backend Server Metrics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-cardbg p-6 rounded-2xl border border-gray-800">
          <p className="text-sm text-gray-400">Server Uptime</p>
          <p className="text-3xl font-bold mt-2 text-primary">
            {formatUptime(metrics.uptime)}
          </p>
        </div>

        <div className="bg-cardbg p-6 rounded-2xl border border-gray-800">
          <p className="text-sm text-gray-400">Heap Used</p>
          <p className="text-3xl font-bold mt-2">
            {formatMB(metrics.memory.heapUsed)} MB
          </p>
        </div>

        <div className="bg-cardbg p-6 rounded-2xl border border-gray-800">
          <p className="text-sm text-gray-400">RSS Memory</p>
          <p className="text-3xl font-bold mt-2">
            {formatMB(metrics.memory.rss)} MB
          </p>
        </div>

      </div>

      <div className="text-xs text-gray-500">
        Last Updated: {new Date(metrics.timestamp).toLocaleString()}
      </div>

    </div>
  )
}

export default Metrics