import fs from "fs";
import puppeteer from "puppeteer";
import makeMarkdown from "./makeMarkdown.js";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://news.naver.com/main/ranking/popularDay.naver", {
    waitUntil: "networkidle2",
  });

  const data = await page.evaluate(() => {
    const boxes = Array.from(
      document.querySelectorAll(".rankingnews_box_wrap .rankingnews_box")
    );
    const date = document.querySelector(".lnb_date")?.textContent?.trim();

    const news = boxes.map((box) => {
      const name =
        box.querySelector(".rankingnews_name")?.textContent?.trim() ||
        "Unknown";

      const articles = Array.from(
        box.querySelectorAll(".rankingnews_list li a.list_title")
      ).map((a) => ({
        title: a.textContent.trim(),
        url: a.href,
      }));

      return { name, articles };
    });

    return { date, news };
  });

  await browser.close();

  const { title, filePath } = makeMarkdown(data);

  //깃허브 액션에 전달함
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `issue_title=${title}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `issue_file=${filePath}\n`);
})();
