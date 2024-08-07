import { useEffect } from "react";

export const useKey = (key: string, func: () => void) => {
  useEffect(() => {
    const onKeyPressed = (e: KeyboardEvent) => {
      if (e.code === key) {
        func();
      }
    };
    document.addEventListener("keydown", onKeyPressed);

    return () => document.removeEventListener("keydown", onKeyPressed);
  }, [key, func]);
};
