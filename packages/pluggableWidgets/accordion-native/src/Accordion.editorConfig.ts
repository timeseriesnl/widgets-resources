import { hidePropertyIn, Properties } from "@mendix/piw-utils-internal";

import { AccordionPreviewProps } from "../typings/AccordionProps";

export function getProperties(
    values: AccordionPreviewProps,
    defaultProperties: Properties,
): Properties {
    values.groups.forEach((group, index) => {
        if (group.headerRenderMode === "text") {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerContent");
        } else {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerText");
        }
    });

    if (!values.collapsible) {
        hidePropertyIn(defaultProperties, values, "collapseBehavior");
    }

    return defaultProperties;
}
