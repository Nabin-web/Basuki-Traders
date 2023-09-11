import CategoryManage from "@/containers/Admin/Category";

export default async function AdminSlug({ params: { adminSlug } }) {
  console.log("admin", adminSlug);

  if (adminSlug.includes("category-manage")) {
    if (adminSlug.length == 1) {
      return <CategoryManage />;
    }
  }

  return <div>page</div>;
}
