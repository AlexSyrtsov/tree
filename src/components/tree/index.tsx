import { FormEventHandler, memo, useCallback, useMemo, useState } from "react";

import { TagsList } from "../tagsList";
import { TreeItem } from "../treeItem";
import { ITreeItemData } from "../../interfaces/interfaces";

import "./index.css";
import { formatDataToMap } from "../../utils";

interface ITreeProps {
  data: Array<ITreeItemData>;
  onChange: (selectedElements: Array<ITreeItemData>) => void;
}

export const Tree = memo(({ data, onChange }: ITreeProps) => {
  const [dataMap, setDataMap] = useState(formatDataToMap(data));

  const firstElements = data.filter((item) => !item.parentId);

  const getValueFromData = useCallback(
    (id: string) => {
      return dataMap[id];
    },
    [dataMap]
  );

  const recursiveCheck = useCallback(
    (item: ITreeItemData, value: boolean) => {
      if (item.childrenIds?.length) {
        item.childrenIds.forEach((childId) => {
          recursiveCheck(dataMap[childId], value);
        });
      }
      dataMap[item.id].checked = value;
      return;
    },
    [dataMap]
  );

  const recursiveCheckParent = useCallback(
    (item: ITreeItemData) => {
      if (!item.parentId) {
        return;
      }
      if (
        dataMap[item.parentId].childrenIds?.find(
          (item) => !dataMap[item].checked
        )
      ) {
        dataMap[item.parentId].checked = false;
        recursiveCheckParent(dataMap[item.parentId]);
        return;
      }
      dataMap[item.parentId].checked = true;

      recursiveCheckParent(dataMap[item.parentId]);
      return;
    },
    [dataMap]
  );

  const onCheckboxClick: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      const target = event.target as HTMLFormElement;
      const value = target.checked;
      const id = target.id;
      const element = dataMap[id];

      if (value) {
        recursiveCheck(element, true);
      } else {
        recursiveCheck(element, false);
      }
      recursiveCheckParent(element);
      setDataMap({ ...dataMap });
    },
    [dataMap]
  );

  const selectedElements = useMemo(() => {
    const result: any[] = [];
    const recursiveFindChecked = (item: ITreeItemData) => {
      if (item.checked) {
        result.push(item);
        return;
      }
      item.childrenIds?.forEach((id) =>
        recursiveFindChecked(getValueFromData(id))
      );
    };
    firstElements.forEach((treeItem) => {
      recursiveFindChecked(treeItem);
    });
    onChange(result);
    return result;
  }, [dataMap]);

  return (
    <div className="tree">
      <h4 className="tree__title">Browse products</h4>
      <div className="tree__wrapper">
        <form onChange={onCheckboxClick}>
          {firstElements.map((item: ITreeItemData) => (
            <TreeItem
              key={item.id}
              data={getValueFromData(item.id)}
              getValueFromData={getValueFromData}
            />
          ))}
        </form>
      </div>

      {selectedElements.length ? <TagsList tags={selectedElements} /> : null}
    </div>
  );
});
