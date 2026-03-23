
# PlaceOrderRequestDTO


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`phoneNumber` | string
`shippingAddress` | string
`shippingCity` | string
`shippingPostalCode` | string
`paymentMethod` | string
`notes` | string

## Example

```typescript
import type { PlaceOrderRequestDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": null,
  "lastName": null,
  "phoneNumber": null,
  "shippingAddress": null,
  "shippingCity": null,
  "shippingPostalCode": null,
  "paymentMethod": null,
  "notes": null,
} satisfies PlaceOrderRequestDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlaceOrderRequestDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


