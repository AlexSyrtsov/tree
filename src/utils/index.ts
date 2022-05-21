import { ITreeItemData } from "../interfaces/interfaces";

export const formatPluralEnding = (count: number, noun: string) =>
  `${noun}${count !== 1 ? "s" : ""}`;

export const formatDeviceSubtitleString = (devicesCount: number = 0) =>
  `${devicesCount} ${formatPluralEnding(devicesCount, "device")}`;

export const formatLargestSubtitleString = (
  topCount: number,
  topName: string,
  othersCount: number,
  othersName: string
) => {
  if (topCount < 1) {
    return `There is no ${topName}`;
  }
  return `${topCount} ${topName}${
    othersCount ? ` and ${othersCount} other` : ""
  }`;
};

export const formatDataToMap = (data: Array<ITreeItemData>) => {
  const map: Record<string, ITreeItemData> = {};
  data.forEach((item: ITreeItemData) => {
    map[item.id] = item;
  });
  return map;
};
