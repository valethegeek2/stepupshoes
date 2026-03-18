
# RegisterRequestDTO


## Properties

Name | Type
------------ | -------------
`username` | string
`email` | string
`password` | string
`firstName` | string
`lastName` | string
`address` | string
`city` | string
`postalCode` | string
`phoneNumber` | string

## Example

```typescript
import type { RegisterRequestDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "email": null,
  "password": null,
  "firstName": null,
  "lastName": null,
  "address": null,
  "city": null,
  "postalCode": null,
  "phoneNumber": null,
} satisfies RegisterRequestDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RegisterRequestDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


