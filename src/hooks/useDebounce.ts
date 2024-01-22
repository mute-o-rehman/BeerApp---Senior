import debounce from "@mui/material/utils/debounce";
import { useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: Function, milliSeconds = 250) => {
  const ref = useRef<Function>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, milliSeconds);
  }, [milliSeconds]);

  return debouncedCallback;
};
