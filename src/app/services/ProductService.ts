import agent from "../api/agent";

export const fetchProducts = async () => {
  const result = await agent.Product.getAll();
  console.log("resulttt", result);
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
