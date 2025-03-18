import * as Yup from "yup";

export const CreateTaskValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3).max(255),
  description: Yup.string()
    .notRequired()
    .min(4, "მინიმუმ 4 სიტყვა უნდა იყოს")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .test("wordCount", "მინიმუმ 4 სიტყვა უნდა იყოს", (value) => {
      if (!value) return true;
      return value.split(" ").filter((word) => word.length > 0).length >= 4;
    }),
  priority_id: Yup.number().required(),
  status_id: Yup.number().required(),
  department_id: Yup.number().required("დეპარტამენტის არჩევა აუცილებელია"),
  employee_id: Yup.number().required(),
  due_date: Yup.date().required(),
});
