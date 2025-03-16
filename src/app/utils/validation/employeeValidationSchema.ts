import * as Yup from 'yup'

const nameRegex = /^[a-zA-Zა-ჰ\s]+$/;
export const  EmployeeValidationSchema =Yup.object({
  name: Yup.string().required('Name is required').min(2).max(255).matches(nameRegex,"გთხოვთ, გამოიყენოთ მხოლოდ ლათინური ან ქართული სიმბოლოები"),
  surname: Yup.string().required('Surname is required').min(2).max(255).matches(nameRegex,"გთხოვთ, გამოიყენოთ მხოლოდ ლათინური ან ქართული სიმბოლოები"),
  avatar:Yup.string().required(),
  department_id:Yup.number().required()
})