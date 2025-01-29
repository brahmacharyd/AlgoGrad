const fs = require("fs-extra");
const { execSync } = require("child_process");

const dist = "dist/";
const filesToCopy = ["index.html"];
const foldersToCopy = ["assets"];
const jsFiles = ["js/index.js"];
const cssFiles = ["style.css"];

// Clean and create dist folder
fs.removeSync(dist);
fs.mkdirSync(dist);

// Copy static files
filesToCopy.forEach(file => fs.copySync(file, `${dist}${file}`));
foldersToCopy.forEach(folder => fs.copySync(folder, `${dist}${folder}`));

// Minify JS
jsFiles.forEach(file => {
    const output = `${dist}${file}`;
    fs.ensureDirSync(output.substring(0, output.lastIndexOf("/")));
    execSync(`terser ${file} -o ${output} --compress --mangle`);
});

// Minify CSS
cssFiles.forEach(file => {
    const output = `${dist}${file}`;
    execSync(`cleancss -o ${output} ${file}`);
});

// Minify HTML
execSync(`html-minifier-terser --collapse-whitespace --remove-comments --minify-js true --minify-css true -o ${dist}index.html index.html`);

console.log("✅ Minified build created in 'dist/' folder!");
