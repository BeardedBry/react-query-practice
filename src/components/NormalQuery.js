import React from "react";
import { useQuery, Query } from "react-query";
import Quote from "./Quote";

const endpoint = "https://programming-quotes-api.herokuapp.com/quotes/page/";

const fetchQuotes = async (key, page) => {
  const res = await fetch(
    `https://programming-quotes-api.herokuapp.com/quotes/page/${page}`
  );
  return res.json();
};

const NormalQuery = () => {

  const { data, status } = useQuery(["quotes", 1], fetchQuotes, {
    staleTime: 60000,
    refetchOnWindowFocus: false,
    onSuccess: () => console.log('fetched quotes'),
  });

  return (
    <div className="regularPage">
      <h1>Regular Query</h1>
      <p>Source: {endpoint}</p>
      {status === "loading" && <span>Loading Data...</span>}
      {status === "error" ||
        (data?.success === false && <span>Error Fetching Data.</span>)}
      {status === "success" && (
        <ul className="quoteList">
          {data.map((quote) => (
              <Quote quote={quote} key={quote.id}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NormalQuery;
