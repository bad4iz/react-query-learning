import { useState } from 'react';
import FilmPage from './FilmPage';
import { useQuery } from 'react-query';
import { queryClient } from './App';

const useGetFilms = () =>
  useQuery(['films'], () =>
    fetch('http://swapi.dev/api/films')
      .then((res) => res.json())
      .then(({ results }) => {
        results.forEach((film) =>
          queryClient.setQueryData(
            ['film', film.url],
            film,
          ),
        );
        return results;
      }),
  );

const Films = ({ queryKey }) => {
  const [filmUrl, setFilmUrl] = useState('');

  const { data } = useGetFilms();

  return filmUrl ? (
    <>
      <button onClick={() => setFilmUrl('')}>
        back
      </button>
      <FilmPage url={filmUrl} />
    </>
  ) : (
    <ul>
      {data?.map((film) => (
        <li key={film.url}>
          <b>Film:</b>
          <a
            href="#"
            onClick={() => setFilmUrl(film.url)}
          >
            {film.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Films;
