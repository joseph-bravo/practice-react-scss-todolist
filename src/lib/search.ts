import { Todo } from '../App';

/**
 * Filters out Todo objects given an array of Todos and a query string.
 * @param todos Array of Todo objects.
 * @param query String to search within todo.content.
 */
export default function searchTodos(todos: Todo[], query: string): Todo[] {
  return todos.filter(todo => {
    const { content } = todo;
    if (
      content
        .toLowerCase()
        .replace(/ /g, '')
        .indexOf(query.toLowerCase().replace(/ /g, '')) === -1
    ) {
      return false;
    }
    return true;
  });
}
