import { Todo, TodosView } from './lib/types';
import {
  FormEvent,
  useRef,
  useState,
  useMemo,
  FC,
  useEffect,
  FocusEvent,
  KeyboardEventHandler
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactSortable } from 'react-sortablejs';
import { ListItem } from './components/ListItem';
import useLocalStorage from './lib/hooks/useLocalStorage';
import defaultTodos from './lib/default-todos';
import searchTodos from './lib/search';
import shiftArray from './lib/shift-array';

const localStorageKey = 'focus360challenge-tasks';
const colorOptions = ['red', 'green', 'blue', 'neutral'];
const formSchema = { content: '', color: 'neutral' };

export const App: FC = () => {
  const [tasks, setTasks] = useLocalStorage<Todo[]>(
    localStorageKey,
    defaultTodos
  );

  const getCompletedTasks = () =>
    tasks.reduce((count: number, task) => {
      if (task.done) return count + 1;
      return count;
    }, 0);

  const [query, setQuery] = useState('');
  const [currentView, setCurrentView] = useState('all' as TodosView);

  const currentVisibleTasks = useMemo(() => {
    switch (currentView) {
      case 'all':
        if (query) {
          return searchTodos(tasks, query);
        }
        return tasks;
      case 'active':
        return searchTodos(tasks, query).filter(e => e.done === false);
      case 'completed':
        return searchTodos(tasks, query).filter(e => e.done === true);
    }
  }, [tasks, query, currentView]);

  const form = useRef(null);
  const textarea = useRef(null);
  const [formInput, setFormInput] = useState(formSchema);

  const handleFormInputChange = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { content, color } = formInput;
    const id = uuidv4();
    setTasks([...tasks, { content: content.trim(), done: false, color, id }]);
    setFormInput({ ...formInput, content: '' });
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

  const handleKeyDown = (e: KeyboardEvent, itemIndex: number) => {
    if (e.key === 'ArrowDown' && itemIndex !== tasks.length - 1) {
      const newArray = shiftArray(tasks, itemIndex, 1);
      setTasks(newArray);
      return;
    }
    if (e.key === 'ArrowUp' && itemIndex !== 0) {
      const newArray = shiftArray(tasks, itemIndex, -1);
      setTasks(newArray);
      return;
    }
  };

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
                if (e.key === 'Enter' && e.shiftKey) {
                  return;
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  form.current.requestSubmit();
                }
              }}
              name="content"
              placeholder="What needs to be done? (Enter to Add, Shift + Enter for New Line)"
              ref={textarea}
            />
            <div className="controls">
              <div className="color-selection">
                {colorOptions.map(color => {
                  return (
                    <button
                      key={color}
                      onClick={e => {
                        e.preventDefault();
                        handleFormInputChange({
                          target: { name: 'color', value: color }
                        });
                        textarea.current.focus();
                      }}
                      name="color"
                      value={color}
                      className={`color-select-${color} ${
                        formInput.color === color ? 'selected' : ''
                      }`}
                    />
                  );
                })}
              </div>
              <button type="submit">add</button>
            </div>
          </form>
          {currentVisibleTasks.length > 0 ? (
            <ReactSortable
              tag={'ul'}
              animation={200}
              list={tasks as any}
              setList={setTasks as any}
              disabled={currentView !== 'all' || query.trim() !== ''}
              handle={'.handle'}
            >
              {currentVisibleTasks.map((todo, index) => (
                <ListItem
                  handleKeyDown={e => handleKeyDown(e, index)}
                  key={todo.id}
                  todo={todo}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  dragDisabled={currentView !== 'all' || query.trim() !== ''}
                />
              ))}
            </ReactSortable>
          ) : (
            <ul>
              <li key={'placeholder'} className="placeholder-todo">
                <span className="content">There's nothing here...</span>
              </li>
            </ul>
          )}

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
};
