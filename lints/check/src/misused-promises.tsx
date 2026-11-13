async function save(): Promise<void> {
  await Promise.resolve();
}

export function SaveButton(): React.ReactElement {
  return (
    // expect:@typescript-eslint/no-misused-promises
    <button type="button" onClick={async () => { await save(); }}>
      Save
    </button>
  );
}
