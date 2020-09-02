import React from "react";

const Quote = ({ quote }) => {
  return (
    <li>
      <p className="quote">{quote.en}</p>
      <p className="quoteAuthor">- {quote.author}</p>
    </li>
  );
};

export default Quote;
