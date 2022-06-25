import React from "react";
import {Field, FieldProps} from "formik";
import {Checkbox, CheckboxProps} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    checkboxProps?: CheckboxProps;
}

export const CheckboxField = React.memo<Props>(({name, label, checkboxProps}) => {
    return (
        <Field name={name}>
            {({field}: FieldProps) => (
                <Checkbox {...field} {...checkboxProps}>
                    {label}
                </Checkbox>
            )}
        </Field>
    );
});
