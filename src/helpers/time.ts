export const now = () => new Date().toISOString();

export const getTimeDifference = (
  startDate: string,
  endDate: string
): string => {
  const diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
  const h = Math.floor(diffInMs / 1000 / 60 / 60);
  const m = Math.floor((diffInMs / 1000 / 60 / 60 - h) * 60);
  const s = Math.floor(((diffInMs / 1000 / 60 / 60 - h) * 60 - m) * 60);

  return `${twoChars(h)}:${twoChars(m)}:${twoChars(s)}`;
};

const twoChars = (num: number): string =>
  num < 10 ? "0" + num.toString() : num.toString();

export const getFormattedDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getFullYear()}/${twoChars(d.getMonth() + 1)}/${twoChars(
    d.getDate()
  )}`;
};

export const getFormattedTime = (date: string): string => {
  const d = new Date(date);
  return `${twoChars(d.getHours())}:${twoChars(d.getMinutes())}`;
};
