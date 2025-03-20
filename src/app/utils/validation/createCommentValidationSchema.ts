import * as Yup from "yup";

export const CreatCommentValidationSchema = Yup.object({
  text: Yup.string().notRequired(),
  replyText: Yup.string().notRequired()
})