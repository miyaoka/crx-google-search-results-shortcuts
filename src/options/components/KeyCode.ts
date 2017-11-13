const props = ['key', 'code', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']
export default class KeyCode {
  key: string
  code: string
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean

  public match (kc:KeyCode):boolean {
    return props.every(prop => this[prop] === kc[prop])
  }

  public static fromKeyboardEvent(e:KeyboardEvent):KeyCode {
    const kc = new KeyCode()
    kc.key = e.key || ''
    kc.code = e.code || ''
    kc.altKey = e.altKey || null
    kc.ctrlKey = e.ctrlKey || null
    kc.metaKey = e.metaKey || null
    kc.shiftKey = e.shiftKey || null
    return kc
  }
}
