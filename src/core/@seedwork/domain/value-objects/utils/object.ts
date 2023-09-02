export function deepFreeze<T>(obj: T) {
  const propsNames = Object.getOwnPropertyNames(obj);
  for (const name of propsNames) {
    const value = obj[name as keyof T];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}
