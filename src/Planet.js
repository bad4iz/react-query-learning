import React from 'react';
import { useQuery } from 'react-query';

const useGetPlanet = (planetURL) => {
  return useQuery(
    ['planet', planetURL],
    () => {
      return fetch(planetURL).then((res) =>
        res.json(),
      );
    },
    {
      enabled: !!planetURL,
    },
  );
};

export const Planet = ({ planetUrl }) => {
  const { data, isLoading } =
    useGetPlanet(planetUrl);

  return (
    <div>
      planet: {isLoading ? '...' : data.name}
    </div>
  );
};
