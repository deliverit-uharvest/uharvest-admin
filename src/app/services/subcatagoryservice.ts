import agent from "../api/agent";

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  is_active: boolean;
  image: string | null;
  display_sequence_number: string;
  category?: {
    id: number;
    name: string;
  };
}

export const fetchSubCategory = async (): Promise<any> => {
  const response = await agent.SubCategory.get();
  return response;
};

export const createSubcategory = async (create: FormData) => {
  return await agent.SubCategory.create(create);
};



export const getSubCategoryById = async (id: number): Promise<any> => {
  const response = await agent.SubCategory.getById(id);
  return response;
};

export const deleteSubCategory = async (id: number): Promise<any> => {
  const response = await agent.SubCategory.delete(id);
  return response.data;
};

export const addSubCategory = async (formData: FormData): Promise<any> => {
  const response = await agent.SubCategory.create(formData);
  return response;
};

export const updateSubCategory = async (id:number,formData: FormData): Promise<any> => {
  const response = await agent.SubCategory.update(formData,id);
  return response;
};

export const changeStatus = async (id: number) => {
  return await agent.SubCategory.updateStatus(id);
};
