import { useState } from "react";
import { getCarsByPlate } from "../api/carApi";

export function useSearchByPlate() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 2) return setResults([]);

    try {
      const res = await getCarsByPlate(text);
      setResults(res?.data?.data || []);
    } catch (err) {
      console.error('Error al buscar:', err);
      setResults([]);
    }
  };

  return { query, results, handleSearch, setQuery };
}