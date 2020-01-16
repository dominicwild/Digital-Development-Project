function checkUser(user) {
  const userCheckList = {};
  const fields = ["firstName", "lastName", "email", "ITXLevel", "assignmentArea", "employeeId", "aspirationLong", "aspirationShort"];
  for (field of fields) {
    userCheckList[field] = Boolean(user[field]);
  }
  return { name: "Basic Details", list: userCheckList };
}

function checkSkills(ddr) {
  const skillCheckList = {};
  const fields = ["strengths", "opportunities"];
  for (field of fields) {
    skillCheckList[field] = ddr[field].length !== 0;
  }
  return { name: "Skills", list: skillCheckList };
}

function checkGoals(ddr) {
  const goals = ddr.goals;
  const goalCheckList = [];
  const fields = ["developmentArea", "action", "frequency", "status", "startDate"];

  for (goal of goals) {
    let tempList = {};
    for (field of fields) {
      tempList[field] = Boolean(goal[field]);
    }
    goalCheckList.push({ name: goal.developmentArea || "New Goal", list: tempList });
  }
  return { name: "Goals", list: goalCheckList };
}

module.exports = { checkUser, checkSkills, checkGoals };
