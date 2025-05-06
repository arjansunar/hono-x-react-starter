import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { demoApi } from "../data/index.ts";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  useEffect(() => {
    demoApi().then(console.log);
  }, []);

  return <div className="p-2">Hello from About!</div>;
}
