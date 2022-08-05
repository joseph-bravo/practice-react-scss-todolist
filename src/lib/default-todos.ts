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
      'https://c.tenor.com/Z5wTNShAZnsAAAAC/cat-dance.gif'
  }
];

function initializeTodo(todo: Todo): Todo {
  return { ...todo, id: uuidv4() };
}
const defaultTodos = dummyTodos.map(e => initializeTodo(e));

export default defaultTodos;
