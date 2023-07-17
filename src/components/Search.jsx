import React,{useEffect,useState} from "react";
import Chats from './Chats';

const Search = ({rooms})=>{
// console.log(rooms);
  const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const result = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

    return (
        <div className="search">
        <div className="searchForm flex justify-between">
         <input id="input_name"
        type="text"
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="Tìm phòng Chat ..." className="bg-gray-300"
        
      /> <label htmlFor="input_name" className="cursor-pointer">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg> </label>
    
        </div>
       <hr />
        {searchResult.map((room) => (
         <Chats  key={room.id} room={room} />
        ))}
      </div>
    )
}
export default Search;