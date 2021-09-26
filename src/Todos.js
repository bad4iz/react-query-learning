import { useQuery } from 'react-query';
import { TodoForm } from './TodoForm';
import { Link } from 'react-router-dom';

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
          <ul key={todo.id}>
            <Link to={`/todo/${todo.id}`}>
              {todo.name}
            </Link>
          </ul>
        ))}
      </ul>

      <TodoForm />
    </div>
  );
};
