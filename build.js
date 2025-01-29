const fs = require("fs-extra");
const { execSync } = require("child_process");
const path = require("path");

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

// Minify JS
jsFiles.forEach((file) => {
  const output = path.join(dist, file);
  fs.ensureDirSync(path.dirname(output)); // Ensure directory exists
  execSync(`terser ${file} -o ${output} --compress --mangle`);
});

// Minify CSS
cssFiles.forEach((file) => {
  const output = path.join(dist, file);
  execSync(`cleancss -o ${output} ${file}`);
});

// Minify HTML
execSync(
  `html-minifier-terser --collapse-whitespace --remove-comments --minify-js true --minify-css true -o ${path.join(
    dist,
    "index.html"
  )} index.html`
);

console.log("✅ Minified build created in 'dist/AlgoGrad' folder!");
