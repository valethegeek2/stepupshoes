
# Product


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`description` | string
`brand` | string
`productImage` | string
`tags` | string
`basePrice` | number
`reviews` | number
`rating` | number
`gender` | string
`isActive` | boolean
`category` | [Category](Category.md)
`variants` | [Set&lt;ProductVariant&gt;](ProductVariant.md)

## Example

```typescript
import type { Product } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "brand": null,
  "productImage": null,
  "tags": null,
  "basePrice": null,
  "reviews": null,
  "rating": null,
  "gender": null,
  "isActive": null,
  "category": null,
  "variants": null,
} satisfies Product

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Product
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


