const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="mt-4 text-white font-medium">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default Loading;
