


const SearchBox = () => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <i className="fas fa-search"></i>
      </div>
      <input
        type="text"
        placeholder="Search resident..."
        className="w-full bg-gray-100 border border-transparent focus:border-gray-300 pl-11 py-3 rounded-2xl text-sm focus:outline-none"
      />
    </div>
  );
};

export default SearchBox;