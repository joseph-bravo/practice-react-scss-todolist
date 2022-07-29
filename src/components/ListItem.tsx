import { useMemo } from 'react';
import { Todo } from '../App';

function addBreaks(string: string) {
  const split = string.split('\n');
  return split.map((string, index) => {
    if (index) {
      return (
        <span key={index}>
          <br />
          {string}
        </span>
      );
    }
    return <span key={index}>{string}</span>;
  });
}

export function ListItem(props) {
  const {
    todo: { id, done, content },
    toggleTask,
    deleteTask
  } = props;
  const text = useMemo(() => addBreaks(content), [content]);
  console.log('hi');
  return (
    <li>
      <button className="toggle" onClick={() => toggleTask(id)}>
        <i
          className={`fa-regular ${done ? 'fa-circle-check' : 'fa-circle'}`}
        ></i>
      </button>
      <span className={`content ${done ? 'done' : ''}`}>{text}</span>
      <button className="delete" onClick={() => deleteTask(id)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}
