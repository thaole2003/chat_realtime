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
        <div className="searchForm">
         <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="Search rooms by name..."
      />
        </div>
       
        <ul>
        {searchResult.map((room) => (
         <Chats  key={room.id} room={room} />
        ))}
      </ul>
      </div>
    )
}
export default Search;