const yup = require("yup");
const createSchema = yup.object().shape({
  author: yup.string().required("Required field!"),
  title: yup.string().required("Required field!"),
  audio: yup.mixed().required("Required field!"),
  image: yup.mixed().required("Required field!"),
  genres: yup.array(yup.string()),
});
module.exports = createSchema;
