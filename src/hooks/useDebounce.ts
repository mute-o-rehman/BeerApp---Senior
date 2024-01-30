import debounce from "@mui/material/utils/debounce";
import { useEffect, useMemo, useRef } from "react";

// Custom hook for debouncing a function callback
export const useDebounce = (callback: Function, milliSeconds = 250) => {
  // Ref to store the callback function
  const ref = useRef<Function>();

  // Updating the ref with the current callback function when it changes
  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  // Creating a debounced callback using MUI's debounce utility
  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, milliSeconds);
  }, [milliSeconds]);

  return debouncedCallback;
};
