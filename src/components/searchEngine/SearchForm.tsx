import { useState } from "react";
import { IItem, ISearchResult } from "../../models/googleSearch";
import axios from "axios";
import { SearchResults } from "./SearchResults";

export const SearchEngine = () => {
  const [fullSearchResult, setFullSearchResult] = useState<ISearchResult>(
    localStorage.getItem("searchResult") ? JSON.parse(localStorage.getItem("searchResult") || "[]") : "[]"
  );
  const [items, setItems] = useState<IItem[]>(fullSearchResult.items || []);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFetch = async (startItem: number) => {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        q: searchQuery,
        cx: "15639bb807c2a4e26",
        key: "AIzaSyC84KkfdaQ-bL11VuLZITtWqPXZr612Y9M",
        start: startItem,
        num: 5,
      },
    });
    setFullSearchResult(response.data);
    setItems(response.data.items);
    localStorage.setItem("searchResult", JSON.stringify(response.data));
    console.log("response");
    console.log(response.data);
    console.log(fullSearchResult);
  };

  return (
    <>
      <form
        className='flex items-center justify-center gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          handleFetch(1); // Default to page 1 on form submission
        }}
      >
        <input
          className='ring hover:ring-2 ring-gray-400 rounded p-1 px-2'
          autoFocus
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          type='text'
          value={searchQuery}
          placeholder='ex: Kosttillskott'
        />
        <button className='ring hover:ring-2 ring-gray-400 rounded p-1 px-2 ' type='submit'>
          Sök
        </button>
      </form>
      {items && <SearchResults items={items} handleFetch={handleFetch} />}
    </>
  );
};
