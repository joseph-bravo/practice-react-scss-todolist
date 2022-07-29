import { FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import searchTodos from './lib/search';
import { ListItem } from './components/ListItem';
import useAutoAnimateCustom from './lib/hooks/useAutoAnimateCustom';
const localStorageKey = 'focus360challenge-tasks';

export interface Todo {
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
  console.log('No local data found. Initializing dummy data.');
  data = initialTodos.map(e => initializeTodo(e));
}

export function App() {
  const [tasks, setTasks] = useState(data as Todo[]);
  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  const getCompletedTasks = () =>
    tasks.reduce((count: number, task) => {
      if (task.done) return count + 1;
      return count;
    }, 0);

  const [query, setQuery] = useState('');
  const [currentView, setCurrentView] = useState('all' as TodosView);
  const getFilteredTasks = () => {
    switch (currentView) {
      case 'all':
        return searchTodos(tasks, query);
      case 'active':
        return searchTodos(tasks, query).filter(e => e.done === false);
      case 'completed':
        return searchTodos(tasks, query).filter(e => e.done === true);
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
    console.log(content.trim());
    setTasks([...tasks, { content: content.trim(), done: false, id }]);
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

  const list = useAutoAnimateCustom();
  const form = useRef(null);
  return (
    <>
      <header>
        <h1>todo list</h1>
      </header>
      <main>
        <div className="main-card">
          <form onSubmit={handleSubmit} ref={form}>
            <textarea
              required
              value={formInput.content}
              onChange={handleFormInputChange}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  form.current.requestSubmit();
                }
              }}
              name="content"
              placeholder="What needs to be done? (CTRL + Enter to add)"
            />
          </form>
          <ul ref={list}>
            {getFilteredTasks().length > 0 ? (
              getFilteredTasks().map(todo => (
                <ListItem
                  key={todo.id}
                  todo={todo}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              ))
            ) : (
              <li key={'placeholder'} className="placeholder-todo">
                <span className="content">There's nothing here...</span>
              </li>
            )}
          </ul>
          <input
            type="text"
            className="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for tasks..."
          />
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
                className={`active ${
                  currentView === 'active' ? 'selected' : ''
                }`}
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
        </div>
      </main>
    </>
  );
}
