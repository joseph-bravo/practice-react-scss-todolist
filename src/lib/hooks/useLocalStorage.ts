import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, defaultValue: any) {
  const localData = localStorage.getItem(key);
  const [data, setData] = useState(
    localData ? JSON.parse(localData) : defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);
  return [data, setData];
}
