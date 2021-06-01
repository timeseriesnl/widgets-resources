import { actionValue, dynamicValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { Text } from "react-native";
import { Accordion, Props } from "../Accordion";
import { fireEvent, render } from "react-native-testing-library";

// jest.mock("react-native/Libraries/Utilities/Platform", () => ({
//     OS: "ios",
//     select: jest.fn(dict => dict.ios),
// }));

const defaultProps: Props = {
    name: "accordion-test",
    style: [],
    groups: [
        {
            headerRenderMode: "text",
            headerTextRenderMode: "heading1",
            headerText: dynamicValue<string>("Header1"),
            headerContent: undefined,
            content: <Text>Content</Text>,
            visible: dynamicValue<boolean>(true),
            groupCollapsed: "groupStartExpanded",
            groupCollapsedDynamic: dynamicValue<boolean>(undefined),
            groupAttribute: new EditableValueBuilder<boolean>().withValue(undefined).build(),
            groupOnChange: actionValue()
        },
        {
            headerRenderMode: "custom",
            headerTextRenderMode: "heading1",
            headerText: dynamicValue<string>(undefined),
            headerContent: <Text>Header2</Text>,
            content: <Text>Content</Text>,
            visible: dynamicValue<boolean>(true),
            groupCollapsed: "groupStartExpanded",
            groupCollapsedDynamic: dynamicValue<boolean>(undefined),
            groupAttribute: new EditableValueBuilder<boolean>().withValue(undefined).build(),
            groupOnChange: actionValue()
        }
    ],
    collapsible: true,
    collapseBehavior: "singleExpanded",
    icon: "right",
    iconExpanded: undefined,
    iconCollapsed: undefined
};

describe("Accordion", () => {
    describe("in collapsible & single expanded group mode", () => {
        it("renders correctly", () => {
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the accordion groups icon on left side", () => {
            const accordion = render(<Accordion {...defaultProps} icon={"left"} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the accordion groups without an icon", () => {
            const accordion = render(<Accordion {...defaultProps} icon={"no"} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the first accordion group initially collapsed", () => {
            defaultProps.groups[0].groupCollapsed = "groupStartCollapsed";
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("hides the first accordion group when visibility is false", () => {
            defaultProps.groups[0].visible = dynamicValue(false);
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the first accordion group initially collapsed based on expression", () => {
            defaultProps.groups[0].groupCollapsed = "groupStartDynamic";
            defaultProps.groups[0].groupCollapsedDynamic = dynamicValue(true);
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the first accordion group initially collapsed based on attribute", () => {
            defaultProps.groups[0].groupAttribute = new EditableValueBuilder<boolean>().withValue(true).build();
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("executes the first accordion group onChange action when header pressed", () => {
            const accordion = render(<Accordion {...defaultProps} />);
            fireEvent.press(accordion.getByText("Header1"));
            expect(defaultProps.groups[0].groupOnChange?.execute).toHaveBeenCalledTimes(1);
        });
    });

    describe("in collapsible & multi expanded group mode", () => {
        it("renders correctly", () => {
            defaultProps.collapseBehavior = "multipleExpanded";
            const accordion = render(<Accordion {...defaultProps} />);
            expect(accordion.toJSON()).toMatchSnapshot();
        });
    });
});
