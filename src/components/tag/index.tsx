import { memo } from "react";

import { ITreeItemData } from "../../interfaces/interfaces";

import "./index.css";

interface ITagProps {
  tag: ITreeItemData;
}

export const Tag = memo(({ tag }: ITagProps) => {
  return (
    <div className="tree-tag">
      <span>{tag.tagTitle ?? tag.title}</span>
    </div>
  );
});
