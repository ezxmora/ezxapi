import puppeteer from "puppeteer";

class PuppeteerSingleton {
  constructor() {
    this.browser = null;
  }

  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true });
    }
  }

  async getBrowser(){
    if (!this.browser) {
        await this.init();
    }

    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
        await this.browser.close();
        this.browser = null;
    }
  }
}

export default PuppeteerSingleton = new PuppeteerSingleton();
