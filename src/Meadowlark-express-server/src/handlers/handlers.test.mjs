import { jest } from "@jest/globals";
import * as handlers from "./handlers.mjs";

test("home page renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  expect(res.render).toBeCalledWith("home");
});

test("about page renders with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test("404 handler renders", () => {
  const req = {};
  const res = { render: jest.fn(), status: jest.fn() };
  handlers.notFound(req, res);
  expect(res.status).toBeCalledWith(404);
  expect(res.render).toBeCalledWith("404");
});

test("500 handler renders", () => {
  const err = new Error("some error");
  const req = {};
  const res = { render: jest.fn(), status: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render).toBeCalledWith("500");
  expect(res.status).toBeCalledWith(500);
});
