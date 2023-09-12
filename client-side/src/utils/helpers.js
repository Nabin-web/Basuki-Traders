import { INTL_NUMBER_FORMAT } from "./constants";

export const errorBuildLvl1 = (errors) => {
  return (
    errors &&
    errors.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.context.key]: curr.message.replace(/[/"_]/g, " "),
      }),
      {}
    )
  );
};

export const queryHelper = (queryobj) => {
  let query = "";
  if (queryobj) {
    Object.keys(queryobj).map((each, index) => {
      console.log(each);
      if (index === 0) {
        query = `${each}=${queryobj[each]}`;
      } else {
        query = `${query}&${each}=${queryobj[each]}`;
      }
      return null;
    });
  }
  return query;
};

export const commaNumber = (number) =>
  new Intl.NumberFormat(
    INTL_NUMBER_FORMAT
    // {
    //   maximumSignificantDigits: 3,
    // }
  ).format(number);

export const slugify = (string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
