import { useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from './App';

export const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const onChangeInput = ({
    target: { value = '' } = {},
  }) => setTodo(value);

  const  {mutate, ...other} = useMutation(
    (todo)=>
    fetch('api/todos', {
    method: 'POST',
    body: todo,
  }), {
      onSuccess: ()=>{
        setTodo('')
        queryClient.invalidateQueries('todos')
      }
    })

  return (
    <div>
      <input
        type="text"
        value={todo}
        disabled={other.isLoading}
        onChange={onChangeInput}
      />
      <button onClick={()=>mutate(todo)}>{
        other.isLoading
          ? 'сохранение'
          : other.isError
          ? 'ошибка запроса'
          : other.isSuccess
          ? 'сохранено'
          : 'сохранить'
      }</button>
    </div>
  );
};

