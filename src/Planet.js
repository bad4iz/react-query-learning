import React from 'react';
import { useQuery } from 'react-query';

const useGetPlanet = (planetURL) => {
  return useQuery(
    ['planet', planetURL],
    () => {
      return new Promise((resolve) =>
        setTimeout(resolve, 3000),
      ).then(() =>
        fetch(planetURL).then((res) =>
          res.json(),
        ),
      );
    },
    {
      enabled: !!planetURL,
      initialData: {
        name: 'initial name',
      },
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
