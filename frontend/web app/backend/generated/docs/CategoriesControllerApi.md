# CategoriesControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllCategories1**](CategoriesControllerApi.md#getallcategories1) | **GET** /api/v1/categories |  |



## getAllCategories1

> PagedResponseCategoryDTOLong getAllCategories1(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  CategoriesControllerApi,
} from '';
import type { GetAllCategories1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllCategories1Request;

  try {
    const data = await api.getAllCategories1(body);
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
| **pageNumber** | `number` |  | [Optional] [Defaults to `0`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `10`] |
| **sortBy** | `string` |  | [Optional] [Defaults to `&#39;id&#39;`] |
| **sortOrder** | `string` |  | [Optional] [Defaults to `&#39;asc&#39;`] |

### Return type

[**PagedResponseCategoryDTOLong**](PagedResponseCategoryDTOLong.md)

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

