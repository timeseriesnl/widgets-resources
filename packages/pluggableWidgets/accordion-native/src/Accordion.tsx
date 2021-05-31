import { createElement, ReactElement, useState, useRef } from "react";
import { View } from "react-native";
import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";

import { AccordionProps, GroupsType } from "../typings/AccordionProps";
import { defaultAccordionStyle, AccordionStyle } from "./ui/Styles";
import { AccordionGroup } from "./components/AccordionGroup";

export function Accordion(props: AccordionProps<AccordionStyle>): ReactElement | null {
    const styles = flattenStyles(defaultAccordionStyle, props.style);
    const initialRender = useRef(false);
    const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

    if (!initialRender.current) {
        let initialExpandedGroups = props.groups.reduce((acc: number[], group: GroupsType, index: number): number[] => group.groupCollapsed === "groupStartExpanded" ? [...acc, index] : acc, []);
        setExpandedGroups(props.collapseBehavior === "singleExpanded" ? [initialExpandedGroups[0]] : initialExpandedGroups);
        initialRender.current = true;
    }

    const onChangeGroup = (group: GroupsType, value: boolean): void => {
        if (group.groupAttribute && isAvailable(group.groupAttribute)) {
            group.groupAttribute?.setValue(value);
        }
        executeAction(group.groupOnChange);
    };

    const onPressGroupHeader = (group: GroupsType, index: number): void => {
        const expanded = expandedGroups.includes(index);
        onChangeGroup(group, !expanded);
        expanded ? collapseGroup(index) : expandGroup(index);
    };

    const collapseGroup = (index: number): void => {
        setExpandedGroups(expandedGroups.filter(i => i !== index));
    };
    const expandGroup = (index: number): void => {
        setExpandedGroups(props.collapseBehavior === "singleExpanded" ? [index] : [...expandedGroups, index]);
    };

    return (
        <View style={styles.container}>
            {props.groups.map((group: GroupsType, index: number): ReactElement => (
                    <AccordionGroup
                        key={index}
                        index={index}
                        icon={props.icon}
                        iconCollapsed={props.iconCollapsed}
                        iconExpanded={props.iconExpanded}
                        group={group}
                        isExpanded={expandedGroups.includes(index)}
                        collapseGroup={collapseGroup}
                        expandGroup={expandGroup}
                        onPressGroupHeader={onPressGroupHeader}
                        visible={group.visible}
                        style={styles.group}
                    />
                ),
            )}
        </View>
    );
}
