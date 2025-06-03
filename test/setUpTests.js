import { beforeAll, afterEach, afterAll } from "@jest/globals";
import { server } from "./mocks/server";

// 모든 테스트 시작 전에 서버 실행
beforeAll(() => server.listen());

// 각 테스트 후에 핸들러 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 종료 후 서버 정리
afterAll(() => server.close());
