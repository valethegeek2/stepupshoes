# ProductControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllProductVariantsByProductId1**](ProductControllerApi.md#getallproductvariantsbyproductid1) | **GET** /api/v1/products/{productId}/productVariants |  |
| [**getAllProducts1**](ProductControllerApi.md#getallproducts1) | **GET** /api/v1/products |  |
| [**getProductById**](ProductControllerApi.md#getproductbyid) | **GET** /api/v1/products/{id} |  |
| [**searchProducts1**](ProductControllerApi.md#searchproducts1) | **GET** /api/v1/products/search |  |



## getAllProductVariantsByProductId1

> Array&lt;VariantDTO&gt; getAllProductVariantsByProductId1(productId)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { GetAllProductVariantsByProductId1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    productId: 789,
  } satisfies GetAllProductVariantsByProductId1Request;

  try {
    const data = await api.getAllProductVariantsByProductId1(body);
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
| **productId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;VariantDTO&gt;**](VariantDTO.md)

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


## getAllProducts1

> PagedResponseProductDTOLong getAllProducts1(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { GetAllProducts1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllProducts1Request;

  try {
    const data = await api.getAllProducts1(body);
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

[**PagedResponseProductDTOLong**](PagedResponseProductDTOLong.md)

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


## getProductById

> ProductDTO getProductById(id)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { GetProductByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies GetProductByIdRequest;

  try {
    const data = await api.getProductById(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**ProductDTO**](ProductDTO.md)

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


## searchProducts1

> PagedResponseProductDTOLong searchProducts1(name, tags, category, size, gender, pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { SearchProducts1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

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
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
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
| **pageNumber** | `number` |  | [Optional] [Defaults to `0`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `10`] |
| **sortBy** | `string` |  | [Optional] [Defaults to `&#39;id&#39;`] |
| **sortOrder** | `string` |  | [Optional] [Defaults to `&#39;asc&#39;`] |

### Return type

[**PagedResponseProductDTOLong**](PagedResponseProductDTOLong.md)

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

