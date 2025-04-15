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

  test('Pokedex should not exceed last Pokémon in current generation', async ({
    page,
  }) => {
    await page.goto('/generation/1');
    const mewtwoLocator = page.getByText('Mewtwo', { exact: true });
    while (!(await mewtwoLocator.isVisible().catch(() => false))) {
      const loadMoreButton = page.getByRole('button', {
        name: 'Load More',
      });
      const isLoadMoreVisible = await loadMoreButton
        .isVisible()
        .catch(() => false);
      if (!isLoadMoreVisible) break;
      await Promise.all([
        page.waitForLoadState('networkidle'),
        loadMoreButton.click(),
      ]);
    }
    await expect(mewtwoLocator).toBeVisible();
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

  test.skip('Page should show Backend Page correctly', async ({
    page,
  }) => {
    await page.goto('/backend');
    await page.waitForTimeout(60000);
    const responseMessage = page.getByText(
      '{ "message": "Hello from the backend!" }'
    );
    await expect(responseMessage).toBeVisible();
  });
  test.setTimeout(120000);
});
