import fetchMock from 'fetch-mock';
import { useQuery } from 'react-query';
import { TodoForm } from './TodoForm';
const todosMock = ['прочитать', 'обновить'];
fetchMock.get('api/todos', todosMock);
fetchMock.post('api/todos', (_, res) => {
  todosMock.push(res.body);
  return 200;
});

export const Todos = () => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
  } = useQuery(['todos'], async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, 2000),
    );
    return fetch('api/todos').then((res) =>
      res.json(),
    );
  });

  return isLoading ? (
    'загрузка...'
  ) : (
    <div>
      <ul>
        {todos.map((todo) => (
          <ul key={todo}>{todo}</ul>
        ))}
      </ul>
      {isFetching ? 'обновление...' : null}
      <TodoForm />
    </div>
  );
};
