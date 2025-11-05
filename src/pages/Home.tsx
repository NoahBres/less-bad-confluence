import React from "react";
import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div>
      <h1>Less Bad Confluence</h1>
      <p>Welcome to your confluence workspace.</p>

      <div>
        <h2>Recent Spaces</h2>
        <ul>
          <li>
            <Link to="/spaces/$spaceKey" params={{ spaceKey: "DEMO" }}>
              Demo Space
            </Link>
          </li>
          <li>
            <Link to="/spaces/$spaceKey" params={{ spaceKey: "PROJ" }}>
              Project Space
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
