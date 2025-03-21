import { useEffect, useState } from "react";

export const useLocalStorageFilters = (key: string) => {
  const [filterValues, setFilterValue] = useState<string | null>(null);

  useEffect(() => {
    const getStoredValue = () => sessionStorage.getItem(key);
    setFilterValue(getStoredValue());

    const handleStorageChange = () => {
      setFilterValue(getStoredValue());
    };

    const interval = setInterval(handleStorageChange, 500);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return filterValues ? JSON.parse(filterValues) : [];
};