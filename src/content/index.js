import './index.css'

// Elements
const links = Array.from(document.querySelectorAll('div > h3 > a:first-child, td > a.pn'))
const searchInput = document.querySelector('#lst-ib')

// Constant var
const LAST_INDEX = links.length - 1
const DOWN_KEYS = ['ArrowDown', 'KeyJ']
const UP_KEYS = ['ArrowUp', 'KeyK']
const SEARCH_KEY = 'Slash'

// Methods
const focus = (i) => links[i].focus()
const focusDown = () => focus(focusIndex = Math.min(focusIndex + 1, LAST_INDEX))
const focusUp = () => focus(focusIndex = Math.max(focusIndex - 1, 0))
const focusInput = () => {
  searchInput.focus()
  searchInput.select()
}

let focusIndex = 0

const init = () => {
  if (links.length === 0) {
    return
  }

  document.addEventListener('keydown', e => {
    switch (e.code) {
      case SEARCH_KEY:
        focusInput()
        break
      default:
        if (DOWN_KEYS.includes(e.code)) {
          focusDown()
        } else if (UP_KEYS.includes(e.code)) {
          focusUp()
        } else {
          return
        }
    }

    e.preventDefault()
  })

  // Initialy focus top link
  focus(0)
}

init()
