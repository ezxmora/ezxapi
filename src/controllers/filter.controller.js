import database from "../lib/database.js";
import PuppeteerSingleton from "../lib/puppeteer.js";
const { blacklisted } = database;

const loadTweet = async (url) => {
  const browser = await PuppeteerSingleton.getBrowser();
  
  const page = await browser.newPage();

  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "dark" },
  ]);

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

  // The tweet was deleted :(
  if ((await page.$(`h1[data-testid="error-detail"]`)) !== null) {
    await page.close();
    return;
  }

  await page.waitForSelector('article[role="article"]');

  return page;
};

export const filterTweet = async (req, res, next) => {
  const { url } = req.query;
  let page;

  try {
    page = await loadTweet(url);

    if (!page) {
      throw "The tweet was deleted";
    }

    // Extracting users handle
    const userElement = await page.$(
      'div[data-testid="User-Name"] > div:nth-child(2) a span'
    );
    const username = await page.evaluate((e) => e.innerText, userElement);
    await userElement.dispose();

    const foundUser = await blacklisted.findOne({
      where: { username: username.slice(1).toLowerCase() },
    });

    if (foundUser) {
      res.json({
        success: false,
        username,
        hide: foundUser.hide,
        img: `/v1/filter/img?url=${url}`,
      });
    } else {
      res.json({
        success: true,
        message: "It's a valid user",
      });
    }
  } catch (error) {
    next(error);
  } finally {
    await page.close();
  }
};

export const getTweet = async (req, res, next) => {
  const { url } = req.query;
  let page;

  try {
    page = await loadTweet(url);

    if (!page) {
      throw "The tweet was deleted";
    }

    const tweet = await page.$('article[role="article"]');

    await page.evaluate(() => {
      // target the sign in and cookie banner
      let headerElement = document.querySelector(
        'div[aria-label="Home timeline"] > div'
      );
      let bottomElement = document.querySelector("#layers > div");

      // remove these elements as we don't want them in the screenshot
      headerElement.parentNode.removeChild(headerElement);
      bottomElement.parentNode.removeChild(bottomElement);
    });

    const screenshot = await tweet.screenshot({
      optimizeForSpeed: true,
      encoding: "base64",
    });

    await page.close();
    const img = Buffer.from(screenshot, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (error) {
    next(error);
  } finally {
    await page.close();
  }
};

export const getBlacklist = async (_, res, next) => {
  try {
    const blacklistQuery = await blacklisted.findAll({
      attributes: ["username"],
    });

    res.json({
      success: true,
      blacklist: blacklistQuery.map((i) => i.username),
    });
  } catch (error) {
    next(error);
  }
};
