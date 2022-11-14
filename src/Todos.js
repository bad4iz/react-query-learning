import {
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import { Link } from 'react-router-dom';
import React from 'react';

const fetchTodos = async ({ pageParam }) => {
  return fetch(
    `api/todos?page=${pageParam}`,
  ).then((res) => res.json());
};
export const Todos = () => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['todos'], fetchTodos, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
  const queryClient = useQueryClient();

  return isLoading ? (
    'загрузка...'
  ) : (
    <div>
      <h3>
        Мой список дел{isFetching ? '...' : null}
      </h3>
      <ul>
        {todos?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((todo) => (
              <ul key={todo.id}>
                <Link to={`/todo/${todo.id}`}>
                  {todo.name}
                </Link>
              </ul>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button
        onClick={fetchNextPage}
        disabled={
          !hasNextPage || isFetchingNextPage
        }
      >
        следующая
      </button>
      {isFetchingNextPage ? 'Загрузка' : '' + ''}
    </div>
  );
};
