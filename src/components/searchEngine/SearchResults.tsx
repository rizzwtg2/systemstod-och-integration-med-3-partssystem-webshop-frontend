import { useEffect, useState } from "react";
import { IItem } from "../../models/googleSearch";
import axios from "axios";
import { IProduct } from "../../models/IProduct";
import { Link } from "react-router-dom";

interface SearchResultProps {
  items: IItem[];
  handleFetch: (startItem: number) => void;
}

export const SearchResults = ({ items, handleFetch }: SearchResultProps) => {
  const [listOfMyItems, setListOfMyItems] = useState<IProduct[]>([]);

  const extraStringAddedFromGoogleSearchResults = " | Budo & Fitness Sport";

  useEffect(() => {
    const getMyItems = async () => {
      const response = await axios.get("https://e-shop-backend-new-hazel.vercel.app/products");
      const myItems: IProduct[] = response.data;

      setListOfMyItems(myItems);
    };
    getMyItems();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const nextPage = async () => {
    handleFetch(currentIndex + itemsPerPage);
    setCurrentIndex(currentIndex + itemsPerPage);
    localStorage.setItem(
      "searchResult",
      JSON.stringify(items.slice(currentIndex + itemsPerPage, currentIndex + itemsPerPage + 5))
    );

    console.log("nextPage", currentIndex + itemsPerPage);
  };

  const prevPage = () => {
    if (currentIndex - itemsPerPage < 0) {
      return;
    }
    handleFetch(currentIndex - itemsPerPage);
    setCurrentIndex(currentIndex - itemsPerPage);
    localStorage.setItem(
      "searchResult",
      JSON.stringify(items.slice(currentIndex - itemsPerPage, currentIndex - itemsPerPage + 5))
    );

    console.log("prevPage", currentIndex - itemsPerPage);
  };

  return (
    <section className='space-y-4 space-x-8 p-4'>
      <article className='flex gap-4 justify-center'>
        {/* Previous Arrow */}

        {items.map((item: IItem) => {
          const matchedItem = listOfMyItems.find(
            (i: IProduct) => i.name + extraStringAddedFromGoogleSearchResults === item.title
          );

          return (
            <figure
              key={item.formattedUrl}
              className={"flex flex-col items-center " + (matchedItem ? "" : "inset-0 opacity-50 disabled")}
            >
              {matchedItem ? (
                <Link to={`/products/${matchedItem.id}`} className=''>
                  <img src={item.pagemap?.cse_image?.[0]?.src} alt={item.title} className='size-32 object-cover' />
                </Link>
              ) : (
                <div className='cursor-not-allowed'>
                  <img src={item.pagemap?.cse_image?.[0]?.src} alt={item.title} className='size-32 object-cover' />
                </div>
              )}
              <figcaption>{item.title}</figcaption>
            </figure>
          );
        })}
      </article>
      <button
        onClick={prevPage}
        className='p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50'
        disabled={currentIndex === 0}
      >
        &larr;
      </button>
      {/* Next Arrow */}
      <button
        onClick={nextPage}
        className='p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50'
        // disabled={currentIndex + itemsPerPage >= items.length && listOfMyItems.length === items.length}
      >
        &rarr;
      </button>
    </section>
  );
};

export default SearchResults;
