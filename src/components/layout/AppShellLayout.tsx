import { ReactNode } from "react";

export const AppShellLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-gray-900 relative">
      <main className="sm:max-w-xl w-full max-h-full h-full sm:h-5/6 sm:min-h-[500px] sm:rounded-xl overflow-hidden relative bg-slate-50 dark:bg-gray-900 dark:bg-opacity-90">
        {/* <main className="sm:max-w-xl w-full max-h-full h-full sm:h-5/6 sm:min-h-[500px] sm:rounded-xl bg-gradient-to-t from-gray-200 to-white dark:from-black dark:to-gray-800 overflow-hidden relative"> */}
        {children}
        {/* </main> */}
      </main>
    </div>
  );
};
