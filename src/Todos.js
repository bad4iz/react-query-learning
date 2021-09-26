import fetchMock from 'fetch-mock';
import { useQuery } from 'react-query';
import { TodoForm } from './TodoForm';
const todosMock = ['прочитать', 'обновить'];
fetchMock.get('api/todos', todosMock);
fetchMock.post('api/todos', async (_, res) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 200),
  );
  const wrongWord = ['курить', 'выпить'];
  const isWrong = wrongWord.includes(res.body);
  if (isWrong) {
    return new Response('', {
      status: 400,
      statusText: 'this is a bad thing',
    });
  }
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
      <h3>
        Мой список дел{isFetching ? '...' : null}
      </h3>
      <ul>
        {todos.map((todo) => (
          <ul key={todo}>{todo}</ul>
        ))}
      </ul>

      <TodoForm />
    </div>
  );
};
