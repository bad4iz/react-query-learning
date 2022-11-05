import {
  useQuery,
  useQueryClient,
} from 'react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const fetchTodos = async ({ queryKey }) => {
  const [_, page] = queryKey;
  return fetch(`api/todos?page=${page}`).then(
    (res) => res.json(),
  );
};
export const Todos = () => {
  const [page, setPage] = useState(0);
  const {
    data: todos = [],
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery(['todos', page], fetchTodos, {
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery(
      ['todos', page + 1],
      fetchTodos,
    );
  }, [page]);

  return isLoading ? (
    'загрузка...'
  ) : (
    <div>
      <h3>
        Мой список дел{isFetching ? '...' : null}
      </h3>
      <ul>
        {todos.map((todo) => (
          <ul key={todo.id}>
            <Link to={`/todo/${todo.id}`}>
              {todo.name}
            </Link>
          </ul>
        ))}
      </ul>

      <button
        onClick={() => setPage(page - 1)}
        disabled={page < 1}
      >
        предыдущая
      </button>
      {page}
      <button
        onClick={() => setPage(page + 1)}
        disabled={isPreviousData}
      >
        следующая
      </button>
    </div>
  );
};
