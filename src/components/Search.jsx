import React, { useEffect, useState, useContext } from "react";
import { RoomContext } from "../RoomContext";

const Search = ({ rooms }) => {
  const context = useContext(RoomContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleDropdownItemClick = (room) => {
    setSearchTerm(room.name);
    context.functSetRoom(room.id, room.name);
    setShowDropdown(false);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const result = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm, rooms]);

  return (
    <div className="search relative">
      <div className="searchForm flex justify-between">
        <input
          id="input_name"
          type="text"
          value={searchTerm}
          onChange={handleSearchInput}
          onFocus={() => setShowDropdown(true)} // Hiển thị dropdown khi ô tìm kiếm được focus
          // onBlur={() => setShowDropdown(false)} // Ẩn dropdown khi ô tìm kiếm mất focus
          placeholder="Tìm phòng Chat ..."
          className="bg-gray-300 pr-10 py-2 pl-3 rounded-lg focus:outline-none"
        />
        <label
          htmlFor="input_name"
          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white hidden lg:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
      </div>
      {showDropdown && searchTerm && searchResult.length === 0 && (
        <div className="absolute w-full p-2 ">
          <ul className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <li>
              <p className="text-gray-600 text-center mt-2">
                Không có phòng phù hợp
              </p>
            </li>
          </ul>
        </div>
      )}
      {showDropdown && searchTerm && searchResult.length > 0 && (
        <div className="absolute w-full p-2 ">
          <ul className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {searchResult.map((room) => (
              <li
                key={room.id}
                className="px-4 py-2 z-[1] hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                onClick={() => handleDropdownItemClick(room)}
              >
                {room.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
