import './index.css'

// Elements
const links = () => Array.from(document.querySelectorAll('div > h3.r > a:first-child, td > a.pn'))
const nextPageLink = document.querySelector('#pnnext')
const prevPageLink = document.querySelector('#pnprev')
const searchInput = document.querySelector('#lst-ib')
const formInputs = document.querySelectorAll('input, textarea')

// Constant var
const DOWN_KEYS = ['ArrowDown', 'KeyJ']
const UP_KEYS = ['ArrowUp', 'KeyK']
const RIGHT_KEYS = ['ArrowRight', 'KeyL']
const LEFT_KEYS = ['ArrowLeft', 'KeyH']
const SEARCH_KEYS = ['Slash']

// Methods
const focus = (i) => links()[i].focus()
const focusDown = () => focus(focusIndex = Math.min(focusIndex + 1, links().length - 1))
const focusUp = () => focus(focusIndex = Math.max(focusIndex - 1, 0))
const focusRight = () => nextPageLink ? nextPageLink.click() : null
const focusLeft = () => prevPageLink ? prevPageLink.click() : null
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
    focus(focusIndex = 0)
  } else {
    document.removeEventListener('keydown', navigateKeyHandler)
  }
}

let focusIndex = 0

const init = () => {
  if (links().length === 0) {
    return
  }

  formInputs.forEach(el => {
    el.addEventListener('focusin', () => activateNavigation(false))
    el.addEventListener('focusout', () => activateNavigation(true))
  })

  activateNavigation(true)
}

init()
