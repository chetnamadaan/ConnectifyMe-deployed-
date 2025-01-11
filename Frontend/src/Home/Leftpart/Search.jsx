import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import useGetAllUsers from '../../context/useGetAllUsers';
import useConversation from '../../zustand/useConversation';
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState('');
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error('User not found');
    }
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="h-[10vh] mb-4">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-3">
            {/* Search input */}
            <label className="border-[1px] border-teal-700 bg-teal-800 rounded-lg p-3 flex items-center gap-2 w-full md:w-[95%] lg:w-[95%]">
              <input
                type="text"
                className="grow outline-none bg-transparent text-white placeholder-gray-400 px-3 py-2"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search for a user"
              />
              {/* Clear button */}
              {search && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-white p-1"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </label>

            {/* Search button with icon */}
            <button
              type="submit"
              className="bg-teal-700 p-2 hover:bg-teal-600 rounded-full duration-300"
              aria-label="Search"
            >
              <FaSearch className="text-white text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
