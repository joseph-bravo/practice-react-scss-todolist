import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  content: string;
  done: boolean;
  id?: string;
}
let initialTodos: object[] = [
  { content: 'first task ever', done: false },
  { content: 'second task ever', done: true },
  { content: 'third task ever', done: false }
];

export function App() {
  const [tasks, setTasks] = useState([] as Todo[]);
  const getCompletedTasks = () =>
    tasks.reduce((count: number, task) => {
      if (task.done) return count + 1;
      return count;
    }, 0);

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
          {tasks.map(({ id, ...e }) => (
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
          ))}
        </ul>
        <div className="list-footer">
          <div className="remaining-count">
            {tasks.length - getCompletedTasks()} task
            {tasks.length - getCompletedTasks() === 1 ? '' : 's'} left
          </div>
          <div className="filter">
            <button>all</button>
            <button>active</button>
            <button>complete</button>
          </div>
          <button className="clear-completed">Clear Completed</button>
        </div>
      </main>
    </>
  );
}
