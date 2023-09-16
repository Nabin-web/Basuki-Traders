import CategoryManage from "@/containers/Admin/Category";
import MediaManage from "@/containers/Admin/Media";
import ProductType from "@/containers/Admin/ProductType";

export default async function AdminSlug({ params: { adminSlug } }) {
  if (adminSlug.includes("category-manage")) {
    if (adminSlug.length == 1) {
      return <CategoryManage />;
    }
  } else if (adminSlug.includes("product-type-manage")) {
    return (
      <>
        <ProductType />
      </>
    );
  } else if (adminSlug.includes("media-manage")) {
    return <MediaManage />;
  }

  return <div>page</div>;
}
