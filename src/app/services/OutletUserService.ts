import agent from "../api/agent";

export interface OutletUser {
  id: number;
  name:string;
  created_at: string;
  
}


export const fetchOutletUser = async (filters?: {
  startDate?: string;
  endDate?: string;
  statusId?: number | "";
  //orderId?: string;
}): Promise<any> => {
  const params: Record<string, string> = {};

  if (filters?.startDate) params.start_date = filters.startDate;
  if (filters?.endDate) params.end_date = filters.endDate;
  if (filters?.statusId !== "" && filters?.statusId !== undefined)
    params.status_id = filters.statusId.toString();
  //if (filters?.orderId) params.order_id = filters.orderId;

  
  const response = await agent.Outlet.getUser({ params });
  return response;
};

// export const addOutlet = async (formData: FormData): Promise<any> => {
//   const response = await agent.Organisation.create(formData);
//   return response;
// };

export const addOutletUser = async (data: any): Promise<any> => {
  const response = await agent.Outlet.createuser(data);
  return response;
};

export const fetchUserRole = async (data: any): Promise<any> => {
  const response = await agent.User.getUserRole();
  return response;
};

// export const fetchOutletByOrganisation = async (org_id: number): Promise<any> => {
//   const response = await agent.Outlet.getByOrganisation(org_id);
//   return response;
// };


// export const fetchOrdersStatus = async (): Promise<any> => {
//   const response = await agent.Orders.getstatus();
//   return response;
// };

// export const getOrdersById = async (id: number): Promise<any> => {
//   const response = await agent.Orders.getById(id);
//   return response;
// };

// export const deleteOrders = async (id: number): Promise<any> => {
//   const response = await agent.Orders.delete(id);
//   return response.data;
// };



// export const updateOrders = async (formData: FormData): Promise<any> => {
//   const response = await agent.Orders.update(formData);
//   return response;
// };

// export const updateOrderStatus = async (
//   order_id: string,
//   status_id: number
// ): Promise<any> => {
//   return await agent.Orders.changeStatus({ order_id, status_id });
// };
