import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { TodoList } from './components/TodoList';

const keybinds: {
  header: string;
  data: { header: string; content: string }[];
}[] = [
  {
    header: 'Task Creation',
    data: [
      {
        header: 'Enter',
        content: 'While in textbox, insert task from textbox.'
      },
      {
        header: 'Shift + Enter',
        content: 'While in textbox, insert a new line.'
      },
      {
        header: 'Ctrl + 1-4',
        content: 'While in textbox, select a color for task.'
      }
    ]
  },
  {
    header: 'Task Organization',
    data: [
      {
        header: 'Up/Down Arrows',
        content: 'Move currently focused task up or down.'
      },
      {
        header: 'Enter',
        content: 'Toggle state of the currently focused task.'
      },
      {
        header: 'Backspace or Delete',
        content: 'Delete the currently focused task.'
      }
    ]
  }
];

export function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      <header>
        <h1>todo list</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <h2>Keybinds</h2>
        {keybinds.map((e, index) => {
          return (
            <div key={index}>
              <h3>{e.header}</h3>
              <ul>
                {e.data.map((e, index) => {
                  return (
                    <li key={index}>
                      <h4>{e.header}</h4>
                      <p>{e.content}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="note">
          <h2>Note</h2>
          <p>
            Sorting of tasks will not be available when filtering or searching.
          </p>
        </div>
      </footer>
    </>
  );
}
