/**
 * This file was generated from Accordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { DynamicValue, NativeIcon } from "mendix";

export type HeaderRenderModeEnum = "text" | "custom";

export interface GroupsType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: DynamicValue<string>;
    iconCollapsed?: DynamicValue<NativeIcon>;
    iconExpanded?: DynamicValue<NativeIcon>;
    headerContent?: ReactNode;
    content?: ReactNode;
    visible: DynamicValue<boolean>;
}

export type CollapseBehaviorEnum = "singleExpanded" | "multipleExpanded";

export interface GroupsPreviewType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: string;
    iconCollapsed: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    iconExpanded: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    headerContent: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    visible: string;
}

export interface AccordionProps<Style> {
    name: string;
    style: Style[];
    groups: GroupsType[];
    collapsible: boolean;
    collapseBehavior: CollapseBehaviorEnum;
}

export interface AccordionPreviewProps {
    class: string;
    style: string;
    groups: GroupsPreviewType[];
    collapsible: boolean;
    collapseBehavior: CollapseBehaviorEnum;
}
