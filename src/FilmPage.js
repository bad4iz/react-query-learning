import React from 'react';
import { useQuery } from 'react-query';
import { queryClient } from './App';

const useGetFilm = (url) =>
  useQuery(['film', url], () =>
    new Promise((resolve) =>
      setTimeout(resolve, 2000),
    ).then(() =>
      fetch(url).then((res) => res.json()),
    ),
  );

const FilmPage = ({ url }) => {
  const { data, isLoading, isFetching } =
    useGetFilm(url);

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
      {isFetching ? 'Обновление ...' : null}
    </>
  );
};

export default FilmPage;
