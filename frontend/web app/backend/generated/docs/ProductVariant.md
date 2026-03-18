
# ProductVariant


## Properties

Name | Type
------------ | -------------
`id` | number
`color` | string
`size` | string
`stock` | number
`priceAdjustment` | number
`isAvailable` | boolean
`variantImage` | string

## Example

```typescript
import type { ProductVariant } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "color": null,
  "size": null,
  "stock": null,
  "priceAdjustment": null,
  "isAvailable": null,
  "variantImage": null,
} satisfies ProductVariant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductVariant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


