import { http, HttpResponse } from "msw";
import { fetchCartItems } from "../src/fetchCartItems";
import { server } from "../src/mocks/server";

const END_POINT = "/cart-items";
const baseURL = "http://localhost";

// 모든 테스트 전에 MSW 서버 시작
beforeAll(() => server.listen());
// 각 테스트 후에 핸들러 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트 후에 MSW 서버 종료
afterAll(() => server.close());

describe("Cart Service", () => {
  describe("fetchCartItems", () => {
    test("정상적으로 장바구니 아이템을 가져온다", async () => {
      // 기본 핸들러가 이미 설정되어 있으므로 추가 설정 불필요
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

    test("빈 배열을 반환하는 경우", async () => {
      server.use(
        http.get(END_POINT, () => {
          return HttpResponse.json({ content: [] });
        })
      );

      const result = await fetchCartItems(baseURL);
      expect(result.content).toEqual([]);
    });

    test("지연된 응답을 처리한다", async () => {
      server.use(
        http.get(END_POINT, async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return HttpResponse.json({
            content: [{ id: 1, name: "delayed item" }],
          });
        })
      );

      const result = await fetchCartItems(baseURL);
      expect(result.content[0].name).toBe("delayed item");
    }, 5000);
  });
});
