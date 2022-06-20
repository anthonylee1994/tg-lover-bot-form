import React from "react";
import {FormControl, FormControlProps, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {Field, FieldProps} from "formik";

interface Props {
    name: string;
    label: string;
    options: string[];
    optional?: boolean;
    formControlProps?: FormControlProps;
}

export const SelectField = React.memo<Props>(({name, label, options, optional, formControlProps}) => {
    return (
        <Field name={name}>
            {({field, meta: {touched, error}}: FieldProps) => (
                <FormControl isInvalid={touched && Boolean(error)} {...formControlProps}>
                    <FormLabel>{label}</FormLabel>
                    <Select {...field}>
                        {optional && <option value="">不填寫</option>}
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
});
