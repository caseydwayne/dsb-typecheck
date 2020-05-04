# DSB Typecheck
Node Module: `dsb-typecheck`

> returns the real type of an object

The typecheck module sniffs out the true type of an object. It is not mislead by JS quirks and gives an accurate type for an object (even null and constructors/factory methods).

Dependencies:
- defined
- to-string

Dev Dependencies:
- debug-mini
- debug-presets
- root
- env

---

/*
 * @method typecheck
 * advanced type-checking made easy (or returns the real type of an object)
 * @param check {any} object to check
 * @param [against] {string} string to check type against (via contains())
 * @param [strict=true] {boolean} if false, will do a shallow typecheck (may not be true type, but useful for some scenarios)
 * @return truetype {string} i.e., object, array, regexp, ...
 */
