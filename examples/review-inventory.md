# A worked review: the inventory screen

The subject is a small screen that lists inventory items and lets the user
archive one. It compiles, it works on the happy path, and it has four
findings that a review must rank in a useful order. The fixed version follows
the contract in `react-best-practices`.

## The module under review

```tsx
// src/features/inventory/views/InventoryView.tsx
import { useEffect, useState } from "react";

export function InventoryView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/v1/app/inventory/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function archive(id: string) {
    await fetch(`/api/v1/app/inventory/items/${id}/archive`, { method: "POST" });
    setItems(items.filter((item) => item.id !== id));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Inventory</h1>
      {items.map((item, index) => (
        <div key={index} onClick={() => void archive(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## The report

### Verdict

The screen renders, but it breaks the architecture contract, loses the error
state, and exposes the archive action on a non-interactive element. Not safe
to merge as is; the layer violation is the first fix because it is the one
the next feature will copy.

### Must fix

1. `InventoryView.tsx:9` — the **View** calls `fetch` and builds a URL by
   hand. Rule: *the View never talks to the network; the ViewModel calls the
   SDK*. Fix: move the request to `useInventory()`; the view calls
   `refresh()`.
2. `InventoryView.tsx:18` — the archive call ignores the response and the
   failure path. Rule: *every mutation has a designed failure and a visible
   rollback*. Fix: call `archive(id)` on the ViewModel; it removes the row
   optimistically and restores it on error.
3. `InventoryView.tsx:24` — a clickable `div`. Rule: *an interactive element
   is a real control with a name and keyboard behavior*. Fix: a `<button
   type="button">` inside the row, or an `<a>` to the item.
4. `InventoryView.tsx:26` — `key={index}` on a reorderable list. Rule: *keys
   are identity, not position*. Fix: `key={item.id}`.

### Should fix

5. `InventoryView.tsx:11` — three booleans model one screen; `error` is
   never set, so the error branch is dead code. Fix: one discriminated union
   (`loading | empty | ready | forbidden | error`).
6. `InventoryView.tsx:9` — the effect has no abort or cleanup; a slow first
   response can overwrite a newer one. Fix: the query layer owns cancellation
   and cache keys.
7. `InventoryView.tsx:24` — the list has no empty state and no heading
   association. Fix: render `empty` explicitly; the `<h1>` is fine once the
   list is a real list.

### Waived gates

None. The diff does not touch the lint config, the tests, or the `tsconfig`.

## The fixed module

```tsx
// src/features/inventory/viewmodels/useInventory.ts
import { useState } from "react";
import { sdk } from "@/sdk";
import type { InventoryItem } from "../contracts";

export type InventoryState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "ready"; rows: InventoryItem[] }
  | { status: "forbidden"; requiredPermission?: string }
  | { status: "error"; correlationId?: string };

export function useInventory(): {
  state: InventoryState;
  refresh: () => Promise<void>;
  archive: (id: string) => Promise<void>;
} {
  const [state, setState] = useState<InventoryState>({ status: "loading" });

  async function refresh(): Promise<void> {
    setState({ status: "loading" });
    const result = await sdk.app.inventory.items.list();
    if (!result.ok) {
      setState(
        result.error.code === "FORBIDDEN"
          ? { status: "forbidden", requiredPermission: result.error.requiredPermission }
          : { status: "error", correlationId: result.error.correlationId },
      );
      return;
    }
    setState(
      result.data.length === 0
        ? { status: "empty" }
        : { status: "ready", rows: result.data },
    );
  }

  async function archive(id: string): Promise<void> {
    const result = await sdk.app.inventory.items.archive(id);
    if (!result.ok) {
      setState({ status: "error", correlationId: result.error.correlationId });
      return;
    }
    await refresh();
  }

  return { state, refresh, archive };
}
```

```tsx
// src/features/inventory/views/InventoryView.tsx
import type { ReactElement } from "react";
import { useInventory } from "../viewmodels/useInventory";

export function InventoryView(): ReactElement {
  const { state, refresh, archive } = useInventory();

  switch (state.status) {
    case "loading":
      return <p>Loading…</p>;
    case "empty":
      return <p>No inventory items yet.</p>;
    case "forbidden":
      return <p>You do not have permission to view inventory.</p>;
    case "error":
      return (
        <p>
          Something went wrong.{" "}
          <button type="button" onClick={() => void refresh()}>Retry</button>
        </p>
      );
    case "ready":
      return (
        <section>
          <h1>Inventory</h1>
          <ul>
            {state.rows.map((item) => (
              <li key={item.id}>
                {item.name}{" "}
                <button type="button" onClick={() => void archive(item.id)}>
                  Archive
                </button>
              </li>
            ))}
          </ul>
        </section>
      );
  }
}
```

## What changed, and why it matters

| Finding | The fixed version |
|---|---|
| Fetch in the View | `useInventory` calls the SDK; the View calls commands |
| Hand-written URL | `sdk.app.inventory.items` mirrors the route contract |
| Optimistic archive with no rollback | the ViewModel refreshes and surfaces the failure |
| Clickable `div` | a real `<button>` with a name |
| `key={index}` | `key={item.id}` |
| Three booleans, dead error branch | one union, every state rendered |
| No abort / cleanup | the SDK/query layer owns cancellation |

The review is short on purpose. Seven findings, each with a location, a rule,
and a fix, is a better review than thirty comments that repeat the same
contract in different words.
