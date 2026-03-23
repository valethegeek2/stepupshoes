# OrderControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMyOrders**](OrderControllerApi.md#getmyorders) | **GET** /api/v1/orders |  |
| [**getOrderById**](OrderControllerApi.md#getorderbyid) | **GET** /api/v1/orders/{orderId} |  |
| [**placeOrder**](OrderControllerApi.md#placeorder) | **POST** /api/v1/orders |  |



## getMyOrders

> Array&lt;OrderDTO&gt; getMyOrders()



### Example

```ts
import {
  Configuration,
  OrderControllerApi,
} from '';
import type { GetMyOrdersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderControllerApi();

  try {
    const data = await api.getMyOrders();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;OrderDTO&gt;**](OrderDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOrderById

> OrderDTO getOrderById(orderId)



### Example

```ts
import {
  Configuration,
  OrderControllerApi,
} from '';
import type { GetOrderByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderControllerApi();

  const body = {
    // number
    orderId: 789,
  } satisfies GetOrderByIdRequest;

  try {
    const data = await api.getOrderById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**OrderDTO**](OrderDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## placeOrder

> OrderDTO placeOrder(placeOrderRequestDTO)



### Example

```ts
import {
  Configuration,
  OrderControllerApi,
} from '';
import type { PlaceOrderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderControllerApi();

  const body = {
    // PlaceOrderRequestDTO
    placeOrderRequestDTO: ...,
  } satisfies PlaceOrderRequest;

  try {
    const data = await api.placeOrder(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **placeOrderRequestDTO** | [PlaceOrderRequestDTO](PlaceOrderRequestDTO.md) |  | |

### Return type

[**OrderDTO**](OrderDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

