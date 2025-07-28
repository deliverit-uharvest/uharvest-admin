import agent from "../api/agent";

export interface Organisation {
  id: number;
  name: string;
  legalname:string;
  pan_number:number;
  email:string;
  mobile:number;
  address:string;
  pin_code:number;
  created_at: string;
  
}


export const fetchOrganisation = async (filters?: {
  startDate?: string;
  endDate?: string;
  // statusId?: number | "";
  // orderId?: string;
}): Promise<any> => {
  const params: Record<string, string> = {};

  if (filters?.startDate) params.start_date = filters.startDate;
  if (filters?.endDate) params.end_date = filters.endDate;
  // if (filters?.statusId !== "" && filters?.statusId !== undefined)
  //   params.status_id = filters.statusId.toString();
  // if (filters?.orderId) params.order_id = filters.orderId;

  const response = await agent.Organisation.get({ params });
  return response;
};





