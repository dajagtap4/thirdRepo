import {test, expect} from '@playwright/test'

import { login_Date } from './loginData';
import { login_Locators } from './loginLocators';

test.describe('Product Filter Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(login_Date.loginURL)

          // Handle cookie 
          const consentButton = await page.locator(login_Locators.Cookie);
          if (await consentButton.isVisible()) {
              await consentButton.click();
          }
    });
 
    test('List Products from Produktart filter',async({page})=>{

        await page.waitForSelector(login_Locators.PARFUM)
        await page.locator(login_Locators.PARFUM).click();

        await page.waitForSelector(login_Locators.Produktart)
        await page.locator(login_Locators.Produktart).click();

        await page.waitForSelector(login_Locators.Eau_de_Parfum)
        await page.locator(login_Locators.Eau_de_Parfum).click();

        const products = await page.$$eval(login_Locators.Eau_de_Parfum_Products, (items) => {
            return items.map((item: any) => {
                const title = item.querySelector('h2 a')?.textContent?.trim() || 'No Title'
                return { title }
            });
        });

          products.forEach(product => {
            console.log(`Title: ${product.title}`);
          });

          expect(products.length).toBeGreaterThan(0);

    });

    test('List Products from Marke filter',async({page})=>{

        await page.waitForSelector(login_Locators.PARFUM)
        await page.locator(login_Locators.PARFUM).click();

        await page.waitForSelector(login_Locators.Marke)
        await page.locator(login_Locators.Marke).click();

        await page.waitForSelector(login_Locators.option1)
        await page.locator(login_Locators.option1).click();

        const products = await page.$$eval(login_Locators.marke_Products, (items) => {
            return items.map((item: any) => {
                const title = item.querySelector('h2 a')?.textContent?.trim() || 'No Title'
                return { title }
            });
        });

          products.forEach(product => {
            console.log(`Title: ${product.title}`);
          });

          expect(products.length).toBeGreaterThan(0);
    });
});
