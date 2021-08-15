import { useState } from 'react';
import FilmPage from './FilmPage';
import { useQuery } from 'react-query';

const useGetFilms = () =>
  useQuery(['films'], () =>
    fetch('http://swapi.dev/api/films').then(
      (res) => res.json(),
    ),
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
      {data?.results?.map((film) => (
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
