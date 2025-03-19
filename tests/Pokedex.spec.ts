import pokemonGenerations from '@/data/pokemonGenerations';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Next Pokédex', () => {
  test('should show all generation buttons', async ({ page }) => {
    for (const gen of pokemonGenerations) {
      const pokemonGen = page.getByText(gen.name);
      await expect(pokemonGen).toBeVisible();
    }
  });

  test('Load more should show ', async ({ page }) => {
    const loadMoreBtn = page.getByText('Load More');
    loadMoreBtn.click();
    await page.waitForTimeout(5000);
    const pikachu = page.getByText('Pikachu');
    await expect(pikachu).toBeVisible();
  });
});
