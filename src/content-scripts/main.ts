import "./index.css";
import { SearchResults } from "./SearchResults";
import { MetaSearch } from "./MetaSearch";

const searchResult = new SearchResults();
const metaSearch = new MetaSearch();

type KeyDefs = [(string | string[])[], () => void][];

const keyDefs: KeyDefs = [
  [["ArrowDown", "j"], () => searchResult.focusNext()],
  [["ArrowUp", "k"], () => searchResult.focusPrev()],
  [["ArrowRight", "l"], () => searchResult.moveToNextPage()],
  [["ArrowLeft", "h"], () => searchResult.moveToPrevPage()],
  [["g"], () => metaSearch.setLeaderKey()],
];

const nextKeyDefs: KeyDefs = [
  [["a"], () => metaSearch.searchAll()],
  [["i"], () => metaSearch.searchImage()],
  [["m"], () => metaSearch.searchMap()],
  [["v"], () => metaSearch.searchVideo()],
  [["n"], () => metaSearch.searchNews()],
  [[["shift", "V"]], () => metaSearch.searchVerbatim()],

  // [['h'], () => metaSearch.searchByTime('qdr_h')],
  // [['d'], () => metaSearch.searchByTime('qdr_d')],
  // [['w'], () => metaSearch.searchByTime('qdr_w')],
  // [['m'], () => metaSearch.searchByTime('qdr_m')],
  // [['y'], () => metaSearch.searchByTime('qdr_y')],
];

const combineKey = (keys: string[]) =>
  keys
    .map((key) => key.toLowerCase())
    .sort()
    .join("-");
const createKeyMap = (keyDefs: KeyDefs): [RegExp, () => void][] => {
  return keyDefs.map(([keyCombos, action]) => {
    const pattern = keyCombos
      .map((keyCombo) =>
        Array.isArray(keyCombo) ? combineKey(keyCombo) : keyCombo
      )
      .join("|");
    return [new RegExp(`^(${pattern})$`, "i"), action];
  });
};

const keymap = createKeyMap(keyDefs);
const nextKeymap = createKeyMap(nextKeyDefs);
const modKeyReg = /^(shift|alt|control|meta)$/i;

const getCombinedKeyCode = (e: KeyboardEvent) => {
  const modKeyMap = {
    shift: e.shiftKey,
    alt: e.altKey,
    ctrl: e.ctrlKey,
    meta: e.metaKey,
  };
  const keys = Object.entries(modKeyMap).reduce(
    (acc: string[], [key, isHolding]) => {
      return isHolding ? [...acc, key] : acc;
    },
    [e.key]
  );
  return combineKey(keys);
};

const onKeyDown = (e: KeyboardEvent) => {
  if (modKeyReg.test(e.key)) return;

  const code = getCombinedKeyCode(e);

  if (metaSearch.isLeaderKey) {
    metaSearch.isLeaderKey = false;
    const matched = nextKeymap.some(([keyReg, action]) => {
      if (!keyReg.test(code)) return false;
      if (action()) {
        e.preventDefault();
      }
      return true;
    });

    if (matched) return;
  }

  keymap.some(([keyReg, action]) => {
    if (!keyReg.test(code)) return false;
    if (action()) {
      e.preventDefault();
    }
    return true;
  });
};

const activateKeyHandler = (isActive: boolean) => {
  if (isActive) {
    document.addEventListener("keydown", onKeyDown);
    searchResult.resetFocus();
  } else {
    document.removeEventListener("keydown", onKeyDown);
  }
};

const init = () => {
  const formInputs = document.querySelectorAll("input, textarea");

  formInputs.forEach((el) => {
    el.addEventListener("focusin", () => activateKeyHandler(false));
    el.addEventListener("focusout", () => activateKeyHandler(true));
  });

  activateKeyHandler(true);
};

init();
