import agent from "../api/agent";

export interface Orders {
  id: number;
  unique_id: string;
  created_at: string;
  statusName?: string;
  // add these below
  statusHistory?: {
    status?: {
      id: number;
      name: string;
    };
  }[];
  items?: {
    price: number;
    quantity: number;
  }[];
  customer?: {
    mobile: string;
  };
  total_amount?: number;
}

export const fetchOrders = async (): Promise<any> => {
  const response = await agent.Orders.get();
  return response;
};

export const fetchOrdersStatus = async (): Promise<any> => {
  const response = await agent.Orders.getstatus();
  return response;
};

export const getOrdersById = async (id:number): Promise<any> => {
  const response = await agent.Orders.getById(id);
  return response;
};

export const deleteOrders = async (id: number): Promise<any> => {
  const response = await agent.Orders.delete(id);
  return response.data;
};

export const addOrders = async (formData: FormData): Promise<any> => {
  const response = await agent.Orders.create(formData);
  return response;
};

export const updateOrders = async (formData: FormData): Promise<any> => {
  const response = await agent.Orders.update(formData);
  return response;
};

export const updateOrderStatus = async (order_id: string, status_id: number): Promise<any> => {
  return await agent.Orders.changeStatus({ order_id, status_id });
  };
