import { useState, useCallback } from "react";

export default function useInput(initialValue: any) {
  const [Value, setValue] = useState(initialValue);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [Value, handler, setValue];
}
