import { test, expect } from '@playwright/test';

const filterData = [
    { category: 'Herren', brand: 'Hugo Boss' },
    { category: 'Damen', brand: 'Chanel' },
    { category: 'Unisex', brand: 'Dior' },
];

test.describe('Product Filter Test', () => {
    test.beforeEach(async ({ page }) => {
       
        await page.goto('https://www.douglas.de/de');

        // Handle cookie 
        const consentButton = await page.locator('button[data-testid="cookie-banner-accept"]');
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }
    });

    filterData.forEach((filter) => {
        test(`Filter products for ${filter.category} - ${filter.brand}`, async ({ page }) => {
            //click on parfum
            await page.locator('//a[text()="Parfum"').click();
            await page.waitForSelector('div[data-testid="product-list"]');

            await page.locator(`button:has-text("${filter.category}")`).click();
            await page.locator(`button:has-text("${filter.brand}")`).click();

            const products = page.locator('div[data-testid="product-item"]');
            await expect(products).toHaveCount(5)

            const productNames = await products.evaluateAll((items) => 
                items.map((item) => item.querySelector('h3')?.textContent || '')
            );
            console.log(`Products for ${filter.category} - ${filter.brand}:`, productNames);
        });
    });
});
