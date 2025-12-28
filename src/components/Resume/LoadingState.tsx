const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="glass rounded-2xl p-6 bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          <div className="aspect-[1/1.414] bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
          <div className="flex space-x-2">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
