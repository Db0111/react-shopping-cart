import { http, HttpResponse } from "msw";
import { fetchCartItems } from "../src/fetchCartItems";
import { server } from "../src/mocks/server";

const END_POINT = "/cart-items";
const baseURL = "http://localhost";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cart Service", () => {
  describe("fetchCartItems", () => {
    test("정상적으로 장바구니 아이템을 가져온다", async () => {
      const result = await fetchCartItems(baseURL);

      expect(result.content).toHaveLength(5);
      expect(result.content[0]).toHaveProperty("id");
    });

    test("404 에러가 발생하면 에러를 던진다", async () => {
      server.use(
        http.get(END_POINT, () => {
          return HttpResponse.json({ message: "Not Found" }, { status: 404 });
        })
      );

      await expect(fetchCartItems(baseURL)).rejects.toThrow("Not Found");
    });

    test("500 서버 에러가 발생하면 에러를 던진다", async () => {
      server.use(
        http.get(END_POINT, () => {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        })
      );

      await expect(fetchCartItems(baseURL)).rejects.toThrow(
        "Internal Server Error"
      );
    });

    test("네트워크 에러가 발생하면 에러를 던진다", async () => {
      server.use(
        http.get(END_POINT, () => {
          return HttpResponse.error();
        })
      );

      await expect(fetchCartItems(baseURL)).rejects.toThrow();
    });
  });
});
