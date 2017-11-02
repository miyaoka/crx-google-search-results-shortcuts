let focusIndex = 0

export default class SearchResult {
  get items () {
    return Array.from(document.querySelectorAll('div > h3.r > a:first-of-type, td > a.pn'))
  }
  get nextPage () {
    return document.querySelector('#pnnext')
  }
  get prevPage () {
    return document.querySelector('#pnprev')
  }
  isEmpty () {
    return this.items.length === 0
  }
  focusNext () {
    return this.focus(focusIndex + 1)
  }
  focusPrev () {
    return this.focus(focusIndex - 1)
  }
  goNextPage () {
    const link = this.nextPage
    if (link) link.click()
    return link
  }
  goPrevPage () {
    const link = this.prevPage
    if (link) link.click()
    return link
  }
  resetFocus () {
    this.focus(0)
  }
  focus (index) {
    const items = this.items
    const inRange = index >= 0 && index < items.length
    if (inRange) {
      focusIndex = index
      items[focusIndex].focus()
    }
    return inRange
  }
}
