import React from "react";

function BookRowExpanded({ book }) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="w-32 h-44 bg-gray-200 shadow-md flex items-center justify-center text-sm text-gray-500">
        <span className="p-2 text-center">
          {book.title.slice(0, 40)}
          <br />
          — {book.authors[0]}
        </span>
      </div>

      <div className="flex-1">
        {book.review ? (
          <>
            <p className="text-gray-700 italic mb-2">"{book.review}"</p>
            <p className="text-sm text-gray-500">— {book.reviewAuthor}</p>
          </>
        ) : (
          <p className="text-gray-400 italic">No reviews available for this book.</p>
        )}

        <div className="text-sm text-gray-600 mt-2">
          <strong>Likes:</strong> {book.likes}
        </div>
      </div>
    </div>
  );
}

export default BookRowExpanded;