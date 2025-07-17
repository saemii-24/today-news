/**
 * @jest-environment node
 */

import { server } from "./mocks/node.js";

// Node 환경에 Web API 등록
globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
