import React from "react";
import {Field, FieldProps, useFormikContext} from "formik";
import {FormControl, FormControlProps, FormErrorMessage, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    min: number;
    max: number;
    formControlProps?: FormControlProps;
}

export const NumberField = React.memo<Props>(({name, label, min, max, formControlProps}) => {
    const form = useFormikContext();

    return (
        <Field name={name}>
            {({field, meta: {touched, error}}: FieldProps) => (
                <FormControl isInvalid={touched && Boolean(error)} {...formControlProps}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput min={min} max={max} {...field} value={field.value ? String(field.value) : undefined} onChange={val => form.setFieldValue(field.name, String(val))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
});
