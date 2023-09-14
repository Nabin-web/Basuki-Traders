import CategoryManage from "@/containers/Admin/Category";
import ProductType from "@/containers/Admin/ProductType";

export default async function AdminSlug({ params: { adminSlug } }) {
  console.log(
    "page",
    adminSlug.includes("product-type-manage"),
    adminSlug.includes("category-manage")
  );

  if (adminSlug.includes("category-manage")) {
    if (adminSlug.length == 1) {
      return <CategoryManage />;
    }
  } else if (adminSlug.includes("product-type-manage")) {
    return <ProductType />;
  }

  return <div>page</div>;
}
