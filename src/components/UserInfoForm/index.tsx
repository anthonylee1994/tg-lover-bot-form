import React from "react";
import {Form, Formik} from "formik";
import {formSchema} from "./formSchema";
import {TextField} from "components/form/TextField";
import {Button} from "@chakra-ui/react";
import {RadioField} from "components/form/RadioField";
import {NumberField} from "components/form/NumberField";
import {SelectField} from "components/form/SelectField";
import {GoalRelationship} from "./enums/GoalRelationship";
import {Gender} from "./enums/Gender";
import {Smoking} from "./enums/Smoking";
import {Education} from "./enums/Education";
import {MultipleInputField} from "components/form/MultipleInputField";
import {Telegram} from "utils/Telegram";

export interface FormValues {
    name: string;
    gender: Gender.男;
    age: number | null;
    height: number | null;
    goalRelationship: GoalRelationship;
    smoking: Smoking;
    occupation?: string;
    salary?: number;
    education: Education | "";
    selfIntro: string[];
    relationshipCriteria: string[];
}

export const UserInfoForm = React.memo(() => {
    const submitButtonRef = React.useRef<HTMLButtonElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const onSubmit = React.useCallback((values: FormValues) => {
        const formData: any = {};
        formData.name = values.name;
        formData.gender = values.gender;
        formData.age = values.age;
        formData.height = Number(values.height);
        formData.goalRelationship = values.goalRelationship;
        formData.smoking = values.smoking;
        formData.selfIntro = values.selfIntro;
        formData.relationshipCriteria = values.relationshipCriteria;

        if (values.occupation) formData.occupation = values.occupation;
        if (values.salary) formData.salary = Number(values.salary);
        if (values.education) formData.education = values.education;

        Telegram.WebApp.sendData(JSON.stringify(formData));
        Telegram.WebApp.close();
    }, []);

    React.useEffect(() => {
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.isVisible = true;
        Telegram.WebApp.MainButton.text = "提交";

        Telegram.WebApp.onEvent("mainButtonClicked", () => {
            submitButtonRef.current?.click();
        });
    }, []);

    return (
        <Formik<FormValues>
            initialValues={{
                name: "",
                gender: Gender.男,
                age: null,
                height: null,
                goalRelationship: GoalRelationship.穩定關係,
                smoking: Smoking.不吸煙,
                education: "",
                selfIntro: [""],
                relationshipCriteria: [""],
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form ref={formRef}>
                    <TextField name="name" label="暱稱" placeholder="eg. 小強" />
                    <RadioField formControlProps={{mt: 2}} name="gender" label="性別" options={Object.values(Gender)} />
                    <NumberField formControlProps={{mt: 2}} name="age" label="年齡" min={13} max={99} />
                    <NumberField formControlProps={{mt: 2}} name="height" label="身高" min={140} max={220} />
                    <SelectField formControlProps={{mt: 2}} name="goalRelationship" label="尋找對象關係" options={Object.values(GoalRelationship)} />
                    <SelectField formControlProps={{mt: 2}} name="smoking" label="是否吸煙" options={Object.values(Smoking)} />
                    <TextField formControlProps={{mt: 2}} name="occupation" label="職業" placeholder="eg. IT狗" />
                    <NumberField formControlProps={{mt: 2}} name="salary" label="月入" min={0} max={100_000_000} />
                    <SelectField formControlProps={{mt: 2}} name="education" label="學歷" options={Object.values(Education)} optional />

                    <MultipleInputField
                        formControlProps={{mt: 4}}
                        label="自我介紹 (至少一項，最多十項)"
                        name="selfIntro"
                        minRow={1}
                        maxRow={10}
                        placeholders={["我是。。。", "我喜歡。。。", "我的興趣是。。。"]}
                    />

                    <MultipleInputField
                        formControlProps={{mt: 4}}
                        label="尋找對象 (至少一項，最多十項)"
                        name="relationshipCriteria"
                        minRow={1}
                        maxRow={10}
                        placeholders={["樣靚", "身材正", "人品好"]}
                    />

                    <Button display="none" w="full" ref={submitButtonRef} type="submit" mt={4}>
                        提交
                    </Button>
                </Form>
            )}
        </Formik>
    );
});
