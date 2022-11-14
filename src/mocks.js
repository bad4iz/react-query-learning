import fetchMock from 'fetch-mock';

const todosMock = [
  { id: 1, name: 'прочитать' },
  { id: 2, name: 'обновить' },
  { id: 3, name: 'обновить 3' },
];
const wrongWord = ['курить', 'выпить'];

// todos
fetchMock.get('begin:/api/todos', async (url) => {
  console.log(url);
  await new Promise((resolve) =>
    setTimeout(resolve, 1000),
  );
  return new Array(10).fill(1).map((item) => ({
    id: Math.random() * 100,
    name: Math.random() * 100,
  }));
});

fetchMock.post('api/todos', async (_, res) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 3000),
  );
  const isWrong = wrongWord.includes(res.body);
  if (isWrong) {
    return {
      throws: new TypeError('Это плохое дело'),
    };
  }
  todosMock.push({
    id: new Date().getTime(),
    name: res.body,
  });
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
