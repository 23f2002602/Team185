
export interface City {
  name: string;
}

export interface State {
  name: string;
  cities: City[];
}

export const indianStates: State[] = [
  {
    name: "Andhra Pradesh",
    cities: [
      { name: "Visakhapatnam" },
      { name: "Vijayawada" },
      { name: "Guntur" },
      { name: "Nellore" },
      { name: "Kurnool" },
    ],
  },
  {
    name: "Maharashtra",
    cities: [
      { name: "Mumbai" },
      { name: "Pune" },
      { name: "Nagpur" },
      { name: "Nashik" },
      { name: "Thane" },
    ],
  },
  {
    name: "Karnataka",
    cities: [
      { name: "Bengaluru" },
      { name: "Mysuru" },
      { name: "Mangaluru" },
      { name: "Hubballi-Dharwad" },
      { name: "Belagavi" },
    ],
  },
  // TODO: Add all other Indian states and their major cities here.
  // This is a sample. You need to populate this list comprehensively.
];

export const getCitiesByState = (stateName: string): City[] => {
  const state = indianStates.find((s) => s.name === stateName);
  return state ? state.cities : [];
};
