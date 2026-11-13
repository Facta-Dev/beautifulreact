import { useState } from "react";

export function Conditional({ ok }: { ok: boolean }): React.ReactElement {
  if (ok) {
    // expect:react-hooks/rules-of-hooks
    const [count] = useState(0);
    return <span>{count}</span>;
  }
  return <span>off</span>;
}
