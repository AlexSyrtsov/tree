import { memo } from "react";

import { ITreeItemData } from "../../interfaces/interfaces";
import { Tag } from "../tag";

import "./index.css";

interface ITagsListProps {
  tags: Array<ITreeItemData>;
}

export const TagsList = memo(({ tags }: ITagsListProps) => {
  return (
    <div className="tree-tags">
      <h4 className="tree__title">Selected variants</h4>
      <div className="tree-tags__wrapper">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
});
