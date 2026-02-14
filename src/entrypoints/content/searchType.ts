const defaultParams = { start: "", tbs: "", tbm: "" };

const changeParam = (newParams: Record<string, string>) => {
  const url = new URL(document.location.href);
  const params = url.searchParams;
  Object.entries({ ...defaultParams, ...newParams }).forEach(([key, value]) =>
    params.set(key, value),
  );
  location.href = url.href;
};
export const searchAll = () => {
  changeParam({ tbm: "" });
};
export const searchImage = () => {
  changeParam({ tbm: "isch" });
};
export const searchVideo = () => {
  changeParam({ tbm: "vid" });
};
export const searchNews = () => {
  changeParam({ tbm: "nws" });
};
export const searchVerbatim = () => {
  changeParam({ tbs: "li:1" });
};
export const searchMap = () => {
  const params = new URL(document.location.href).searchParams;
  const q = params.get("q");
  location.href = `/maps/search/${q}`;
};
export const searchByTime = (id: string) => {
  const el: HTMLAnchorElement | null = document.querySelector(`#${id} a`);
  if (!el) return;
  el.click();
};
