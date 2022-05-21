import { memo, useCallback, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import DownIcon from "../../assets/down.svg";
import { ITreeItemData } from "../../interfaces/interfaces";

import "./index.css";

interface ITreeItemProps {
  data: ITreeItemData;
  getValueFromData: (id: string) => ITreeItemData;
}

export const TreeItem = memo(({ data, getValueFromData }: ITreeItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const hasChildren = data?.childrenIds?.length;

  const toggle = useCallback(() => setIsCollapsed(!isCollapsed), [isCollapsed]);

  return (
    <div className="tree-item__wrapper">
      <div
        className={`tree-item__name-wrapper tree-item__name-wrapper_${
          hasChildren ? "with-icon" : "without-icon"
        }`}
      >
        {hasChildren && (
          <img
            className={`tree-item__collapse-icon tree-item__collapse-icon_${
              isCollapsed ? "down" : "up"
            }`}
            src={DownIcon}
            onClick={toggle}
          />
        )}
        <label className="tree-item__checkbox-wrapper" htmlFor={data.id}>
          <input
            className="tree-item__checkbox"
            type="checkbox"
            id={data.id}
            name={data.id}
            disabled={data.disabled}
            checked={data.checked}
          />
          <div className="tree-item__label-wrapper">
            <span className="tree-item__label-title">{data.title}</span>
            {isCollapsed && (
              <span className="tree-item__label-subtitle">{data.subtitle}</span>
            )}
          </div>
        </label>
      </div>
      <TransitionGroup className="tree-item__children-wrapper">
        {!isCollapsed &&
          data.childrenIds?.map((item) => (
            <CSSTransition
              key={item}
              timeout={500}
              classNames="tree-item__children"
            >
              <TreeItem
                data={getValueFromData(item)}
                getValueFromData={getValueFromData}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
});
