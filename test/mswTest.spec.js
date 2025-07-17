describe("msw를 검사한다", () => {
  it("기본 msw 코드가 제대로 fetch되는지 확인한다.", async () => {
    const response = await fetch("https://api.example.com/user");
    const result = await response.json();

    expect(result).toEqual({
      //Object는 toEqual 사용해야함!
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  });
  it("숫자를 전송했을 때 성공한다.", async () => {
    const response = await fetch("https://api.example.com/check/123");
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe("성공");
  });

  it("숫자가 아닌 경우 실패한다.", async () => {
    const response = await fetch("https://api.example.com/check/실패!");
    const text = await response.text();

    expect(response.status).toBe(500);
    expect(text).toBe("숫자를 입력하세요");
  });
});
