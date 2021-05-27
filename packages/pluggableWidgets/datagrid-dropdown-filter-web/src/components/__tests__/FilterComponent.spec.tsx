import { mount, shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";
import { ListAttributeValueBuilder } from "@mendix/piw-utils-internal";

const defaultOptions = [
    { caption: "1", value: "_1" },
    { caption: "2", value: "_2" },
    { caption: "3", value: "_3" }
];

describe("Filter selector", () => {
    describe("with single selection", () => {
        describe("renders correctly", () => {
            it("with options", () => {
                const component = shallow(<FilterComponent options={defaultOptions} />);

                expect(component).toMatchSnapshot();
            });
            it("with no options", () => {
                const component = shallow(<FilterComponent options={[]} />);

                expect(component).toMatchSnapshot();
            });
            it("with ariaLabel", () => {
                const component = shallow(<FilterComponent options={defaultOptions} ariaLabel="my label" />);

                expect(component).toMatchSnapshot();
            });
            it("with emptyOptioncaption", () => {
                const component = shallow(<FilterComponent options={defaultOptions} emptyOptionCaption={"find me"} />);

                expect(component).toMatchSnapshot();
                expect(component.find("input").first().prop("placeholder")).toBe("find me");
            });

            it("with automatic options from the attribute", () => {
                const component = mount(
                    <FilterComponent
                        auto
                        attribute={new ListAttributeValueBuilder()
                            .withUniverse(["enum_value_1", "enum_value_2"])
                            .build()}
                        options={[]}
                    />
                );

                const input = component.find("input.dropdown-triggerer");
                input.simulate("click");

                expect(component).toMatchSnapshot();
            });
        });
        it("selects default option", () => {
            const defaultOption = defaultOptions[0];
            const component = shallow(<FilterComponent options={defaultOptions} defaultValue={defaultOption.value} />);

            const input = component.find("input").first();

            expect(input.prop("value")).toBe(defaultOption.caption);
        });

        describe("when value changes", () => {
            it("calls updateFilters when value changes", () => {
                const updateFilterHandler = jest.fn();
                const component = shallow(
                    <FilterComponent options={defaultOptions} updateFilters={updateFilterHandler} />
                );

                const input = component.find("input");
                input.simulate("click");

                const item = component.find("li").first();
                item.simulate("click");

                expect(updateFilterHandler).toBeCalled();
            });
            it("shows selected option on input value", () => {
                const defaultOption = defaultOptions[1];
                const component = shallow(
                    <FilterComponent options={defaultOptions} defaultValue={defaultOption.value} />
                );

                const input = component.find("input");
                input.simulate("click");

                expect(component.find("input").first().prop("value")).toBe(defaultOption.caption);

                const item = component.find("li").last(); // [cap 3: val:_3]
                item.simulate("click");

                expect(component.find("input").first().prop("value")).toBe(defaultOptions[2].caption);
            });
        });
    });

    describe("with multi selection", () => {
        describe("renders correctly", () => {
            it("with options", () => {
                const component = shallow(<FilterComponent multiSelect options={defaultOptions} />);

                expect(component).toMatchSnapshot();
            });
            it("with no options", () => {
                const component = shallow(<FilterComponent multiSelect options={[]} />);

                expect(component).toMatchSnapshot();
            });
            it("with ariaLabel", () => {
                const component = shallow(
                    <FilterComponent options={defaultOptions} multiSelect ariaLabel="my label" />
                );

                expect(component).toMatchSnapshot();
            });
            it("with emptyOptioncaption", () => {
                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} emptyOptionCaption={"find me"} />
                );

                expect(component).toMatchSnapshot();
                expect(component.find("input").first().prop("placeholder")).toBe("find me");
            });
        });

        describe("with default options set", () => {
            it("selects single default option", () => {
                const defaultOption = defaultOptions[0];
                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={defaultOption.value} />
                );

                const input = component.find("input").first();

                expect(input.prop("value")).toBe(defaultOption.caption);
            });

            it("selects multiple default options", () => {
                const defaultValue = `${defaultOptions[0].value},${defaultOptions[1].value}`;

                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={defaultValue} />
                );

                const input = component.find("input").first();
                const expectedCaptions = `${defaultOptions[0].caption},${defaultOptions[1].caption}`;
                expect(input.prop("value")).toBe(expectedCaptions);
            });

            it("filters incorrect default options", () => {
                const inCorrectDefaultValue = `${defaultOptions[0].value},${defaultOptions[1].value},SomeRandomText`;

                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={inCorrectDefaultValue} />
                );

                const input = component.find("input").first();

                const expectedCaptions = `${defaultOptions[0].caption},${defaultOptions[1].caption}`;
                expect(input.prop("value")).toBe(expectedCaptions);
            });
        });

        describe("when value changes", () => {
            it("calls updateFilters when value changes", () => {
                const updateFiltersHandler = jest.fn();
                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} updateFilters={updateFiltersHandler} />
                );

                const input = component.find("input");
                input.simulate("click");

                const item = component.find("li").first();
                item.simulate("click");

                expect(updateFiltersHandler).toBeCalled();
            });
            it("shows selected options on input value", () => {
                const component = shallow(<FilterComponent multiSelect options={defaultOptions} />);

                const input = component.find("input");
                input.simulate("click");

                const item = component.find("li").at(1);
                item.simulate("click");
                const item2 = component.find("li").at(2);
                item2.simulate("click");

                expect(component.find("input").first().prop("value")).toBe("2,3");
            });
        });
    });
});
