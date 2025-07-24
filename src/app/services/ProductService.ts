import agent from "../api/agent";

export const fetchProducts = async () => {
  const result = await agent.Product.getAll();
  return result;
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
