import { http, HttpResponse } from "msw";
import cartItems from "./cartItems.json";

const END_POINT = "*/cart-items";

//handler에 특정 path를 지정한 이유는 CartPage에서 직접 요청을 보낼 때 path만 변경하여 test 하기 위함

export const handlers = [
  // 정상 응답
  http.get(END_POINT, async () => {
    return HttpResponse.json(cartItems);
  }),

  // 401 Unauthorized 에러
  http.get(`${END_POINT}/unauthorized`, async () => {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }),

  // 403 Forbidden 에러
  http.get(`${END_POINT}/forbidden`, async () => {
    return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
  }),

  // 404 Not Found 에러
  http.get(`${END_POINT}/not-found`, async () => {
    return HttpResponse.json({ message: "Not Found" }, { status: 404 });
  }),

  // 500 Server Error
  http.get(`${END_POINT}/server-error`, async () => {
    return HttpResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }),

  // 네트워크 에러 시뮬레이션
  http.get(`${END_POINT}/network-error`, async () => {
    return HttpResponse.error();
  }),
];
