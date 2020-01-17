function randInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

/**
 * Takes a list as input and ensures the list is a set, that has no repeating values. It will output the list as a set, if it is not already.
 */
function ensureSet(list) {
  return Array.from(new Set(list));
}

/**
 * A convenience function to turn a potentially undefined object into an empty string.
 * @param {any} object Any object needed to echo to a string
 */
function e(object) {
  return object === undefined ? "" : object;
}

/**
 * Translates field name text (used in the backend database and etc) into text more suitable to be read by humans.
 * @param {String} fieldName The name of the field to translate to human readable text.
 */
function fieldNameToText(fieldName) {
  switch (fieldName) {
    case "firstName":
      return "First Name";
    case "lastName":
      return "Last Name";
    case "ITXLevel":
      return "ITX Level";
    case "aspirationShort":
      return "Short-term Aspiration";
    case "aspirationLong":
      return "Long-term Aspiration";
    case "assignmentArea":
      return "Assignment Area";
    case "developmentArea":
      return "Development Area";
    case "employeeId":
      return "Employee ID";
    case "email":
      return "Email";
    case "strengths":
      return "Strengths";
    case "opportunities":
      return "Opportunities";
    case "action":
      return "Action";
    case "frequency":
      return "Frequency";
    case "startDate":
      return "Start Date";
    case "status":
      return "Status";
    default:
      return "";
  }
}

module.exports = { randInt, ensureSet, e, fieldNameToText };
