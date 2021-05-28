import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle, TextStyle } from "react-native";


export interface AccordionStyle extends Style {
    container: ViewStyle;
    group: AccordionGroupStyle;
}

export interface AccordionGroupStyle {
    container: ViewStyle;
    header: {
        container: ViewStyle,
        text: TextStyle,
        icon: AccordionIconStyle
    };
    content: ViewStyle;
}

export interface AccordionIconStyle extends ViewStyle {
    size: number;
    color: string;
}

export const defaultAccordionStyle: AccordionStyle = {
    container: {
        backgroundColor: "#FFF",
    },
    group: {
        container: {
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#CED0D3",
        },
        header: {
            container: {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            },
            text: {
                fontSize: 18,
                paddingVertical: 8,
                paddingHorizontal: 16,
            },
            icon: {
                size: 16,
                color: "#000",
                paddingVertical: 8,
                paddingHorizontal: 16,
            },
        },
        content: {},
    },
};
