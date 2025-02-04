const fs = require("fs-extra");
const { execSync } = require("child_process");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");
const cssnano = require("cssnano");
const postcss = require("postcss");
const { minify } = require("html-minifier");

const dist = path.join("dist", "AlgoGrad");
const src = __dirname;  // Get the current project root dynamically

// Automatically detect files and folders
const filesToCopy = ["index.html", "style.css"];
const foldersToCopy = ["assets", "js"];

// Find all JS and CSS files dynamically
const jsFiles = fs.readdirSync(path.join(src, "js"))
  .filter(file => file.endsWith(".js"))
  .map(file => `js/${file}`);

const cssFiles = fs.readdirSync(src)
  .filter(file => file.endsWith(".css"));

// Clean and create dist folder
fs.removeSync(dist);
fs.mkdirpSync(dist);

// Copy static files
filesToCopy.forEach((file) => {
  const srcFilePath = path.join(src, file);
  const distFilePath = path.join(dist, file);

  if (file.endsWith(".html")) {
    // Minify HTML files
    const htmlContent = fs.readFileSync(srcFilePath, "utf8");
    const minifiedHtml = minify(htmlContent, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    });
    fs.writeFileSync(distFilePath, minifiedHtml);
  } else {
    // Just copy other files as is
    fs.copySync(srcFilePath, distFilePath);
  }
});

foldersToCopy.forEach((folder) => fs.copySync(folder, path.join(dist, folder)));

// Minify and Obfuscate JS
jsFiles.forEach((file) => {
  const output = path.join(dist, file);
  fs.ensureDirSync(path.dirname(output));

  const jsContent = fs.readFileSync(file, "utf8");

  const obfuscatedCode = JavaScriptObfuscator.obfuscate(jsContent, {
    compact: true,
    controlFlowFlattening: false,  // Set to false for easier debugging
    deadCodeInjection: false,
    debugProtection: false,
    selfDefending: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75
  }).getObfuscatedCode();

  fs.writeFileSync(output, obfuscatedCode);
});

// Minify and Optimize CSS
cssFiles.forEach((file) => {
  const output = path.join(dist, file);
  fs.readFile(file, "utf8", (err, cssContent) => {
    if (err) throw err;
    postcss([cssnano])
      .process(cssContent, { from: file, to: output })
      .then((result) => {
        fs.writeFileSync(output, result.css);
      })
      .catch((error) => console.error("CSS Minification Error:", error));
  });
});

console.log("✅ Dynamic build created in 'dist/AlgoGrad'!");
