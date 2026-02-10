import { Pagination } from "@dummy-products/ui-kit";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("renders current window of pages and marks current page", () => {
    render(<Pagination currentPage={3} totalPages={10} />);

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 5" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Page 6" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("fires onPageChange for next and direct page click", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} onPageChange={onPageChange} totalPages={10} />
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith({ page: 4 });

    await user.click(screen.getByRole("button", { name: "Page 5" }));
    expect(onPageChange).toHaveBeenCalledWith({ page: 5 });
  });

  it("disables previous button on first page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} onPageChange={onPageChange} totalPages={3} />
    );

    const prevButton = screen.getByRole("button", { name: "Previous page" });
    expect(prevButton).toBeDisabled();

    await user.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables next button on last page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} onPageChange={onPageChange} totalPages={3} />
    );

    const nextButton = screen.getByRole("button", { name: "Next page" });
    expect(nextButton).toBeDisabled();

    await user.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("allows recovering to valid page when currentPage is out of range", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} onPageChange={onPageChange} totalPages={1} />
    );

    const prevButton = screen.getByRole("button", { name: "Previous page" });
    expect(prevButton).toBeEnabled();

    await user.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith({ page: 1 });
  });
});
