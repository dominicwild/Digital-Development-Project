const frequencyEnums = ["Daily", "Weekly", "Monthly", "Yearly"];
const statusEnums = ["In Progress", "Achieved"];
const developmentAreaValues = [
  {
    area: "IT Professional",
    description: "Routines to develop yourself as an IT Professional."
  },
  {
    area: "DXC Employee",
    description: "Routines to develop yourself as an DXC Employee."
  },
  {
    area: "Current Role",
    description: "Routines to develop yourself in your current role."
  },
  {
    area: "Future Role",
    description: "Routines to develop yourself in your future role."
  },
  {
    area: "Personal",
    description: "Routines to develop yourself personally."
  },
];
const developmentAreaEnums = developmentAreaValues.map(item => {
  return item.area;
});

module.exports = { frequency: frequencyEnums, status: statusEnums, developmentArea: developmentAreaEnums, developmentAreaValues };
