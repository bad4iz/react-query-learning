import { useQuery } from 'react-query';
import { useState } from 'react';

const useGetFilms = () =>
  useQuery('films', async () => {
    return fetch(
      'http://swapi.dev/api/films',
    ).then((res) => res.json());
  });

const useGetFilm = (film) =>
  useQuery(
    film,
    async () => {
      return fetch(
        `http://swapi.dev/api/films?search=${film}`,
      ).then((res) => res.json());
    },
    {
      enabled: !!film,
    },
  );

const SearchFilm = ({ film }) => {
  const {
    data: { results = [] } = {},
    isLoading,
    error,
    isError,
    isFetching,
  } = useGetFilm(film);

  return (
    <div>
      {' '}
      {isLoading
        ? 'Loading ...'
        : isError
        ? error.message
        : results.map((film) => (
            <div key={film.title}>
              {film.title}
            </div>
          ))}
      <br />
      {isFetching ? 'Обновление ...' : null}
    </div>
  );
};

const Films = ({ queryKey }) => {
  const [film, setFilm] = useState('');

  return (
    <div>
      <input
        type="text"
        value={film}
        onChange={(e) => setFilm(e.target.value)}
      />
      <SearchFilm film={film} />
    </div>
  );
};

export default Films;
