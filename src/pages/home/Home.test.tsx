import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import React from "react";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {
  test("renders Login Form correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  test("when patient logs in, the correct route is navigated to", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [{ email: "new.email@example.com", password: "newpassword" }],
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "new.email@example.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByTestId("login-btn"));

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`
    );

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/patient", {
        state: { email: "new.email@example.com", password: "newpassword" },
      })
    );
  });

  test("when doctor logs in, the correct route is navigated to", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [{ email: "new.email@example.com", password: "newpassword" }],
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("userType"), {
      target: { value: "doctor" },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "new.email@example.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByTestId("login-btn"));

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor`
    );

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/doctor", {
        state: { email: "new.email@example.com", password: "newpassword" },
      })
    );
  });

  test('register link navigates to the correct route', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const registerLink = screen.getByTestId('register-link');
    fireEvent.click(registerLink);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
