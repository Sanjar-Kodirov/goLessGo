import { FC } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

const Root: FC = () => {
  return <App />;
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
