import fetchMock from 'fetch-mock';

const todosMock = [
  { id: 1, name: 'прочитать' },
  { id: 2, name: 'обновить' },
];
const wrongWord = ['курить', 'выпить'];

// todos
fetchMock.get('api/todos', todosMock);

fetchMock.post('api/todos', (_, res) => {
  const isWrong = wrongWord.includes(res.body);
  if (isWrong) {
    return {
      throws: new TypeError('Это плохое дело'),
    };
  }
  todosMock.push(res.body);
  return 200;
});

// todo
fetchMock.get('express:/api/todos/:id', (url) => {
  const id = url.split('/').pop();

  return todosMock.find(
    (item) => +item.id === +id,
  );
});

fetchMock.put('api/todos', (_, res) => {
  const isWrong = wrongWord.includes(
    res.body.name,
  );
  if (isWrong) {
    return {
      throws: new TypeError('Это плохое дело'),
    };
  }

  const { name, id } = res.body;
  todosMock.forEach((todo) => {
    if (+todo.id === +id) {
      todo.name = name;
    }
  });

  return res.body;
});
