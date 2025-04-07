// import { getFirestore } from "firebase-admin/firestore";

// declare the function
/*
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}; */

/*
function createFakeStoreFKNameAndSection(hostIndex) {
  let storeFK;
  let storeName;
  let sectionName;

  switch (parseInt(hostIndex)) {
    case 0:
      storeFK = "+27637339962";
      storeName = "Mayville";
      sectionName = "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa";
      break;
    case 1:
      storeFK = "+2744127814";
      storeName = "DUT";
      sectionName = "DUT-Durban-Kwa Zulu Natal-South Africa";
      break;
    case 2:
      storeFK = "+27766915230";
      storeName = "UKZN";
      sectionName = "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa";
      break;
    default:
      storeFK = "+27651482118";
      storeName = "Sydenham";
      sectionName = "Sparks-Sydenham-Durban-Kwa Zulu Natal-South Africa";
  }

  return [storeFK, storeName, sectionName];
} */

// Parameters - String hostName
// Return - Set of Strings

/*
function findAllHostSections(hostName) {
  let townOrInstitutionFK;
  if (hostName === "Umlazi") {
    townOrInstitutionFK = 1;
  } else if (hostName === "Mangosuthu (MUT)") {
    townOrInstitutionFK = 2;
  } else if (hostName === "DUT") {
    townOrInstitutionFK = 3;
  } else if (hostName === "Howard College UKZN") {
    townOrInstitutionFK = 4;
  } else if (hostName === "Mayville") {
    townOrInstitutionFK = 5;
  } else {
    townOrInstitutionFK = 6;
  }

  const allHostSections = [];

  getFirestore().collection("supported_areas")
    .where("townOrInstitutionFK", "==", townOrInstitutionFK)
    .onSnapshot((supportedAreasSnapshot) => {
      supportedAreasSnapshot.docs.forEach((supportedAreaDoc) => {
        allHostSections.push(supportedAreaDoc.data().areaName);
      });

      return allHostSections;
    });
}
*/

// Parameters - List/Set of sectionNames
/* Return - Map<String, List<Map<String, Boolean>>> :

  For example
  {
  "foreman": [
    {"+27654532232": false},
    {"+27651122232": false},
    {"+27654533232": false}, ...],
  "burnwood": [
    {"+27724532232": false},
    {"+27721122232": false},
    {"+27724533232": false}, ...],
  "kennedy": [
  {"+27814532232": false},
  {"+27811122232": false},
  {"+27814533232": false}, ...],
  "palmet": [
  {"+27694532232": false},
  {"+27691122232": false},
  {"+27694533232": false}, ...],
  }
*/

/*
function createGroupVisitedInfo(sectionNames) {
  const info = new Map(sectionNames);

  info.forEach((value, key, entry) => {
    const groupCreators = [];
    getFirestore().collection("groups")
        .where("groupArea.areaName", "==", key)
        .onSnapshot((groupsSnapshot) => {
          groupsSnapshot.docs.forEach((groupDoc) => {
          // const phoneNumber = groupDoc.data().groupCreatorPhoneNumber;
            groupCreators.push({phoneNumber: false});
          });
          info[key] = groupCreators;
        });
  });
}
*/

// Parameters -:  List<Map<String, Boolean>>
// Return Type -: Boolean

/*
function hasVisitedAllSectionGroups(listOfMaps) {
  for (let mapIndex = 0; mapIndex < listOfMaps.length; mapIndex++) {
    listOfMaps[mapIndex].forEach((value, key, map) => {
      if (!value) {
        return false;
      }
    });
  }
  return true;
}
*/

// Parameters -: Map<String, Boolean>
// Return Type -: Boolean
/*
function isVisited(entry) {
  entry.forEach((isVisited, phoneNumber, map) => {
    return isVisited;
  });
}
*/
// Parameters - Snapshot
// Return - Set of String

/*
export function findCompetitorsOrder(groupsSnapshot, townOrInstitutionName) {
  const competitorsOrder = new Array();
  const maximumNoOfAcceptableGroups = 200; // M -> 10 Minute

  if (groupsSnapshot.size <= maximumNoOfAcceptableGroups) {
    groupsSnapshot.docs.forEach((groupDoc) => {
      competitorsOrder.push(groupDoc.id);
    });
  } else {
    // List/Set of strings
    const sectionNames = shuffle(findAllHostSections(townOrInstitutionName));

    // Map : Key[String] sectionName, Value[List<Map<String, Boolean>>]
    const groupVisitedInfo = createGroupVisitedInfo(sectionNames);
    const map = new Map();

    while (competitorsOrder.length < maximumNoOfAcceptableGroups) {
      // value -> [{"+27834657749": false}, {"+27643657749": false}, ...]
      // Add a single group from each section if applicable.
      groupVisitedInfo.forEach((value, key, entry) => {
        if (!hasVisitedAllSectionGroups(value)) {
          value = shuffle(value);
          const groupIndex = 0;

          while (isVisited(value[groupIndex])) {
            randomIndex++;
          }

          // Add a single section group into the group from which
          // a winner is picked.
          // Mark that particular group and added.
          value[randomIndex].forEach((isVisited, phoneNumber, entry) => {
            competitorsOrder.push(phoneNumber);
            value[phoneNumber] = true;
          });
        }
      });
    }
  }
} */

