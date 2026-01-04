// React hooks
import { useId, useState } from "react";

// Styles
import "./Tabs.css";

// Tabs component
export default function Tabs({ tabs }) {

  // Unique base ID
  const baseId = useId();

  // Active tab index
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">

      {/* Tab buttons */}
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

      {/* Tab panels */}
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