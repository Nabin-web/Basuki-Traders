import CategoryManage from "@/containers/Admin/Category";
import MediaManage from "@/containers/Admin/Media";
import ProductListing from "@/containers/Admin/Product";
import ProductsAddEdit from "@/containers/Admin/Product/AddEdit";
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
  } else if (adminSlug.includes("products-manage")) {
    if (adminSlug.length == 1) {
      return <ProductListing />;
    } else if (adminSlug.length >= 2) {
      return <ProductsAddEdit product_id={adminSlug[2]} />;
    }
  }

  return <div>page</div>;
}
