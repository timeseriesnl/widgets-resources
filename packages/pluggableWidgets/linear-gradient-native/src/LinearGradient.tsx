import { createElement } from "react";
import { StyleSheet, View } from "react-native";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import Gradient from "react-native-linear-gradient";

import { defaultLinearGradientStyle, LinearGradientStyle } from "./ui/Styles";
import { LinearGradientProps } from "../typings/LinearGradientProps";

export function LinearGradient(props: LinearGradientProps<LinearGradientStyle>): JSX.Element | null {
    const styles = flattenStyles(defaultLinearGradientStyle, props.style);
    const { name, colorStart, colorEnd, changeAngle, angle, content } = props;
    const angleProps = changeAngle ? { useAngle: true, angle, angleCenter: { x: 0.5, y: 0.5 } } : {};

    return (
        <View style={styles.container}>
            <Gradient style={[styles.gradient]} colors={[colorStart, colorEnd]} testID={name} {...angleProps} />
            <View style={[StyleSheet.absoluteFill]} testID={name + "$View"}>
                {content}
            </View>
        </View>
    );
}
