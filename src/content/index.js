import './index.css'

// Elements
const links = Array.from(document.querySelectorAll('div > h3 > a:first-child, td > a.pn'))
const nextPageLink = document.querySelector('#pnnext')
const prevPageLink = document.querySelector('#pnprev')
const searchInput = document.querySelector('#lst-ib')

// Constant var
const LAST_INDEX = links.length - 1
const DOWN_KEYS = ['ArrowDown', 'KeyJ']
const UP_KEYS = ['ArrowUp', 'KeyK']
const RIGHT_KEYS = ['ArrowRight', 'KeyL']
const LEFT_KEYS = ['ArrowLeft', 'KeyH']
const SEARCH_KEY = 'Slash'

// Methods
const focus = (i) => links[i].focus()
const focusDown = () => focus(focusIndex = Math.min(focusIndex + 1, LAST_INDEX))
const focusUp = () => focus(focusIndex = Math.max(focusIndex - 1, 0))
const focusRight = () => nextPageLink ? nextPageLink.click() : null
const focusLeft = () => prevPageLink ? prevPageLink.click() : null
const focusInput = () => {
  searchInput.focus()
  searchInput.select()
}
const navigateKeyHandler = e => {
  switch (e.code) {
    case SEARCH_KEY:
      focusInput()
      break
    default:
      if (DOWN_KEYS.includes(e.code)) {
        focusDown()
      } else if (UP_KEYS.includes(e.code)) {
        focusUp()
      } else if (RIGHT_KEYS.includes(e.code)) {
        focusRight()
      } else if (LEFT_KEYS.includes(e.code)) {
        focusLeft()
      } else {
        return
      }
  }
  // Prevent input when match some keymap
  e.preventDefault()
}
const activateNavigation = isActive => {
  isActive
  ? document.addEventListener('keydown', navigateKeyHandler)
  : document.removeEventListener('keydown', navigateKeyHandler)
}

let focusIndex = 0

const init = () => {
  if (links.length === 0) {
    return
  }

  searchInput.addEventListener('focusin', () => activateNavigation(false))
  searchInput.addEventListener('focusout', () => activateNavigation(true))

  activateNavigation(true)

  // Initialy focus top link
  focus(0)
}

init()
