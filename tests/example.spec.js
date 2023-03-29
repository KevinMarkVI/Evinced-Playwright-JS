const { test, expect } = require('@playwright/test');
import { EvincedSDK, setCredentials } from '@evinced/playwright-sdk';

test.describe("Travel Page Demo", () => {
    let evincedService;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        evincedService = new EvincedSDK(page);
        setCredentials({
            serviceId: 'SERIVICE_ID',
            secret: 'API_KEY'
        });
        await evincedService.evStart();
    });


    test.afterAll(async () => {
        const issues = await evincedService.evStop();
        evincedService.evSaveFile(issues, 'html', 'test-results/evinced-report.html');
    });


    test('Interactions Example Test', async () => {
        await page.goto('https://demo.evinced.com/');

        const BASE_FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';
        const SELECT_HOME_DROPDOWN = `${BASE_FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`;
        const SELECT_WHERE_DROPDOWN = `${BASE_FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`;
        const TINY_HOME_OPTION = `${BASE_FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`;
        const EAST_COST_OPTION = `${BASE_FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`;

        // Click the Hope dropdown
        await page.locator(SELECT_HOME_DROPDOWN).click();
        // Select Tiny Home
        await page.locator(TINY_HOME_OPTION).click();
        // Click the Where dropdown
        await page.locator(SELECT_WHERE_DROPDOWN).click();
        // Select East Coast
        await page.locator(EAST_COST_OPTION).click();
    });

});