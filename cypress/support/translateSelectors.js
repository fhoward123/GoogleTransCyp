'use strict';

const data = require('../fixtures/translateData.json');

module.exports = {
    clearInputTextBtn: "//button[@aria-label='Clear source text']",
    closeKeyboardBtn: "//*[@id='kbd']//div[@class='vk-t-btn ita-kd-img vk-sf-cl']",
    emptyInputTextField: "(//textarea[@aria-label='Source text']/following-sibling::div[normalize-space()=''])[1]",
    inputText: `//textarea[@aria-label='Source text']/following-sibling::div`,
    inputToolBtn: "//a[@aria-label='Show the Input Tools menu']",
    keyboardClosed: `//*[@id='kbd'][contains(@style,'display: none;')]//div[@class='vk-t']/span[text()='${data.keyboard.verifyType}']`,
    keyboardInUse: `//*[@id='kbd'][not(contains(@style,'display: none;'))]//div[@class='vk-t']/span[text()='${data.keyboard.verifyType}']`,
    outputText: `//span[text()='${data.keyboard.output}']`,
    screenKeyboard: `//span[@class='ita-kd-menuitem-inputtool-name'][text()='${data.keyboard.selectType}']`,
    selectSourceLangBtn: "(//button[@aria-label='More source languages'])[1]",
    selectTargetLangBtn: "(//button[@aria-label='More target languages'])[1]",
    sourceLangInput: "(//input[@aria-label='Search languages'])[1]",
    sourceLangText: `((//span[text()='Detect language'])[1]/../../../button[@aria-selected='true'][@data-language-code='${data.languages.source.abbr}']/span/span)[1]`,
    sourceTextInput: "//textarea[@aria-label='Source text']",
    sourceTextSwapped: `(//span[@lang='${data.languages.target.abbr}']//div[1])[2]`,
    swapLangBtn: "(//button[@aria-label='Swap languages (Ctrl+Shift+S)'])[1]",
    targetLangInput: "(//input[@aria-label='Search languages'])[2]",
    targetLangText: `((//button[@aria-label='More target languages'])[1]/preceding-sibling::div//button[@aria-selected='true'][@data-language-code='${data.languages.target.abbr}']/span/span)[1]`,
    targetTextSwapped: `//span[@data-language-for-alternatives='${data.languages.source.abbr}'][@data-language-to-translate-into='${data.languages.target.abbr}']/span`,
    toUpperKey: "(//*[@id='K16'])[1]/span",
    translatedText: `//span[@data-language-for-alternatives='${data.languages.target.abbr}'][@data-language-to-translate-into='${data.languages.source.abbr}']/span`,
    translateTextBtn: "//span[text()='Text']/parent::button",
};
