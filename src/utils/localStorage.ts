export const updateLocalStorage = ({ key, value }: { key: string; value: string }) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string) => localStorage.getItem(key);
