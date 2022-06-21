import React from "react";
import {useFormikContext} from "formik";
import {FormControl, FormControlProps, FormLabel, RangeSlider, RangeSliderFilledTrack, RangeSliderMark, RangeSliderThumb, RangeSliderTrack, Tooltip} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    min: number;
    max: number;
    unit: string;
    formControlProps?: FormControlProps;
}

export const RangeField = React.memo<Props>(({name, label, min, max, unit, formControlProps}) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const {setFieldValue, values} = useFormikContext<any>();
    const lowerBound = values[`${name}LowerBound`];
    const upperBound = values[`${name}UpperBound`];

    const onChange = React.useCallback(
        ([lowerBound, upperBound]: number[]) => {
            setFieldValue(`${name}LowerBound`, lowerBound);
            setFieldValue(`${name}UpperBound`, upperBound);
        },
        [name, setFieldValue]
    );

    return (
        <FormControl {...formControlProps}>
            <FormLabel>{label}</FormLabel>
            <RangeSlider
                /* eslint-disable-next-line jsx-a11y/aria-proptypes */
                aria-label={["min", "max"]}
                min={min}
                max={max}
                defaultValue={[lowerBound, upperBound]}
                onChange={onChange}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <RangeSliderMark value={min} mt="1" fontSize="sm">
                    {min}
                    {unit}
                </RangeSliderMark>
                <RangeSliderMark value={max} mt="1" ml={-10} fontSize="sm">
                    {max}
                    {unit}
                </RangeSliderMark>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>

                <Tooltip hasArrow bg="blue.500" color="white" placement="bottom" isOpen={showTooltip} label={`${lowerBound}${unit}`}>
                    <RangeSliderThumb index={0} />
                </Tooltip>
                <Tooltip hasArrow bg="blue.500" color="white" placement="bottom" isOpen={showTooltip} label={`${upperBound}${unit}`}>
                    <RangeSliderThumb index={1} />
                </Tooltip>
            </RangeSlider>
        </FormControl>
    );
});
