const Text = () => {
  return <div>Text</div>;
};

const Error = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">{children}</span>
    </div>
  );
};

Text.Error = Error;

export default Text;
