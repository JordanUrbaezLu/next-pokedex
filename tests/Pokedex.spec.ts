import pokemonGenerations from '@/data/pokemonGenerations';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  await page.goto('/');
  await context.clearCookies();
});

test.describe('Next Pokédex', () => {
  test('Should show all generation buttons', async ({ page }) => {
    await page.goto('/generation');
    await page.waitForTimeout(2000);
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
    await page.waitForTimeout(4000);

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

    await page.waitForTimeout(2000);

    const error = page.getByText(/whoops/i);
    await expect(error).toBeVisible();
  });

  test('Page should show Backend Page correctly', async ({
    page,
  }) => {
    await page.goto('/backend');
    await page.waitForTimeout(3000);
    const error = page.getByText(
      '{ "message": "Hello from the backend!" }'
    );
    await expect(error).toBeVisible();
  });

  test.skip('should login and logout correctly', async ({ page }) => {
    await page.goto('/login');

    await page
      .getByPlaceholder('Email/Username')
      .fill(`user33@gmail.com`);
    await page.getByPlaceholder('Password').fill('123');
    await page.click('[data-testid="login-button"]');

    await page.waitForTimeout(8000);

    const name = page.getByText('NAME: 33');

    await expect(name).toBeVisible();

    const logoutBtn = page.getByText('Logout');
    await expect(logoutBtn).toBeVisible();

    await page.click('button:has-text("Logout")');

    await page.waitForTimeout(500);

    const homeTitle = page.getByText(
      'Welcome to the Next Pokédex Home Page'
    );
    await expect(homeTitle).toBeVisible();
  });

  test('should show nav bar correctly', async ({ page }) => {
    await page.goto('/');

    const genBtn = page.getByText('Generations');
    await expect(genBtn).toBeVisible();
    const searchBtn = page.getByText('Search');
    await expect(searchBtn).toBeVisible();
    const accountBtn = page.getByText('Account');
    await expect(accountBtn).toBeVisible();
    const signupBtn = page.getByText('Signup');
    await expect(signupBtn).toBeVisible();
    const loginBtn = page.getByText('Login');
    await expect(loginBtn).toBeVisible();
  });

  test.skip('user can successfully signup', async ({ page }) => {
    await page.goto('/signup');

    await page.waitForTimeout(1500);

    const date = Date.now();

    await page.fill('input[placeholder="Name"]', 'Ash');
    await page
      .getByPlaceholder('Email/Username')
      .fill(`Ash${date}@gmail.com`);
    await page.fill('input[placeholder="Password"]', '1234');
    await page.getByPlaceholder('Re-enter Password').fill('1234');

    await page.click('[data-testid="signup-button"]');

    await page.waitForTimeout(3000);

    const name = page.getByText('NAME: Ash');

    await expect(name).toBeVisible();

    const logoutBtn = page.getByText('Logout');
    await expect(logoutBtn).toBeVisible();

    await page.click('button:has-text("Logout")');

    await page.waitForTimeout(500);

    const homeTitle = page.getByText(
      'Welcome to the Next Pokédex Home Page'
    );
    await expect(homeTitle).toBeVisible();
  });

  test('should show friends and pending requests correctly', async ({
    page,
  }) => {
    await page.goto('/login');
    await page
      .getByPlaceholder('Email/Username')
      .fill(`user33@gmail.com`);
    await page.getByPlaceholder('Password').fill('123');
    await page.click('[data-testid="login-button"]');
    await page.waitForTimeout(3000);

    await page.goto('/friends');
    await page.waitForTimeout(3000);
    const friend = page.getByText('user32');
    await expect(friend).toBeVisible();
    const pending = page.getByText('user34');
    await expect(pending).toBeVisible();

    await page.goto('/friends/add');
    await page.getByPlaceholder('Enter user ID').fill(`34`);
    await page.click('button:has-text("Add Friend")');
    await page.waitForTimeout(4000);
    const existError = page.getByText(
      'Friendship already exists or pending'
    );
    await expect(existError).toBeVisible();
    await page.getByPlaceholder('Enter user ID').fill(`1111111111`);
    await page.click('button:has-text("Add Friend")');
    await page.waitForTimeout(4000);
    const invalidUserError = page.getByText('Invalid users');
    await expect(invalidUserError).toBeVisible();
  });
});
