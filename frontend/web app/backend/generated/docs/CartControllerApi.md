# CartControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addToCart**](CartControllerApi.md#addtocart) | **POST** /api/v1/cart |  |
| [**getCart**](CartControllerApi.md#getcart) | **GET** /api/v1/cart |  |
| [**removeFromCart**](CartControllerApi.md#removefromcart) | **DELETE** /api/v1/cart/{variantId} |  |



## addToCart

> addToCart(addToCartRequestDTO)



### Example

```ts
import {
  Configuration,
  CartControllerApi,
} from '';
import type { AddToCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartControllerApi();

  const body = {
    // AddToCartRequestDTO
    addToCartRequestDTO: ...,
  } satisfies AddToCartRequest;

  try {
    const data = await api.addToCart(body);
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
| **addToCartRequestDTO** | [AddToCartRequestDTO](AddToCartRequestDTO.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCart

> Array&lt;CartItemResponseDTO&gt; getCart()



### Example

```ts
import {
  Configuration,
  CartControllerApi,
} from '';
import type { GetCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartControllerApi();

  try {
    const data = await api.getCart();
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

[**Array&lt;CartItemResponseDTO&gt;**](CartItemResponseDTO.md)

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


## removeFromCart

> removeFromCart(variantId)



### Example

```ts
import {
  Configuration,
  CartControllerApi,
} from '';
import type { RemoveFromCartRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartControllerApi();

  const body = {
    // number
    variantId: 789,
  } satisfies RemoveFromCartRequest;

  try {
    const data = await api.removeFromCart(body);
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
| **variantId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

