import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/work",
  "/work/smart-attendance-system",
  "/work/courtesychain",
  "/work/mt5-trade-radar",
  "/about",
  "/contact",
];

for (const route of routes) {
  test(`${route} renders a titled, accessible document`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/Joshua Olugbemi/);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("primary navigation and case-study routes are connected", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Review the case studies" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("link", { name: "Trace the verification architecture" }).click();
  await expect(page).toHaveURL(/\/work\/smart-attendance-system$/);
});

test("work hero deck exposes and selects each engineering layer", async ({ page }) => {
  await page.goto("/work");

  const productCard = page.getByRole("button", { name: /Product engineering/ });
  await expect(productCard).toBeVisible();
  await productCard.click();
  await expect(productCard).toHaveAttribute("aria-pressed", "true");
});

test("resume and contact actions resolve", async ({ page, request }) => {
  const response = await request.get("/joshua-olugbemi-resume.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");

  await page.goto("/contact");
  await expect(page.locator("main").getByRole("link", { name: "fijacksprop@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:fijacksprop@gmail.com",
  );
  await expect(page.locator("main").getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/FijacksProp",
  );
});

test("unknown routes use the authored 404", async ({ page }) => {
  const response = await page.goto("/not-a-real-route");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This route does not resolve." })).toBeVisible();
});

test("CourtesyChain hero stays inside the viewport", async ({ page }) => {
  await page.goto("/work/courtesychain");

  const title = page.getByRole("heading", { name: "CourtesyChain" });
  await expect(title).toBeVisible();
  await expect.poll(() => title.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("landing hero presents the full software practice without overflow", async ({ page }) => {
  await page.goto("/");

  const atlas = page.getByRole("figure", { name: /Full-stack system atlas/ });
  await expect(atlas).toBeVisible();
  await expect(atlas.getByText("Product interface")).toBeVisible();
  await expect(atlas.getByText("Service layer")).toBeVisible();
  await expect(atlas.getByText("Data + rules")).toBeVisible();
  await expect(atlas.locator(".atlas-delivery > strong")).toHaveText("Delivery");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("living systems map follows each page context", async ({ page, isMobile }) => {
  test.skip(isMobile, "route composition is shared across breakpoints");

  const contexts = [
    ["/", "home"],
    ["/work", "work"],
    ["/work/smart-attendance-system", "case"],
    ["/work/courtesychain", "courtesy"],
    ["/work/mt5-trade-radar", "radar"],
    ["/about", "about"],
    ["/contact", "contact"],
  ] as const;

  for (const [route, variant] of contexts) {
    await page.goto(route);
    const background = page.locator(".living-systems-background");
    await expect(background).toHaveAttribute("aria-hidden", "true");
    await expect(background).toHaveAttribute("data-variant", variant);
    await expect(background).toHaveCSS("pointer-events", "none");
  }
});

test("living systems motion respects the visitor's reduced-motion setting", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".systems-signals")).toHaveCSS("display", "none");
  await expect(page.locator(".systems-map-proximity")).toHaveCSS("display", "none");
});

test("opening ident is branded, brief, and non-blocking after its reveal", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const preloader = page.locator(".site-preloader");
  await expect(preloader).toHaveCount(1);
  await expect(preloader.getByText("Joshua Olugbemi")).toBeVisible();
  const logo = preloader.locator(".preloader-mark-plate img");
  await expect(logo).toBeVisible();
  await expect.poll(() => logo.evaluate((image) => {
    const imageBox = image.getBoundingClientRect();
    const plateBox = image.parentElement?.getBoundingClientRect();
    if (!plateBox) return false;
    return imageBox.left >= plateBox.left - 1
      && imageBox.right <= plateBox.right + 1
      && imageBox.top >= plateBox.top - 1
      && imageBox.bottom <= plateBox.bottom + 1;
  })).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await expect(preloader).toHaveCount(0, { timeout: 5_500 });
});

test("mobile navigation exposes state and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only interaction");
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});
