import { Union } from 'ts-toolbelt'
import { WithNonNilKeys, ExcludeKeys } from 'tsdef'

export type ReusableResolvers<
  TypeResolvers,
  K extends keyof TypeResolvers
  // @ts-ignore
> = ExcludeKeys<TypeResolvers, K> &
  WithNonNilKeys<{ [key in K]: Union.Select<TypeResolvers[key], Function> }, K>

/**
 * Creates a predicate to check values against enum.
 *
 * @param type Enum object type
 * @return Function predicate function against enum values.
 */
const is = <T extends string, TEnumValue extends string>(type: { [key in T]: TEnumValue }) => (
  value: string
): value is TEnumValue => Object.values(type).includes(value)

export { is }
