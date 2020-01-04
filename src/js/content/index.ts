import './index.scss'
import SearchResult from './searchResult'

const searchResult = new SearchResult()

const searchInput = document.querySelector(
  'input[name="q"][type="text"]'
) as HTMLInputElement | null
const formInputs = document.querySelectorAll('input, textarea')

const keyDefs: [string[], Function][] = [
  [['ArrowDown', 'KeyJ'], () => searchResult.focusNext()],
  [['ArrowUp', 'KeyK'], () => searchResult.focusPrev()],
  [['ArrowRight', 'KeyL'], () => searchResult.moveToNextPage()],
  [['ArrowLeft', 'KeyH'], () => searchResult.moveToPrevPage()],
  [
    ['Slash'],
    () => {
      if (!searchInput) return
      const val = searchInput.value
      searchInput.value = ''
      searchInput.focus()
      searchInput.value = val
      return true
    }
  ]
]

const keymap: [RegExp, Function][] = keyDefs.map(([keys, action]) => {
  return [new RegExp(`^${keys.join('|')}$`), action]
})

const onKeyDown = (e: KeyboardEvent) => {
  const modKeys = [e.shiftKey, e.altKey, e.ctrlKey, e.metaKey]
  // Ignore when input has modifier keys
  if (modKeys.some(Boolean)) return

  keymap.some(([keyReg, action]) => {
    if (!keyReg.test(e.code)) return false
    if (action()) {
      e.preventDefault()
    }
    return true
  })
}

const activateKeyHandler = (isActive: boolean) => {
  if (isActive) {
    document.addEventListener('keydown', onKeyDown)
    searchResult.resetFocus()
  } else {
    document.removeEventListener('keydown', onKeyDown)
  }
}

const init = () => {
  if (searchResult.isEmpty) return

  formInputs.forEach(el => {
    el.addEventListener('focusin', () => activateKeyHandler(false))
    el.addEventListener('focusout', () => activateKeyHandler(true))
  })

  activateKeyHandler(true)
}

init()
