import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<Type>(
  key: string,
  defaultValue: Type
): [Type, SetValue<Type>] {
  const stored = localStorage.getItem(key);
  let data: Type;
  try {
    if (stored) {
      data = JSON.parse(stored);
    } else {
      console.log('Data not found. Using initial value.');
      data = defaultValue;
    }
  } catch (err) {
    console.error(err);
    data = defaultValue;
  }
  const [value, setValue] = useState<Type>(data);
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);
  return [value, setValue];
}
