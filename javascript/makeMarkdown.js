import fs from "fs";

/**
 * 마크다운 파일 생성 및 저장
 * @param {Object} data - { date: string, news: array }
 */

export default function makeMarkdown(data) {
  const lines = [`# 📰 ${data.date} `, `## ✅ 네이버 실시간 인기 뉴스`];

  for (const section of data.news) {
    lines.push(`### 📌 ${section.name}`);
    section.articles.slice(0, 5).forEach((a, i) => {
      lines.push(`${i + 1}. [${a.title}](${a.url})`);
    });
    lines.push("");
  }

  const markdown = lines.join("\n");

  // 날짜 포맷 변경 (07-16)
  const matchedDate = data.date.match(/\d{2}\.\d{2}/)?.[0];
  const safeDate = matchedDate?.replace(/\./g, "-") || "unknown";

  //markdown이 담길 폴더가 없는 경우에 생성한다.
  const dir = "./news_markdown";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  //markdown의 filepath를 설정한다.
  const filePath = `${dir}/naver-news-${safeDate}.md`;
  fs.writeFileSync(filePath, markdown, "utf-8");

  console.log(`${data.date}의 뉴스 마크다운이 생성되었습니다.`);
  return { title, filePath };
}
