const anchorSelector = (container: string) =>
  `#search ${container} > a:first-of-type`

const linkSelector = ['g-link', '.r']
  .map(container => anchorSelector(container))
  .join(',')

const ignoreWrappers = [
  'table',
  'g-inner-card',
  'g-expandable-container',
  'g-accordion-expander',
  'g-scrolling-carousel'
]

const ignoreSelector = ['g-link', '.r']
  .reduce(
    (acc: string[], container) => [
      ...acc,
      ...ignoreWrappers.map(ignoreWrapper =>
        anchorSelector(`${ignoreWrapper} ${container}`)
      )
    ],
    []
  )
  .join(',')

const focusSelector = ['g-link', '.r']
  .map(container => `${anchorSelector(container)}:focus::before`)
  .join(',')

export class SearchResults {
  private focusIndex = 0
  private style: HTMLStyleElement

  constructor() {
    const style = document.createElement('style')
    document.body.appendChild(style)
    this.style = style
  }

  get links(): HTMLAnchorElement[] {
    const linkList = Array.from(document.querySelectorAll(linkSelector))
    const ignoreList = Array.from(document.querySelectorAll(ignoreSelector))
    const filteredList = linkList.filter(item => !ignoreList.includes(item))
    return filteredList as HTMLAnchorElement[]
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

    const content = `${this.focusIndex + 1}/${links.length} ▶`
    this.style.innerHTML = `${focusSelector}{ content: "${content}"}`
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
