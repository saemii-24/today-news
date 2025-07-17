import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  http.get("https://api.example.com/check/:value", ({ params }) => {
    const { value } = params;
    const isNumber = !isNaN(Number(value));

    if (isNumber) {
      return HttpResponse.text("성공", { status: 200 });
    } else {
      return HttpResponse.text("숫자를 입력하세요", { status: 500 });
    }
  }),
];
