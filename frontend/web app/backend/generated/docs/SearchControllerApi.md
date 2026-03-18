# SearchControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**searchProducts1**](SearchControllerApi.md#searchproducts1) | **GET** /api/v2/products/search |  |



## searchProducts1

> Array&lt;ProductSearchResponseDTO&gt; searchProducts1(name, tags, category, size, gender)



### Example

```ts
import {
  Configuration,
  SearchControllerApi,
} from '';
import type { SearchProducts1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchControllerApi();

  const body = {
    // string (optional)
    name: name_example,
    // string (optional)
    tags: tags_example,
    // string (optional)
    category: category_example,
    // string (optional)
    size: size_example,
    // string (optional)
    gender: gender_example,
  } satisfies SearchProducts1Request;

  try {
    const data = await api.searchProducts1(body);
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
| **name** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tags** | `string` |  | [Optional] [Defaults to `undefined`] |
| **category** | `string` |  | [Optional] [Defaults to `undefined`] |
| **size** | `string` |  | [Optional] [Defaults to `undefined`] |
| **gender** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ProductSearchResponseDTO&gt;**](ProductSearchResponseDTO.md)

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

