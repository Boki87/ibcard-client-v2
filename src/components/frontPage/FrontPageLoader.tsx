import { CardSkeletonLoader } from "../CardSkeletonLoader";

export const FrontPageLoader = () => {
  return (
    <div>
      <div className="px-4">
        <CardSkeletonLoader />
      </div>
      {/* main info skeleton */}
      <div className="grid grid-cols-2 gap-4 px-4 animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-600 flex-1"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-600 flex-1"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-600 flex-1"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-600 flex-1"></div>
        </div>
      </div>
      {/* main info skeleton END */}

      <div className="min-h-[150px] bg-gray-100 dark:bg-gray-800 my-6 animate-pulse p-4">
        <div className="w-full h-10 rounded-full bg-slate-300 dark:bg-slate-700 my-6"></div>
        <div className="w-full h-10 rounded-full bg-slate-300 dark:bg-slate-700 my-6"></div>

        <div className="grid grid-cols-3 gap-4 mt-12">
          {new Array(9).fill(1).map((icon, index) => {
            return (
              <div className="flex justify-center" key={icon + "_" + index}>
                <div className="w-20 h-20 rounded-xl bg-slate-300 dark:bg-slate-600"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
