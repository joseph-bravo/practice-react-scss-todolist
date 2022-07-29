import { v4 as uuidv4 } from 'uuid';
import { Todo } from './types';

const dummyTodos: Todo[] = [
  { content: 'first task ever', done: false },
  { content: 'second task ever', done: true },
  { content: 'third task ever', done: false }
];

function initializeTodo(todo: Todo): Todo {
  return { ...todo, id: uuidv4() };
}
const defaultTodos = dummyTodos.map(e => initializeTodo(e));

export default defaultTodos;
