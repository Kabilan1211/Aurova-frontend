const StatCard = ({ title, value }) => {
    return (
        <div className="bg-cardbg p-6 rounded-2xl shadow-glow border border-primary/20 hover:shadow-glowStrong transition duration-300">      <p className="text-gray-400 text-sm">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
    )
}

export default StatCard