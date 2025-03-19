const LoadMoreButton = ({
  handleLoadMore,
  disabled,
}: {
  handleLoadMore: any;
  disabled: boolean;
}) => {
  return (
    <button
      className={`fixed left-1/2 bottom-10 -translate-x-1/2 py-3 px-6 rounded-lg text-lg font-semibold transition-transform duration-300 
    ${disabled ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'cursor-pointer bg-red-500 text-white hover:scale-110 active:bg-red-600'}`}
      disabled={disabled}
      onClick={handleLoadMore}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
