# HelloControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**sayHello**](HelloControllerApi.md#sayhello) | **GET** /api/hello |  |



## sayHello

> string sayHello()



### Example

```ts
import {
  Configuration,
  HelloControllerApi,
} from '';
import type { SayHelloRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HelloControllerApi();

  try {
    const data = await api.sayHello();
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

**string**

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

