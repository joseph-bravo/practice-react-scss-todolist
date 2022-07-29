import { v4 as uuidv4 } from 'uuid';
import { Todo } from './types';

const dummyTodos: Todo[] = [
  { content: 'first task ever', done: false, color: 'red' },
  { content: 'second task ever', done: true, color: 'green' },
  { content: 'third task ever', done: false, color: 'neutral' }
];

function initializeTodo(todo: Todo): Todo {
  return { ...todo, id: uuidv4() };
}
const defaultTodos = dummyTodos.map(e => initializeTodo(e));

export default defaultTodos;
