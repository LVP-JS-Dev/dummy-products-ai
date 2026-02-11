"use client";

import { Button, Modal, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const base = states.modal.DefaultOpen;
  const [open, setOpen] = useState<boolean>(true);
  const [dismissible, setDismissible] = useState<boolean>(
    Boolean(base.dismissible)
  );
  const [size, setSize] = useState<"sm" | "md" | "lg">(base.size ?? "md");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button
          onPress={() => setOpen(true)}
          text="Open modal"
          variant="blue"
        />
        <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <input
            checked={dismissible}
            onChange={(event) => setDismissible(event.target.checked)}
            type="checkbox"
          />
          <span>Dismissible</span>
        </label>
        <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span>Size</span>
          <select
            onChange={(event) =>
              setSize(event.target.value as "sm" | "md" | "lg")
            }
            value={size}
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </label>
      </div>

      <Modal
        closeAriaLabel={base.closeAriaLabel}
        description={base.description}
        dismissible={dismissible}
        onClose={() => setOpen(false)}
        open={open}
        size={size}
        title={base.title}
      >
        <div style={{ fontFamily: "var(--ui-font-body)", fontSize: 14 }}>
          This modal is rendered via UI Kit `Modal` and demonstrates focus trap
          and escape/backdrop closing behavior.
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onPress={() => setOpen(false)} text="Close" variant="blue" />
        </div>
      </Modal>
    </div>
  );
}

export const story = { WithControl };
