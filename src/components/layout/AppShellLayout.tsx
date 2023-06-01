import { ReactNode } from "react";

export const AppShellLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50">
      <main className="w-full sm:max-w-xl w-full max-h-full h-full sm:h-5/6 sm:min-h-[500px] sm:rounded-xl bg-white overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};
