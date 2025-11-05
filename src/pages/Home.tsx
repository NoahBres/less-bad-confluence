import React from "react";
import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">Less Bad Confluence</h1>
        <p className="text-lg text-muted-foreground mb-8">Welcome to your confluence workspace.</p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Recent Spaces</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/spaces/$spaceKey"
                params={{ spaceKey: "DEMO" }}
                className="text-primary hover:text-primary/80 underline text-lg transition-colors"
              >
                Demo Space
              </Link>
            </li>
            <li>
              <Link
                to="/spaces/$spaceKey"
                params={{ spaceKey: "PROJ" }}
                className="text-primary hover:text-primary/80 underline text-lg transition-colors"
              >
                Project Space
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
