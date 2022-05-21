import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { Tree } from ".";
import { ITreeItemData } from "../../interfaces/interfaces";

import { MOCK_ITEMS_ARRAY } from "../../mocks";
import { TagsList } from "../tagsList";
import { TreeItem } from "../treeItem";

enzyme.configure({ adapter: new Adapter() });

const callback = (selectedElements: Array<ITreeItemData>) =>
  console.log(selectedElements);

describe("Tree component render correctly", () => {
  it("Match snapshot", () => {
    expect(
      <Tree data={MOCK_ITEMS_ARRAY} onChange={callback} />
    ).toMatchSnapshot();
  });

  it("Render correct title", () => {
    const result = enzyme
      .shallow(<Tree data={MOCK_ITEMS_ARRAY} onChange={callback} />)
      .contains(<h4 className="tree__title">Browse products</h4>);
    expect(result).toBeTruthy();
  });

  it("Render correct children", () => {
    const result = enzyme.shallow(
      <Tree data={MOCK_ITEMS_ARRAY} onChange={callback} />
    );

    expect(result.find(TreeItem)).toHaveLength(2);
  });
});
