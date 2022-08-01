import searchTodos from './search';
import { Todo } from './types';

const array: Todo[] = [
  { content: 'first task ever', done: false, color: 'neutral' },
  { content: 'yet another task', done: true, color: 'neutral' },
  { content: 'third task ever', done: false, color: 'neutral' }
];

describe('searchTodos returns array of Todo objects where content includes query string.', () => {
  test('querying "ever"', () => {
    const result = searchTodos(array, 'ever');
    expect(result).toEqual([
      { content: 'first task ever', done: false, color: 'neutral' },
      { content: 'third task ever', done: false, color: 'neutral' }
    ]);
  });

  test('querying "TaS"', () => {
    const result = searchTodos(array, 'TaS');
    expect(result).toEqual([
      { content: 'first task ever', done: false, color: 'neutral' },
      { content: 'yet another task', done: true, color: 'neutral' },
      { content: 'third task ever', done: false, color: 'neutral' }
    ]);
  });

  test('querying "   k   ever"', () => {
    const result = searchTodos(array, '   k   ever');
    expect(result).toEqual([
      { content: 'first task ever', done: false, color: 'neutral' },
      { content: 'third task ever', done: false, color: 'neutral' }
    ]);
  });
});
