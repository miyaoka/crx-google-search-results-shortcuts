const ignoreWrapperList = [
  'table',
  'g-inner-card',
  'g-expandable-container',
  'g-accordion-expander',
  'g-scrolling-carousel'
]

export class SearchResults {
  private focusIndex = 0
  private style: HTMLStyleElement

  constructor() {
    const style = document.createElement('style')
    document.body.appendChild(style)
    this.style = style
  }

  get links(): HTMLAnchorElement[] {
    const selectorList = ['g-link > a:first-of-type', 'a > h3']

    // get elements both of g-link and h3 for keep order
    const gLinkAndH3List = Array.from(
      document.querySelectorAll(
        selectorList.map(selector => `#search ${selector}`).join(`,`)
      )
    )

    const ignoreElementList = Array.from(
      document.querySelectorAll(
        ignoreWrapperList
          .map(wrapper =>
            selectorList
              .map(selector => `#search ${wrapper} ${selector}`)
              .join(`,`)
          )
          .join(`,`)
      )
    )

    const filteredElementList = gLinkAndH3List.filter(
      el => !ignoreElementList.includes(el)
    )

    // extract anchor elements
    const anchorList = filteredElementList.reduce(
      (acc: HTMLAnchorElement[], el) => {
        if (el.tagName === 'H3') {
          // a > h3 -> a
          acc.push(el.parentElement as HTMLAnchorElement)
        } else {
          // g-link > a
          if (el.children.length === 0) {
            acc.push(el as HTMLAnchorElement)
          }
        }
        return acc
      },
      []
    )

    return anchorList as HTMLAnchorElement[]
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
    this.style.innerHTML = `[data-gsrks-focused]:focus::before {
      content: "${content}";
      font-size: 16px;
      white-space: nowrap;
      position: absolute;
      right: 100%;
      top: 0;
      transform: translate(-8px);
    }`
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
