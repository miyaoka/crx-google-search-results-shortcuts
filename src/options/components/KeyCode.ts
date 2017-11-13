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
    kc.key = e.key
    kc.code = e.code
    kc.altKey = e.altKey
    kc.ctrlKey = e.ctrlKey
    kc.metaKey = e.metaKey
    kc.shiftKey = e.shiftKey
    return kc
  }
}
