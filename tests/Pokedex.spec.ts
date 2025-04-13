import pokemonGenerations from '@/data/pokemonGenerations';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Next Pokédex', () => {
  test('Next Pokédex - Should show all generation buttons', async ({
    page,
  }) => {
    await page.goto('/');
    for (const gen of pokemonGenerations) {
      const generationLink = page.getByRole('link', {
        name: gen.name,
      });
      await expect(generationLink).toBeVisible();
      await expect(generationLink).toHaveAttribute('href', gen.href);
    }
  });
  test('Should show home page correctly', async ({ page }) => {
    const title = page.getByText(
      'Welcome to the Next Pokédex Home Page'
    );
    await expect(title).toBeVisible();
  });

  test('Pokedex should not exceed last pokemon in current generation', async ({
    page,
  }) => {
    await page.goto('/generation/1');
    while (true) {
      const mewtwoLocator = page.getByText('Mewtwo', { exact: true });
      if (await mewtwoLocator.isVisible().catch(() => false)) {
        break;
      }
      const loadMore = page.getByRole('button', {
        name: 'Load More',
      });
      if (await loadMore.isVisible().catch(() => false)) {
        await loadMore.click();
        await page.waitForTimeout(300);
      } else {
        break;
      }
    }
    const mewtwo = page.getByText('Mewtwo', { exact: true });
    await expect(mewtwo).toBeVisible();
  });

  test('Page should show Error Page on invalid url', async ({
    page,
  }) => {
    await page.goto('/generation/99');

    const error = page.getByText(
      'Whoops! Looks like theres been some error.'
    );
    await expect(error).toBeVisible();
  });

  test('Page should show Backend Page correctly', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/backend');
    await page.waitForTimeout(1000);
    const fullText = await page.locator('body').innerText();
    console.log('🧪 Full page content:', fullText);
    await expect(
      page.locator('text=Hello from the backend')
    ).toBeVisible();
  });
  test('Dropdown is visible on mobile screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: /regions/i }).click();
    const dropdown = page.getByTestId('mobile-dropdown');
    await expect(dropdown).toBeVisible();
  });
});
