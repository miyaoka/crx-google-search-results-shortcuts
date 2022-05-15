import "./index.css";

import {
  setupFocusTarget,
  focusNext,
  focusPrev,
  moveToNextPage,
  moveToPrevPage,
  resetFocus,
} from "./searchResult";
import {
  searchAll,
  searchImage,
  searchMap,
  searchNews,
  searchVerbatim,
  searchVideo,
} from "./searchType";

type KeyDef = [(string | string[])[], () => any];

const firstKeyDefs: KeyDef[] = [
  [["ArrowDown", "j"], () => focusNext()],
  [["ArrowUp", "k"], () => focusPrev()],
  [["ArrowRight", "l"], () => moveToNextPage()],
  [["ArrowLeft", "h"], () => moveToPrevPage()],
  [["g"], () => (isLeaderKeyActive = true)],
];

let isLeaderKeyActive = false;

const nextKeyDefs: KeyDef[] = [
  [["a"], () => searchAll()],
  [["i"], () => searchImage()],
  [["m"], () => searchMap()],
  [["v"], () => searchVideo()],
  [["n"], () => searchNews()],
  [[["shift", "V"]], () => searchVerbatim()],

  // [['h'], () => searchByTime('qdr_h')],
  // [['d'], () => searchByTime('qdr_d')],
  // [['w'], () => searchByTime('qdr_w')],
  // [['m'], () => searchByTime('qdr_m')],
  // [['y'], () => searchByTime('qdr_y')],
];

const combineKey = (keys: string[]) =>
  keys
    .map((key) => key.toLowerCase())
    .sort()
    .join("-");
const createKeyMap = (keyDefs: KeyDef[]) => {
  return keyDefs.map(([keyCombos, action]) => {
    const pattern = keyCombos
      .map((keyCombo) =>
        Array.isArray(keyCombo) ? combineKey(keyCombo) : keyCombo
      )
      .join("|");
    return [new RegExp(`^(${pattern})$`, "i"), action] as const;
  });
};

const firstKeymap = createKeyMap(firstKeyDefs);
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

  if (isLeaderKeyActive) {
    isLeaderKeyActive = false;
    const matched = nextKeymap.some(([keyReg, action]) => {
      if (!keyReg.test(code)) return false;
      action();
      e.preventDefault();
      return true;
    });

    if (matched) return;
  }

  firstKeymap.some(([keyReg, action]) => {
    if (!keyReg.test(code)) return false;
    action();
    e.preventDefault();
    return true;
  });
};

const activateKeyHandler = (isActive: boolean) => {
  if (isActive) {
    document.addEventListener("keydown", onKeyDown);
    resetFocus();
  } else {
    document.removeEventListener("keydown", onKeyDown);
  }
};

const init = () => {
  setupFocusTarget();
  const formInputs = document.querySelectorAll("input, textarea");

  formInputs.forEach((el) => {
    el.addEventListener("focusin", () => activateKeyHandler(false));
    el.addEventListener("focusout", () => activateKeyHandler(true));
  });

  activateKeyHandler(true);
};

init();
