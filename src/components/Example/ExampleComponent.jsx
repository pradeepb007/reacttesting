// TableData.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handler";
import TableData from "./TableData";
import { TextEncoder } from "util"; // Add polyfill for TextEncoder

test("displays Data from Server", async () => {
  global.TextEncoder = TextEncoder; // Polyfill for TextEncoder
  const server = setupServer(...handlers);
  server.listen();

  render(<TableData />);

  await waitFor(() => {
    const dataElement = screen.getByText(/Leanne Graham/i);
    expect(dataElement).toBeInTheDocument();
  });

  server.close();
});
