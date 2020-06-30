interface TiGlobal {
  /**
   * Titanium global
   */
  Ti: typeof Ti
}

type Constructor<T> = new(...args: any[]) => T;

export function WithTiGlobal<T extends Constructor<{}>>(Base: T = (class {} as any)) {
  return class extends Base implements TiGlobal {
    Ti = Ti
  }
}
