import React, { useId, useState } from "react";
import "./Tabs.css";

export default function Tabs({ tabs }) {
  const baseId = useId();
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__bar" role="tablist" aria-label="Property info tabs">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            id={`${baseId}-tab-${idx}`}
            className={idx === active ? "tabs__tab isActive" : "tabs__tab"}
            role="tab"
            aria-selected={idx === active}
            aria-controls={`${baseId}-panel-${idx}`}
            onClick={() => setActive(idx)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t, idx) => (
        <section
          key={t.label}
          id={`${baseId}-panel-${idx}`}
          className={idx === active ? "tabs__panel isActive" : "tabs__panel"}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${idx}`}
          hidden={idx !== active}
        >
          {t.content}
        </section>
      ))}
    </div>
  );
}
