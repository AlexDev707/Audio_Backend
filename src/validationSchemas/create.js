const yup = require("yup");
const createSchema = yup.object().shape({
  author: yup.string().required("Required field!"),
  title: yup.string().required("Required field!"),
  fileUrl: yup.string().required("Required field!"),
  duration: yup.number().required("Required field!"),
  streamsCount: yup.number(),
  genres: yup.array(yup.string()),
});
module.exports = createSchema;
