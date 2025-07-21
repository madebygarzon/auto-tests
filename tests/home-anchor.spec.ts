import { test, expect } from "@playwright/test";

test("el botón PARTNER WITH US navega a su sección", async ({ page }) => {
  // 1. Cargar la home (usa baseURL definido en playwright.config.ts)
  await page.goto("/");

  // 2. Asegurarnos de que el hash NO está presente al inicio
  expect(page.url()).not.toContain("#brxe-3e26fd");

  // 3. Hacer clic en el ancla
  await page.locator("#brxe-zabhlg").click();

  await page.waitForTimeout(1000);

  // 4. Esperar a que el hash cambie (#brxe-3e26fd)
  await expect
    .poll(() => page.evaluate(() => window.location.hash))
    .toBe("#brxe-3e26fd");

  // 5. Verificar que la sección objetivo es visible en el viewport
  //    (boundingBox.top debe estar dentro de la altura de la ventana)
  const target = page.locator("#brxe-3e26fd");
  await expect(target).toBeVisible();

  // Extra: assert de “in viewport” ~ el top de la caja está a la vista
  const box = await target.boundingBox();
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await expect(target).toBeInViewport();
});
