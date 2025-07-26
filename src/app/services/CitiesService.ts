import agent from "../api/agent";

export interface City {
  id: number;
  name: string;
}

export const fetchCitiesByState = async (stateId: number): Promise<any> => {
  const response = await agent.Cities.getByState(stateId);
  return response;
};


