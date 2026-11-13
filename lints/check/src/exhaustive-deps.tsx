import { useEffect, useState } from "react";

export function Deps({ id }: { id: string }): React.ReactElement {
  const [length, setLength] = useState(0);
  useEffect(() => {
    setLength(id.length);
    // expect:react-hooks/exhaustive-deps
  }, []);
  return <span>{length}</span>;
}
