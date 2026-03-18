
# ProductSearchResponseDTO


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`description` | string
`tags` | string
`basePrice` | number
`gender` | string
`category` | string
`variants` | [Array&lt;VariantDTO&gt;](VariantDTO.md)

## Example

```typescript
import type { ProductSearchResponseDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "tags": null,
  "basePrice": null,
  "gender": null,
  "category": null,
  "variants": null,
} satisfies ProductSearchResponseDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductSearchResponseDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


