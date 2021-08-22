import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from './App';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom';

const FilmPage = () => {
  const { filmId } = useParams();
  const history = useHistory();
  const [count, increment] = useReducer(
    (c) => c + 1,
    0,
  );

  const url = `https://swapi.dev/api/films/${filmId}/`;

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
        <>
          <button
            onClick={() => history.goBack()}
          >
            back
          </button>
        </>
        <h1>{data.title}</h1>
        <h2>episode: {data.episode_id}</h2>
        <strong>description:</strong>
        <p>{data.opening_crawl}</p>
      </div>
      {isFetching
        ? `Обновление ... #${count}`
        : null}
    </>
  );
};

export default FilmPage;
