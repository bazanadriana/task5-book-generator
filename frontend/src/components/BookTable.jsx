import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookRowExpanded from "./BookRowExpanded";

const API_URL = import.meta.env.VITE_API_URL;

function BookTable({ region, seed, likes, reviews, refreshKey }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Reset on input changes
    setBooks([]);
    setPage(1);
    setHasMore(true);
  }, [region, seed, likes, reviews, refreshKey]);

  useEffect(() => {
    loadMoreBooks(); // Load first page
  }, [refreshKey]);

  const loadMoreBooks = async () => {
    const limit = page === 1 ? 20 : 10;

    const res = await fetch(
      `${API_URL}/api/books?seed=${seed}&region=${region}&page=${page}&likes=${likes}&reviews=${reviews}&limit=${limit}`
    );

    const data = await res.json();

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setBooks((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  };

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <InfiniteScroll
        dataLength={books.length}
        next={loadMoreBooks}
        hasMore={hasMore}
        loader={<p className="text-center mt-4">Loading more books...</p>}
        scrollThreshold={0.95}
      >
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author(s)</th>
              <th className="px-4 py-2 text-left">Publisher</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, idx) => (
              <React.Fragment key={idx}>
                <tr
                  className="cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => toggleExpand(idx)}
                >
                  <td className="px-4 py-2">{book.index}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.authors.join(", ")}</td>
                  <td className="px-4 py-2">{book.publisher}</td>
                </tr>
                {expandedRow === idx && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 px-6 py-4">
                      <BookRowExpanded book={book} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default BookTable;