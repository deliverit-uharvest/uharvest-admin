import agent from "../api/agent";


export const getProducts = () => {
  return agent.Product.getAll();
};