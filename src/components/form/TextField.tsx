import React from "react";
import {Field, FieldProps} from "formik";
import {FormControl, FormControlProps, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    formControlProps?: FormControlProps;
}

export const TextField = React.memo<Props>(({name, label, placeholder, formControlProps}) => {
    return (
        <Field name={name}>
            {({field, meta: {touched, error}}: FieldProps) => (
                <FormControl isInvalid={touched && Boolean(error)} {...formControlProps}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Input placeholder={placeholder} {...field} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
});
