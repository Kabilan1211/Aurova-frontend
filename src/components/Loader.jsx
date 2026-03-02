const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="relative">
        <div className="w-14 h-14 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl"></div>
      </div>
    </div>
  )
}

export default Loader