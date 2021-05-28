import { createElement, ReactElement, useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { Animated, Easing, View, Pressable, Text, ViewStyle, LayoutChangeEvent } from "react-native";
import { DynamicValue, NativeIcon } from "mendix";
import { Icon } from "mendix/components/native/Icon";
import { exclude, flattenStyles } from "@mendix/piw-native-utils-internal";

import { AccordionProps } from "../typings/AccordionProps";
import { defaultAccordionStyle, AccordionStyle, AccordionIconStyle } from "./ui/Styles";

declare interface GlyphIcon {
    readonly type: "glyph";
    readonly iconClass: string;
}

interface GroupIconProps {
    isExpanded: boolean,
    iconCollapsed: DynamicValue<NativeIcon> | undefined,
    iconExpanded: DynamicValue<NativeIcon> | undefined,
    style: AccordionIconStyle
}

export function Accordion(props: AccordionProps<AccordionStyle>): ReactElement | null {
    const styles = flattenStyles(defaultAccordionStyle, props.style);
    const [collapsedGroups, setCollapsedGroups] = useState<number[]>([]);
    return (
        <View style={styles.container}>
            {props.groups.map((group, index) => (
                group.visible ? (
                    <View style={styles.group.container}>
                        <Pressable
                            style={styles.group.header.container}
                            onPress={() => {
                                if (collapsedGroups.includes(index)) {
                                    setCollapsedGroups(collapsedGroups.filter(i => i !== index));
                                } else {
                                    const newValue = props.collapseBehavior === "singleExpanded" ? [index] : [...collapsedGroups, index];
                                    setCollapsedGroups(newValue);
                                }
                            }}
                        >
                            {group.headerRenderMode === "text" ? (
                                <Text style={styles.group.header.text}>{group.headerText.value}</Text>
                            ) : group.headerContent}
                            <GroupIcon
                                isExpanded={collapsedGroups.includes(index)}
                                iconCollapsed={group.iconCollapsed}
                                iconExpanded={group.iconExpanded}
                                style={styles.group.header.icon}
                            />
                        </Pressable>
                        <AnimatedCollapsibleView isExpanded={collapsedGroups.includes(index)} style={styles.content}>
                            {group.content}
                        </AnimatedCollapsibleView>
                    </View>
                ) : null
            ))}
        </View>
    );
}

function GroupIcon(props: GroupIconProps): ReactElement | null {
    const {iconCollapsed, iconExpanded, isExpanded} = props;
    const customIconsConfigured = iconCollapsed && iconCollapsed.value && iconExpanded && iconExpanded.value;
    const customIconSource = iconCollapsed?.value;
    const customExpandedIconSource = iconExpanded?.value;
    const source = isExpanded ? customExpandedIconSource : customIconSource;
    const iconStyles = exclude(props.style, ["size", "color"]);
    const icon: GlyphIcon = {type: "glyph", iconClass: "glyphicon-chevron-down"};
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedRotation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isExpanded, animatedValue]);

    return customIconsConfigured ? (
        <View style={iconStyles}>
            <Icon icon={source} size={props.style.size} color={props.style.color}/>
        </View>
    ) : (
       <Animated.View
           style={[iconStyles, {
               transform: [{rotate: animatedRotation}],
           }]}>
           <Icon icon={icon} size={props.style.size} color={props.style.color}/>
       </Animated.View>
   );
}

export function AnimatedCollapsibleView(
    {
        isExpanded,
        style,
        children,
    }
        :
        {
            isExpanded: boolean;
            style: ViewStyle;
            children: ReactNode;
        },
):
    ReactElement {
    const startingHeight = 0;
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const isFullHeightCalculated = useRef(false);

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isExpanded ? fullHeight : startingHeight,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isExpanded, fullHeight, animatedHeight]);

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            if (!isFullHeightCalculated.current) {
                isFullHeightCalculated.current = true;
                setFullHeight(e.nativeEvent.layout.height);
            }
        },
        [isFullHeightCalculated.current],
    );

    return (
        <Animated.View
            style={{
                height: isFullHeightCalculated.current ? animatedHeight : undefined,
            }}
            onLayout={onLayout}
        >
            <View style={style}>{children}</View>
        </Animated.View>
    );
}
