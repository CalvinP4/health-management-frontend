import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./RegisterV2";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import React from "react";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Register Page", () => {
  test("renders Register Page correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("middleName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("dob")).toBeInTheDocument();
    expect(screen.getByTestId("phoneNo")).toBeInTheDocument();
    expect(screen.getByTestId("age")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  test("when a patient registers, it sends a POST request to the correct endpoint", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: { id: 1 },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("middleName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByTestId("dob"), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByTestId("phoneNo"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByTestId("age"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`,
        {
          firstName: "John",
          middleName: "Doe",
          lastName: "Smith",
          dob: "1990-01-01",
          phoneNo: "1234567890",
          age: "30",
          address: "123 Main St",
          email: "john.doe@example.com",
          password: "password"
        }
      );

      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
  });
});
