const props = ['key', 'code', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']
export default class KeyCode {
  key: string = ''
  code: string = ''
  altKey: boolean = false
  ctrlKey: boolean = false
  metaKey: boolean = false
  shiftKey: boolean = false

  public match (kc:KeyCode):boolean {
    return props.every(prop => this[prop] === kc[prop])
  }

  public static fromKeyboardEvent(e:KeyboardEvent):KeyCode {
    const kc = new KeyCode()
    kc.key = e.key || ''
    kc.code = e.code || ''
    kc.altKey = e.altKey || false
    kc.ctrlKey = e.ctrlKey || false
    kc.metaKey = e.metaKey || false
    kc.shiftKey = e.shiftKey || false
    return kc
  }
}
