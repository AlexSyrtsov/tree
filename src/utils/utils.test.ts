import {
  formatPluralEnding,
  formatDeviceSubtitleString,
  formatLargestSubtitleString,
  formatDataToMap,
} from ".";
import { MOCK_ITEMS_ARRAY, MOCK_ITEMS_MAP } from "../mocks";

const SINGULAR_STRING = "device";
const PLURAL_STRING = "devices";

describe(`Utils works correctly`, () => {
  it(`formatPluralEnding return expected noun for singular`, () => {
    const noun = formatPluralEnding(1, SINGULAR_STRING);

    expect(typeof noun).toBe("string");
    expect(noun).toEqual(SINGULAR_STRING);
  });

  it(`formatPluralEnding return expected noun for plural`, () => {
    const noun = formatPluralEnding(2, SINGULAR_STRING);

    expect(typeof noun).toBe("string");
    expect(noun).toEqual(PLURAL_STRING);
  });

  it(`formatDeviceSubtitleString return expected string for singular`, () => {
    const formattedString = formatDeviceSubtitleString(1);

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`1 ${SINGULAR_STRING}`);
  });

  it(`formatDeviceSubtitleString return expected string for plural`, () => {
    const formattedString = formatDeviceSubtitleString(2);

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`2 ${PLURAL_STRING}`);
  });

  it(`formatDeviceSubtitleString return expected string for null`, () => {
    const formattedString = formatDeviceSubtitleString(0);

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`0 ${PLURAL_STRING}`);
  });

  it(`formatDeviceSubtitleString return expected string without arguments`, () => {
    const formattedString = formatDeviceSubtitleString();

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`0 ${PLURAL_STRING}`);
  });

  it(`formatLargestSubtitleString return expected string for null`, () => {
    const formattedString = formatLargestSubtitleString(
      0,
      "phones",
      0,
      "gaming"
    );

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`There is no phones`);
  });

  it(`formatLargestSubtitleString return expected string without others count`, () => {
    const formattedString = formatLargestSubtitleString(
      2,
      "phones",
      0,
      "gaming"
    );

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`2 phones`);
  });

  it(`formatLargestSubtitleString return expected string with others count`, () => {
    const formattedString = formatLargestSubtitleString(
      2,
      "phones",
      300,
      "gaming"
    );

    expect(typeof formattedString).toBe("string");
    expect(formattedString).toEqual(`2 phones and 300 other`);
  });

  it(`formatDataToMap return expected map`, () => {
    const result = formatDataToMap(MOCK_ITEMS_ARRAY);

    expect(typeof result).toBe("object");
    expect(result).toMatchObject(MOCK_ITEMS_MAP);
  });
});
