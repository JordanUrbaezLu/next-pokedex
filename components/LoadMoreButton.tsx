/* eslint-disable  @typescript-eslint/no-explicit-any */
const LoadMoreButton = ({
  handleLoadMore,
  scrollUp,
}: {
  handleLoadMore: any;
  scrollUp: boolean;
}) => {
  const btnName = scrollUp ? 'Scroll Up' : 'Load More';
  return (
    <button
      aria-label={btnName}
      className="fixed left-1/2 bottom-10 -translate-x-1/2 py-3 px-6 rounded-lg text-lg font-semibold transition-transform duration-300 cursor-pointer bg-red-500 text-white hover:scale-110 active:bg-red-600"
      onClick={() => handleLoadMore(scrollUp)}
    >
      {btnName}
    </button>
  );
};

export default LoadMoreButton;
