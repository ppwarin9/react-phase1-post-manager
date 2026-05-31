function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Spinner ring */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      <p className="text-sm font-medium text-gray-500">Loading posts...</p>
    </div>
  );
}

export default LoadingSpinner;
