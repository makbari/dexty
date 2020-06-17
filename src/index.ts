import 'reflect-metadata';
console.log('Hello there');

if (__DEV__) {
  console.log('development environment');
}
/**
 * Code blocks are great for examples
 *
 * ```
 * <my-custom-element>Highlight JS will auto detect the language</my-custom-element>
 * ```
 *
 * ```typescript
 * // Or you can specify the language explicitly
 * const instance = new MyClass();
 * ```
 */
export class MyClass {}
/**
 * Standard links:
 * {@link Foo} or {@linkplain Foo} or [[Foo]]
 *
 * Code links: (Puts Foo inside <code> tags)
 * {@linkcode Foo} or [[`Foo`]]
 */
export class Bar implements Foo {
  public member = true;
}

/** More details */
interface Foo {
  member: boolean;
}
