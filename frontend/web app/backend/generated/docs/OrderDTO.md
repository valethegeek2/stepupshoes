
# OrderDTO


## Properties

Name | Type
------------ | -------------
`orderId` | number
`userId` | number
`orderDate` | Date
`totalAmount` | number
`status` | string
`shippingAddress` | string
`shippingCity` | string
`shippingPostalCode` | string
`paymentMethod` | string
`paymentStatus` | string
`notes` | string
`updatedAt` | Date

## Example

```typescript
import type { OrderDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "orderId": null,
  "userId": null,
  "orderDate": null,
  "totalAmount": null,
  "status": null,
  "shippingAddress": null,
  "shippingCity": null,
  "shippingPostalCode": null,
  "paymentMethod": null,
  "paymentStatus": null,
  "notes": null,
  "updatedAt": null,
} satisfies OrderDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrderDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


