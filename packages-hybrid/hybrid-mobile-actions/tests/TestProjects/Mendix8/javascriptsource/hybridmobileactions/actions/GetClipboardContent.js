"use strict";
// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.
/**
 * @returns {string}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function GetClipboardContent() {
    // BEGIN USER CODE
    // Documentation https://www.npmjs.com/package/cordova-clipboard
    return new Promise(resolve => {
        if (!cordova.plugins || !cordova.plugins.clipboard) {
            throw new Error("GetClipboardContent action requires cordova-clipboard plugin to be installed in the app");
        }
        cordova.plugins.clipboard.paste(text => {
            resolve(text);
        });
    });
    // END USER CODE
}
