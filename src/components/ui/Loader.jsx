const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-[#72BAA9]/30 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-[#AE2448] border-r-[#72BAA9] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#AE2448]/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default Loader