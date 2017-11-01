import './index.css'
import SearchResult from './SearchResult'

const searchResult = new SearchResult()

// Elements
const searchInput = document.querySelector('#lst-ib')
const formInputs = document.querySelectorAll('input, textarea')

// Constant var
const DOWN_KEYS = ['ArrowDown', 'KeyJ']
const UP_KEYS = ['ArrowUp', 'KeyK']
const RIGHT_KEYS = ['ArrowRight', 'KeyL']
const LEFT_KEYS = ['ArrowLeft', 'KeyH']
const SEARCH_KEYS = ['Slash']

// Methods
const focusDown = () => searchResult.focusNext()
const focusUp = () => searchResult.focusPrev()
const focusRight = () => searchResult.goNextPage()
const focusLeft = () => searchResult.goPrevPage()
const focusInput = () => {
  searchInput.focus()
  searchInput.select()
}
const keymap = {
  [SEARCH_KEYS]: focusInput,
  [DOWN_KEYS]: focusDown,
  [UP_KEYS]: focusUp,
  [RIGHT_KEYS]: focusRight,
  [LEFT_KEYS]: focusLeft
}
const navigateKeyHandler = e => {
  const modKeys = [
    e.shiftKey,
    e.altKey,
    e.ctrlKey,
    e.metaKey
  ]
  // Ignore when input has modifier keys
  if (modKeys.some(hasKey => hasKey)) return

  const match = Object.keys(keymap).some(keys => {
    if (keys.includes(e.code)) {
      keymap[keys]()
      return true
    }
  })
  if (!match) return
  // Prevent input when match some keymap
  e.preventDefault()
}
const activateNavigation = isActive => {
  if (isActive) {
    document.addEventListener('keydown', navigateKeyHandler)
    searchResult.resetFocus()
  } else {
    document.removeEventListener('keydown', navigateKeyHandler)
  }
}

const init = () => {
  if (searchResult.isEmpty()) return

  formInputs.forEach(el => {
    el.addEventListener('focusin', () => activateNavigation(false))
    el.addEventListener('focusout', () => activateNavigation(true))
  })

  activateNavigation(true)
}

init()
