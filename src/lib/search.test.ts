import searchTodos from './search';
import { Todo } from '../App';

const array: Todo[] = [
  { content: 'first task ever', done: false },
  { content: 'yet another task', done: true },
  { content: 'third task ever', done: false }
];

describe('searchTodos returns array of Todo objects where content includes query string.', () => {
  test('querying "ever"', () => {
    const result = searchTodos(array, 'ever');
    expect(result).toEqual([
      { content: 'first task ever', done: false },
      { content: 'third task ever', done: false }
    ]);
  });

  test('querying "TaS"', () => {
    const result = searchTodos(array, 'TaS');
    expect(result).toEqual([
      { content: 'first task ever', done: false },
      { content: 'yet another task', done: true },
      { content: 'third task ever', done: false }
    ]);
  });

  test('querying "   k   ever"', () => {
    const result = searchTodos(array, '   k   ever');
    expect(result).toEqual([
      { content: 'first task ever', done: false },
      { content: 'third task ever', done: false }
    ]);
  });
});
