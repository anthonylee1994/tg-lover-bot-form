import * as Yup from "yup";

export const formSchema = Yup.object().shape({
    name: Yup.string().required("「暱稱」必須填寫"),
    gender: Yup.string().required("「性別」必須填寫"),
    age: Yup.number().min(13, "「年齡」必須大於或等於13").max(99, "「年齡」必須少於或等於99").required("「年齡」必須填寫").typeError("「年齡」必須填寫"),
    height: Yup.number().min(140, "「身高」必須大於或等於140").max(220, "「身高」必須少於或等於220").required("「身高」必須填寫").typeError("「身高」必須填寫"),
    goalRelationship: Yup.string().required("「尋找對象關係」必須填寫"),
    smoking: Yup.string().required("「是否吸煙」必須填寫"),
    occupation: Yup.string().optional(),
    salary: Yup.number().optional().typeError("「薪資」輸入格式錯誤"),
    education: Yup.string().optional(),
    selfIntro: Yup.array().of(Yup.string().required("每一項必須填寫")).min(1).max(10).required("「自我介紹」必須填寫"),
    relationshipCriteria: Yup.array().of(Yup.string().required("每一項必須填寫")).min(1).max(10).required("「尋找對象」必須填寫"),
});
