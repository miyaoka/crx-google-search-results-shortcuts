const links = Array.from(document.querySelectorAll('div > h3 > a:first-child, td > a.pn'))
const len = links.length
let focusIndex = 0

console.log('aaa')

const focus = (i) => {
  links(i).focus()
}
const focusNext = () => {
  focusIndex = (focusIndex + 1) % len
  focus(focusIndex)
}
const focusPrev = () => {
  focusIndex = (focusIndex - 1 + len) % len
  focus(focusIndex)
}

focusNext()
focusPrev()
