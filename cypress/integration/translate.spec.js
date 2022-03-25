/// <reference types="cypress" />

'use strict';

// const { expect } = require('chai');
const data = require('../fixtures/translateData.json');

const {
    clearInputTextBtn,
    closeKeyboardBtn,
    emptyInputTextField,
    inputText,
    inputToolBtn,
    keyboardClosed,
    keyboardInUse,
    outputText,
    screenKeyboard,
    selectSourceLangBtn,
    selectTargetLangBtn,
    sourceLangInput,
    sourceLangText,
    sourceTextInput,
    sourceTextSwapped,
    swapLangBtn,
    targetLangInput,
    targetLangText,
    targetTextSwapped,
    toUpperKey,
    translatedText,
    translateTextBtn,
} = require('../support/translateSelectors');

const {
    contextStyle,
} = require('../support/config');
const baseUrl = 'https://translate.google.com/';
console.log('BASE URL: ', baseUrl);

context(contextStyle('***** Test Suite for "Google Translate web page" *****\n'), async function() {
    const {
        debug,
        describeItStyle,
        beforeAfterStyle,
        debugStyle,
        timeStyle,
        timeStart,
        log,
        logGroup,
    } = require('../support/config');

    before(function() {
        console.log('BASE URL: ', baseUrl);

        if (debug) {
            timeStart(timeStyle('translate.google'));
            log(debugStyle('\n            ***** Running in DEBUG mode *****'));
            logGroup(beforeAfterStyle('\n⚡before():'));
        }
    });

    // after(async function () {
    // });

    describe(describeItStyle('\n▶ Using Google Translate application'), function() {


        it(describeItStyle('should goto Google Translate page'), function() {
            
            cy.visit(baseUrl);
            cy.url().should('equal', baseUrl);
        });

        it(describeItStyle('should select correct source language'), function() {
            cy.xpath(translateTextBtn).click();
            cy.xpath(selectSourceLangBtn).click();
            cy.xpath(sourceLangInput).type(`${data.languages.source.lang}{enter}`);
            cy.xpath(sourceLangText);
        });

        it(describeItStyle('should select correct target language'), function() {
            cy.xpath(selectTargetLangBtn).click();
            cy.xpath(targetLangInput).type(`${data.languages.target.lang}{enter}`);
            cy.xpath(targetLangText);
        });

        it(describeItStyle('should correctly translate word list before/after swap'), function() {
            // Loop through word list checking for correct or known incorrect translation

            // Ignore all uncaught JS exceptions
            Cypress.on('uncaught:exception', function(err, runnable) {
                return false;
            });

            let moreTestWords = data.text.length;

            for (const element of data.text) {
                moreTestWords -= 1;
                cy.xpath(sourceTextInput).type(`${element.initial}{enter}`);
                cy.xpath(translatedText).invoke('text').then(function (text) {
                    if (element.expectTranslationToPass) {
                        expect(text).to.equal(element.expected);
                    } else {
                        expect(text).to.not.equal(element.expected);
                    }
                });

                cy.xpath(swapLangBtn).click();
                cy.xpath(targetTextSwapped)

                // Verify previous target translation is now in Source text location
                cy.xpath(sourceTextSwapped).invoke('text').then(function (text) {
                    if (element.expectTranslationToPass) {
                        expect(text).to.equal(element.expected);
                    } else {
                        expect(text).to.not.equal(element.expected);
                    }
                })

                // Verify new source word (old target) translates to original source word
                cy.xpath(targetTextSwapped).invoke('text').then(function (text) {
                    if (element.expectSwapTranslationToPass) {
                        expect(text).to.equal(element.initial);
                    } else {
                        expect(text).to.not.equal(element.initial);
                    }
                })

                // Set languages back to original selection to test more words
                if (moreTestWords) cy.xpath(swapLangBtn).click();
                // Clear source input text field
                cy.xpath(clearInputTextBtn).click();

                // Verify translation input was cleared using image comparison
                // if (moreTestWords) {
                //     const filename = await captureScreenshot(page, 'default');
                //     await compareScreenshots(filename, 2, 40);
                // }
            } // for
        });

        it(describeItStyle('should open virtual keyboard'), function() {
            cy.xpath(inputToolBtn).click();
            cy.xpath(screenKeyboard).click();
            cy.xpath(keyboardInUse).click();
        });

        it(describeItStyle('should correctly translate text typed on virtual keyboard'), function() {
            const inputTextData = data.keyboard.input.split('');
            for (const char of inputTextData) {
                const uppercaseRegex = /^[A-Z!?]{1}$/;

                if (uppercaseRegex.test(char)) {
                    cy.xpath(toUpperKey).click();
                }
                cy.xpath(`//span[text()='${char}']/parent::button`).click();
            }

            cy.xpath(inputText).invoke('text').then(function (text) {
                expect(text).to.equal(data.keyboard.input);
            })
           
            // Verify target text has correct translation
            cy.xpath(outputText);
        });

        it(describeItStyle('should close virtual keyboard'), function() {
            // Close virtual keyboard and verify it is gone
            cy.xpath(closeKeyboardBtn).click();
            cy.xpath(keyboardClosed);
        }); // it
    }); // describe
}); // context
