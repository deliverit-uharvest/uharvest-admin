import agent from "../api/agent";

interface Product {
  id: number;
  name: string;
  status: string;
  quantity: number;
  sku:string;
  is_active:boolean;
  category?: {
    id: number;
    name: string;
  };
  // Add any other product fields as needed
}

interface ProductResponse {
  status: string;
  data: Product[];
}

export const fetchProducts = async (filters?: any): Promise<ProductResponse> => {
  const response = await agent.Product.getAll(filters);
  return response as ProductResponse;
};

export const fetchProductById = async (id:number) => {
  const result = await agent.Product.getProduct(id);
  return result;
};

export const changeStatus = async (productId: number) => {
  return await agent.Product.updateStatus(productId);
};

export const deleteProduct = async (productId: number) => {
  return await agent.Product.delete(productId);
};

export const createProduct = async (product: FormData) => {
  return await agent.Product.createProduct(product);
};

export const updateProduct = async (product: FormData,id:number) => {
  return await agent.Product.updateProduct(product,id);
};

export const productOrganisationMap = async (data: any): Promise<any> => {
  const response = await agent.Product.productOrganisationMap(data);
  return response;
};

export const productOrganisationUnMap = async (data: any): Promise<any> => {
  const response = await agent.Product.productOrganisationUnMap(data);
  return response;
};

// export const updateProductMapper = async (
//   id: number,
//   data: { custom_price: number; start_date: string; end_date: string }
// ): Promise<any> => {
//   const response = await agent.Product.updateProductMapper(id, data);
//   return response.data;
// };
export const updateProductMapper = async (id: number, data: any): Promise<any> => {
  const response = await agent.Product.updateProductMapper(id, data);
  return response;
};


