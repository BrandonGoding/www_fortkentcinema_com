const ApiErrorMsg = ({ error }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-center"
      role="alert"
    >
      {error}
    </div>
  );
};

export default ApiErrorMsg;
