
# CartItemResponseDTO


## Properties

Name | Type
------------ | -------------
`variantId` | number
`productName` | string
`color` | string
`size` | string
`price` | number
`quantity` | number
`subtotal` | number

## Example

```typescript
import type { CartItemResponseDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "variantId": null,
  "productName": null,
  "color": null,
  "size": null,
  "price": null,
  "quantity": null,
  "subtotal": null,
} satisfies CartItemResponseDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CartItemResponseDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


