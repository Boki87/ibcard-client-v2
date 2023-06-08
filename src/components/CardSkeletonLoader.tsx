export const CardSkeletonLoader = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl h-[180px] mx-auto bg-white dark:bg-gray-800 animate-pulse">
      <div className="h-20 w-20 rounded-full bg-slate-300 dark:bg-slate-600 mb-3"></div>
      <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded mb-3"></div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded col-span-2"></div>
        <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded col-span-1"></div>
      </div>
      <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded mb-3"></div>
    </div>
  );
};
