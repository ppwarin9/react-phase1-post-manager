// Props:
//   message — the error string to display
//   onRetry — optional callback to retry the failed action
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Error icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
        ⚠
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-gray-900">Something went wrong</p>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
