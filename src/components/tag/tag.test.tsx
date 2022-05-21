import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { Tag } from ".";
import { MOCK_TREE_ITEM_FIRST } from "../../mocks";

enzyme.configure({ adapter: new Adapter() });

describe("Tag component render correctly", () => {
  it("Match snapshot", () => {
    expect(<Tag tag={MOCK_TREE_ITEM_FIRST} />).toMatchSnapshot();
  });
  it("Render corretly", () => {
    const result = enzyme.shallow(<Tag tag={MOCK_TREE_ITEM_FIRST} />).contains(
      <div className="tree-tag">
        <span>{MOCK_TREE_ITEM_FIRST.title}</span>
      </div>
    );
    expect(result).toBeTruthy();
  });
});
