
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Container */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Outer Ring (Static) */}
          <div className="absolute h-full w-full rounded-full border-4 border-gray-200 opacity-25 dark:border-slate-700"></div>
          
          {/* Inner Ring (Spinning) */}
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent dark:border-t-blue-500"></div>
        </div>

        {/* Loading Text */}
        <div className="animate-pulse text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    </div>
  );
}