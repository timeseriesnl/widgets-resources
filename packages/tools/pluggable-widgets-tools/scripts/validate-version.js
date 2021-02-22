const parser = require("fast-xml-parser");
const { readFile } = require("fs").promises;
const { join } = require("path");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    const packageXmlAsJson = parser.parse((await readFile(join(process.cwd(), "src/package.xml"))).toString(), {
        ignoreAttributes: false
    });
    const packageXmlVersion = packageXmlAsJson.package.clientModule["@_version"];
    const packageJson = JSON.parse((await readFile(join(process.cwd(), "package.json"))).toString());
    const packageJsonVersion = packageJson.version;

    if (packageJsonVersion === packageXmlVersion) return;

    throw new Error(`[${packageJson.name}] Package.json version does not match widget's package.xml version.`);
}
