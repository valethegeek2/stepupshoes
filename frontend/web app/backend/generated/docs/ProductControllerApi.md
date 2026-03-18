# ProductControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addVariant**](ProductControllerApi.md#addvariant) | **POST** /api/products/{productId}/variants |  |
| [**createProduct1**](ProductControllerApi.md#createproduct1) | **POST** /api/products |  |
| [**deleteProduct1**](ProductControllerApi.md#deleteproduct1) | **DELETE** /api/products/{id} |  |
| [**deleteVariant**](ProductControllerApi.md#deletevariant) | **DELETE** /api/products/variants/{variantId} |  |
| [**getAllProducts1**](ProductControllerApi.md#getallproducts1) | **GET** /api/products |  |
| [**getProductById**](ProductControllerApi.md#getproductbyid) | **GET** /api/products/{id} |  |
| [**searchProducts2**](ProductControllerApi.md#searchproducts2) | **GET** /api/products/search |  |
| [**updateProduct1**](ProductControllerApi.md#updateproduct1) | **PUT** /api/products/{id} |  |
| [**updateVariant**](ProductControllerApi.md#updatevariant) | **PUT** /api/products/variants/{variantId} |  |



## addVariant

> ProductVariant addVariant(productId, productVariant)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { AddVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    productId: 789,
    // ProductVariant
    productVariant: ...,
  } satisfies AddVariantRequest;

  try {
    const data = await api.addVariant(body);
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
| **productVariant** | [ProductVariant](ProductVariant.md) |  | |

### Return type

[**ProductVariant**](ProductVariant.md)

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


## createProduct1

> Product createProduct1(product)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { CreateProduct1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // Product
    product: ...,
  } satisfies CreateProduct1Request;

  try {
    const data = await api.createProduct1(body);
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
| **product** | [Product](Product.md) |  | |

### Return type

[**Product**](Product.md)

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


## deleteProduct1

> deleteProduct1(id)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { DeleteProduct1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    id: 789,
  } satisfies DeleteProduct1Request;

  try {
    const data = await api.deleteProduct1(body);
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


## deleteVariant

> deleteVariant(variantId)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { DeleteVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    variantId: 789,
  } satisfies DeleteVariantRequest;

  try {
    const data = await api.deleteVariant(body);
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


## getAllProducts1

> Array&lt;ProductSearchResponseDTO&gt; getAllProducts1()



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

  try {
    const data = await api.getAllProducts1();
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


## getProductById

> ProductSearchResponseDTO getProductById(id)



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

[**ProductSearchResponseDTO**](ProductSearchResponseDTO.md)

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


## searchProducts2

> Array&lt;ProductSearchResponseDTO&gt; searchProducts2(name, tags, category, size, gender)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { SearchProducts2Request } from '';

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
  } satisfies SearchProducts2Request;

  try {
    const data = await api.searchProducts2(body);
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


## updateProduct1

> Product updateProduct1(id, product)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { UpdateProduct1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    id: 789,
    // Product
    product: ...,
  } satisfies UpdateProduct1Request;

  try {
    const data = await api.updateProduct1(body);
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
| **product** | [Product](Product.md) |  | |

### Return type

[**Product**](Product.md)

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


## updateVariant

> ProductVariant updateVariant(variantId, productVariant)



### Example

```ts
import {
  Configuration,
  ProductControllerApi,
} from '';
import type { UpdateVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductControllerApi();

  const body = {
    // number
    variantId: 789,
    // ProductVariant
    productVariant: ...,
  } satisfies UpdateVariantRequest;

  try {
    const data = await api.updateVariant(body);
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
| **productVariant** | [ProductVariant](ProductVariant.md) |  | |

### Return type

[**ProductVariant**](ProductVariant.md)

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

