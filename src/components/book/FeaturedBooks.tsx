import { useState } from "react";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import BookCard from "./BookCard";
const FeaturedBooks = ({ searchTerm }: any) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const { data: booksData } = useGetAllBooksQuery({
    page,
    limit,
    searchTerm,
    sortField,
    sortOrder,
  });

  const book =
    booksData?.response?.books &&
    booksData?.response?.books.map((book: any, index: any) => {
      return <BookCard data={book} key={index} />;
    });

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="text-center md:text-start font-[600] pb-[20px]">
          <h1 className="text-[18px]">Catalog</h1>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {book}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
