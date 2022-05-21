import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import { TagsList } from ".";
import { Tag } from "../tag";

import { MOCK_ITEMS_ARRAY } from "../../mocks";

enzyme.configure({ adapter: new Adapter() });

describe("TagsList component", () => {
  it("Match snapshot", () => {
    expect(<TagsList tags={MOCK_ITEMS_ARRAY} />).toMatchSnapshot();
  });
  it("Render corretly", () => {
    const result = enzyme.shallow(<TagsList tags={MOCK_ITEMS_ARRAY} />);
    expect(
      result.contains(<h4 className="tree__title">Selected variants</h4>)
    ).toBeTruthy();
    expect(result.find(Tag)).toHaveLength(4);
  });
});
