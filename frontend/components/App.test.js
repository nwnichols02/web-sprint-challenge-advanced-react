import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

beforeEach(() => {
  render(<AppFunctional />);
});

test("sanity", () => {
  expect(true).toBe(true);
});

test("Coordinates render correctly", () => {
  const coords = screen.queryByText("Coordinates (2, 2)");
  expect(coords).toBeInTheDocument();
});

test("Left button renders", () => {
  const leftBtn = screen.getByText("LEFT");
  expect(leftBtn).toBeInTheDocument();
});

test("Down button renders", () => {
  const downBtn = screen.getByText("DOWN");
  expect(downBtn).toBeInTheDocument();
});

test("Right button hits wall and message displays", () => {
  const rightBtn = screen.getByText("RIGHT");
  fireEvent.click(rightBtn);
  fireEvent.click(rightBtn);
  const messageErrRight = screen.getByText(`You can't go right`);
  expect(messageErrRight).toBeVisible();
});

test("Up button hits wall and message displays", () => {
  const upBtn = screen.getByText("UP");
  fireEvent.click(upBtn);
  fireEvent.click(upBtn);
  const messageErrUp = screen.getByText(`You can't go up`);
  expect(messageErrUp).toBeVisible();
});

test("Input valid email into form", () => {
  const input = screen.queryByPlaceholderText("type email");
  fireEvent.change(input, { target: { value: "stevethesheep@baa.com" } });
  expect(input).toHaveValue("stevethesheep@baa.com");
});

