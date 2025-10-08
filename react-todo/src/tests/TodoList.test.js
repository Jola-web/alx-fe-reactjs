import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a project")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo item", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");
  fireEvent.click(todoItem);
  expect(todoItem).toHaveClass("completed");
});

test("deletes a todo item", async () => {
  render(<TodoList />);

  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[0]); // deletes "Learn React"

  await waitFor(() => {
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});

