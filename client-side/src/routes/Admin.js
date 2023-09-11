import {
  RiGridFill,
  RiLayout2Fill,
  RiShoppingBasketFill,
} from "react-icons/ri";

const adminLinks = [
  {
    key: "1",
    name: "Category Manage",
    icon: <RiGridFill />,
    link: "/admin/category-manage",
  },
  {
    key: "2",
    name: "Product Type Manage",
    icon: <RiLayout2Fill />,
    link: "/admin/product-type-manage",
  },
  {
    key: "3",
    name: "Product Manage",
    icon: <RiShoppingBasketFill />,
    link: "/admin/products-manage",
  },
];

export default adminLinks;