import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Quote from "./Quote";

const endpoint = "https://programming-quotes-api.herokuapp.com/quotes/page/";

const fetchQuotes = async (key, page) => {
  const res = await fetch(
    `https://programming-quotes-api.herokuapp.com/quotes/page/${page}`
  );
  return res.json();
};

const Paginated = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["quotes", page],
    fetchQuotes,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => console.log("fetched page " + page),
    }
  );

  return (
    <div className="regularPage">
      <h1>Paginated Query</h1>
      {status === "loading" && <span>Loading Data...</span>}
      {status === "error" && <span>Error Fetching Data.</span>}
      {status === "success" && (
        <>
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => old - 1)}
          >
            Previous Page
          </button>
          <span> Current Page: {page} </span>
          <button onClick={() => setPage((old) => (!latestData || resolvedData.length === 0) ? old : old + 1)} disabled={!latestData || resolvedData.length === 0}>Next Page</button>
          <ul className="quoteList">
            {resolvedData.map((quote) => (
              <Quote quote={quote} key={quote.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Paginated;
