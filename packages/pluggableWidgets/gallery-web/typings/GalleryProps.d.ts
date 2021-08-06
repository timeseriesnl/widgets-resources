/**
 * This file was generated from Gallery.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ListActionValue, ListExpressionValue, ListWidgetValue } from "mendix";

export type PaginationEnum = "buttons" | "virtualScrolling";

export type PagingPositionEnum = "below" | "above";

export type ShowEmptyPlaceholderEnum = "none" | "custom";

export interface GalleryContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: ListValue;
    content: ListWidgetValue;
    desktopItems: number;
    tabletItems: number;
    phoneItems: number;
    pageSize: number;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder?: ReactNode;
    itemClass?: ListExpressionValue<string>;
    onClick?: ListActionValue;
}

export interface GalleryPreviewProps {
    class: string;
    style: string;
    datasource: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    desktopItems: number | null;
    tabletItems: number | null;
    phoneItems: number | null;
    pageSize: number | null;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    itemClass: string;
    onClick: {} | null;
}
