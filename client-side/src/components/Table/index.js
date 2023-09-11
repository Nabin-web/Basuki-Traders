import dynamic from "next/dynamic";

const DynamicTable = dynamic(() => import("./Table"), { ssr: false });

export default DynamicTable;
