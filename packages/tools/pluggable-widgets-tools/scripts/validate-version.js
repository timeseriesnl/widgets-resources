const { readFile } = require("fs").promises;
const { join } = require("path");
const { parseStringPromise } = require("xml2js");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    const packageXmlAsJson = await parseStringPromise(
        (await readFile(join(process.cwd(), "src/package.xml"))).toString(),
        {
            ignoreAttrs: false
        }
    );
    const packageXmlVersion = packageXmlAsJson.package.clientModule[0].$.version;
    const packageJson = JSON.parse((await readFile(join(process.cwd(), "package.json"))).toString());
    const packageJsonVersion = packageJson.version;

    if (packageJsonVersion && packageXmlVersion && packageJsonVersion === packageXmlVersion) return;

    throw new Error(`[${packageJson.name}] Package.json version does not match widget's package.xml version.`);
}
