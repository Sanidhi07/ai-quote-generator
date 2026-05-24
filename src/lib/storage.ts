import { Quote } from "./types";

const HISTORY_KEY = "quote_history";

export const getHistory = (): Quote[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveToHistory = (quote: Quote): void =>  {
  if (typeof window === "undefined") return; // Ensure we're in a browser environment

  const history = getHistory();

  const filteredHistory = history.filter(item => item.text !== quote.text);
  const updatedHistory = [quote, ...filteredHistory].slice(0, 5);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

}

