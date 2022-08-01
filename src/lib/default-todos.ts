import { v4 as uuidv4 } from 'uuid';
import { Todo } from './types';

const dummyTodos: Todo[] = [
  { content: 'Check up on emails', done: false, color: 'red' },
  { content: 'Create Todo List', done: true, color: 'green' },
  {
    content: 'A task\nwith..\nmultiple lines!',
    done: false,
    color: 'neutral'
  },
  {
    content: 'A task with image content',
    done: true,
    color: 'blue',
    imageurl:
      'https://media-exp1.licdn.com/dms/image/C4D0BAQFwyieXHb1o4g/company-logo_200_200/0/1519922086756?e=1667433600&v=beta&t=MK07Ic-zWD5wZChsoqmoVXUgJW1raPYi5dDAqJa9hvs'
  }
];

function initializeTodo(todo: Todo): Todo {
  return { ...todo, id: uuidv4() };
}
const defaultTodos = dummyTodos.map(e => initializeTodo(e));

export default defaultTodos;
