import React from "react";
import {FilterGender} from "./enums/FilterGender";
import {Form, Formik} from "formik";
import {SelectField} from "../form/SelectField";
import {Button} from "@chakra-ui/react";
import {RangeField} from "../form/RangeField";
// @ts-ignore
import base64 from "base64-utf8";
import {Telegram} from "../../utils/Telegram";
import {CheckboxField} from "../form/CheckboxField";
import {GoalRelationship} from "../UserInfoForm/enums/GoalRelationship";

export interface FormValues {
    filterGender: FilterGender;
    filterAgeLowerBound: number;
    filterAgeUpperBound: number;
    filterHeightLowerBound: number;
    filterHeightUpperBound: number;
    filterGoalRelationship: boolean;
}

interface UserData extends FormValues {
    goalRelationship: GoalRelationship;
}

export const FilterForm = React.memo(() => {
    const submitButtonRef = React.useRef<HTMLButtonElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const userData: UserData | null = React.useMemo(() => {
        const params = new URL(window.location.href).searchParams;
        const userData = params.get("userData");

        if (!userData) {
            return null;
        }

        return JSON.parse(base64.decode(userData));
    }, []);

    const onSubmit = React.useCallback((values: FormValues) => {
        Telegram.WebApp.sendData(JSON.stringify(values));
        Telegram.WebApp.close();
    }, []);

    React.useEffect(() => {
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.isVisible = true;
        Telegram.WebApp.MainButton.text = userData ? "更改" : "提交";

        Telegram.WebApp.onEvent("mainButtonClicked", () => {
            submitButtonRef.current?.click();
        });

        return () => {
            Telegram.WebApp.offEvent("mainButtonClicked");
        };
    }, [userData]);

    return (
        <Formik<FormValues>
            initialValues={{
                filterGender: userData?.filterGender || FilterGender.異性,
                filterAgeLowerBound: userData?.filterAgeLowerBound || 13,
                filterAgeUpperBound: userData?.filterAgeUpperBound || 99,
                filterHeightLowerBound: userData?.filterHeightLowerBound || 140,
                filterHeightUpperBound: userData?.filterHeightUpperBound || 220,
                filterGoalRelationship: userData?.filterGoalRelationship || false,
            }}
            onSubmit={onSubmit}
        >
            {() => (
                <Form ref={formRef}>
                    <SelectField label="性別" name="filterGender" options={Object.values(FilterGender)} />
                    <RangeField formControlProps={{mt: 2, mb: 5, px: 2}} label="年齡" name="filterAge" min={13} max={99} unit="歲" />
                    <RangeField formControlProps={{mt: 2, mb: 5, px: 2}} label="身高" name="filterHeight" min={140} max={220} unit="cm" />
                    {userData?.goalRelationship ? <CheckboxField checkboxProps={{mt: 2, px: 2}} label={`只配對${GoalRelationship[userData.goalRelationship]}`} name="filterGoalRelationship" /> : null}

                    <Button display="none" w="full" ref={submitButtonRef} type="submit" mt={4}>
                        提交
                    </Button>
                </Form>
            )}
        </Formik>
    );
});
