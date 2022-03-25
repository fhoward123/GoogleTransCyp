// 'use strict';

// const puppeteer = require('puppeteer');
// const { PNG } = require('pngjs');
// const pixelmatch = require('pixelmatch');
// const { expect } = require('chai');
// const fs = require('fs');

// const { toUpperKey } = require('../selectors/translateSelectors');

// const {
//     debug,
//     windowWidth: winWidth,
//     windowHeight: winHeight,
//     viewPortWidth: vpWidth,
//     viewPortHeight: vpHeight,
//     launchOptions,
//     takeScreenshots,
//     diffScreenshots,
//     screenshotCurrentDir,
//     screenshotGoldenDir,
//     screenshotExtension,
//     clickStyle,
//     successStyle,
//     alertStyle,
//     errorStyle,
//     takePicStyle,
//     funcStyle,
//     log,
//     logGroup,
//     logGroupEnd,
// } = require('../config/puppeteerConfig');

// /*  Functions exported
//     ------------------
//     captureScreenshot,
//     checkForErrors,
//     clickButton,
//     closePage,
//     closeBrowser,
//     compareScreenshots,
//     elementFound,
//     enterInputText,
//     getElementText,
//     isUpperCase,
//     launchBrowser,
//     openPage,
//     setupEventHandlers,
//     testTranslation,
//     typeOnKeyboard,
//     verifyPageTitle,
//     verifyPageUrl,
// */

// const elementFound = async (page, xpath, timeout = 2000) => {
//     if (debug) logGroup(funcStyle('\nelementFound'));
//     let found = false;
//     if (debug) log(`Locate "${xpath}" selector`);
//     await page.waitForXPath(xpath, {
//         visible: true,
//         hidden: false,
//         timeout,
//     })
//     .then(() => {
//         if (debug) log(`${successStyle('Found selector')}`);
//         found = true;
//     })
//     .catch(() => {
//         if (debug) log(`${errorStyle('Selector not found')}`);
//     });
//     if (debug) logGroupEnd(funcStyle('\nelementFound'));

//     return found;
// };
// exports.elementFound = elementFound;

// const getElementText = async (page, xpath) => {
//     try {
//         if (debug) logGroup(funcStyle('\ngetElementText'));
//         if (debug) log(`Get element handle for selector "${xpath}"`);
//         const elHandle = await page.waitForXPath(xpath);
//         if (debug) log(`Get text for selector "${xpath}"`);
//         const text = await elHandle.evaluate((el) => el.textContent);
//         if (debug) logGroupEnd(funcStyle('\ngetElementText'));

//         return text.trim();

//     } catch (error) {
//         log(errorStyle(error));
//     }
// };
// exports.getElementText = getElementText;

// const testTranslation = (expOutcome, expText, actText) => {
//     if (debug) logGroup(funcStyle('\ntestTranslation'));
//     if (expOutcome) {
//         expect(expText).to.equal(actText);
//     } else {
//         expect(expText).to.not.equal(actText);
//     }
//     if (debug) logGroupEnd(funcStyle('\ntestTranslation'));
// };
// exports.testTranslation = testTranslation;

// const captureScreenshot = async (page, filename) => {
//     if (debug) logGroup(funcStyle('\ncaptureScreenshot'));
//     if (takeScreenshots) {
//         const fullPage = true;

//         if (debug) log(`${takePicStyle('Take screenshot')} and save as "${filename}.${screenshotExtension}"`);
//         await page.waitForTimeout(200);
//         await page.screenshot({
//             path: `${screenshotCurrentDir}/${filename}.${screenshotExtension}`,
//             captureBeyondViewport: false,
//             fullPage,
//         });
//         if (debug) logGroupEnd(funcStyle('\ncaptureScreenshot'));

//         return filename;
//     }
//     if (debug) logGroupEnd(funcStyle('\ncaptureScreenshot'));

//     return '';
// };
// exports.captureScreenshot = captureScreenshot;

// const compareScreenshots = async (filename, num = 1, fudgeFactor = 0) => {
//     if (debug) logGroup(funcStyle('\ncompareScreenshots'));
//     if (diffScreenshots) {
//         let mismatch = 0;
//         let pixelsOff = 0;
//         if (debug) log(`Compare screenshots for ${filename}`);

//         for ( let i = 1; i <= num; i += 1) {
//             const testImage = PNG.sync.read(fs.readFileSync(`${screenshotCurrentDir}/${filename}.${screenshotExtension}`));
//             const goldenImage = PNG.sync.read(fs.readFileSync(`${screenshotGoldenDir}/${filename}${i}.${screenshotExtension}`));
//             expect(testImage.width, `"${filename}" test image width ${testImage.width} does not match baseline image width ${goldenImage.width}`).equal(goldenImage.width);
//             expect(testImage.height, `"${filename}" test image height ${testImage.height} does not match baseline image height ${goldenImage.height}`).equal(goldenImage.height);
//             const { width, height } = testImage;
//             const diff = new PNG({ width, height });
//             const numDiffPixels = pixelmatch(testImage.data, goldenImage.data, diff.data, width, height, { threshold: 0.1 });
//             fs.writeFileSync(`${screenshotCurrentDir}/${filename}${i}_diff.${screenshotExtension}`, PNG.sync.write(diff));
//             if (debug) log(`Allowed pixel diff for "${filename}${i}" is ${fudgeFactor}, found diff of ${numDiffPixels}`);
//             if (numDiffPixels > fudgeFactor && !mismatch) {
//                 mismatch = 1;
//                 pixelsOff = numDiffPixels;
//             } else if (numDiffPixels <= fudgeFactor) {
//                 mismatch = 0;
//                 pixelsOff = numDiffPixels;
//                 break;
//             }
//         }
//         expect(pixelsOff, `Pixel mismatch for "${filename}" and baseline image`).to.be.lte(fudgeFactor);
//     }
//     if (debug) logGroupEnd(funcStyle('\ncompareScreenshots'));
// };
// exports.compareScreenshots = compareScreenshots;

// const closePage = async (page) => {
//     if (debug) logGroup(funcStyle('\nclosePage'));
//     try {
//         if (page) {
//             await page.close();
//         }
//     } catch (error) {
//         if (error.message === 'Protocol error (Target.closeTarget): Target closed.') {
//             if (debug) log('Page is already closed');
//         } else log(errorStyle(`${error.name}: ${error.message}`));
//     }
//     if (debug) logGroupEnd(funcStyle('\nclosePage'));
// };
// exports.closePage = closePage;

// const closeBrowser = async (browser) => {
//     if (debug) logGroup(funcStyle('\ncloseBrowser'));
//     try {
//         if (browser) {
//             await browser.close();
//         }
//     } catch (error) {
//         if (error.message === 'Protocol error (Target.closeTarget): Target closed.') {
//             if (debug) log('Browser is already closed');
//         } else log(errorStyle(`${error.name}: ${error.message}`));
//     }
//     if (debug) logGroupEnd(funcStyle('\ncloseBrowser'));
// };
// exports.closeBrowser = closeBrowser;

// const errorsCaptured = [];

// const checkForErrors = () => {
//     if (debug) logGroup(funcStyle('\ncheckForErrors'));
//     const numOfErrors = errorsCaptured.length;
//     if (numOfErrors) {
//         log(alertStyle(`\n\n       ALERT: Encountered ${numOfErrors} non-test errors!       \n`));
//         errorsCaptured.forEach((error) => {
//             log(errorStyle(`       ${error}`));
//         })
//     }
//     if (debug) logGroupEnd(funcStyle('\ncheckForErrors'));
// }
// exports.checkForErrors = checkForErrors;

// const setupEventHandlers = async (page) => {
//     if (debug) {
//         logGroup(funcStyle('\nsetupEventHandlers'));
//         log('Setting up Event Notifications');
//         await page.on('load', () => {
//             if (debug) log(successStyle(' ❗Page loaded'))
//         });
//     }
//     await page.on('console', (message) => {
//         if (debug) log(` 👉 ${message.type()} - Console output: ${message.text()}`)
//     });
//     await page.on('error', (error) => {
//         if (debug) log(`❌ ${errorStyle('Page error')}: ${error}`)
//         errorsCaptured.push(error);
//     });
//     await page.on('pageerror', async (error) => {
//         if (debug) log(`❌ ${errorStyle('Uncaught exception')}: ${error}`);
//         errorsCaptured.push(error);
//     });
//     await page.on('requestfailed', (request) => {
//         if (debug) log(`❌ ${errorStyle('Failed request')}: ${request.url()}`)
//         errorsCaptured.push(`Failed request: ${request.url()}`);
//     });
//     // Emitted when a script within the page uses "alert", "prompt", "confirm" or "beforeunload"
//     await page.on('dialog', async (dialog) => {
//         log(`⚠️ ${alertStyle('dialog')}: ${dialog.message()}`);
//         await dialog.dismiss();
//     });
//     if (debug) logGroupEnd(funcStyle('\nsetupEventHandlers'));
// };
// exports.setupEventHandlers = setupEventHandlers;

// const launchBrowser = async () => {
//     if (debug) logGroup(funcStyle('\nlaunchBrowser'));
//     const browser = await puppeteer.launch(launchOptions);

//     if (!launchOptions.headless) {
//         if (debug) log(`Set browser size to ${winWidth} x ${winHeight}`);
//     }
//     if (debug) logGroupEnd(funcStyle('\nlaunchBrowser'));

//     return browser;
// };
// exports.launchBrowser = launchBrowser;

// const openPage = async (browser) => {
//     if (debug) {
//         logGroup(funcStyle('\nopenPage'));
//         log('Get browser pages (tabs)');
//     }
//     let [page] = await browser.pages();

//     if (debug) log('Check if blank page opened up');
//     if (!page || page.url() !== 'about:blank') {
//         if (debug) log('No blank page - open new one...');
//         page = await browser.newPage();
//     } else if (debug) log('Found blank browser page/tab, using it for test');
//     if (debug) log(`Set Viewport size to ${vpWidth} x ${vpHeight}`);
//     await page.setViewport({ width: vpWidth, height: vpHeight });

//     const browserVersion = await page.browser().version();
//     if (debug) log(`Browser: ${browserVersion}`);
//     if (debug) log(`Timeout set to ${launchOptions.timeout}`);
//     page.setDefaultTimeout(launchOptions.timeout);
//     if (debug) logGroupEnd(funcStyle('\nopenPage'));

//     return page;
// };
// exports.openPage = openPage;

// const enterInputText = async (page, xpath, text) => {
//     if (debug) logGroup(funcStyle('\nenterInputText'));
//     let input = await page.waitForXPath(xpath);
//     if (debug) log(`Type "${text}" into input field`);
//     await input.type(text, { delay: 50 });
//     if (debug) log('Press "Enter" to accept input');
//     await page.keyboard.press('Enter');
//     if (debug) logGroupEnd(funcStyle('\nenterInputText'));
// };
// exports.enterInputText = enterInputText;

// const verifyPageTitle = async (page, expectedTitle) => {
//     if (debug) {
//         logGroup(funcStyle('\nverifyPageTitle'));
//         log('Get and save page title');
//     }
//     const title = await page.title();
//     if (debug) log('Verify page title');
//     expect(title).to.equal(expectedTitle);
//     if (debug) logGroupEnd(funcStyle('\nverifyPageTitle'));
// };
// exports.verifyPageTitle = verifyPageTitle;

// const verifyPageUrl = async (page, expUrl) => {
//     if (debug) {
//         logGroup(funcStyle('\nverifyPageUrl'));
//         log('Get and save page URL');
//     }
//     const actUrl = await page.url();
//     if (debug) log('Verify page URL is correct');
//     expect(actUrl).to.equal(expUrl);
//     if (debug) logGroupEnd(funcStyle('\nverifyPageUrl'));
// };
// exports.verifyPageUrl = verifyPageUrl;

// const clickButton = async (page, xpath, name) => {
//     if (debug) {
//         logGroup(funcStyle('\nclickButton'));
//         log(`${clickStyle('Click')} "${name}" button`);
//     }
//     const button = await page.waitForXPath(xpath);
//     await button.evaluate((btn) => btn.click());
//     if (debug) logGroupEnd(funcStyle('\nclickButton'));
// };
// exports.clickButton = clickButton;

// const uppercaseRegex = /^[A-Z!?]{1}$/;

// const isUpperCase = (char) => {
//     if (debug) logGroup(funcStyle('\nisUpperCase'));
//     const uppercase = uppercaseRegex.test(char);
//     if (debug) { 
//         if (uppercase) {
//             log(`The ${char} character is Uppercase`);
//         } else {
//             log(`The ${char} character is NOT Uppercase`);
//         }
//     }
//     if (debug) logGroupEnd(funcStyle('\nisUpperCase'));
//     return uppercase;
// };
// exports.isUpperCase = isUpperCase;

// const typeOnKeyboard = async (page, text) => {
//     for (const char of text) {
//         if (isUpperCase(char)) {
//             await page.waitForTimeout(30);
//             await clickButton(page, toUpperKey, 'Shift key');
//         }
//         await page.waitForTimeout(30);
//         await clickButton(page, `//span[text()='${char}']/parent::button`, `${char} key`);
//     }
// };
// exports.typeOnKeyboard = typeOnKeyboard;
