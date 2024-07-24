import React, { useState } from 'react';

const SearchInput = (props) => {
  const { handleSearch, handleFilterDate, title } = props;
  const [focusSearch, setFocusSearch] = useState(false);
  const [focusFilter, setFocusFilter] = useState(false);

  return (
    <div className="group relative py-5 flex justify-between">
      <div
        className={`group relative ${focusSearch ? 'w-full' : ''} ${
          focusFilter ? 'w-0' : ''
        }`}
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className={`focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 text-slate-100 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm w-2/3 focus:w-11/12 ease-in-out duration-500 bg-transparent ${
            focusFilter ? 'w-0' : ''
          }`}
          type="text"
          aria-label="Filter projects"
          placeholder="Search..."
          value={title}
          onChange={handleSearch}
          onFocus={() => setFocusSearch(true)}
          onBlur={() => setFocusSearch(false)}
        />
      </div>
      <input
        className={`focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 text-slate-100 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm w-1/2 focus:w-4/5 ease-in-out duration-500 bg-transparent ${
          focusSearch ? 'w-10' : ''
        }`}
        type="date"
        aria-label="Filter projects"
        onFocus={() => setFocusFilter(true)}
        onBlur={() => setFocusFilter(false)}
        onChange={handleFilterDate}
      />
    </div>
  );
};

export default SearchInput;
