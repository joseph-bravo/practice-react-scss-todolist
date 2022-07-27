import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const localStorageKey = 'focus360challenge-tasks';

interface Todo {
  content: string;
  done: boolean;
  id?: string;
}

type TodosView = 'all' | 'active' | 'completed';

const initialTodos: object[] = [
  { content: 'first task ever', done: false },
  { content: 'second task ever', done: true },
  { content: 'third task ever', done: false }
];

function initializeTodo(todo: object) {
  return { ...todo, id: uuidv4() };
}

const jsondata = window.localStorage.getItem(localStorageKey);
let data = JSON.parse(jsondata);
if (!data) {
  data = initialTodos.map(e => initializeTodo(e));
}

export function App() {
  const [tasks, setTasks] = useState(data as Todo[]);
  const getCompletedTasks = () =>
    tasks.reduce((count: number, task) => {
      if (task.done) return count + 1;
      return count;
    }, 0);

  const [currentView, setCurrentView] = useState('all' as TodosView);
  const getFilteredTasks = () => {
    switch (currentView) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter(e => e.done === false);
      case 'completed':
        return tasks.filter(e => e.done === true);
    }
  };

  const formDefault = {
    content: ''
  };

  const [formInput, setFormInput] = useState(formDefault);

  const handleFormInputChange = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { content } = formInput;
    const id = uuidv4();
    setTasks([...tasks, { content, done: false, id }]);
    setFormInput(formDefault);
  };

  const toggleTask = (id: string) => {
    const newTaskList = tasks.map(e => {
      if (e.id === id) {
        return {
          ...e,
          done: !e.done
        };
      }
      return e;
    });
    setTasks(newTaskList);
  };

  const deleteTask = (id: string) => {
    const newTaskList = tasks.filter(e => e.id !== id);
    setTasks(newTaskList);
  };

  const deleteCompleted = () => {
    const newTaskList = tasks.filter(e => e.done === false);
    setTasks(newTaskList);
  };

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <header>
        <h1>todo list</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            value={formInput.content}
            onChange={handleFormInputChange}
            name="content"
            placeholder="What needs to be done?"
          />
        </form>
        <ul>
          {getFilteredTasks().length > 0 ? (
            getFilteredTasks().map(({ id, ...e }) => (
              <li key={id}>
                <button className="toggle" onClick={() => toggleTask(id)}>
                  <i
                    className={`fa-regular ${
                      e.done ? 'fa-circle-check' : 'fa-circle'
                    }`}
                  ></i>
                </button>
                <span className={`content ${e.done ? 'done' : ''}`}>
                  {e.content}
                </span>
                <button className="delete" onClick={() => deleteTask(id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))
          ) : (
            <li className="placeholder-todo">There's nothing here...</li>
          )}
        </ul>
        <div className="list-footer">
          <div className="remaining-count">
            {tasks.length - getCompletedTasks()} task
            {tasks.length - getCompletedTasks() === 1 ? '' : 's'} left
          </div>
          <div className="filter">
            <button
              className={`all ${currentView === 'all' ? 'selected' : ''}`}
              onClick={() => setCurrentView('all')}
            >
              all
            </button>
            <button
              className={`active ${currentView === 'active' ? 'selected' : ''}`}
              onClick={() => setCurrentView('active')}
            >
              active
            </button>
            <button
              className={`completed ${
                currentView === 'completed' ? 'selected' : ''
              }`}
              onClick={() => setCurrentView('completed')}
            >
              completed
            </button>
          </div>
          <button className="clear-completed" onClick={deleteCompleted}>
            Clear Completed
          </button>
        </div>
      </main>
    </>
  );
}
