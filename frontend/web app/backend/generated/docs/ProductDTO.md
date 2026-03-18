
# ProductDTO


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
`category` | [Category](Category.md)
`numberOfVariants` | number
`isActive` | boolean

## Example

```typescript
import type { ProductDTO } from ''

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
  "category": null,
  "numberOfVariants": null,
  "isActive": null,
} satisfies ProductDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


