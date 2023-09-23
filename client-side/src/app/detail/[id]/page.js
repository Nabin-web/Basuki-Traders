import RelatedPrdoucts from "@/containers/ProductDetail/RelatedPrdoucts";
import { BASE_URL, IMAGE_URL, options } from "@/utils/Api";
import { CURRENCY_SIGN } from "@/utils/constants";
import Image from "next/image";
import React from "react";

async function getProductDetail(url_key) {
  const res = await fetch(`${BASE_URL}product/public/${url_key}`, {
    headers: options,
  }).then((res) => res.json());

  return res?.data ?? {};
}

async function getRelatedProducts(url_key) {
  const res = await fetch(`${BASE_URL}product/public/related/${url_key}`, {
    headers: options,
  }).then((res) => res.json());

  return res?.data ?? {};
}

const ProducDetail = async ({ params: { id } }) => {
  const data = await getProductDetail(id);
  const related = await getRelatedProducts(id);

  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          src={`${IMAGE_URL}${data?.image?.path}`}
          alt={data?.image?.filename}
          width={500}
          height={500}
          className="h-full w-auto object-contain mx-auto mb-8 md:mx-0 md:mb-0"
        />
        <div className="px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">{data?.name}</h2>
          <div className="grid grid-cols-2 w-full mb-4">
            <div className="text-base font-semibold text-gray-600">Price :</div>
            {data?.price - data?.sales_price > 0 ? (
              <div>
                <span className="text-lg font-semibold text-orange-500">
                  {CURRENCY_SIGN} {data?.sales_price}
                </span>
                <span className="text-gray-400 text-sm ml-2 line-through">
                  {CURRENCY_SIGN} {data?.price}
                </span>
              </div>
            ) : (
              <div className="text-lg font-semibold text-orange-500">
                {CURRENCY_SIGN} {data?.price}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 w-full mb-4 text-sm">
            <div className="text-base font-semibold text-gray-600">
              Product SKU :{" "}
            </div>
            <div>{data?.product_sku}</div>
          </div>
          <div className="grid grid-cols-2 w-full mb-4 text-sm">
            <div className="text-base font-semibold text-gray-600">
              Product Category :{" "}
            </div>
            <div>{data?.category?.title}</div>
          </div>
          <div className="grid grid-cols-2 w-full mb-4 text-sm">
            <div className="text-base font-semibold text-gray-600">
              Product Type :{" "}
            </div>
            <div>{data?.product_type?.name}</div>
          </div>
          <div className="mt-8">
            <h5 className="text-base font-semibold mb-3 border-b border-gray-300 pb-2 text-secondary">
              Product Description
            </h5>
            <p className="text-sm text-gray-600">{data?.description}</p>
          </div>
        </div>
      </div>
      <RelatedPrdoucts data={related || []} />
    </div>
  );
};

export default ProducDetail;
