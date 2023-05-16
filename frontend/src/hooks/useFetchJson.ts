import { useEffect, useState } from 'react';

const useFetchJson = (url: string): [never[]] => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Request failed');
        }
      const data = await response.json();
      setItems(data);

    })();
  }, [url]);

  return [items];
};

export default useFetchJson;