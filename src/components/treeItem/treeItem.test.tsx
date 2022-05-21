import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { TreeItem } from ".";

import DownIcon from "../../assets/down.svg";
import {
  MOCK_TREE_ITEM_DISABLED,
  MOCK_TREE_ITEM_FIRST,
  MOCK_TREE_ITEM_WITH_CHILDREN,
} from "../../mocks";

enzyme.configure({ adapter: new Adapter() });

describe("TreeItem component render correctly", () => {
  it("Match snapshot", () => {
    expect(
      <TreeItem
        data={MOCK_TREE_ITEM_FIRST}
        getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
      />
    ).toMatchSnapshot();
  });
  it("Render corretly title", () => {
    const result = enzyme
      .shallow(
        <TreeItem
          data={MOCK_TREE_ITEM_FIRST}
          getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
        />
      )
      .contains(<span className="tree-item__label-title">Phones</span>);
    expect(result).toBeTruthy();
  });
  it("Render corretly chexbox", () => {
    const result = enzyme
      .shallow(
        <TreeItem
          data={MOCK_TREE_ITEM_FIRST}
          getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
        />
      )
      .contains(
        <input
          className="tree-item__checkbox"
          type="checkbox"
          id="0030d9c5-9f1b-431a-9080-03cc48dc117f"
          name="0030d9c5-9f1b-431a-9080-03cc48dc117f"
        />
      );
    expect(result).toBeTruthy();
  });
  it("Render corretly chexbox if disabled", () => {
    const result = enzyme
      .shallow(
        <TreeItem
          data={MOCK_TREE_ITEM_DISABLED}
          getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
        />
      )
      .contains(
        <input
          className="tree-item__checkbox"
          type="checkbox"
          id="0030d9c5-9f1b-431a-9080-03cc48dc117f"
          name="0030d9c5-9f1b-431a-9080-03cc48dc117f"
          disabled
        />
      );
    expect(result).toBeTruthy();
  });
  it("Not render collapse icon if data has not children", () => {
    const result = enzyme
      .shallow(
        <TreeItem
          data={MOCK_TREE_ITEM_FIRST}
          getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
        />
      )
      .containsMatchingElement(
        <img
          className="tree-item__collapse-icon tree-item__collapse-icon_down"
          src={DownIcon}
        />
      );
    expect(result).toBeFalsy();
  });
  it("Render collapse icon if data has children", () => {
    const result = enzyme
      .shallow(
        <TreeItem
          data={MOCK_TREE_ITEM_WITH_CHILDREN}
          getValueFromData={(id: string) => MOCK_TREE_ITEM_FIRST}
        />
      )
      .containsMatchingElement(
        <img
          className="tree-item__collapse-icon tree-item__collapse-icon_down"
          src={DownIcon}
        />
      );
    expect(result).toBeTruthy();
  });
});
