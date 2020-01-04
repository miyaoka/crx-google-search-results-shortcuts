export default class SearchResult {
  private focusIndex = 0

  get items(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll('div > .r > a:first-of-type, td > a.pn')
    )
  }
  get searchInput(): HTMLInputElement | null {
    return document.querySelector('input[name="q"][type="text"]')
  }
  get nextPage(): HTMLElement | null {
    return document.querySelector('#pnnext')
  }
  get prevPage(): HTMLElement | null {
    return document.querySelector('#pnprev')
  }
  get isEmpty() {
    return this.items.length === 0
  }
  focusItem(index: number) {
    const items = this.items
    const inRange = index >= 0 && index < items.length
    if (inRange) {
      this.focusIndex = index
      items[this.focusIndex].focus()
    }
    return inRange
  }
  focusNext() {
    return this.focusItem(this.focusIndex + 1)
  }
  focusPrev() {
    return this.focusItem(this.focusIndex - 1)
  }
  focusInput() {
    if (!this.searchInput) return
    const val = this.searchInput.value
    this.searchInput.value = ''
    this.searchInput.focus()
    this.searchInput.value = val
    return true
  }
  moveToNextPage() {
    return this.clickLink(this.nextPage)
  }
  moveToPrevPage() {
    return this.clickLink(this.prevPage)
  }
  private clickLink(link: HTMLElement | null) {
    if (link) link.click()
    return link
  }
  resetFocus(): void {
    this.focusItem(0)
  }
}
