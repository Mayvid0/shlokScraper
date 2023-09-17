const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.gitasupersite.iitk.ac.in/", { timeout: 60000 });

    await page.click('a[href="srimad?language=dv&field_chapter_value=1&field_nsutra_value=1"]');

    await page.waitForSelector(".form-select.required")
    await page.click(".form-select.required")
    const language = "gu";
    await page.select("#edit-language", language);

    await page.waitForSelector('[name="field_chapter_value"]');
    await page.click('[name="field_chapter_value"]');
    const chapter = "7"; 
    await page.select("#edit-field-chapter-value", chapter);
    
    await page.waitForSelector('[name="field_nsutra_value"]');
    await page.click('[name="field_nsutra_value"]');
    const shloka = "10"; 
    await page.select("#edit-field-nsutra-value", shloka);
    

    await page.waitForSelector(".views-field.views-field-body");

    const smbgShlok = await page.evaluate(() => {
        const shlokInfo = document.querySelectorAll(".views-field.views-field-body p");
        return Array.from(shlokInfo).map((sh, index) => {
            if (index === 1) { 
                return { shlok: sh.textContent.trim() };
            }
        }).filter(Boolean);
    });
    console.log(smbgShlok)
    await browser.close()
    
})();
