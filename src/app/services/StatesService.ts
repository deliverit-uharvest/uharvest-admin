import agent from "../api/agent";

export interface States {
  id: number;
  name:string;
  
}




export const fetchStates = async (): Promise<any> => {
  const response = await agent.States.get();
  return response;
};


