import { useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  IBrand,
  ICategory,
  IModel,
  ITreeItemData,
  IVariant,
} from "../../interfaces/interfaces";
import {
  formatDeviceSubtitleString,
  formatLargestSubtitleString,
} from "../../utils";

import { Tree } from "../tree";

import "./index.css";

export const App = () => {
  const [categories, setCategories] = useState<Array<ITreeItemData>>([]);
  useEffect(() => {
    async function loadData() {
      const localCategories = localStorage.getItem("values");
      if (!localCategories) {
        let values: Array<any> = [];
        const productsMap: Map<string, number> = new Map();
        const productsBrandsMap: Map<string, number> = new Map();
        const data = await fetch("https://api.soum.sa/api/v1/category");
        const json = await data.json();
        const list = await Promise.all(
          json.categoryList.map(async (category: ICategory) => {
            const data = await fetch(
              `https://api.soum.sa/api/v1/brand/${category.category_id}`
            );
            const json = await data.json();
            const brands = await Promise.all(
              json.brandList.map(async (brand: IBrand) => {
                const data = await fetch(
                  `https://api.soum.sa/api/v1/model/${category.category_id}/${brand.brand_id}`
                );
                const json = await data.json();
                const models = await Promise.all(
                  json.modelList.map(async (model: IModel) => {
                    const variants = await Promise.all(
                      model.varients.map(async (varient: IVariant) => {
                        const products = await fetch(
                          `https://apiv2.soum.sa/rest/api/v1/product/get-mpp-products/${model._id}?capacities=${varient.varient}&size=10000`
                        );
                        const productsJson = await products.json();
                        const previuosProductsCount =
                          productsMap.get(
                            `${category.category_name}.${brand.brand_name}.${model.model_name}`
                          ) || 0;

                        productsMap.set(
                          `${category.category_name}.${brand.brand_name}.${model.model_name}`,
                          previuosProductsCount +
                            productsJson.responseData.length
                        );
                        const previuosProductsBrandsCount =
                          productsBrandsMap.get(
                            `${category.category_name}.${brand.brand_name}`
                          ) || 0;

                        productsBrandsMap.set(
                          `${category.category_name}.${brand.brand_name}`,
                          previuosProductsBrandsCount +
                            productsJson.responseData.length
                        );
                        const devicesCount = productsJson.responseData.length;
                        return {
                          id: v4(),
                          parentId: model._id,
                          title: varient.varient,
                          subtitle: formatDeviceSubtitleString(devicesCount),
                          disabled: !devicesCount,
                          tagTitle: `${model.model_name} ${varient.varient}`,
                        };
                      })
                    );
                    values = [...values, ...variants];
                    const devicesCount = productsMap.get(
                      `${category.category_name}.${brand.brand_name}.${model.model_name}`
                    );
                    return {
                      id: model._id,
                      parentId: brand.brand_id,
                      title: model.model_name,
                      childrenIds: variants.map((item) => item.id),
                      subtitle: formatDeviceSubtitleString(devicesCount),
                      disabled: !devicesCount,
                      tagTitle: `${model.model_name}`,
                    };
                  })
                );
                let topModelName = "";
                let topModelCount = 0;
                let allModelsCount = 0;
                productsMap.forEach((value, key) => {
                  if (
                    !key.includes(
                      `${category.category_name}.${brand.brand_name}`
                    )
                  ) {
                    return;
                  }
                  allModelsCount += value;
                  if (topModelCount < value) {
                    topModelName = key.replace(
                      `${category.category_name}.${brand.brand_name}.`,
                      ""
                    );
                    topModelCount = value;
                  }
                });
                values = [...values, ...models];
                return {
                  id: brand.brand_id,
                  parentId: category.category_id,
                  title: brand.brand_name,
                  childrenIds: models.map((item) => item.id),
                  subtitle: formatLargestSubtitleString(
                    topModelCount,
                    topModelName,
                    allModelsCount - topModelCount,
                    "model"
                  ),
                  tagTitle: `${brand.brand_name} ${category.category_name}`,
                };
              })
            );

            let topBrandName = "";
            let topBrandCount = 0;
            let allBrandsCount = 0;

            productsBrandsMap.forEach((value, key) => {
              if (!key.includes(`${category.category_name}`)) {
                return;
              }
              allBrandsCount += value;
              if (topBrandCount < value) {
                topBrandName = key.split(".")[1];
                topBrandCount = value;
              }
            });

            values = [...values, ...brands];
            return {
              id: category.category_id,
              title: category.category_name,
              childrenIds: brands.map((item) => item.id),
              subtitle: formatLargestSubtitleString(
                topBrandCount,
                topBrandName,
                allBrandsCount - topBrandCount,
                category.category_name
                  .toLowerCase()
                  .slice(0, category.category_name.length)
              ),
            };
          })
        );

        values = [...values, ...list];
        localStorage.setItem("values", JSON.stringify(values));
        setCategories(values);
        return;
      }
      setCategories(JSON.parse(localCategories));
    }
    if (!categories.length) {
      loadData();
    }
  }, [categories]);
  return (
    <div className="app__wrapper">
      {categories.length ? (
        <Tree
          data={categories}
          onChange={(selectedElements: Array<ITreeItemData>) =>
            console.log(selectedElements)
          }
        />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
