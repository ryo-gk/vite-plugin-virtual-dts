declare module "virtual:test" {
  export const name: "John Dow"
  export const age: 30
  export const flag: true
  export const birthday: any
  export const hobbies: string[]
  export namespace obj {
    export { name }
    export { age }
    export { flag }
    export { birthday }
    export { hobbies }
  }
}
