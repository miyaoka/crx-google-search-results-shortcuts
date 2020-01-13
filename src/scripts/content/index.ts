import './index.scss'
import { SearchResults } from './SearchResults'
import { MetaSearch } from './MetaSearch'

const searchResult = new SearchResults()
const metaSearch = new MetaSearch()

type KeyDefs = [(string | string[])[], Function][]

const keyDefs: KeyDefs = [
  [['ArrowDown', 'KeyJ'], () => searchResult.focusNext()],
  [['ArrowUp', 'KeyK'], () => searchResult.focusPrev()],
  [['ArrowRight', 'KeyL'], () => searchResult.moveToNextPage()],
  [['ArrowLeft', 'KeyH'], () => searchResult.moveToPrevPage()],
  [['Slash'], () => searchResult.focusInput()],
  [['KeyG'], () => metaSearch.setLeaderKey()]
]

const nextKeyDefs: KeyDefs = [
  [['KeyA'], () => metaSearch.searchAll()],
  [['KeyI'], () => metaSearch.searchImage()],
  [['KeyM'], () => metaSearch.searchMap()],
  [['KeyV'], () => metaSearch.searchVideo()],
  [['KeyN'], () => metaSearch.searchNews()],
  [[['shift', 'KeyV']], () => metaSearch.searchVerbatim()]

  // [['KeyH'], () => metaSearch.searchByTime('qdr_h')],
  // [['KeyD'], () => metaSearch.searchByTime('qdr_d')],
  // [['KeyW'], () => metaSearch.searchByTime('qdr_w')],
  // [['KeyM'], () => metaSearch.searchByTime('qdr_m')],
  // [['KeyY'], () => metaSearch.searchByTime('qdr_y')],
]

const combineKey = (keys: string[]) => keys.sort().join('-')
const createKeyMap = (keyDefs: KeyDefs): [RegExp, Function][] => {
  return keyDefs.map(([keyCombos, action]) => {
    const pattern = keyCombos
      .map(keyCombo =>
        Array.isArray(keyCombo) ? combineKey(keyCombo) : keyCombo
      )
      .join('|')
    return [new RegExp(`^(${pattern})$`), action]
  })
}

const keymap = createKeyMap(keyDefs)
const nextKeymap = createKeyMap(nextKeyDefs)

const getCombinedKeyCode = (e: KeyboardEvent) => {
  const modKeyMap = {
    shift: e.shiftKey,
    alt: e.altKey,
    ctrl: e.ctrlKey,
    meta: e.metaKey
  }
  const keys = Object.entries(modKeyMap).reduce(
    (acc: string[], [key, isHolding]) => {
      return isHolding ? [...acc, key] : acc
    },
    [e.code]
  )
  return combineKey(keys)
}

const onKeyDown = (e: KeyboardEvent) => {
  const code = getCombinedKeyCode(e)

  if (metaSearch.isLeaderKey) {
    metaSearch.isLeaderKey = false
    const matched = nextKeymap.some(([keyReg, action]) => {
      if (!keyReg.test(code)) return false
      if (action()) {
        e.preventDefault()
      }
      return true
    })

    if (matched) return
  }

  keymap.some(([keyReg, action]) => {
    if (!keyReg.test(code)) return false
    if (action()) {
      e.preventDefault()
    }
    return true
  })
}

const activateKeyHandler = (isActive: boolean) => {
  if (isActive) {
    document.addEventListener('keyup', onKeyDown)
    searchResult.resetFocus()
  } else {
    document.removeEventListener('keyup', onKeyDown)
  }
}

const init = () => {
  // if (searchResult.isEmpty) return
  const formInputs = document.querySelectorAll('input, textarea')

  formInputs.forEach(el => {
    el.addEventListener('focusin', () => activateKeyHandler(false))
    el.addEventListener('focusout', () => activateKeyHandler(true))
  })

  activateKeyHandler(true)
}

init()
