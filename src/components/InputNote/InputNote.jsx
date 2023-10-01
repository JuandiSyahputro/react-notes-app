import React from "react";

const InputNote = (props) => {
  const { handleSubmit, title, maxLength, handleChange, content, setContent } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="block w-full">
        <div className="w-full">
          <h2 className="text-base font-semibold mb-1 text-end text-slate-100">
            Character {title.length}/{maxLength}
          </h2>
          <input type="text" placeholder="Title" value={title} onChange={handleChange} className="focus:ring-2 focus:ring-blue-500 focus:outline-none w-full" />
        </div>
        <textarea className="h-40 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full" placeholder="Content ..." value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="flex items-center justify-end">
        <button type="submit" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
          <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          Add
        </button>
      </div>
    </form>
  );
};

export default InputNote;
