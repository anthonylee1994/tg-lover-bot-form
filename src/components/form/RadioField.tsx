import React from "react";
import {Field, FieldProps} from "formik";
import {FormControl, FormControlProps, FormErrorMessage, FormLabel, Radio, RadioGroup, Stack} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    options: string[];
    formControlProps?: FormControlProps;
}

export const RadioField = React.memo<Props>(({name, label, options, formControlProps}) => {
    return (
        <Field name={name}>
            {({field: {onChange, ...rest}, meta: {touched, error}}: FieldProps) => (
                <FormControl isInvalid={touched && Boolean(error)} {...formControlProps}>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup {...rest}>
                        <Stack direction="row">
                            {options.map((option, index) => (
                                <Radio key={index} value={option} onChange={onChange}>
                                    {option}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
});
