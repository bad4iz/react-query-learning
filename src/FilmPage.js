import React, {
  useEffect,
  useReducer,
} from 'react';
import { useQuery } from 'react-query';
import { queryClient } from './App';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom';

const FilmPageWrapper = () => {
  const { filmId } = useParams();
  const url = `https://swapi.dev/api/films/${filmId}/`;
  const [isShow, toggle] = useReducer(
    (isShow) => !isShow,
    false,
  );
  useEffect(() => {
    queryClient.prefetchQuery(['film', url], () =>
      fetchFilm(url),
    );
  });

  return (
    <>
      Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Assumenda aut debitis
      delectus deleniti eveniet id in ipsam iste,
      maxime necessitatibus optio possimus quia
      tempora. Consequuntur error excepturi sequi.
      Illum, rerum.
      <br />
      <button onClick={toggle}>
        {toggle ? 'показать детально' : 'скрыть'}
      </button>
      {isShow ? <FilmPage /> : null}
    </>
  );
};

const fetchFilm = (url) =>
  new Promise((resolve) =>
    setTimeout(resolve, 2000),
  ).then(() =>
    fetch(url).then((res) => res.json()),
  );

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
      () => fetchFilm(url),
      {
        staleTime: Infinity,
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
      <button
        onClick={() =>
          queryClient.invalidateQueries(
            ['film', url],
            {
              refetchActive: false,
            },
          )
        }
      >
        сделать наши данные старыми
      </button>
      {isFetching
        ? `Обновление ... #${count}`
        : null}
    </>
  );
};

export default FilmPageWrapper;
