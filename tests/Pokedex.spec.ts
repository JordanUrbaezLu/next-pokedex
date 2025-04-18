import pokemonGenerations from '@/data/pokemonGenerations';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Next Pokédex', () => {
  test('Should show all generation buttons', async ({ page }) => {
    for (const gen of pokemonGenerations) {
      const pokemonGen = page.getByText(gen.name);
      await expect(pokemonGen).toBeVisible();
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
    await page.waitForTimeout(5000);

    for (let i = 0; i < 7; i++) {
      const loadMoreBtn = page.getByText('Load More');
      loadMoreBtn.click();
      await page.waitForTimeout(600);
    }

    const scrollUpBtn = page.getByText('Scroll Up');
    await expect(scrollUpBtn).toBeVisible();

    const Mewtwo = page.getByText('Mewtwo');
    await expect(Mewtwo).toBeVisible();
  });

  test('Page should show Error Page on invalid url', async ({
    page,
  }) => {
    await page.goto('/generation/99');

    await page.waitForTimeout(5000);

    const error = page.getByText(/whoops/i);
    await expect(error).toBeVisible();
  });

  test('Page should show Backend Page correctly', async ({
    page,
  }) => {
    // test is flaky due to cold start up on backend
    test.setTimeout(120000);
    await page.goto('/backend');
    await page.waitForTimeout(60000);
    const error = page.getByText(
      '{ "message": "Hello from the backend!" }'
    );
    await expect(error).toBeVisible();
  });
});
