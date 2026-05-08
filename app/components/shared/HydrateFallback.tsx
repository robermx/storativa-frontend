export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-lightness dark:bg-darkness p-6 md:p-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        {/* Skeleton del header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-dark/10 dark:bg-light/10" />
          <div className="space-y-2">
            <div className="h-6 w-40 bg-dark/10 dark:bg-light/10 rounded" />
            <div className="h-4 w-24 bg-dark/10 dark:bg-light/10 rounded" />
          </div>
        </div>
        {/* Skeleton de stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-dark rounded-xl p-5">
              <div className="h-4 w-20 bg-dark/10 dark:bg-light/10 rounded mb-2" />
              <div className="h-8 w-16 bg-dark/10 dark:bg-light/10 rounded" />
            </div>
          ))}
        </div>
        {/* Skeleton de tabla */}
        <div className="bg-white dark:bg-dark rounded-xl p-5">
          <div className="h-6 w-48 bg-dark/10 dark:bg-light/10 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-dark/5 dark:bg-light/5 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
