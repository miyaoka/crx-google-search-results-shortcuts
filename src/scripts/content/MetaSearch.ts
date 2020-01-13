export class MetaSearch {
  isLeaderKey = false
  setLeaderKey() {
    this.isLeaderKey = true
  }
  changeParam(newParams: Record<string, string>) {
    const url = new URL(document.location.href)
    const params = url.searchParams
    Object.entries(newParams).forEach(([key, value]) => params.set(key, value))
    location.href = url.href
  }
  searchAll() {
    this.changeParam({ tbm: '' })
  }
  searchImage() {
    this.changeParam({ tbm: 'isch' })
  }
  searchVideo() {
    this.changeParam({ tbm: 'vid' })
  }
  searchNews() {
    this.changeParam({ tbm: 'nws' })
  }
  searchVerbatim() {
    this.changeParam({ tbs: 'li:1' })
  }
  searchMap() {
    const params = new URL(document.location.href).searchParams
    const q = params.get('q')
    location.href = `/maps/search/${q}`
  }
  searchByTime(id: string) {
    const el: HTMLAnchorElement | null = document.querySelector(`#${id} a`)
    if (!el) return
    el.click()
  }
}
