const anchor = 'a:first-of-type'
const linkSelector = [
  ...['.r > g-link', 'div > .r'].map(container => `${container} > ${anchor}`),
  'td > a.pn'
].join(',')

const kpLinkSelector = ['g-link', '.r']
  .map(container => `.g-blk ${container} > ${anchor}`)
  .join(',')

export class SearchResults {
  private focusIndex = 0

  get links(): HTMLAnchorElement[] {
    const linkList = Array.from(document.querySelectorAll(linkSelector))
    const kpLinkList = Array.from(document.querySelectorAll(kpLinkSelector))
    const nonKpLinkList = linkList.filter(item => !kpLinkList.includes(item))

    return nonKpLinkList as HTMLAnchorElement[]
  }
  get searchInput(): HTMLInputElement | null {
    return document.querySelector('input[name="q"][type="text"]')
  }
  get nextPage(): HTMLAnchorElement | null {
    return document.querySelector('#pnnext')
  }
  get prevPage(): HTMLAnchorElement | null {
    return document.querySelector('#pnprev')
  }
  get isEmpty() {
    return this.links.length === 0
  }
  focusItem(index: number) {
    const links = this.links
    const inRange = index >= 0 && index < links.length
    if (!inRange) return null

    this.focusIndex = index
    const target = links[this.focusIndex]
    target.focus()
    return target
  }
  focusNext() {
    return this.focusItem(this.focusIndex + 1)
  }
  focusPrev() {
    return this.focusItem(this.focusIndex - 1)
  }
  focusInput() {
    if (!this.searchInput) return null

    // Focus on end of current input
    const val = this.searchInput.value
    this.searchInput.value = ''
    this.searchInput.focus()
    this.searchInput.value = val

    return this.searchInput
  }
  moveToNextPage() {
    return this.clickLink(this.nextPage)
  }
  moveToPrevPage() {
    return this.clickLink(this.prevPage)
  }
  private clickLink(link: HTMLAnchorElement | null) {
    if (link) link.click()
    return link
  }
  resetFocus() {
    return this.focusItem(0)
  }
}
