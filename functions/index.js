"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions";

import { onDocumentCreated, onDocumentUpdated }
  from "firebase-functions/v2/firestore";

import { onCall } from "firebase-functions/v2/https";

import { onRequest } from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import { debug, log } from "firebase-functions/logger";

import { onSchedule } from "firebase-functions/v2/scheduler";

/* const runtimeOpts = {
  timeoutSeconds: 420,
//memory: "1GiB",
}; */

const pickingMultipleInSeconds = 3;
const superiorAdminId = "1HISOAjWZfQZrDr8r1duQaYYfBE3";
let currentUID = null;

// initializeApp();
initializeApp({
  credential: applicationDefault(),
  // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});


import CountriesCreation from "./models/locations/countries-creation.js";
import ProvinciesOrStatesCreation from "./models/locations/provinces-or-states-creation.js";
import CitiesCreation from "./models/locations/cities-creation.js";
import TownsOrInstitutionsCreation from "./models/locations/towns-or-institutions-creation.js";
import AreasCreation from "./models/locations/areas-creation.js";


// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createSupportedLocations/
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/saveStoreAndAdmins
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeGroups?hostIndex=2
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeDraws?hostIndex=2
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/convertStoreDrawsToCompetitions
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createCompetitions


// ###################Production Functions [Start]########################

export const setCurrentUID = onCall(async (request) => {
  const authToken = request.data.token;
  const userId = request.data.userId;



  try {
    const userAuth = await getAuth()
      .verifyIdToken(authToken);

    logger.log(`Token Was Verified Successfully.`);

    if (userId != userAuth.uid) {
      // res.sendStatus(403);
      logger.log(`User Wasn't Identified Successfully.`);
      return false;
    }
    else {
      currentUID = userId;
      // res.sendStatus(200);
      logger.log(`User Was Identified Successfully. Token ${currentUID}`);
      return true;
    }
  }
  catch (error) {
    log(error);
    // res.sendStatus(401);
    logger.log(`Token Wasn't Verified Successfully.`);
    return false;
  }
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createSupportedLocations/
export const createSupportedLocations = onRequest(async (req, res) => {

  const countriesCreation = new CountriesCreation();
  await countriesCreation.createSupportedCountries();
  const provinciesOrStatesCreation = new ProvinciesOrStatesCreation();
  await provinciesOrStatesCreation.createSupportedProvincesOrStates()
  const citiesCreation = new CitiesCreation();
  await citiesCreation.createSupportedCities();
  const townsOrInstitutionsCreation = new TownsOrInstitutionsCreation();
  await townsOrInstitutionsCreation.createSupportedTownsOrInstitutions();
  const areasCreation = new AreasCreation();
  await areasCreation.createSupportedAreas();
  res.json({ result: `Supported Areas Created Successfully.` });
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/saveStoreAndAdmins
export const saveStoreAndAdmins = onRequest(async (req, res) => {
  const adminReference = getFirestore().collection("admins").doc(superiorAdminId);

  // Superior Admin
  const admin =
  {
    userId: adminReference.id,
    isSuperior: true,
    key: "000",
    isFemale: false,
    townOrInstitution: "Mayville",
    phoneNumber: "+27611111111",
    profileImageURL: "/admins/profile_images/+27611111111.png",
    password: "qwerty321",
  };

  await adminReference.set(admin);


  let store;
  let storeReference;

  /* store = {
      storeOwnerPhoneNumber: "+27714294940",
      storeName: "Umlazi",
      storeImageURL: "store_owners/stores_images/+27714294940.jpeg",
      sectionName: "D Section-Umlazi-Durban-Kwa Zulu Natal-South Africa",
      storeArea: "Kwa Mnyandu (Mobile)",
    };

    storeReference = getFirestore().collection("stores")
      .doc(store.storeOwnerPhoneNumber);

    await storeReference.set(store); */

  /* store = {
      storeOwnerPhoneNumber: "+27833201656",
      storeName: "MUT",
      storeImageURL: "store_owners/stores_images/+27833201656.jpg",// Majali
      sectionName: "Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa",
      storeArea: "On Campus (Mobile)",
    };

    storeReference = getFirestore().collection("stores")
      .doc(store.storeOwnerPhoneNumber);

    await storeReference.set(store); */

  store = {
    storeOwnerPhoneNumber: "+2744127814", // Abo
    storeName: "DUT",
    storeImageURL: "store_owners/stores_images/+27744127814.jpg",
    sectionName: "DUT-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Steve Biko (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  store = {
    storeOwnerPhoneNumber: "+27766915230", // Mafungwashe
    storeName: "UKZN",
    storeImageURL: "store_owners/stores_images/+27766915230.jpg",
    sectionName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Howard College (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  store = {
    storeOwnerPhoneNumber: "+27637339962", // Esethu
    storeName: "Mayville",
    storeImageURL: "store_owners/stores_images/+27637339962.jpg",
    sectionName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Emafrigini (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  store = {
    storeOwnerPhoneNumber: "+27651482118",
    storeName: "Sydenham",
    storeImageURL: "store_owners/stores_images/+27651482118.jpg", // Majali
    sectionName: "Sydenham-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Sparks (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  // Send back a message that we"ve successfully written to the db.
  res.json({ result: `All Admins And Store Are Saved.` });
});

// Branch : store_resources_crud -> create_resources_store_back_end
/* Each time a new store is created, it has to have a corresponding store name
info document which is responsible for holding information that users
will be seeing, like a store"s current state(hasNoCompetition,
hasUpcommingCompetition, etc.) for example. */
export const createStoreNameInfo = onDocumentCreated("/stores/" +
  "{storeOwnerPhoneNumber}", async (event) => {
    // Access the parameter `{storeId}` with `event.params`
    logger.log("From Params Store ID", event.params.storeOwnerPhoneNumber,
      "From Data Store ID", event.data.data().storeOwnerPhoneNumber);

    /* Create a document reference in order to associate it id with the
                                stores"s id.*/
    const docReference = getFirestore()
      .collection("stores_names_info").doc(event.params.storeOwnerPhoneNumber);

    // Grab the current values of what was written to the stores collection.
    const storeNameInfo = {
      storeNameInfoId: event.data.data().storeOwnerPhoneNumber,
      storeName: event.data.data().storeName,
      storeImageURL: event.data.data().storeImageURL,
      sectionName: event.data.data().sectionName,
      storeArea: event.data.data().storeArea,
      canAddStoreDraw: true,
      latestStoreDrawId: "-",
      drawsOrder: [],
    };
    logger.log(`About To Add A Store Name Info Object With ID
    ${storeNameInfo.storeNameInfoId} To The Database.`);

    // Push the new store into Firestore using the Firebase Admin SDK.
    return await docReference.set(storeNameInfo);
  });

// Branch : group_resources_crud -> create_group_back_end
// Works as expected.
export const createGroup1 = onCall(async (request) => {
  const param1 = request.data.param1;
  const param2 = request.data.param2;

  log(param1);
  log(param2);

  return {
    "param1": "one",
    "param2": "two",
  };
});

export const createStoreDraw = onCall(async (request) => {
  if (request.data.numberOfGrandPrices != request.data.drawGrandPrices.length) {
    return;
  }

  const storeFK = request.data.storeFK;
  const drawDateAndTime = request.data.drawDateAndTime;// {year:2025, month:2, day: 23, hour: 8, minute: 25}
  const numberOfGrandPrices = request.data.numberOfGrandPrices;
  const isOpen = request.data.isOpen;
  const storeName = request.data.storeName;
  const storeImageURL = request.data.storeImageURL;
  const sectionName = request.data.sectionName;
  const storeDrawState = request.data.storeDrawState;
  const joiningFee = request.data.joiningFee;

  const storeDrawReference = getFirestore()
    .collection("/stores/").doc(storeFK)
    .collection("/store_draws/")
    .doc();

  const storeDrawId = storeDrawReference.id;


  // Create a single store draw.
  const storeDraw = {
    storeDrawId: storeDrawId,
    storeFK: storeFK,
    drawDateAndTime: drawDateAndTime,
    joiningFee: joiningFee,
    numberOfGrandPrices: numberOfGrandPrices,
    isOpen: isOpen,
    storeName: storeName,
    storeImageURL: storeImageURL,
    sectionName: sectionName,
    storeDrawState: storeDrawState,
  };

  // Save a store draw into the database.
  await storeDrawReference.set(storeDraw);

  const drawGrandPrices = request.data.drawGrandPrices;

  let drawGrandPrice;
  let drawGrandPriceReference;

  // Create grand prices for a particular store draw.
  for (let drawGrandPriceNo = 0; drawGrandPriceNo < storeDraw.numberOfGrandPrices; drawGrandPriceNo++) {
    // Point where to save a store draw grand price.
    drawGrandPriceReference = getFirestore()
      .collection("stores").doc(storeFK)
      .collection("store_draws").doc(storeDrawId)
      .collection("draw_grand_prices").doc();

    // Create a grand price
    drawGrandPrice = {
      grandPriceId: drawGrandPriceReference.id,
      storeDrawFK: storeDrawId,
      description: drawGrandPrices[drawGrandPriceNo].description,
      imageURL: drawGrandPrices[drawGrandPriceNo].imageURL,
      grandPriceIndex: drawGrandPrices[drawGrandPriceNo].grandPriceIndex,
    };

    // Save a draw grand price
    await drawGrandPriceReference.set(drawGrandPrice);
  }

  const storeNameInfoReference = getFirestore()
    .collection("/stores_names_info/").doc(storeFK);

  return await storeNameInfoReference.update({ latestStoreDrawId: storeDraw.storeDrawId });
});

// declare the function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Remember to create an index for the function's query.
// onSchedule("*/5 * * * *", async (event) => { */
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/convertStoreDrawsToCompetitions
export const convertStoreDrawsToCompetitions =
  // onSchedule("4, 17, 30 , 43, 56 17 * FRI", async (event) => {
  onRequest(async (req, res) => {
    try {
      // Consistent timestamp
      const justNow = Timestamp.now().toDate();

      // const justNow = new Date();// Retrieve Current Time.

      // Use the get() method for a read and the onSnapshot() for real time read.
      getFirestore().collectionGroup("store_draws").orderBy("storeName")
        .where("drawDateAndTime.year",
          "==", justNow.getFullYear(),
        )
        .where("drawDateAndTime.month",
          "==", justNow.getMonth() + 1, // 1-12
        )
        .where("drawDateAndTime.day",
          "==", justNow.getDate(),
        )
        .where("drawDateAndTime.hour",
          "==", justNow.getHours() + 2, // GTM
        )/*
        // Can Be A Bit Tricky If You Think About It.
        // As a result competitions shouldn't start at o'clock.
        // Find competitions starting in the next minute.
        .where("drawDateAndTime.minute",
          "<=", justNow.getMinutes() + 1,
        )
        .where("drawDateAndTime.minute",
          ">=", justNow.getMinutes(),
        )*/
        .onSnapshot(async (storeDrawsSnapshot) => {
          log(`number ${storeDrawsSnapshot.size}`);
          if (storeDrawsSnapshot.size) {
            storeDrawsSnapshot.forEach(async (storeDrawDoc) => {
              const townOrInstitution = storeDrawDoc.data()["townOrInstitution"];

              /* Only initiate the conversion step if there are
              groups belonging in a section which is the same
              as the store draw's.*/
              getFirestore().collection("groups")
                .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                .onSnapshot(async (groupsSnapshot) => {
                  if (groupsSnapshot.size > 0) {
                    const storeDrawId = storeDrawDoc.data()["storeDrawId"];

                    const storeDraw = {
                      storeDrawId: storeDrawDoc.data()["storeDrawId"],
                      storeFK: storeDrawDoc.data()["storeFK"],
                      drawDateAndTime:
                        storeDrawDoc.data()["drawDateAndTime"],
                      joiningFee: storeDrawDoc.data()["joiningFee"],
                      numberOfGrandPrices:
                        storeDrawDoc.data()["numberOfGrandPrices"],
                      numberOfGroupCompetitorsSoFar:
                        storeDrawDoc.data()["numberOfGroupCompetitorsSoFar"],
                      isOpen: storeDrawDoc.data()["isOpen"],
                      storeName: storeDrawDoc.data()["storeName"],
                      storeImageURL:
                        storeDrawDoc.data()["storeImageURL"],
                      townOrInstitution: townOrInstitution,
                    };

                    const reference = getFirestore()
                      .collection("competitions")
                      .doc(storeDrawId);


                    const timeBetweenPricePickingAndGroupPicking = pickingMultipleInSeconds;
                    const displayPeriodAfterWinners = pickingMultipleInSeconds * 10;

                    /**
                   * Single Competition Time Interval [Based On 3 Seconds Multiple]
                   * First 1 minute - Remaining Time Count Down
                   * Next 18 seconds - Grand Price Picking
                   * Next 3 seconds - Won Price Display
                   * Next 600 seconds Max - Group Picking
                   * Next 30 Seconds - Competition Result Display
                   * Last 3 seconds - Game Over
                   * Total Time = 1 min + 10 min + 30 sec + 18 sec + 3 sec = 11 min 51 seconds
                   * Gap Between Competitions - 1 minute
                   */

                    const competition = {
                      competitionId: reference.id,
                      storeFK: storeDraw.storeFK,
                      competitionTownOrInstitution: storeDraw.townOrInstitution,
                      isLive: true,
                      dateTime: storeDraw.drawDateAndTime,
                      joiningFee: storeDraw.joiningFee,
                      numberOfGrandPrices: storeDraw.numberOfGrandPrices,
                      isOver: false,
                      grandPricesGridId: "-",
                      competitorsGridId: "-",
                      groupPickingStartTime: -1,
                      pickingMultipleInSeconds: pickingMultipleInSeconds,
                      timeBetweenPricePickingAndGroupPicking: timeBetweenPricePickingAndGroupPicking,
                      displayPeriodAfterWinners: displayPeriodAfterWinners,

                      grandPricesOrder: [],
                      isWonGrandPricePicked: false,
                      competitorsOrder: [],
                      isWonCompetitorGroupPicked: false,
                      competitionState: "on-count-down",
                      wonPrice: null,
                      wonGroup: null,

                    };

                    await reference.set(competition);
                    // Change store draw state.
                    storeDrawDoc.ref.update({
                      storeDrawState: "converted-to-competition",
                    });

                    // Update isOpen to false.
                    storeDrawDoc.ref.update({
                      isOpen: false,
                    });
                  }
                });
            });
          }
        });

      res.json({ result: `Done Converting Store Draws Into Competitions.` });
    }
    catch (e) {
      logger.log(e);
    }
  });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGrandPricesGrid =
  onDocumentCreated("/competitions/" +
    "{competitionId}", async (event) => {
      const competitionId = event.data.data()["competitionId"];
      const numberOfGrandPrices = event.data.data()["numberOfGrandPrices"];
      const storeFK = event.data.data()["storeFK"];


      getFirestore()
        .collection("competitions")
        .doc(competitionId)
        .collection("grand_prices_grids")
        .onSnapshot(async (grandPricesGridSnapshot) => {
          // Only add a new grand price grid if one does not exist yet.
          if (grandPricesGridSnapshot.size == 0) {
            /* Convert each drawGrandPrice into a
                grandPriceToken and save it.*/
            const reference = getFirestore()
              .collection("competitions")
              .doc(competitionId)
              .collection("grand_prices_grids")
              .doc();

            // Step 4
            let grandPricesOrder = [];

            // Make sure all grand prices are visited.
            for (let index = 0; index < numberOfGrandPrices;
              index++) {
              grandPricesOrder.push(index);
            }

            // Suffle the list to make sure the order is random.
            grandPricesOrder = shuffle(grandPricesOrder);

            // Price To Win Index
            grandPricesOrder.push(Math.floor(Math.random() * numberOfGrandPrices));

            const grandPricesGrid = {
              grandPricesGridId: reference.id,
              competitionFK: competitionId,
              numberOfGrandPrices: numberOfGrandPrices,
              currentlyPointedTokenIndex: 0,
              grandPricesOrder: grandPricesOrder,
              hasStarted: false,
              hasStopped: false,
              storeFK: storeFK,
            };

            await reference.set(grandPricesGrid);

            const competitionReference = getFirestore().collection("competitions").doc(competitionId);
            await competitionReference.update({ grandPricesGridId: grandPricesGrid.grandPricesGridId });
            await competitionReference.update({ grandPricesOrder: grandPricesGrid.grandPricesOrder });

            const pickingMultipleInSeconds = event.data.data()["pickingMultipleInSeconds"];
            const timeBetweenPricePickingAndGroupPicking = event.data.data()["timeBetweenPricePickingAndGroupPicking"];
            const groupPickingStartTime = (grandPricesGrid.grandPricesOrder.length + 1) *
              pickingMultipleInSeconds + timeBetweenPricePickingAndGroupPicking;

            await competitionReference.update({ groupPickingStartTime: groupPickingStartTime });
          }
        });
    });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGrandPricesTokens =
  onDocumentCreated("/competitions/" +
    "{competitionId}/grand_prices_grids/" +
    "{grandPriceGridId}", async (event) => {
      const competitionFK = event.data.data()["competitionFK"];
      const grandPricesGridId = event.data.data()["grandPricesGridId"];
      const storeFK = event.data.data()["storeFK"];
      const grandPricesOrder = event.data.data()["grandPricesOrder"];

      getFirestore()
        .collection("stores")
        .doc(storeFK)
        .collection("store_draws")
        .doc(competitionFK)
        .collection("draw_grand_prices")
        .onSnapshot(async (drawGrandPricesSnapshot) => {
          if (drawGrandPricesSnapshot.size > 0) {
            drawGrandPricesSnapshot.forEach(
              async (drawGrandPrice) => {
                // Remember there are n + 1 elements in the grand prices order list. [n = no of grand prices]
                if (drawGrandPrice.data().grandPriceIndex == grandPricesOrder[drawGrandPricesSnapshot.size]) {
                  logger.log(`Grand Price Token - Won Price Index ${grandPricesOrder[drawGrandPricesSnapshot.size]}`);
                  getFirestore()
                    .collection("competitions")
                    .doc(competitionFK).onSnapshot(async (competitionDoc) => {
                      await competitionDoc.ref.update({
                        wonPrice: drawGrandPrice.data(),
                      });
                    });
                }

                const tokenReference =
                  getFirestore()
                    .collection("competitions")
                    .doc(competitionFK)
                    .collection("grand_prices_grids")
                    .doc(grandPricesGridId)
                    .collection("grand_prices_tokens")
                    .doc();

                const grandPriceToken = {
                  grandPriceTokenId:
                    tokenReference.id,
                  grandPricesGridFK:
                    grandPricesGridId,
                  tokenIndex:
                    drawGrandPrice.data().grandPriceIndex,
                  isPointed:
                    drawGrandPrice.data().grandPriceIndex == 0,
                  imageURL:
                    drawGrandPrice.data().imageURL,
                  description:
                    drawGrandPrice.data().description,
                };
                await tokenReference.set(grandPriceToken);
              });
          }
        });
    });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGroupCompetitiorsGrid =
  onDocumentCreated("/competitions/" +
    "{competitionId}", async (event) => {
      const competitionId = event.data.data()["competitionId"];
      const storeFK = event.data.data()["storeFK"];
      const townOrInstitution = event.data.data()["competitionTownOrInstitution"];
      const joiningFee = event.data.data()["joiningFee"];

      getFirestore()
        .collection("competitions")
        .doc(competitionId)
        .collection("group_competitors_grids")
        .onSnapshot(async (groupCompetitorsGridSnapshot) => {
          // Only add a new group competitors grid if one does not exist yet.
          if (groupCompetitorsGridSnapshot.size == 0) {
            getFirestore()
              .collection("groups")
              .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
              .get().then(async (groupsSnapshot) => {
                if (groupsSnapshot.size > 0) {
                  const reference = getFirestore()
                    .collection("competitions")
                    .doc(competitionId)
                    .collection("group_competitors_grids")
                    .doc();

                  const numberOfGroupCompetitorsSoFar = groupsSnapshot.size;
                  const groupCompetitorsGridId = reference.id;

                  let competitorsOrder = [];


                  // Make sure all competitors are visited.
                  groupsSnapshot.docs.forEach((groupDoc) => {
                    competitorsOrder.push(groupDoc.id);
                  });

                  // Make sure competitors are visited randomly.
                  competitorsOrder = shuffle(competitorsOrder);

                  // No Group Picking Strategy Applied.
                  if (groupsSnapshot.size > 200 && joiningFee == 0) {
                    let newCompetitorsList = [];
                    for (let i = 0; i < 200; i++) {
                      newCompetitorsList.push(competitorsOrder[i]);
                    }
                    competitorsOrder = newCompetitorsList;
                  }

                  // const hostGroups = groupsSnapshot.docs;
                  // competitorsOrder = findCompetitorsOrder(groupsSnapshot.docs, townOrInstitution.townOrInstitutionName);

                  const groupCompetitorsGrid = {
                    competitorsGridId: groupCompetitorsGridId,
                    competitionFK: competitionId,
                    numberOfGroupCompetitors:
                      numberOfGroupCompetitorsSoFar,
                    currentlyPointedTokenIndex: 0,
                    competitorsOrder:
                      competitorsOrder,
                    hasStarted: false,
                    hasStopped: false,
                    storeFK: storeFK,
                    townOrInstitution: townOrInstitution,
                  };

                  await reference.set(groupCompetitorsGrid);

                  const competitionReference = getFirestore().collection("competitions").doc(competitionId);
                  await competitionReference.update({ competitorsGridId: groupCompetitorsGrid.competitorsGridId });
                  await competitionReference.update({ competitorsOrder: groupCompetitorsGrid.competitorsOrder });
                }
              });
          }
        });
    });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGroupCompetitorsTokens =
  onDocumentCreated("/competitions/" +
    "{competitionId}/group_competitors_grids/" +
    "{groudCompetitorGridId}", async (event) => {
      const competitionFK =
        event.data.data()["competitionFK"];
      const competitionTownOrInstitution =
        event.data.data()["townOrInstitution"];

      const groupCompetitorsGridId =
        event.data.data()["competitorsGridId"];

      const competitorsOrder = event.data.data()["competitorsOrder"];

      getFirestore()
        .collection("groups")
        .where("groupTownOrInstitution.townOrInstitutionNo", "==", competitionTownOrInstitution.townOrInstitutionNo)
        .onSnapshot(
          async (groupsSnapshot) => {
            if (groupsSnapshot.size > 0) {

              for (let groupIndex = 0; groupIndex <
                groupsSnapshot.size; groupIndex++) {
                const groupDoc =
                  groupsSnapshot.docs.at(groupIndex);

                // Last Group Wins.
                if (groupDoc.data().groupCreatorPhoneNumber === competitorsOrder[groupsSnapshot.size - 1]) {
                  logger.log(`Competitor Token - Group Creator Leader ${competitorsOrder[groupsSnapshot.size - 1]}`);
                  getFirestore()
                    .collection("competitions")
                    .doc(competitionFK).onSnapshot((competitionDoc) => {
                      competitionDoc.ref.update({
                        wonGroup: groupDoc.data(),
                      });
                    });
                }

                const tokenDocReference =
                  getFirestore()
                    .collection("competitions")
                    .doc(competitionFK)
                    .collection("group_competitors_grids")
                    .doc(groupCompetitorsGridId)
                    .collection("group_competitors_tokens")
                    .doc();

                const groupCompetitorToken = {
                  groupCompetitorTokenId:
                    tokenDocReference
                      .id,
                  groupCompetitorsGridFK:
                    groupCompetitorsGridId,
                  tokenIndex: groupIndex,
                  group: groupDoc.data(),
                };

                await tokenDocReference
                  .set(groupCompetitorToken);
              }
            }
          });
    });

/*
const batchWriteTester = (async () => {
  getFirestore().collection("groups")
    .onSnapshot(async (groupsSnapshot) => {
      const batch = getFirestore().batch();
      groupsSnapshot.docs.map((groupDoc) => {
        batch.update(groupDoc.ref, { groupName: 'No Name' });
      });

      logger.debug("batch operation 1...");
      await batch.commit();

    });
});*/


// Remember to create an index for the function's query.
// Works fine with generated competitions' id, whether or not it does with custom ids depends on the creation of indexes.
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createCompetitions
export const createCompetitions =
  // onSchedule("4, 17, 30 , 43, 56 17 * FRI", async (event) => {
  onRequest(async (req, res) => {


    try {
      // Consistent timestamp
      const justNow = Timestamp.now().toDate();

      // const justNow = new Date();// Retrieve Current Time.

      // Use the get() method for a read and the onSnapshot() for real time read.
      getFirestore().collectionGroup("store_draws").orderBy("storeName")
        .where("drawDateAndTime.year",
          "==", justNow.getFullYear(),
        )
        .where("drawDateAndTime.month",
          "==", justNow.getMonth() + 1, // 1-12
        )
        .where("drawDateAndTime.day",
          "==", justNow.getDate(),
        )
        .where("drawDateAndTime.hour",
          "==", justNow.getHours() + 2, // GTM
        ) /*
        // Can Be A Bit Tricky If You Think About It.
        // As a result competitions shouldn't start at o'clock.
        // Find competitions starting in the next minute.
        .where("drawDateAndTime.minute",
          "<=", justNow.getMinutes() + 1,
        ) 
        .where("drawDateAndTime.minute",
          ">=", justNow.getMinutes(),
        ) */
        .onSnapshot(async (storeDrawsSnapshot) => {

          if (storeDrawsSnapshot.size) {
            log(`No of draws ${storeDrawsSnapshot.size}`);

            storeDrawsSnapshot.docs.map(async (storeDrawDoc) => {
              const batch = getFirestore().batch();
              const townOrInstitution = storeDrawDoc.data()["townOrInstitution"];

              /* Only initiate the conversion step if there are
              groups belonging in a section which is the same
              as the store draw's.*/
              getFirestore().collection("groups")
                .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                .onSnapshot(async (groupsSnapshot) => {
                  if (groupsSnapshot.size > 0) {
                    const storeDrawId = storeDrawDoc.data()["storeDrawId"];

                    const storeDraw = {
                      storeDrawId: storeDrawId,
                      storeFK: storeDrawDoc.data()["storeFK"],
                      drawDateAndTime:
                        storeDrawDoc.data()["drawDateAndTime"],
                      joiningFee: storeDrawDoc.data()["joiningFee"],
                      numberOfGrandPrices:
                        storeDrawDoc.data()["numberOfGrandPrices"],
                      numberOfGroupCompetitorsSoFar:
                        storeDrawDoc.data()["numberOfGroupCompetitorsSoFar"],
                      isOpen: storeDrawDoc.data()["isOpen"],
                      storeName: storeDrawDoc.data()["storeName"],
                      storeImageURL:
                        storeDrawDoc.data()["storeImageURL"],
                      townOrInstitution: townOrInstitution,
                    };

                    const reference = getFirestore()
                      .collection("competitions").doc();
                    //.doc(storeDrawId);


                    const timeBetweenPricePickingAndGroupPicking = pickingMultipleInSeconds;
                    const displayPeriodAfterWinners = pickingMultipleInSeconds * 10;

                    /**
                    * Single Competition Time Interval [Based On 3 Seconds Multiple]
                    * First 1 minute - Remaining Time Count Down
                    * Next 18 seconds - Grand Price Picking
                    * Next 3 seconds - Won Price Display
                    * Next 600 seconds Max - Group Picking
                    * Next 30 Seconds - Competition Result Display
                    * Last 3 seconds - Game Over
                    * Total Time = 1 min + 10 min + 30 sec + 18 sec + 3 sec = 11 min 51 seconds
                    * Gap Between Competitions - 1 minute
                    */

                    const competition = {
                      competitionId: reference.id,
                      storeFK: storeDraw.storeFK,
                      competitionTownOrInstitution: storeDraw.townOrInstitution,
                      isLive: true,
                      dateTime: storeDraw.drawDateAndTime,
                      joiningFee: storeDraw.joiningFee,
                      numberOfGrandPrices: storeDraw.numberOfGrandPrices,
                      isOver: false,
                      grandPricesGridId: "-",
                      competitorsGridId: "-",
                      groupPickingStartTime: -1,
                      pickingMultipleInSeconds: pickingMultipleInSeconds,
                      timeBetweenPricePickingAndGroupPicking: timeBetweenPricePickingAndGroupPicking,
                      displayPeriodAfterWinners: displayPeriodAfterWinners,

                      grandPricesOrder: [],
                      isWonGrandPricePicked: false,
                      competitorsOrder: [],
                      isWonCompetitorGroupPicked: false,
                      competitionState: "on-count-down",
                      wonPrice: null,
                      wonGroup: null,

                    };

                    batch.create(reference, competition);
                    batch.update(storeDrawDoc.ref, { storeDrawState: "converted-to-competition" });
                    batch.update(storeDrawDoc.ref, { isOpen: false });
                    await batch.commit();
                  }
                });
            });
          }
        });

      res.json({ result: `Done Converting Store Draws Into Competitions.` });
    }
    catch (e) {
      logger.log(e);
    } finally {

    }
  });

/* Make sure all competitions start at an acceptable time,
like 08:30 for instance.*/
// Branch : competition_resources_crud -> create_competition_resources_back_end
export const maintainCountDownClocks =
  onDocumentCreated("/competitions/" +
    "{competitionId}", async (event) => {
      const day = event.data.data().dateTime["day"];
      const month = event.data.data().dateTime["month"];
      const year = event.data.data().dateTime["year"];
      const hour = event.data.data().dateTime["hour"];
      const minute = event.data.data().dateTime["minute"];




      const countDownId = `${year}-${month}-${day}-@${hour}h${minute}`;

      const reference = getFirestore().collection("count_down_clocks")
        .doc(countDownId);

      reference.onSnapshot(async (snapshot) => {
        if (!snapshot.exists) {
          const joiningFee = event.data.data().dateTime["joiningFee"];
          const competitorsOrder = event.data.data().competitorsOrder;
          /**
           * Single Competition Time Interval [Based On 3 Seconds Multiple]
           * First 1 minute - Remaining Time Count Down
           * Next 18 seconds - Grand Price Picking
           * Next 3 seconds - Won Price Display
           * Next 600 seconds Max - Group Picking
           * Next 30 Seconds - Competition Result Display
           * Last 12 seconds - Game Over
           * Total Time = 1 min + 10 min + 30 sec + 18 sec + 12 sec = 12 min seconds
           * Gap Between Competitions - 1 minute
           */

          // Remaining seconds should always start at -60 and stop at 654
          // Maximum = 664 or 
          let max;

          let second = -pickingMultipleInSeconds * 20; // -60

          if (joiningFee == 0) {
            max = pickingMultipleInSeconds * 6 + // Grand Price Picking
              pickingMultipleInSeconds * 1 + // Won Price Display
              pickingMultipleInSeconds * 200 + // Group Picking Max Time
              pickingMultipleInSeconds * 30 + // Competition Result Display
              pickingMultipleInSeconds * 12; // Game Over
          }
          else {
            pickingMultipleInSeconds * 6 + // Grand Price Picking
              pickingMultipleInSeconds * 1 + // Won Price Display
              pickingMultipleInSeconds * competitorsOrder.length + // Group Picking Max Time
              pickingMultipleInSeconds * 30 + // Competition Result Display
              pickingMultipleInSeconds * 12; // Game Over
          }

          reference.set({
            remainingTime: second,
          });

          const timerId = setInterval(async () => {
            if (second > max) {
              clearInterval(timerId);
            }
            else {
              second += pickingMultipleInSeconds;
            }
            reference.set({
              remainingTime: second,
            });

            // batchWriteTester(second);
            // keepTrackOfReadOnly(collectionId);
          }, pickingMultipleInSeconds * 1000);
        }
      });
    });

// Enough CPUs, memory and time is needed for this function.
/*
  const keepTrackOfReadOnly = (async (readOnlyId) => {
 */

// Branch : competition_resources_crud -> create_competition_resources_back_end
/* eslint brace-style: ["warn", "stroustrup"]*/
export const setIsLiveForQualifyingCompetitions = onDocumentUpdated("/read_only/" +
  "{readOnlyId}", async (event) => {
    const readOnlyId = event.params.readOnlyId;

    const readOnlyReference = getFirestore().collection("read_only")
      .doc(readOnlyId);


    readOnlyReference.onSnapshot(
      async (doc) => {
        // The remaining time for competitions to start.
        const remainingTime = doc.data().remainingTime;

        /* Set isLive to true on corresponding competitions*/
        if (remainingTime == 0) {
          const datePieces = readOnlyId.split("-");

          const day = datePieces[0];
          const month = datePieces[1];
          const year = datePieces[2];
          const hour = datePieces[3];
          const minute = datePieces[4];

          getFirestore().collection("competitions")
            .onSnapshot(async (competitionsSnapshot) => {
              if (competitionsSnapshot.size > 0) {
                competitionsSnapshot.docs.map(async (competitionDoc) => {
                  if (competitionDoc.data().dateTime["day"] == day &&
                    competitionDoc.data().dateTime["month"] == month &&
                    competitionDoc.data().dateTime["year"] == year &&
                    competitionDoc.data().dateTime["hour"] == hour &&
                    competitionDoc.data().dateTime["minute"] == minute) {
                    // Set competition isLive value to true.
                    competitionDoc.ref.update({
                      isLive: true,
                    });
                  }
                });
              }
            });
        }
      });
  });

/* eslint max-len: ["off", { "code", 80, "comments": 80 }] */
export const createWonPriceSummary =
  onDocumentUpdated("/competitions/" +
    "{competitionId}", async (event) => {

      const reference = getFirestore()
        .collection("competitions")
        .doc(event.params.competitionId);

      reference.onSnapshot((competitionSnapshot) => {
        if (competitionSnapshot.exists) {
          const isOver = competitionSnapshot.data().isOver;
          const isLive = competitionSnapshot.data().isLive;

          if (isOver && isLive) {
            reference.update({ isLive: false });
            const wonPriceSummaryId =
              competitionSnapshot.data().competitionId;
            const storeFK =
              competitionSnapshot.data().storeFK;

            const wonPrice = competitionSnapshot.data()["wonPrice"];
            const wonGroup = competitionSnapshot.data()["wonGroup"];

            // For Debugging Purposes.
            const competitorsOrder = competitionSnapshot.data()["competitorsOrder"];
            const grandPricesOrder = competitionSnapshot.data()["grandPricesOrder"];

            logger.log(`WonPriceSummary - ${wonGroup.groupCreatorPhoneNumber} ${competitorsOrder}`);
            logger.log(`WonPriceSummary - ${wonPrice.grandPriceIndex} ${grandPricesOrder}`);

            const storeReference = getFirestore()
              .collection("stores")
              .doc(storeFK);

            storeReference.onSnapshot(async (snapshot) => {
              const storeName = snapshot.data().storeName;
              const storeImageURL = snapshot.data().storeImageURL;
              const storeSection = snapshot.data().sectionName;
              const storeArea = snapshot.data().storeArea;


              const wonPriceSummaryReference =
                getFirestore()
                  .collection("won_prices_summaries")
                  .doc(wonPriceSummaryId);
              const wonPriceSummary = {
                wonPriceSummaryId:
                  wonPriceSummaryId,
                storeFK: storeFK,
                groupName: wonGroup.groupName,
                groupSpecificArea: wonGroup.groupSpecificArea,
                groupTownOrInstitution:
                  wonGroup.groupTownOrInstitution,
                groupArea:
                  wonGroup.groupArea,
                groupMembers: wonGroup.groupMembers,
                grandPriceDescription:
                  wonPrice.description,
                wonGrandPriceImageURL: wonPrice.imageURL,
                storeImageURL: storeImageURL,
                hostName: storeName,
                storeSection: storeSection,
                pickUpSpot: storeArea,
                wonDate: competitionSnapshot.data().dateTime,
                groupCreatorUsername: wonGroup.groupCreatorUsername,
                groupCreatorImageURL: wonGroup.groupCreatorImageURL,
                groupCreatorPhoneNumber: wonGroup.groupCreatorPhoneNumber,
              };

              // Create won price summary.
              await wonPriceSummaryReference
                .set(wonPriceSummary);

              // Update corresponding store draw.
              /* getFirestore()
              .collection("stores")
              .doc(storeFK)
              .collection("store_draws")
              .doc(wonPriceSummaryId)
              .update({
              storeDrawState:"competition-finished"
              });; */
            });
          }
        }
      });
    });
// ##################Production Functions [End]########################

// ########Development Functions [Start]###############

// ========================================Create Groups Data[End]========================================

const listAllUsers = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};

// ==========================Sydenham Fake Groups [Start]==========================
// Ekhontena KaNkosi, Emashaweni, Emastebhinini, Emathuneni
const foreman1Groups = async () => {
  const host = "sydenham";
  const group1Members = ["+27651111111", "+27661111111", "+27671111111", "+27681111111", "+27691111111"];
  const group1CreatorPhoneNumber = "+27651111111";
  const group2Members = ["+27652222222", "+27662222222", "+27672222222", "+27682222222", "+27692222222"];
  const group2CreatorPhoneNumber = "+27652222222";
  const group3Members = ["+27653333333", "+27663333333", "+27673333333", "+27683333333", "+27693333333"];
  const group3CreatorPhoneNumber = "+27653333333";
  const group4Members = ["+27654444444", "+27664444444", "+27674444444", "+27684444444", "+27694444444"];
  const group4CreatorPhoneNumber = "+27654444444";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea1 = 'Ekhontena Kankosi';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea2 = 'Emashaweni';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea3 = 'Emastebhisini';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea4 = 'Emathuneni';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Flagstaff Family";
  const group1CreatorUsername = "Melikhaya";

  const groupName2 = "Bizana FC";
  const group2CreatorUsername = "Toto";

  const groupName3 = "Ezase Lusikisiki";
  const group3CreatorUsername = "Luvo";

  const groupName4 = "Maxicans";
  const group4CreatorUsername = "Bright";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

// KaDluluthuli, Empompini, Emathuneni, Emashaweni
const foreman2Groups = async () => {
  const host = "sydenham";
  const group1Members = ["+27655555555", "+27665555555", "+27675555555", "+27685555555", "+27695555555"];
  const group1CreatorPhoneNumber = "+27655555555";
  const group2Members = ["+27676666666", "+27686666666", "+27696666666", "+27606666666", "+27616666666"];
  const group2CreatorPhoneNumber = "+27676666666";
  const group3Members = ["+27677777777", "+27687777777", "+27697777777", "+27607777777", "+27617777777"];
  const group3CreatorPhoneNumber = "+27677777777";
  const group4Members = ["+27688888888", "+27698888888", "+27608888888", "+27618888888", "+27628888888"];
  const group4CreatorPhoneNumber = "+27688888888";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea1 = 'KaDluluthuli';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea2 = 'Empompini';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea3 = 'Emathuneni';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "37",
  };
  const specificArea4 = 'Emashaweni';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Abakhapheli";
  const group1CreatorUsername = "Mondli";

  const groupName2 = "Izingelosi";
  const group2CreatorUsername = "Lucky";

  const groupName3 = "Obaba Bendawo";
  const group3CreatorUsername = "Dumsani";

  const groupName4 = "Omashonisa";
  const group4CreatorUsername = "Cindy";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

// Epaki, Egaza, Emgwaqeni Omhlophe, Sydenham Primary
const burnwoodGroups = async () => {
  const host = "sydenham";
  const group1Members = ["+27755555550", "+27765555550", "+27775555550", "+27785555550", "+27795555550"];
  const group1CreatorPhoneNumber = "+27755555550";
  const group2Members = ["+27776666660", "+27786666660", "+27796666660", "+27706666660", "+27716666660"];
  const group2CreatorPhoneNumber = "+27776666660";
  const group3Members = ["+27777777770", "+27787777770", "+27797777770", "+27707777770", "+27717777770"];
  const group3CreatorPhoneNumber = "+27777777770";
  const group4Members = ["+27788888880", "+27798888880", "+27708888880", "+27718888880", "+27728888880"];
  const group4CreatorPhoneNumber = "+27788888880";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "39",
  };
  const specificArea1 = 'Epaki';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "39",
  };
  const specificArea2 = 'Egaza';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "39",
  };
  const specificArea3 = 'Emgwaqeni Omhlophe';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "39",
  };
  const specificArea4 = 'Sydenham Primary';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Abakhapheli";
  const group1CreatorUsername = "Simo";

  const groupName2 = "Udumba";
  const group2CreatorUsername = "Cindy";

  const groupName3 = "Umsanka";
  const group3CreatorUsername = "Dumsani";

  const groupName4 = "Omashonisa";
  const group4CreatorUsername = "Khule";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const kennedyGroups = async () => {
  const host = "sydenham";
  const group1Members = ["+27602746533", "+27602746534", "+27602746535", "+27602746536", "+27602746537"];
  const group1CreatorPhoneNumber = "+27602746533";
  const group2Members = ["+27612746533", "+27612746534", "+27612746535", "+27612746536", "+27612746537"];
  const group2CreatorPhoneNumber = "+27612746533";
  const group3Members = ["+27622746533", "+27622746534", "+27622746535", "+27622746536", "+27622746537"];
  const group3CreatorPhoneNumber = "+27622746533";
  const group4Members = ["+27632746533", "+27632746534", "+27632746535", "+27632746536", "+27632746537"];
  const group4CreatorPhoneNumber = "+27632746533";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "38",
  };
  const specificArea1 = '__________';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "38",
  };
  const specificArea2 = '__________';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "38",
  };
  const specificArea3 = '__________';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "38",
  };
  const specificArea4 = '__________';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Omalume";
  const group1CreatorUsername = "Asanda";

  const groupName2 = "Ezivuthumlilo";
  const group2CreatorUsername = "Thumeka";

  const groupName3 = "Izinkalakatha";
  const group3CreatorUsername = "Fikile";

  const groupName4 = "Ojikantamo";
  const group4CreatorUsername = "Nandipha";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const palmet1Groups = async () => {
  const host = "sydenham";
  const group1Members = ["+27634883320", "+27634883321", "+27634883322", "+27634883323", "+27634883324"];
  const group1CreatorPhoneNumber = "+27634883320";
  const group2Members = ["+27644883320", "+27644883321", "+27644883322", "+27644883323", "+27644883324"];
  const group2CreatorPhoneNumber = "+27644883320";
  const group3Members = ["+27654883320", "+27654883321", "+27654883322", "+27622746533", "+27622746534"];
  const group3CreatorPhoneNumber = "+27654883320";
  const group4Members = ["+27664883320", "+27664883321", "+27664883322", "+27664883323", "+27664883324"];
  const group4CreatorPhoneNumber = "+27664883320";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea1 = '__________';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea2 = '__________';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea3 = '__________';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea4 = '__________';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Omalume";
  const group1CreatorUsername = "Asanda";

  const groupName2 = "Ezivuthumlilo";
  const group2CreatorUsername = "Thumeka";

  const groupName3 = "Izinkalakatha";
  const group3CreatorUsername = "Fikile";

  const groupName4 = "Ojikantamo";
  const group4CreatorUsername = "Nandipha";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const palmet2Groups = async () => {
  const host = "sydenham";
  const group1Members = ["+27812993395", "+27812993394", "+27812993393", "+27812993392", "+27812993391"];
  const group1CreatorPhoneNumber = "+27812993395";
  const group2Members = ["+27822993395", "+27822993394", "+27822993393", "+27822993392", "+27822993391"];
  const group2CreatorPhoneNumber = "+27822993395";
  const group3Members = ["+27832993395", "+27832993394", "+27832993393", "+27832993392", "+27832993391"];
  const group3CreatorPhoneNumber = "+27832993395";
  const group4Members = ["+27842993395", "+27842993394", "+27842993393", "+27842993392", "+27842993391"];
  const group4CreatorPhoneNumber = "+27842993395";

  const group1Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea1 = '__________';

  const group2Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea2 = '__________';

  const group3Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea3 = '__________';

  const group4Area = {
    townOrInstitutionFK: "6",
    areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "40",
  };
  const specificArea4 = '__________';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Sydenham",
    townOrInstitutionNo: "6",
  };

  const groupName1 = "Omakhwenkwe";
  const group1CreatorUsername = "Khumalo";

  const groupName2 = "Indlulamithi";
  const group2CreatorUsername = "Kabelo";

  const groupName3 = "Ononkala";
  const group3CreatorUsername = "Sabelo";

  const groupName4 = "Ezase Lalini";
  const group4CreatorUsername = "Mlu";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

// ==========================Sydenham Fake Groups [End]==========================

// ==========================UKZN Fake Groups [Start]==========================
const towerGroups = async () => {

  const host = "ukzn";
  const group1Members = ["+27801111111", "+27811111111", "+27821111111", "+27831111111", "+27841111111"];
  const group1CreatorPhoneNumber = "+27801111111";
  const group2Members = ["+27802222222", "+27812222222", "+27822222222", "+27832222222", "+27842222222"];
  const group2CreatorPhoneNumber = "+27802222222";
  const group3Members = ["+27803333333", "+27813333333", "+27823333333", "+27833333333", "+27843333333"];
  const group3CreatorPhoneNumber = "+27803333333";
  const group4Members = ["+27804444444", "+27844444444", "+27824444444", "+27834444444", "+27844444444"];
  const group4CreatorPhoneNumber = "+27804444444";
  const group1Area = {
    townOrInstitutionFK: "4",
    areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "30",
  };
  const specificArea1 = 'Tower A-Block';

  const group2Area = {
    townOrInstitutionFK: "4",
    areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "30",
  };
  const specificArea2 = 'Tower B-Block';

  const group3Area = {
    townOrInstitutionFK: "4",
    areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "30",
  };
  const specificArea3 = 'Tower C-Block';

  const group4Area = {
    townOrInstitutionFK: "4",
    areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "30",
  };
  const specificArea4 = 'Tower D-Block';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Howard College UKZN",
    townOrInstitutionNo: "4",
  };

  const groupName1 = "Angels";
  const group1CreatorUsername = "Monica";

  const groupName2 = "Night Riders";
  const group2CreatorUsername = "Cat";

  const groupName3 = "Engineers";
  const group3CreatorUsername = "Sam";

  const groupName4 = "Rangers";
  const group4CreatorUsername = "Jimmy";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpeg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpeg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpeg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpeg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);

}

// ==========================UKZN Fake Groups [End]==========================

// ==========================Mayville Fake Groups [Start]==========================
const catoCrestGroups = async () => {

  const host = "mayville";
  const group1Members = ["+27601111111", "+27611111111", "+27621111111", "+27631111111", "+27641111111"];
  const group1CreatorPhoneNumber = "+27601111111";
  const group2Members = ["+27602222222", "+27612222222", "+27622222222", "+27632222222", "+27642222222"];
  const group2CreatorPhoneNumber = "+27602222222";
  const group3Members = ["+27603333333", "+27613333333", "+27623333333", "+27633333333", "+27643333333"];
  const group3CreatorPhoneNumber = "+27603333333";
  const group4Members = ["+27604444444", "+27614444444", "+27624444444", "+27634444444", "+27644444444"];
  const group4CreatorPhoneNumber = "+27604444444";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "31",
  };
  const specificArea1 = 'Emakhontena';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "31",
  };
  const specificArea2 = 'Stop Street';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "31",
  };
  const specificArea3 = 'Stop 8';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "31",
  };
  const specificArea4 = 'Ko 1 Room';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Ompetha";
  const group1CreatorUsername = "Sizwe";

  const groupName2 = "Izinja Madoda";
  const group2CreatorUsername = "Zama";

  const groupName3 = "Real Madrid";
  const group3CreatorUsername = "Bonga";

  const groupName4 = "Abangenacala ";
  const group4CreatorUsername = "Stha";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const richviewKoGreenGroups = async () => {

  const host = "mayville";
  const group1Members = ["+27648395837", "+27648395836", "+27648395835", "+27648395834", "+27648395833"];
  const group1CreatorPhoneNumber = "+27648395837";
  const group2Members = ["+27638395837", "+27638395836", "+27638395835", "+27638395834", "+27638395833"];
  const group2CreatorPhoneNumber = "+27638395837";
  const group3Members = ["+27628395837", "+27628395836", "+27628395835", "+27628395834", "+27628395833"];
  const group3CreatorPhoneNumber = "+27628395837";
  const group4Members = ["+27618395837", "+27618395836", "+27618395835", "+27618395834", "+27618395833"];
  const group4CreatorPhoneNumber = "+27618395837";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea1 = '_____[Ko Green]';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea2 = '_____[Ko Green]';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea3 = '_____[Ko Green]';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea4 = '_____[Ko Green]';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Tigers";
  const group1CreatorUsername = "Jabulani";

  const groupName2 = "Iziqali Zendlela";
  const group2CreatorUsername = "Sfiso";

  const groupName3 = "Ofelenkanini";
  const group3CreatorUsername = "Thembeka";

  const groupName4 = "The Ones";
  const group4CreatorUsername = "Lungelo";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const richviewKoOrangeGroups = async () => {

  const host = "mayville";
  const group1Members = ["+27624738493", "+27624738494", "+27624738495", "+27624738496", "+27624738497"];
  const group1CreatorPhoneNumber = "+27624738493";
  const group2Members = ["+27634738493", "+27634738494", "+27634738495", "+27634738496", "+27634738497"];
  const group2CreatorPhoneNumber = "+27634738493";
  const group3Members = ["+27644738493", "+27644738494", "+27644738495", "+27644738496", "+27644738497"];
  const group3CreatorPhoneNumber = "+27644738493";
  const group4Members = ["+27654738493", "+27654738492", "+27618395831", "+27618395830", "+27618395839"];
  const group4CreatorPhoneNumber = "+27654738493";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea1 = '_____[Ko Orange]';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea2 = '_____[Ko Orange]';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea3 = '_____[Ko Orange]';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea4 = '_____[Ko Orange]';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Lions";
  const group1CreatorUsername = "James";

  const groupName2 = "Otsotsi";
  const group2CreatorUsername = "Thula";

  const groupName3 = "Zebras";
  const group3CreatorUsername = "Lindo";

  const groupName4 = "Ezomjolo";
  const group4CreatorUsername = "Sane";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const richviewEmathininiGroups = async () => {

  const host = "mayville";
  const group1Members = ["+27834857938", "+27834857937", "+27834857936", "+27834857935", "+27834857934"];
  const group1CreatorPhoneNumber = "+27834857938";
  const group2Members = ["+27844857938", "+27844857939", "+27844857930", "+27844857931", "+27844857932"];
  const group2CreatorPhoneNumber = "+27844857938";
  const group3Members = ["+27824857938", "+27824857937", "+27824857936", "+27824857935", "+27824857934"];
  const group3CreatorPhoneNumber = "+27824857938";
  const group4Members = ["+27814857938", "+27814857937", "+27814857936", "+27814857935", "+27814857934"];
  const group4CreatorPhoneNumber = "+27814857938";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea1 = '_____[Emathinini]';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea2 = '_____[Emathinini]';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea3 = '_____[Emathinini]';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "33",
  };
  const specificArea4 = '_____[Emathinini]';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Ezimnyama";
  const group1CreatorUsername = "Khule";

  const groupName2 = "Ojikelele";
  const group2CreatorUsername = "Ayo";

  const groupName3 = "Izimaku";
  const group3CreatorUsername = "Sihle";

  const groupName4 = "Ezobumnandi";
  const group4CreatorUsername = "Mpilo";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const nsimbini1Groups = async () => {

  const host = "mayville";
  const group1Members = ["+27867826632", "+27867826631", "+27867826630", "+27867826639", "+27867826638"];
  const group1CreatorPhoneNumber = "+27867826632";
  const group2Members = ["+27847826632", "+27847826631", "+27847826630", "+27847826639", "+27847826638"];
  const group2CreatorPhoneNumber = "+27847826632";
  const group3Members = ["+27837826632", "+27837826631", "+27837826630", "+27837826639", "+27837826638"];
  const group3CreatorPhoneNumber = "+27837826632";
  const group4Members = ["+27827826632", "+27827826631", "+27827826630", "+27827826639", "+27827826638"];
  const group4CreatorPhoneNumber = "+27827826632";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea1 = '_____';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea2 = '_____';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea3 = '_____';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea4 = '_____';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Ezomkhuleko";
  const group1CreatorUsername = "Syanda";

  const groupName2 = "Buffullos";
  const group2CreatorUsername = "Mja";

  const groupName3 = "Humans";
  const group3CreatorUsername = "Maduma";

  const groupName4 = "Abanolwazi";
  const group4CreatorUsername = "Delani";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const nsimbini2Groups = async () => {

  const host = "mayville";
  const group1Members = ["+27787362733", "+27787362734", "+27787362735", "+27787362736", "+27787362737"];
  const group1CreatorPhoneNumber = "+27787362733";
  const group2Members = ["+27767362733", "+27767362734", "+27767362735", "+27767362736", "+27767362737"];
  const group2CreatorPhoneNumber = "+27767362733";
  const group3Members = ["+27747362733", "+27747362732", "+27747362731", "+27747362730", "+27747362739"];
  const group3CreatorPhoneNumber = "+27747362733";
  const group4Members = ["+27737362733", "+27737362732", "+27737362731", "+27737362730", "+27737362739"];
  const group4CreatorPhoneNumber = "+27737362733";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea1 = '_____';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea2 = '_____';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea3 = '_____';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea4 = '_____';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Izichomane";
  const group1CreatorUsername = "Selu";

  const groupName2 = "Mathematecians";
  const group2CreatorUsername = "Khona";

  const groupName3 = "Made Men";
  const group3CreatorUsername = "Buke";

  const groupName4 = "Young Ones";
  const group4CreatorUsername = "Thabiso";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

const nsimbini3Groups = async () => {

  const host = "mayville";
  const group1Members = ["+27669388308", "+27669388307", "+27669388306", "+27669388305", "+27669388304"];
  const group1CreatorPhoneNumber = "+27669388308";
  const group2Members = ["+27659388308", "+27659388307", "+27659388306", "+27659388305", "+27659388304"];
  const group2CreatorPhoneNumber = "+27659388308";
  const group3Members = ["+27649388308", "+27649388309", "+27649388300", "+27649388301", "+27649388302"];
  const group3CreatorPhoneNumber = "+27649388308";
  const group4Members = ["+27639388308", "+27639388309", "+27639388300", "+27639388301", "+27639388302"];
  const group4CreatorPhoneNumber = "+27639388308";

  const group1Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea1 = '_____';

  const group2Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea2 = '_____';

  const group3Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea3 = '_____';

  const group4Area = {
    townOrInstitutionFK: "5",
    areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
    areaNo: "36",
  };
  const specificArea4 = '_____';

  const groupTownOrInstitution = {
    cityFK: "1",
    townOrInstitutionName: "Mayville",
    townOrInstitutionNo: "5",
  };

  const groupName1 = "Shoe Makers";
  const group1CreatorUsername = "Amanda";

  const groupName2 = "Doctors";
  const group2CreatorUsername = "Sya";

  const groupName3 = "Abameli";
  const group3CreatorUsername = "Mabura";

  const groupName4 = "Super Siayans";
  const group4CreatorUsername = "Amo";

  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);
}

// ==========================Mayville Fake Groups [End]==========================

// Marketing Strategy 1-1 : Use Specific Area Residence To Find Contributors.
// Marketing Strategy 1-2 : Use Kids Gift To Find Contributors.
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeGroups
export const createFakeGroups = onRequest(async (req, res) => {
  let group1Area;
  let group2Area;
  let group3Area;
  let group4Area;

  let specificArea1;
  let specificArea2;
  let specificArea3;
  let specificArea4;

  let groupTownOrInstitution;

  let groupName1;
  let group1CreatorUsername;
  let group1CreatorPhoneNumber;

  let groupName2;
  let group2CreatorUsername;
  let group2CreatorPhoneNumber;

  let groupName3;
  let group3CreatorUsername;
  let group3CreatorPhoneNumber;

  let groupName4;
  let group4CreatorUsername;
  let group4CreatorPhoneNumber;

  let host;

  let group1Members;
  let group2Members;
  let group3Members;
  let group4Members;

  switch (parseInt(req.query.hostIndex)) {
    case 0:// Mayville

      await catoCrestGroups();  // Marketing Strategy 1-2
      await richviewKoOrangeGroups(); // Marketing Strategy 1-1
      await richviewKoGreenGroups();  // Marketing Strategy 1-1
      await richviewEmathininiGroups(); // Marketing Strategy 1-1

      await nsimbini1Groups();  // Marketing Strategy 1-1
      await nsimbini2Groups();  // Marketing Strategy 1-1
      await nsimbini3Groups();  // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All Mayville Fake Groups Are Saved.` });
      return
    case 1:// DUT
      host = "dut";
      group1Members = ["+27701111111", "+27711111111", "+27721111111", "+27731111111", "+27741111111"];
      group1CreatorPhoneNumber = "+27701111111";
      group2Members = ["+27702222222", "+27712222222", "+27722222222", "+27732222222", "+27742222222"];
      group2CreatorPhoneNumber = "+27702222222";
      group3Members = ["+27703333333", "+27713333333", "+27723333333", "+27733333333", "+27743333333"];
      group3CreatorPhoneNumber = "+27703333333";
      group4Members = ["+27704444444", "+27744444444", "+27724444444", "+27734444444", "+27744444444"];
      group4CreatorPhoneNumber = "+27704444444";
      group1Area = {
        townOrInstitutionFK: "3",
        areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
        areaNo: "29",
      };
      specificArea1 = 'Res 1';

      group2Area = {
        townOrInstitutionFK: "3",
        areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
        areaNo: "29",
      };
      specificArea2 = 'Res 2';

      group3Area = {
        townOrInstitutionFK: "3",
        areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
        areaNo: "29",
      };
      specificArea3 = 'Res 3';

      group4Area = {
        townOrInstitutionFK: "3",
        areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
        areaNo: "29",
      };
      specificArea4 = 'Res 4';

      groupTownOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "DUT",
        townOrInstitutionNo: "3",
      };

      groupName1 = "Game Changers";
      group1CreatorUsername = "Melo";

      groupName2 = "Cool Dudes";
      group2CreatorUsername = "Zonke";

      groupName3 = "Abashayi Besinqa";
      group3CreatorUsername = "Ayo";

      groupName4 = "Durban Rulers";
      group4CreatorUsername = "Thanda";
      break;
    case 2:// UKZN
      await towerGroups();  // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All   Howard Fake Groups Are Saved.` });
      return
    default:// Sydenham

      await foreman1Groups(); // Marketing Strategy 1-1
      await foreman2Groups(); // Marketing Strategy 1-1

      await burnwoodGroups(); // Marketing Strategy 1-1

      await kennedyGroups();  // Marketing Strategy 1-1

      await palmet1Groups();  // Marketing Strategy 1-1
      await palmet2Groups();  // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All Sydenham Fake Groups Are Saved.` });
      return
  }



  const group1 = {
    groupName: groupName1,
    groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpeg`,
    groupArea: group1Area,
    groupSpecificArea: specificArea1,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group1CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group1CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group1Members,
  };

  const group2 = {
    groupName: groupName2,
    groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpeg`,
    groupArea: group2Area,
    groupSpecificArea: specificArea2,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group2CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group2CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group2Members,
  };

  const group3 = {
    groupName: groupName3,
    groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpeg`,
    groupArea: group3Area,
    groupSpecificArea: specificArea3,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group3CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group3CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group3Members,
  };

  const group4 = {
    groupName: groupName4,
    groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpeg`,
    groupArea: group4Area,
    groupSpecificArea: specificArea4,
    groupTownOrInstitution: groupTownOrInstitution,

    groupCreatorPhoneNumber: group4CreatorPhoneNumber,
    groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
    groupCreatorUsername: group4CreatorUsername,
    isActive: true,
    maxNoOfMembers: 5, // 5

    groupMembers: group4Members,
  };

  let groupReference;
  groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
  await groupReference.set(group1);

  groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
  await groupReference.set(group2);

  groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
  await groupReference.set(group3);

  groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
  await groupReference.set(group4);


  // Send back a message that we"ve successfully written to the db.
  res.json({ result: `All Fake Groups Are Saved.` });
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeDraws
export const createFakeDraws = onRequest(async (req, res) => {
  const drawDateAndTime = new Date();
  const year = drawDateAndTime.getFullYear();
  const month = drawDateAndTime.getMonth() + 1;
  const date = drawDateAndTime.getDate();
  const hour = drawDateAndTime.getHours() + 2;
  const minute = drawDateAndTime.getMinutes() + 1;


  let reference;

  let storeFK;
  let storeName;
  let townOrInstitution;

  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();

  switch (parseInt(req.query.hostIndex)) {
    case 0:
      storeFK = "+27637339962";
      storeName = "Mayville";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Mayville",
        townOrInstitutionNo: "5",
      };
      break;
    case 1:
      storeFK = "+2744127814";
      storeName = "DUT";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "DUT",
        townOrInstitutionNo: "3",
      };
      break;
    case 2:
      storeFK = "+27766915230";
      storeName = "UKZN";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Howard College UKZN",
        townOrInstitutionNo: "4",
      };
      break;
    default:
      storeFK = "+27651482118";
      storeName = "Sydenham";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Sydenham",
        townOrInstitutionNo: "6",
      };
  }


  const storeDrawId =
    `${year}-${month}-${date}@${hour}h${minute}@${storeFK}`;

  const draw = {
    "storeDrawId": storeDrawId,
    "storeFK": storeFK,
    "drawDateAndTime": {
      "year": year,
      "month": month,
      "day": date,
      "hour": hour,
      "minute": minute,
    },
    "numberOfGrandPrices": 5,
    "isOpen": true,
    "storeName": storeName,
    "storeImageURL": `store_owners/stores_images/${storeFK}.jpg`,
    "townOrInstitution": townOrInstitution,
    "joiningFee": 0,
    "storeDrawState": "not-converted-to-competition",
  };

  reference = getFirestore().collection("stores")
    .doc(storeFK).collection("store_draws")
    .doc(storeDrawId);
  await reference.set(draw);


  let grandPrice;
  let extension = '.jpeg';
  for (let priceIndex = 0; priceIndex < draw.numberOfGrandPrices; priceIndex++) {
    reference = getFirestore().collection("stores")
      .doc(storeFK).collection("store_draws")
      .doc(storeDrawId).collection("draw_grand_prices")
      //.doc(`${storeDrawId}-${priceIndex}`);
      .doc(`${priceIndex}`);

    let description;

    // Mayville
    if (parseInt(req.query.hostIndex) == 0) {
      switch (priceIndex) {
        case 0:
          description = "Carling Black Label 12x750ml";
          break;
        case 1:
          description = "Heineken 12x750ml";
          break;
        case 2:
          description = "Corona 12x330ml [Bottles]";
          break;
        case 3:
          description = "Sminnorf 750ml";
          break;
        default:
          description = "Castle Lagar 24x500ml [Cans]";
      }
    }

    // DUT
    else if (parseInt(req.query.hostIndex) == 1) {
      switch (priceIndex) {
        case 0:
          description = "Hunters Dry 24x330ml [Bottles]";
          break;
        case 1:
          description = "Savana Lemon 24x360ml";
          break;
        case 2:
          description = "Extreme 24x330ml";
          break;
        case 3:
          description = "Absolute 750ml";
          break;
        default:
          description = "Stella Artois";
      }
    }

    // Howard
    else if (parseInt(req.query.hostIndex) == 2) {
      switch (priceIndex) {
        case 0:
          description = "Savana Lemon 24x360ml";
          break;
        case 1:
          description = "Heineken 24x330ml [Bottles]";
          break;
        case 2:
          description = "Corona 12x500ml [Cans]";
          break;
        case 3:
          description = "Hunters Gold 24x330ml [Bottles]";
          break;
        default:
          description = "Black Label Vodka 12x750ml [Box]";
      }
    }

    // Sydenham
    else {

      switch (priceIndex) {
        case 0:
          description = "Castle Lagar 24x360ml";
          break;
        case 1:
          description = "Sminnorf 750ml";
          break;
        case 2:
          description = "Absolute 750ml";
          break;
        case 3:
          description = "Carling Black Label 24x330ml";
          break;
        default:
          description = "Savana 24x360ml";
          extension = '.jpg';
      }
    }




    grandPrice = {
      "grandPriceId": reference.id,
      "storeDrawFK": storeDrawId,
      "imageURL": `${storeName.toLowerCase()}/grand_prices_images/${reference.id}${extension}`,
      "description": description,
      "grandPriceIndex": priceIndex,

    };

    await reference.set(grandPrice);
  }
  const storeNameInfoReference = getFirestore().collection("stores_names_info").doc(storeFK);

  storeNameInfoReference.onSnapshot(async (doc) => {
    if (doc.exists) {
      let drawsOrder = doc.data()['drawsOrder'];

      drawsOrder.push(storeDrawId);
      await storeNameInfoReference.update({ drawsOrder: drawsOrder });
      drawsOrder = doc.data()['drawsOrder'];
    }
  });

  await storeNameInfoReference.update({ latestStoreDrawId: storeDrawId });
  // Send back a message that we"ve successfully written to the db.
  res.json({ result: `Fake Draws Saved.` });
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeAlcoholics
export const createFakeAlcoholics = onRequest(async (req, res) => {
  let alcoholic;
  let reference;

  // Mayville
  reference = getFirestore().collection("alcoholics").doc("1abcdefghijk");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "/alcoholics/profile_images/+27712312312.jpg",
    phoneNumber: "+27712312312",
    area: {
      townOrInstitutionFK: "5",
      areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "31",
    },
    username: "Sakhile",
    password: "12abc12",
  };
  await reference.set(alcoholic);

  // DUT
  reference = getFirestore().collection("alcoholics").doc("2abcdefghijk");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "/alcoholics/profile_images/+27712341234.jpg",
    phoneNumber: "+27712341234",
    area: {
      townOrInstitutionFK: "3",
      areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "29",
    },
    username: "Nelly",
    password: "ytc",
  };
  await reference.set(alcoholic);

  // UKZN
  reference = getFirestore().collection("alcoholics").doc("3abcdefghijk");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "/alcoholics/profile_images/+27712345123.jpg",
    phoneNumber: "+27712345123",
    area: {
      townOrInstitutionFK: "4",
      areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "30",
    },
    username: "Mbeje",
    password: "kwl-guys",
  };
  await reference.set(alcoholic);

  // Sydenham
  reference = getFirestore().collection("alcoholics").doc("4abcdefghijk");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "/alcoholics/profile_images/+27712345162.jpg",
    phoneNumber: "+27712345612",
    area: {
      townOrInstitutionFK: "6",
      areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "37",
    },
    username: "Sizwe",
    password: "czwe21",
  };
  await reference.set(alcoholic);


  // Send back a message that we"ve successfully written to the db.
  res.json({ result: `Fake Alcoholics Saved.` });
});

export const writeMessage = onCall(async (data, context) => {
  // Grab the text parameter.
  const original = data.text;
  // Returns the text received
  return `Successfully received: ${original} `;
});

export const listFruit = onCall((data, context) => {
  return ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"];
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/updateFakeGroups
export const updateFakeGroups = onRequest(async (req, res) => {
  batchWriteTester();
  res.json({ result: `group batch updated.` });
});

// ########################################Development Functions [End]#######################################################


