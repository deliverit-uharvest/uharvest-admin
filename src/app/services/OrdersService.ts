import agent from "../api/agent";

export interface Orders {
  id: number;
  unique_id: string;
  created_at: string;
  statusName?: string;
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


export const fetchOrders = async (filters?: {
  startDate?: string;
  endDate?: string;
  statusId?: number | "";
  orderId?: string;
}): Promise<any> => {
  const params: Record<string, string> = {};

  if (filters?.startDate) params.start_date = filters.startDate;
  if (filters?.endDate) params.end_date = filters.endDate;
  if (filters?.statusId !== "" && filters?.statusId !== undefined)
    params.status_id = filters.statusId.toString();
  if (filters?.orderId) params.order_id = filters.orderId;

  // 👇 fix: wrap `params` under `params` key for Axios config
  const response = await agent.Orders.get({ params });
  return response;
};

export const fetchOrdersStatus = async (): Promise<any> => {
  const response = await agent.Orders.getstatus();
  return response;
};

export const getOrdersById = async (id: number): Promise<any> => {
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

// 👇 Sends: { order_id: string, status_id: number }
export const updateOrderStatus = async (
  order_id: string,
  status_id: number
): Promise<any> => {
  return await agent.Orders.changeStatus({ order_id, status_id });
};
