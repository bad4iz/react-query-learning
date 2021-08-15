import React from 'react';
import { useQuery } from 'react-query';

const useGetFilm = (url) =>
  useQuery(['film', url], () =>
    fetch(url).then((res) => res.json()),
  );

const FilmPage = ({ url }) => {
  const { data } = useGetFilm(url);

  return data ? (
    <div>
      <h1>{data.title}</h1>
      <h2>episode: {data.episode_id}</h2>
      <strong>description:</strong>
      <p>{data.opening_crawl}</p>
    </div>
  ) : null;
};

export default FilmPage;
