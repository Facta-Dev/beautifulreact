import { useState } from "react";

// The clean control: no markers. Everything here must stay quiet.
export function Counter(): React.ReactElement {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => { setCount(count + 1); }}>
      {count}
    </button>
  );
}
