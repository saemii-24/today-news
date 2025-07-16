import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  // 페이지 이동
  await page.goto("https://www.naver.com/");

  // 뷰포트 설정 (선택 사항)
  await page.setViewport({ width: 1080, height: 1024 });

  // 스크린샷 찍기
  await page.screenshot({
    path: "./result/naver-home.png", // 저장할 파일 이름
    fullPage: true, // 전체 페이지 캡처
  });

  console.log("스크린샷 저장이 완료되었습니다.");

  await browser.close();
})();
