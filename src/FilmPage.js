import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from './App';

const FilmPage = ({ url }) => {
  const [count, increment] = useReducer(
    (c) => c + 1,
    0,
  );
  const { data, isLoading, isFetching } =
    useQuery(
      ['film', url],
      () =>
        new Promise((resolve) =>
          setTimeout(resolve, 2000),
        ).then(() =>
          fetch(url).then((res) => res.json()),
        ),
      {
        onSuccess: (data) => {
          increment();
        },
        onError: (error) => {},
        onSettled: (data, error) => {},
      },
    );

  return isLoading ? (
    <div>Загрузка ...</div>
  ) : (
    <>
      <div>
        <h1>{data.title}</h1>
        <h2>episode: {data.episode_id}</h2>
        <strong>description:</strong>
        <p>{data.opening_crawl}</p>
      </div>
      <button
        onClick={() =>
          queryClient.invalidateQueries([
            'film',
            url,
          ])
        }
      >
        обновить данные
      </button>
      {isFetching
        ? `Обновление ... #${count}`
        : null}
    </>
  );
};

export default FilmPage;
