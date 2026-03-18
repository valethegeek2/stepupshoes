# AdminControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCategory**](AdminControllerApi.md#createcategory) | **POST** /api/v1/admin/categories |  |
| [**createProduct**](AdminControllerApi.md#createproduct) | **POST** /api/v1/admin/products |  |
| [**createProductVariant**](AdminControllerApi.md#createproductvariant) | **POST** /api/v1/admin/products/{productId}/productVariants |  |
| [**createUser**](AdminControllerApi.md#createuser) | **POST** /api/v1/admin/users |  |
| [**deleteCategory**](AdminControllerApi.md#deletecategory) | **DELETE** /api/v1/admin/categories/{categoryId} |  |
| [**deleteProduct**](AdminControllerApi.md#deleteproduct) | **DELETE** /api/v1/admin/products/{productId} |  |
| [**deleteProductVariant**](AdminControllerApi.md#deleteproductvariant) | **DELETE** /api/v1/admin/products/productVariants/{variantId} |  |
| [**deleteUser**](AdminControllerApi.md#deleteuser) | **DELETE** /api/v1/admin/users/{userId} |  |
| [**getAllCategories**](AdminControllerApi.md#getallcategories) | **GET** /api/v1/admin/categories |  |
| [**getAllProductImages**](AdminControllerApi.md#getallproductimages) | **GET** /api/v1/admin/products/images |  |
| [**getAllProductVariantsByProductId**](AdminControllerApi.md#getallproductvariantsbyproductid) | **GET** /api/v1/admin/products/{productId}/productVariants |  |
| [**getAllProducts**](AdminControllerApi.md#getallproducts) | **GET** /api/v1/admin/products |  |
| [**getAllRoles**](AdminControllerApi.md#getallroles) | **GET** /api/v1/admin/users/roles |  |
| [**getAllUserProfiles**](AdminControllerApi.md#getalluserprofiles) | **GET** /api/v1/admin/users/profiles |  |
| [**getAllUsers**](AdminControllerApi.md#getallusers) | **GET** /api/v1/admin/users |  |
| [**getUserProfile**](AdminControllerApi.md#getuserprofile) | **GET** /api/v1/admin/users/{userId}/profiles |  |
| [**updateCategory**](AdminControllerApi.md#updatecategory) | **PUT** /api/v1/admin/categories/{categoryId} |  |
| [**updateProduct**](AdminControllerApi.md#updateproduct) | **PUT** /api/v1/admin/products/{productId} |  |
| [**updateProductVariant**](AdminControllerApi.md#updateproductvariant) | **PUT** /api/v1/admin/products/productVariants/{variantId} |  |
| [**updateUser**](AdminControllerApi.md#updateuser) | **PUT** /api/v1/admin/users/{userId} |  |
| [**updateUserProfile**](AdminControllerApi.md#updateuserprofile) | **PUT** /api/v1/admin/users/{userId}/profiles |  |
| [**uploadImage**](AdminControllerApi.md#uploadimageoperation) | **PUT** /api/v1/admin/products/{productId}/images |  |



## createCategory

> CategoryDTO createCategory(categoryDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { CreateCategoryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // CategoryDTO
    categoryDTO: ...,
  } satisfies CreateCategoryRequest;

  try {
    const data = await api.createCategory(body);
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
| **categoryDTO** | [CategoryDTO](CategoryDTO.md) |  | |

### Return type

[**CategoryDTO**](CategoryDTO.md)

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


## createProduct

> ProductDTO createProduct(productDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { CreateProductRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // ProductDTO
    productDTO: ...,
  } satisfies CreateProductRequest;

  try {
    const data = await api.createProduct(body);
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
| **productDTO** | [ProductDTO](ProductDTO.md) |  | |

### Return type

[**ProductDTO**](ProductDTO.md)

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


## createProductVariant

> VariantDTO createProductVariant(productId, variantDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { CreateProductVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    productId: 789,
    // VariantDTO
    variantDTO: ...,
  } satisfies CreateProductVariantRequest;

  try {
    const data = await api.createProductVariant(body);
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
| **variantDTO** | [VariantDTO](VariantDTO.md) |  | |

### Return type

[**VariantDTO**](VariantDTO.md)

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


## createUser

> RegisterResponse createUser(registerRequestDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { CreateUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // RegisterRequestDTO
    registerRequestDTO: ...,
  } satisfies CreateUserRequest;

  try {
    const data = await api.createUser(body);
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


## deleteCategory

> string deleteCategory(categoryId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { DeleteCategoryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    categoryId: 789,
  } satisfies DeleteCategoryRequest;

  try {
    const data = await api.deleteCategory(body);
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
| **categoryId** | `number` |  | [Defaults to `undefined`] |

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


## deleteProduct

> number deleteProduct(productId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { DeleteProductRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    productId: 789,
  } satisfies DeleteProductRequest;

  try {
    const data = await api.deleteProduct(body);
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

**number**

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


## deleteProductVariant

> string deleteProductVariant(variantId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { DeleteProductVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    variantId: 789,
  } satisfies DeleteProductVariantRequest;

  try {
    const data = await api.deleteProductVariant(body);
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


## deleteUser

> string deleteUser(userId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { DeleteUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    userId: 789,
  } satisfies DeleteUserRequest;

  try {
    const data = await api.deleteUser(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

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


## getAllCategories

> PagedResponseCategoryDTOLong getAllCategories(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllCategoriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllCategoriesRequest;

  try {
    const data = await api.getAllCategories(body);
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


## getAllProductImages

> Array&lt;string&gt; getAllProductImages()



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllProductImagesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  try {
    const data = await api.getAllProductImages();
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

**Array<string>**

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


## getAllProductVariantsByProductId

> Array&lt;VariantDTO&gt; getAllProductVariantsByProductId(productId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllProductVariantsByProductIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    productId: 789,
  } satisfies GetAllProductVariantsByProductIdRequest;

  try {
    const data = await api.getAllProductVariantsByProductId(body);
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


## getAllProducts

> PagedResponseProductDTOLong getAllProducts(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllProductsRequest;

  try {
    const data = await api.getAllProducts(body);
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


## getAllRoles

> Array&lt;string&gt; getAllRoles()



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllRolesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  try {
    const data = await api.getAllRoles();
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

**Array<string>**

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


## getAllUserProfiles

> PagedResponseUserProfileDTOLong getAllUserProfiles(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllUserProfilesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllUserProfilesRequest;

  try {
    const data = await api.getAllUserProfiles(body);
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

[**PagedResponseUserProfileDTOLong**](PagedResponseUserProfileDTOLong.md)

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


## getAllUsers

> PagedResponseUserDTOLong getAllUsers(pageNumber, pageSize, sortBy, sortOrder)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetAllUsersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortOrder: sortOrder_example,
  } satisfies GetAllUsersRequest;

  try {
    const data = await api.getAllUsers(body);
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

[**PagedResponseUserDTOLong**](PagedResponseUserDTOLong.md)

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


## getUserProfile

> UserProfileDTO getUserProfile(userId)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { GetUserProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    userId: 789,
  } satisfies GetUserProfileRequest;

  try {
    const data = await api.getUserProfile(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**UserProfileDTO**](UserProfileDTO.md)

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


## updateCategory

> CategoryDTO updateCategory(categoryId, categoryDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UpdateCategoryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    categoryId: 789,
    // CategoryDTO
    categoryDTO: ...,
  } satisfies UpdateCategoryRequest;

  try {
    const data = await api.updateCategory(body);
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
| **categoryId** | `number` |  | [Defaults to `undefined`] |
| **categoryDTO** | [CategoryDTO](CategoryDTO.md) |  | |

### Return type

[**CategoryDTO**](CategoryDTO.md)

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


## updateProduct

> ProductDTO updateProduct(productId, productDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UpdateProductRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    productId: 789,
    // ProductDTO
    productDTO: ...,
  } satisfies UpdateProductRequest;

  try {
    const data = await api.updateProduct(body);
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
| **productDTO** | [ProductDTO](ProductDTO.md) |  | |

### Return type

[**ProductDTO**](ProductDTO.md)

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


## updateProductVariant

> VariantDTO updateProductVariant(variantId, variantDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UpdateProductVariantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    variantId: 789,
    // VariantDTO
    variantDTO: ...,
  } satisfies UpdateProductVariantRequest;

  try {
    const data = await api.updateProductVariant(body);
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
| **variantDTO** | [VariantDTO](VariantDTO.md) |  | |

### Return type

[**VariantDTO**](VariantDTO.md)

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


## updateUser

> UserDTO updateUser(userId, userDTO)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UpdateUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    userId: 789,
    // UserDTO
    userDTO: ...,
  } satisfies UpdateUserRequest;

  try {
    const data = await api.updateUser(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |
| **userDTO** | [UserDTO](UserDTO.md) |  | |

### Return type

[**UserDTO**](UserDTO.md)

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


## updateUserProfile

> UserProfileDTO updateUserProfile(userId, userProfile)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UpdateUserProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    userId: 789,
    // UserProfile
    userProfile: ...,
  } satisfies UpdateUserProfileRequest;

  try {
    const data = await api.updateUserProfile(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |
| **userProfile** | [UserProfile](UserProfile.md) |  | |

### Return type

[**UserProfileDTO**](UserProfileDTO.md)

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


## uploadImage

> Product uploadImage(productId, uploadImageRequest)



### Example

```ts
import {
  Configuration,
  AdminControllerApi,
} from '';
import type { UploadImageOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminControllerApi();

  const body = {
    // number
    productId: 789,
    // UploadImageRequest (optional)
    uploadImageRequest: ...,
  } satisfies UploadImageOperationRequest;

  try {
    const data = await api.uploadImage(body);
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
| **uploadImageRequest** | [UploadImageRequest](UploadImageRequest.md) |  | [Optional] |

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

