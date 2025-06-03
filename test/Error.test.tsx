// tests/CartPage.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../src/mocks/server";
import { http } from "msw";
import CartPage from "../src/CartPage";

describe("CartPage 통합 테스트", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("서버가 404 에러를 반환하면 ErrorUI가 나타난다", async () => {
    server.use(
      http.get(
        "*/cart-items",
        () =>
          new Response(JSON.stringify({ message: "Not Found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          })
      )
    );

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(
        screen.getByText("요청한 리소스를 찾을 수 없습니다.")
      ).toBeInTheDocument();
      expect(screen.getByText("Not Found")).toBeInTheDocument(); // 상세 메시지
    });
  });

  test("서버가 500 에러를 반환하면 ErrorUI가 나타난다", async () => {
    server.use(
      http.get(
        "*/cart-items",
        () =>
          new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
      )
    );

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("서버 오류가 발생했습니다.")).toBeInTheDocument();
      expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
    });
  });
});
