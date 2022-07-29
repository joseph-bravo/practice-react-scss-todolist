import { Todo } from '../App';

export function ListItem({
  todo: { id, done, content },
  toggleTask,
  deleteTask
}: {
  todo: Todo;
  toggleTask: Function;
  deleteTask: Function;
}) {
  return (
    <li key={id}>
      <button className="toggle" onClick={() => toggleTask(id)}>
        <i
          className={`fa-regular ${done ? 'fa-circle-check' : 'fa-circle'}`}
        ></i>
      </button>
      <span className={`content ${done ? 'done' : ''}`}>{content}</span>
      <button className="delete" onClick={() => deleteTask(id)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}
