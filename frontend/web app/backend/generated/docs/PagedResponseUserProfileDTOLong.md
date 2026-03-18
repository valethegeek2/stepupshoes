
# PagedResponseUserProfileDTOLong


## Properties

Name | Type
------------ | -------------
`contents` | [Array&lt;UserProfileDTO&gt;](UserProfileDTO.md)
`pageNumber` | number
`pageSize` | number
`totalPages` | number
`totalElements` | number
`lastPage` | boolean

## Example

```typescript
import type { PagedResponseUserProfileDTOLong } from ''

// TODO: Update the object below with actual values
const example = {
  "contents": null,
  "pageNumber": null,
  "pageSize": null,
  "totalPages": null,
  "totalElements": null,
  "lastPage": null,
} satisfies PagedResponseUserProfileDTOLong

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PagedResponseUserProfileDTOLong
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


