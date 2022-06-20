import React from "react";
import {Button, Flex, FormControl, FormControlProps, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import {Field, FieldArray, FieldProps, useFormikContext} from "formik";
import {FormValues} from "../UserInfoForm";

interface Props {
    name: string;
    minRow: number;
    maxRow: number;
    label: string;
    placeholders: string[];
    formControlProps?: FormControlProps;
}

export const MultipleInputField = React.memo<Props>(({name, label, minRow, maxRow, placeholders, formControlProps}) => {
    const form = useFormikContext<FormValues>();
    const values = form.values[name as keyof FormValues] as string[];

    const canAddRow = React.useMemo(() => values.length < maxRow, [values, maxRow]);
    const canRemoveRow = React.useMemo(() => values.length > minRow, [values, minRow]);

    let error = form.errors[name as keyof FormValues] as string | string[];
    error = Array.isArray(error) ? error.filter(Boolean)[0] : error;

    const touched = form.touched[name as keyof FormValues] as boolean;

    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <FormControl mt={4} isInvalid={touched && Boolean(error)} {...formControlProps}>
                    <FormLabel>{label}</FormLabel>
                    <Flex flexDir="column">
                        {values.map((value, index) => (
                            <InputGroup key={index} mb={1}>
                                <Field name={`${name}[${index}]`}>{({field}: FieldProps) => <Input {...field} placeholder={placeholders[index % placeholders.length]} />}</Field>
                                <InputRightElement>
                                    <IconButton disabled={!canRemoveRow} size="xs" aria-label="remove" onClick={() => arrayHelpers.remove(index)}>
                                        <CloseIcon />
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                        ))}
                        <Button disabled={!canAddRow} mt={1} onClick={() => arrayHelpers.push("")} colorScheme="telegram" leftIcon={<AddIcon />}>
                            新增一項
                        </Button>
                    </Flex>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            )}
        />
    );
});
