export const getFormData = (data, images) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  Object.keys(images).map((each) => {
    if (Array.isArray(images[each])) {
      images[each].map((fileObj) => formData.append([each], fileObj));
    } else {
      formData.append("file", images[each]);
    }
    return null;
  });
  console.log("this", formData.getAll("file"));
  return formData;
};
