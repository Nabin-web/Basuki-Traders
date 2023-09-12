export const getCategoryDropdown = (category) => {
  let childContent = [];
  const resetChildContent = () => {
    childContent = [];
  };
  const getChildCategory = (parentObj, depth) => {
    if (parentObj.child_category.length) {
      parentObj.child_category.map((childElement) => {
        childContent.push({
          label: `${"-".repeat(depth) + childElement.title}`,
          value: childElement._id,
        });
        if (childElement.child_category && childElement.child_category.length) {
          return getChildCategory(childElement, depth + 1);
        }
      });
      return childContent;
    }
    return [];
  };

  let jointCats = [];

  category.map((each) => {
    const obj = { label: each.title, value: each._id };
    jointCats.push(obj);

    const obj2 =
      each.child_category &&
      each.child_category[0] &&
      each.child_category[0]._id !== ""
        ? (resetChildContent(),
          getChildCategory(each, 1).map((eachChild) => eachChild))
        : null;
    if (obj2 !== null) {
      jointCats.push(...obj2);
    }

    return obj;
  });

  return jointCats;
};

export const parentCategoryNormalized = (category) => {
  return getCategoryDropdown(category).reduce(
    (acc, curr) => ({
      ...acc,
      [curr.value]: curr,
    }),
    {}
  );
};
