import sum from "../javascript/testExample";

describe("testExample을 검사한다", () => {
  it("sum 함수를 실행하면 두 숫자가 적절히 더해져야 한다", () => {
    const predictResult = 6;
    const testResult = sum(1, 5);

    expect(testResult).toBe(predictResult);
  });
});
