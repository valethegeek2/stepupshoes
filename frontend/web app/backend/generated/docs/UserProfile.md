
# UserProfile


## Properties

Name | Type
------------ | -------------
`id` | number
`firstName` | string
`lastName` | string
`address` | string
`city` | string
`postalCode` | string
`phoneNumber` | string
`user` | [User](User.md)

## Example

```typescript
import type { UserProfile } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "firstName": null,
  "lastName": null,
  "address": null,
  "city": null,
  "postalCode": null,
  "phoneNumber": null,
  "user": null,
} satisfies UserProfile

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserProfile
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


