import './index.css'

const links = Array.from(document.querySelectorAll('div > h3 > a:first-child, td > a.pn'))
const LAST_INDEX = links.length - 1
const FORWARD_KEYS = ['ArrowDown', 'KeyJ']
const PREV_KEYS = ['ArrowUp', 'KeyK']
const focus = (i) => links[i].focus()
const focusForward = () => focus(focusIndex = Math.min(focusIndex + 1, LAST_INDEX))
const focusPrev = () => focus(focusIndex = Math.max(focusIndex - 1, 0))

let focusIndex = 0

const init = () => {
  if (links.length === 0) {
    return
  }

  document.addEventListener('keydown', e => {
    if (FORWARD_KEYS.includes(e.code)) {
      focusForward()
    } else if (PREV_KEYS.includes(e.code)) {
      focusPrev()
    } else {
      return
    }

    e.preventDefault()
  })

  // Initialy focus top link
  focus(0)
}

init()
