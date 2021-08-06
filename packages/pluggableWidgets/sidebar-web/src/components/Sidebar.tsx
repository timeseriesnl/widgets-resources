import { createElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/Sidebar.scss";
import { registerSidebarToggle } from "../utils/SidebarToggleRegistration";
import { Alert } from "@mendix/piw-utils-internal";

export interface SidebarProps {
    name: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    collapsible?: boolean;
    startExpanded?: boolean;
    width?: CSSProperties["width"];
    collapsedWidth?: CSSProperties["width"];
    expandedWidth?: CSSProperties["width"];
    slideOver?: boolean;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>): ReactElement {
    const [expanded, setExpanded] = useState(props.startExpanded);
    const [error, setError] = useState("");

    let width: string | number | undefined;

    if (props.collapsible) {
        width = expanded ? props.expandedWidth : props.collapsedWidth;
    } else {
        width = props.width;
    }

    useEffect(() => {
        if (props.collapsible) {
            let unregisterSidebarToggle: () => void;

            try {
                unregisterSidebarToggle = registerSidebarToggle(() => setExpanded(prevExpanded => !prevExpanded));
            } catch (e) {
                setError(e.message);
            }

            return () => unregisterSidebarToggle();
        }
    }, [props.name, props.collapsible]);

    if (error) {
        return <Alert bootstrapStyle={"danger"}>{error}</Alert>;
    }

    return (
        <aside
            className={classNames(
                "widget-sidebar",
                {
                    "widget-sidebar-slide-over": props.slideOver,
                    "widget-sidebar-expanded": props.collapsible && expanded
                },
                props.className
            )}
            style={{ ...props.style, width }}
            tabIndex={props.tabIndex}
        >
            {props.children}
        </aside>
    );
}
