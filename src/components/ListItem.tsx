import { useMemo } from 'react';
import { Todo } from '../lib/types';
import { PreviewImage } from './PreviewImage';

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

export function ListItem(props: {
  todo: Todo;
  toggleTask: Function;
  deleteTask: Function;
  dragDisabled: boolean;
  handleKeyDown: any;
}) {
  const {
    todo: { id, done, content, color, imageurl },
    toggleTask,
    deleteTask,
    dragDisabled,
    handleKeyDown
  } = props;
  const text = useMemo(() => addBreaks(content), [content]);
  return (
    <li tabIndex={0} onKeyDown={handleKeyDown} className={`color-${color}`}>
      <button tabIndex={-1} className="toggle" onClick={() => toggleTask(id)}>
        <i
          className={`fa-regular ${done ? 'fa-circle-check' : 'fa-circle'}`}
        ></i>
      </button>
      <div className={`content ${done ? 'done' : ''}`}>
        <div className="text">{text}</div>
        {imageurl ? <img src={imageurl} /> : <></>}
      </div>
      <button tabIndex={-1} className="delete" onClick={() => deleteTask(id)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
      {!dragDisabled && (
        <div className="handle">
          <i className="fa-solid fa-grip-lines"></i>
        </div>
      )}
    </li>
  );
}
