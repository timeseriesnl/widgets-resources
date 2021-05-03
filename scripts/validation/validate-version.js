const { readFile } = require("fs").promises;
const { join } = require("path");
const { parseStringPromise } = require("xml2js");

main().catch(error => {
    console.error(error);
    process.exit(1);
});

async function main() {
    const packageXmlAsJson = await parseStringPromise(
        (await readFile(join(process.cwd(), "src/package.xml"))).toString(),
        { ignoreAttrs: false }
    );
    const packageXmlVersion = packageXmlAsJson.package.clientModule[0].$.version;
    const packageJson = JSON.parse((await readFile(join(process.cwd(), "package.json"))).toString());
    const packageJsonVersion = packageJson.version;
    const filesMissingVersion = [];

    if (!packageXmlVersion) filesMissingVersion.push("package.xml");
    if (!packageJsonVersion) filesMissingVersion.push("package.json");

    if (filesMissingVersion.length)
        throw new Error(`[${packageJson.name}] ${filesMissingVersion.join(" and ")} missing version.`);

    if (packageJsonVersion === packageXmlVersion) return;

    throw new Error(`[${packageJson.name}] package.json and package.xml versions do not match.`);
}
