/**
 * This file was generated from LinearGradient.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";

export interface LinearGradientProps<Style> {
    name: string;
    style: Style[];
    colorStart: string;
    colorEnd: string;
    changeAngle: boolean;
    angle: number;
    content?: ReactNode;
}

export interface LinearGradientPreviewProps {
    class: string;
    style: string;
    colorStart: string;
    colorEnd: string;
    changeAngle: boolean;
    angle: number | null;
    content: { widgetCount: number; renderer: ComponentType };
}
