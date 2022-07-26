import { FormEvent, useState } from 'react';

interface Todo {
  content: string;
  done: boolean;
  id?: number;
}

let nextId: number = 0;

let initialTodos: object[] = [
  { content: 'first task ever', done: false },
  { content: 'second task ever', done: true },
  { content: 'third task ever', done: false }
];

export function App() {
  const [tasks, setTasks] = useState([] as Todo[]);

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
    setTasks([...tasks, { content, done: false, id: nextId++ }]);
    setFormInput(formDefault);
  };

  const toggleTask = (id: number) => {
    const newTaskList = [...tasks].map(e => {
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
            </li>
          ))}
        </ul>
        <div className="list-footer">
          <div className="remaining-count">{tasks.length} tasks left</div>
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
