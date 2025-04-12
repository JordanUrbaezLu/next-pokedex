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
    test.setTimeout(120000);
    await page.goto('/backend');
    await page.waitForTimeout(60000);
    const error = page.getByText(
      '{ "message": "Hello from the backend!", "status": "success" }'
    );
    await expect(error).toBeVisible();
  });
  test('should select a generation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: /region/i }).click();
    const dropdown = page.locator(
      'select[data-testid="generation-select"]'
    );
    await dropdown.selectOption({ label: 'Gen II - Johto Region' });
    await expect(dropdown).toHaveValue('/generation/2');
  });
});
