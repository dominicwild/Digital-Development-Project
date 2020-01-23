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

function checkRoutines(ddr) {
  const routines = ddr.routines;
  const routineCheckList = [];
  const fields = ["developmentArea", "action", "frequency", "status", "startDate"];

  for (routine of routines) {
    let tempList = {};
    for (field of fields) {
      tempList[field] = Boolean(routine[field]);
    }
    routineCheckList.push({ name: routine.developmentArea || "New Routine", list: tempList });
  }
  return { name: "Routines", list: routineCheckList };
}

module.exports = { checkUser, checkSkills, checkRoutines };
