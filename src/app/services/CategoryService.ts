import agent from "../api/agent";

export interface Category {
  id: number;
  name: string;
  is_active: boolean;
  image: string | null;
  display_sequence_number: string;
  created_at: string;
  updated_at: string;
}

export const fetchCategories = async (): Promise<any> => {
  const response = await agent.Category.get();
  return response;
};

export const getCategoryById = async (id:number): Promise<any> => {
  const response = await agent.Category.getById(id);
  return response;
};

export const deleteCategory = async (id: number): Promise<any> => {
  const response = await agent.Category.delete(id);
  return response.data;
};

export const addCategory = async (formData: FormData): Promise<any> => {
  const response = await agent.Category.create(formData);
  return response;
};

export const updateCategory = async (formData: FormData): Promise<any> => {
  const response = await agent.Category.update(formData);
  return response;
};
