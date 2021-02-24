import { ViewStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface LinearGradientStyle extends Style {
    container: ViewStyle;
    gradient: ViewStyle;
}

export const defaultLinearGradientStyle: LinearGradientStyle = {
    container: {
        width: "100%",
        height: "100%"
    },
    gradient: {
        width: "100%",
        height: "100%"
    }
};
