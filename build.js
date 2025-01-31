const fs = require("fs-extra");
const { execSync } = require("child_process");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");
const cssnano = require("cssnano");
const postcss = require("postcss");

const dist = path.join("dist", "AlgoGrad");
const filesToCopy = ["index.html"];
const foldersToCopy = ["assets"];
const jsFiles = ["js/index.js"];
const cssFiles = ["style.css"];

// Clean and create dist folder
fs.removeSync(dist);
fs.mkdirpSync(dist); // Ensure all necessary directories are created

// Copy static files
filesToCopy.forEach((file) => fs.copySync(file, path.join(dist, file)));
foldersToCopy.forEach((folder) => fs.copySync(folder, path.join(dist, folder)));

// Minify and Obfuscate JS
jsFiles.forEach((file) => {
  const output = path.join(dist, file);
  fs.ensureDirSync(path.dirname(output)); // Ensure directory exists

  // Read the JS file
  const jsContent = fs.readFileSync(file, "utf8");

  // Minify and obfuscate
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(jsContent, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    debugProtection: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75
  }).getObfuscatedCode();

  // Save the obfuscated and minified JS file
  fs.writeFileSync(output, obfuscatedCode);
});

// Minify and Optimize CSS with cssnano
cssFiles.forEach((file) => {
  const output = path.join(dist, file);

  fs.readFile(file, "utf8", (err, cssContent) => {
    if (err) throw err;

    // Use cssnano to optimize and minify CSS
    postcss([cssnano])
      .process(cssContent, { from: file, to: output })
      .then((result) => {
        // Save the optimized CSS
        fs.writeFileSync(output, result.css);
        if (result.map) {
          fs.writeFileSync(output + ".map", result.map);
        }
      })
      .catch((error) => {
        console.error("CSS Minification Error:", error);
      });
  });
});

// Define absolute path to cli.js for html-minifier-terser
const htmlMinifierCliPath = path.join(__dirname, 'node_modules', 'html-minifier-terser', 'cli.js');

try {
  // Minify HTML
  execSync(
    `node ${htmlMinifierCliPath} --collapse-whitespace --remove-comments --minify-js true --minify-css true -o ${path.join(
      __dirname, dist, "index.html"
    )} index.html`
  );

  console.log("✅ Minified and obfuscated build created in 'dist/AlgoGrad' folder!");
} catch (error) {
  console.error("Error minifying HTML:", error);
}
