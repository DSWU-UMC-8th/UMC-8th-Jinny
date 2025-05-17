const LpCardSkeleton = () => {
  return (
    <div className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 animate-pulse">
      <div className="w-full h-full bg-gray-300"></div>
    </div>
  );
};

export default LpCardSkeleton;
