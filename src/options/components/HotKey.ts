const props = ['key', 'code', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']
export default class HotKey {
  key: string = ''
  code: string = ''
  altKey: boolean = false
  ctrlKey: boolean = false
  metaKey: boolean = false
  shiftKey: boolean = false

  public match (kc:HotKey):boolean {
    return props.every(prop => this[prop] === kc[prop])
  }

  public static fromKeyboardEvent(e:KeyboardEvent):HotKey {
    const kc = new HotKey()
    kc.key = e.key || ''
    kc.code = e.code || ''
    kc.altKey = e.altKey || false
    kc.ctrlKey = e.ctrlKey || false
    kc.metaKey = e.metaKey || false
    kc.shiftKey = e.shiftKey || false
    return kc
  }
}
