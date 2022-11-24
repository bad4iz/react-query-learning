import {
  useInfiniteQuery
} from "react-query";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

const fetchTodos = async ({ pageParam }) => {
  return fetch(
    `api/todos?page=${pageParam}`
  ).then((res) => res.json());
};

const useInfiniteQueryScrolling = async (container, callback, offset = 0) => {
  const callbackRef = useRef(() => callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const onScroll = () => {
      const scrollContainer = container === document ? document.scrollingElement : container;
      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.clientHeight - offset) {
        callbackRef.current();
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [container, offset]);
};

export const Todos = () => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(["todos"], fetchTodos, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    }
  });

  useInfiniteQueryScrolling(document, () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  return isLoading ? (
    "загрузка..."
  ) : (
    <div>
      <h3>
        Мой список дел{isFetching ? "..." : null}
      </h3>
      <ul>
        {todos?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((todo) => (
              <li key={todo.id}>
                <Link to={`/todo/${todo.id}`}>
                  {todo.name}
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
        <li key={"load"}>
          {isFetchingNextPage ? " Загрузка...." : ""}
        </li>
      </ul>


    </div>
  );
};
