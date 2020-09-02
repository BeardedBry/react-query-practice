import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
//import { ReactQueryDevtools } from 'react-query-devtools'

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

const Infinite = () => {

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    "projects",
    async (key, i = 1) => {
      //console.log('data', data);
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${i}/posts`
      );
      return data;
    },
    {
      getFetchMore: (lastGroup, allGroups) => {
        console.log(allGroups);
        let groupLength = allGroups.length + 1;
        return groupLength <= 10 ? groupLength : false;
      },
      staleTime: 60000,
      refetchOnWindowFocus: false,
    }
  );

  //console.log(data);
  const loadMoreButtonRef = React.useRef();
  const enableScroll = React.useRef();

  return (
    <div>
      <h1>Infinite Scroll / Load More</h1>
      <label>
        on scroll
        <input type="checkbox" ref={enableScroll}></input>
      </label>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div className="InfinitePart">
          {data.map((page, i) => (
            <React.Fragment key={i}>
              {/* {console.log(page)} */}
              {page.map((entry) => (
                <div key={entry.id} className="entry">
                  <span>
                    {entry.userId} - {entry.id}
                  </span>
                </div>
              ))}
            </React.Fragment>
          ))}
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchMore()}
            disabled={!canFetchMore || isFetchingMore}
          >
            {isFetchingMore
              ? "Loading more..."
              : canFetchMore
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Infinite;
