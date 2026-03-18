# AuthControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**login**](AuthControllerApi.md#login) | **POST** /api/v1/auth/login |  |
| [**searchProducts**](AuthControllerApi.md#searchproducts) | **POST** /api/v1/auth/register |  |



## login

> AuthResponseDTO login(loginRequestDTO)



### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { LoginRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  const body = {
    // LoginRequestDTO
    loginRequestDTO: ...,
  } satisfies LoginRequest;

  try {
    const data = await api.login(body);
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
| **loginRequestDTO** | [LoginRequestDTO](LoginRequestDTO.md) |  | |

### Return type

[**AuthResponseDTO**](AuthResponseDTO.md)

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


## searchProducts

> RegisterResponse searchProducts(registerRequestDTO)



### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { SearchProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  const body = {
    // RegisterRequestDTO
    registerRequestDTO: ...,
  } satisfies SearchProductsRequest;

  try {
    const data = await api.searchProducts(body);
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
| **registerRequestDTO** | [RegisterRequestDTO](RegisterRequestDTO.md) |  | |

### Return type

[**RegisterResponse**](RegisterResponse.md)

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

