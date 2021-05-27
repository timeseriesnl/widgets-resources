import { createElement, ReactElement } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

import { changeTimeToMidnight } from "./utils/utils";
import { addDays } from "date-fns";

import { and, attribute, greaterThanOrEqual, lessThan, literal, or } from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";

interface Locale {
    [key: string]: object;
}

export default function DatagridDateFilter(props: DatagridDateFilterContainerProps): ReactElement | null {
    const FilterContext = getFilterDispatcher();

    const { languageTag = "en-US", patterns } = (window as any).mx.session.getConfig().locale;

    const [language] = languageTag.split("-");
    const languageTagWithoutDash = languageTag.replace("-", "");

    if (languageTagWithoutDash in locales) {
        registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
    } else if (language in locales) {
        registerLocale(language, (locales as Locale)[language]);
    }

    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The data grid date filter widget must be placed inside the header of the Data grid 2.0 widget.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterContextValue => {
                if (!filterContextValue || !filterContextValue.filterDispatcher || !filterContextValue.attribute) {
                    return alertMessage;
                }
                const { filterDispatcher, attribute } = filterContextValue;

                const errorMessage = getAttributeTypeErrorMessage(attribute.type);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={props.defaultFilter}
                        defaultValue={props.defaultValue?.value}
                        dateFormat={patterns.date}
                        locale={language}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: Date | null, type: DefaultFilterEnum): void =>
                            filterDispatcher({
                                getFilterCondition: () => getFilterCondition(attribute, value, type)
                            })
                        }
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && type !== "DateTime"
        ? "The attribute type being used for Data grid date filter is not 'Date and time'"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue,
    value: Date | null,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || !value) {
        return undefined;
    }

    const filterAttribute = attribute(listAttribute.id);
    const dateValue = changeTimeToMidnight(value);
    switch (type) {
        case "greater":
            // >= Day +1 at midnight
            return greaterThanOrEqual(filterAttribute, literal(addDays(dateValue, 1)));
        case "greaterEqual":
            // >= day at midnight
            return greaterThanOrEqual(filterAttribute, literal(dateValue));
        case "equal":
            // >= day at midnight and < day +1 midnight
            return and(
                greaterThanOrEqual(filterAttribute, literal(dateValue)),
                lessThan(filterAttribute, literal(addDays(dateValue, 1)))
            );
        case "notEqual":
            // < day at midnight or >= day +1 at midnight
            return or(
                lessThan(filterAttribute, literal(dateValue)),
                greaterThanOrEqual(filterAttribute, literal(addDays(dateValue, 1)))
            );
        case "smaller":
            // < day at midnight
            return lessThan(filterAttribute, literal(dateValue));
        case "smallerEqual":
            // < day +1 at midnight
            return lessThan(filterAttribute, literal(addDays(dateValue, 1)));
    }
}
