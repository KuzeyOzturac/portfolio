const { chromium, expect } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
    args: process.env.CHROMIUM_EXECUTABLE_PATH
      ? [
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
          "--use-gl=angle",
          "--use-angle=swiftshader",
        ]
      : [],
    headless: true,
  });
  let errors = [];
  let summary = [];
  const context = await b.newContext({ reducedMotion: "reduce" });
  const p = await context.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  for (const width of [320, 375, 390, 640, 768, 1024, 1440, 1920]) {
    await p.setViewportSize({ width, height: 900 });
    await p.goto(process.env.TEST_URL || "http://localhost:4173/portfolio/");
    await p.waitForTimeout(150);
    const check = await p.evaluate(() => {
      const rect = document.querySelector(".languages").getBoundingClientRect();
      const label = [...document.querySelectorAll(".languages dd span")].find(
        (e) => e.textContent === "Intermediate",
      );
      const r = label.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        labelVisible: r.left >= rect.left && r.right <= rect.right + 1,
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
      };
    });
    expect(check.overflow, `overflow ${width}`).toBe(false);
    expect(check.labelVisible, `language ${width}`).toBe(true);
    expect(check.brokenImages).toEqual([]);
    await p.getByRole("tab", { name: /Experience/ }).click();
    await expect(
      p.getByRole("heading", { name: "Kale Endüstri Holding" }),
    ).toBeVisible();
    await p.getByRole("tab", { name: /Awards/ }).click();
    await expect(
      p.getByRole("heading", { name: "Ontario Volunteer Service Award" }),
    ).toBeVisible();
    await p.getByRole("tab", { name: /Projects/ }).click();
    for (const name of [
      "ASL Interpreter",
      "EcoLoop",
      "VoiceMintify",
      "VaxOptima",
      "TTC Tracker",
    ]) {
      const trigger = p.getByRole("button", { name: `Open ${name} dossier` });
      await trigger.click();
      const dialog = p.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name, exact: true }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("link", { name: "View repository" }),
      ).toHaveAttribute("href", /https:\/\/github.com\//);
      await p.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
    if (width === 390 || width === 1440) {
      await p.evaluate(() => scrollTo(0, 0));
      await p.screenshot({ path: `/tmp/portfolio-${width}-top.png` });
      await p.screenshot({
        path: `/tmp/portfolio-${width}-full.png`,
        fullPage: true,
      });
      const result = await new AxeBuilder({ page: p })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      summary.push({
        width,
        axe: result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
    }
    summary.push({ width, ...check, dialogs: 5 });
  }
  console.log(JSON.stringify({ summary, errors }, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
