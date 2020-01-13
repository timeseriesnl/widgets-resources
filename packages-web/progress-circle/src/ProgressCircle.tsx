import { createElement, useCallback, useRef, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { executeAction } from "@widgets-resources/piw-utils";
import { ValueStatus } from "mendix";
import { ProgressCircleContainerProps } from "../typings/ProgressCircleProps";

import classNames from "classnames";
import { Circle } from "progressbar.js";

import "./ui/ProgressCircle.scss";

const ProgressCircle = (props: ProgressCircleContainerProps): JSX.Element => {
    const progressCircle = useRef<Circle>();
    const progressCircleContainerNode = useRef<HTMLDivElement>(null);

    const onClick = useCallback(() => {
        executeAction(props.onClick);
    }, [props.onClick]);

    useEffect(() => {
        createProgressCircle();

        return () => {
            progressCircle.current!.destroy();
        };
    }, []);

    useEffect(() => {
        setProgress();
    }, [props.value, props.maximumValue, props.customText]);

    const textClass = props.textStyle === "text" ? "mx-text" : props.textStyle;
    const validMax =
        props.maximumValue && props.maximumValue.status === ValueStatus.Available && props.maximumValue.value.gt(0);
    const positiveValue = props.value && props.value.status === ValueStatus.Available ? props.value.value.gte(0) : true;

    return (
        <div className={classNames("widget-progress-circle", props.class)} style={props.style}>
            <div
                className={classNames(textClass, {
                    [`widget-progress-circle-${props.negativeBrandStyle}`]: !positiveValue,
                    [`widget-progress-circle-${props.positiveBrandStyle}`]: positiveValue,
                    "widget-progress-circle-alert": !validMax,
                    "widget-progress-circle-clickable": !!props.onClick
                })}
                onClick={onClick}
                ref={progressCircleContainerNode}
            />
        </div>
    );

    function createProgressCircle(): void {
        const thickness = props.circleThickness && props.circleThickness > 30 ? 30 : props.circleThickness;
        const circle = new Circle(progressCircleContainerNode.current, {
            duration: props.animate ? 800 : -1,
            strokeWidth: thickness,
            trailWidth: thickness
        });
        circle.path.className.baseVal = "widget-progress-circle-path";
        circle.trail.className.baseVal = "widget-progress-circle-trail-path";
        progressCircle.current = circle;
    }

    function setProgress() {
        let progress = 0;
        let progressText: string;

        if (props.maximumValue.status === ValueStatus.Available && props.maximumValue.value.lte(0)) {
            progressText = "Invalid maximum value";
        } else if (
            props.value.status === ValueStatus.Available &&
            props.maximumValue.status === ValueStatus.Available
        ) {
            // set text and progress

            progress = Math.round(
                (Number(props.value.value.toString()) / Number(props.maximumValue.value.toString())) * 100
            );
            if (props.showContent === "value") {
                progressText = `${props.value.value}`;
            } else if (props.showContent === "percentage") {
                progressText = progress + "%";
            } else if (props.showContent === "customText") {
                progressText =
                    props.customText && props.customText.status === ValueStatus.Available ? props.customText.value : "";
            } else {
                progressText = "";
            }
        } else {
            progressText = "--";
        }

        let animateValue = progress / 100;
        if (animateValue > 1) {
            animateValue = 1;
        } else if (animateValue < -1) {
            animateValue = -1;
        }

        progressCircle.current!.setText(progressText);
        progressCircle.current!.animate(animateValue);
    }
};

export default hot(ProgressCircle);

// export interface ProgressCircleProps {
//     alertMessage?: string;
//     animate?: boolean;
//     className?: string;
//     clickable?: boolean;
//     displayTextValue?: string;
//     maximumValue?: number;
//     negativeValueColor?: BootstrapStyle;
//     onClickAction?: () => void;
//     positiveValueColor?: BootstrapStyle;
//     style?: object;
//     displayText?: DisplayText;
//     textSize?: ProgressTextSize;
//     value?: number;
//     circleThickness?: number;
// }

// export type BootstrapStyle = "default" | "primary" | "inverse" | "success" | "info" | "warning" | "danger";
// export type ProgressTextSize = "text" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// export class ProgressCircle extends Component<ProgressCircleProps, { alertMessage?: string }> {
//     static defaultProps: ProgressCircleProps = {
//         animate: true,
//         displayText: "percentage",
//         maximumValue: 100,
//         textSize: "h2"
//     };
//     private progressNode: HTMLElement | null | undefined;
//     private progressCircle: Circle;
//     private setProgressNode: (node: HTMLElement | null) => void;
//     private progressCircleColorClass: string | undefined;

//     constructor(props: ProgressCircleProps) {
//         super(props);

//         this.state = { alertMessage: props.alertMessage };
//         this.setProgressNode = node => (this.progressNode = node);
//     }

//     componentDidMount(): void {
//         this.createProgressCircle(this.props.circleThickness);
//         this.setProgress(
//             this.props.value,
//             this.props.maximumValue,
//             this.props.displayText,
//             this.props.displayTextValue
//         );
//     }

//     componentWillReceiveProps(newProps: ProgressCircleProps): void {
//         if (newProps.alertMessage !== this.props.alertMessage) {
//             this.setState({ alertMessage: newProps.alertMessage });
//         }
//         if (this.props.circleThickness !== newProps.circleThickness) {
//             this.progressCircle.destroy();
//             this.createProgressCircle(newProps.circleThickness);
//         }
//         this.setProgress(newProps.value, newProps.maximumValue, newProps.displayText, newProps.displayTextValue);
//     }

//     render(): ReactNode {
//         const { maximumValue, textSize, negativeValueColor, positiveValueColor, value } = this.props;
//         const textClass = textSize === "text" ? "mx-text" : textSize;
//         const validMax = typeof maximumValue === "number" ? maximumValue > 0 : false;
//         return createElement(
//             "div",
//             {
//                 className: classNames("widget-progress-circle", this.props.className),
//                 style: this.props.style
//             },
//             createElement(Alert, { bootstrapStyle: "danger", message: this.state.alertMessage }),
//             createElement("div", {
//                 className: classNames(textClass, this.progressCircleColorClass, {
//                     [`widget-progress-circle-${negativeValueColor}`]: value ? value < 0 : false,
//                     [`widget-progress-circle-${positiveValueColor}`]: value ? value > 0 : false,
//                     "widget-progress-circle-alert": !validMax,
//                     "widget-progress-circle-clickable": this.props.clickable
//                 }),
//                 onClick: this.props.onClickAction,
//                 ref: this.setProgressNode
//             })
//         );
//     }

//     componentWillUnmount(): void {
//         this.progressCircle.destroy();
//     }

//     private createProgressCircle(circleThickness?: number): void {
//         const thickness = (circleThickness && circleThickness > 30 ? 30 : circleThickness) || 6;
//         this.progressCircle = new Circle(this.progressNode, {
//             duration: this.props.animate ? 800 : -1,
//             strokeWidth: thickness,
//             trailWidth: thickness
//         });
//         this.progressCircle.path.className.baseVal = "widget-progress-circle-path";
//         this.progressCircle.trail.className.baseVal = "widget-progress-circle-trail-path";
//     }

//     private setProgress = (value: number | undefined, maximum = 100, text?: DisplayText, displayTextValue?: string) => {
//         let progress = 0;
//         let progressText: string;

//         if (value === null || typeof value === "undefined") {
//             progressText = "--";
//         } else if (maximum <= 0) {
//             progressText = "Invalid";
//         } else {
//             progress = Math.round((value / maximum) * 100);
//             if (text === "value") {
//                 progressText = `${value}`;
//             } else if (text === "percentage") {
//                 progressText = progress + "%";
//             } else if (text === "static" || text === "attribute") {
//                 progressText = displayTextValue || "";
//             } else {
//                 progressText = "";
//             }
//         }

//         let animateValue = progress / 100;
//         if (animateValue > 1) {
//             animateValue = 1;
//         } else if (animateValue < -1) {
//             animateValue = -1;
//         }

//         this.progressCircle.setText(progressText);
//         this.progressCircle.animate(animateValue);
//     };
// }
