const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  const targetElementSelector = '#tw-container'

  await page.goto('https://google.co.jp')
  await page.type('pupperteer 翻訳')
  await page.click('#tsf > div.tsf-p > div.jsb > center > input[type="submit"]:nth-child(1)')

  await page.waitFor(targetElementSelector)

  await page.screenshot({path: 'page-ss.png'})

  let elementSize = await page.evaluate((selector) => {
    let e = document.querySelector(selector)

    // エレメントの高さと位置を取得
    let eRect = e.getBoundingClientRect()

    // ウインドウをスクロール
    window.scroll(eRect.left, eRect.top);

    return {
      height: eRect.height,
      width: eRect.width
    }
  }, targetElementSelector)
  
  // Viewportをエレメントのサイズに変更
  page.setViewport(elementSize)

  await page.screenshot({path: 'tw-container-ss.png'});
  browser.close();
})();
