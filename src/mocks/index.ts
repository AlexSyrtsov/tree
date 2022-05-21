import { ITreeItemData } from "../interfaces/interfaces";

export const MOCK_TREE_ITEM_FIRST: ITreeItemData = {
  id: "0030d9c5-9f1b-431a-9080-03cc48dc117f",
  title: "Phones",
};

export const MOCK_TREE_ITEM_SECOND: ITreeItemData = {
  id: "0030d9c5-9f1b-431a-9080-03cc48dc117d",
  title: "Laptops",
};

export const MOCK_TREE_ITEM_THIRD: ITreeItemData = {
  id: "0030d9c5-9f1b-431a-9080-03cc48dc117z",
  title: "Desktop",
  parentId: "0030d9c5-9f1b-431a-9080-03cc48dc117f",
};

export const MOCK_TREE_ITEM_FOURTH: ITreeItemData = {
  id: "0030d9c5-9f1b-431a-9080-03cc48dc117a",
  title: "Watches",
  parentId: "0030d9c5-9f1b-431a-9080-03cc48dc117f",
};

export const MOCK_TREE_ITEM_DISABLED: ITreeItemData = {
  ...MOCK_TREE_ITEM_FIRST,
  disabled: true,
};

export const MOCK_TREE_ITEM_WITH_CHILDREN: ITreeItemData = {
  ...MOCK_TREE_ITEM_FIRST,
  childrenIds: [
    "0030d9c5-9f1b-431a-9080-03cc48dc117a",
    "0030d9c5-9f1b-431a-9080-03cc48dc117z",
  ],
};

export const MOCK_ITEMS_ARRAY = [
  MOCK_TREE_ITEM_WITH_CHILDREN,
  MOCK_TREE_ITEM_SECOND,
  MOCK_TREE_ITEM_THIRD,
  MOCK_TREE_ITEM_FOURTH,
];

export const MOCK_ITEMS_MAP = {
  "0030d9c5-9f1b-431a-9080-03cc48dc117f": MOCK_TREE_ITEM_WITH_CHILDREN,
  "0030d9c5-9f1b-431a-9080-03cc48dc117d": MOCK_TREE_ITEM_SECOND,
};
