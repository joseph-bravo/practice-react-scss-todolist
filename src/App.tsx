import { FC } from 'react';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  return (
    <>
      <header>
        <h1>todo list</h1>
      </header>
      <main>
        <TodoList />
      </main>
    </>
  );
};
