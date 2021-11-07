import { useState, useCallback } from "react";

export default function useToggle(initialValue: boolean) {
  const [Value, setValue] = useState(initialValue);
  const handler = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [Value, handler, setValue] as const;
}
