import puppeteer from "puppeteer";
import express from "express";

const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", function (req, res) {
  res.render("pages/index", { title: "test" });
});

const srv = app.listen(0, () => {
  console.log(`Express running`);
});

let page;
let browser;
const localhost = `http://localhost:${srv.address().port}`;
const width = 1440;
const height = 900;

describe("Index HTML", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async () => {
    await page.goto(localhost);
    await page.screenshot({ path: "index.png" });
    browser.close();
    srv.close();
  });

  it("express and ejs should be installed", async () => {
    const packageJson = require("./../package.json");
    const deps = Object.keys(packageJson.dependencies);
    expect(deps.length).toBeGreaterThan(1);
    expect(deps.indexOf("ejs") > -1).toBeTruthy();
    expect(deps.indexOf("express") > -1).toBeTruthy();
  });

  it("Should have a headline", async () => {
    await page.goto(localhost);
    const headline = await page.$("h1");
    expect(headline).not.toBeNull();
  });
});
