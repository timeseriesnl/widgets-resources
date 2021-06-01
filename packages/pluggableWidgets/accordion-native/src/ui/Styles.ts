import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle, TextStyle } from "react-native";

export interface AccordionStyle extends Style {
    container: ViewStyle;
    group: AccordionGroupStyle;
}

export interface AccordionGroupStyle {
    container: ViewStyle;
    header: {
        container: ViewStyle;
        heading1: TextStyle;
        heading2: TextStyle;
        heading3: TextStyle;
        heading4: TextStyle;
        heading5: TextStyle;
        heading6: TextStyle;
        icon: AccordionIconStyle;
    };
    content: ViewStyle;
}

export interface AccordionIconStyle extends ViewStyle {
    size: number;
    color: string;
}

export const defaultAccordionStyle: AccordionStyle = {
    container: {
        backgroundColor: "#FFF"
    },
    group: {
        container: {
            flex: 1
        },
        header: {
            container: {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingHorizontal: 16
            },
            heading1: {
                fontWeight: "600",
                fontSize: 40,
                lineHeight: 60
            },
            heading2: {
                fontWeight: "600",
                fontSize: 34,
                lineHeight: 51
            },
            heading3: {
                fontWeight: "600",
                fontSize: 28,
                lineHeight: 42
            },
            heading4: {
                fontWeight: "600",
                fontSize: 24,
                lineHeight: 36
            },
            heading5: {
                fontWeight: "600",
                fontSize: 20,
                lineHeight: 30
            },
            heading6: {
                fontWeight: "600",
                fontSize: 16,
                lineHeight: 24
            },
            icon: {
                size: 16,
                color: "#000"
            }
        },
        content: {
            paddingTop: 8,
            paddingBottom: 16,
            paddingHorizontal: 16
        }
    }
};
