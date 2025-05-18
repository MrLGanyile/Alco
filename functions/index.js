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
const superiorAdminId = "5DRhqbH3NYtwpgMNnG4zTVhz7lpp";
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

import MayvilleFakeGroups from "./models/users/groups/mayville_fake_groups.js";
import SydenhamFakeGroups from "./models/users/groups/sydenham_fake_groups.js";
import HowardFakeGroups from "./models/users/groups/howard_fake_groups.js";
import DUTFakeGroups from "./models/users/groups/dut_fake_groups.js";
import DurbanCentralFakeGroups from "./models/users/groups/durban_central_fake_groups.js";

const mayvilleFakeGroups = new MayvilleFakeGroups();
const sydenhamFakeGroups = new SydenhamFakeGroups();
const howardFakeGroups = new HowardFakeGroups();
const dutFakeGroups = new DUTFakeGroups();
const durbanCentralFakeGroups = new DurbanCentralFakeGroups();


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
    storeOwnerPhoneNumber: "+27744127814", // Abo
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
    sectionName: "Sydenham Height-Sydenham-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Sparks (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  store = {
    storeOwnerPhoneNumber: "+27661813561",
    storeName: "Durban Central",
    storeImageURL: "store_owners/stores_images/+27661813561.jpg",// Nkuxa 2
    sectionName: "Glenwood-Durban Central-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Devenport (Mobile)",
  };

  storeReference = getFirestore().collection("stores")
    .doc(store.storeOwnerPhoneNumber);

  await storeReference.set(store);

  store = {
    storeOwnerPhoneNumber: "+27782578628",
    storeName: "Durban Central",
    storeImageURL: "store_owners/stores_images/+27782578628.jpg",// Dle
    sectionName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
    storeArea: "Berea Center (Mobile)",
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
        )

        // Can Be A Bit Tricky If You Think About It.
        // As a result competitions shouldn't start at o'clock.
        // Find competitions starting in the next minute.
        .where("drawDateAndTime.minute",
          "<=", justNow.getMinutes() + 1,
        )
        .where("drawDateAndTime.minute",
          ">=", justNow.getMinutes(),
        )
        .onSnapshot(async (storeDrawsSnapshot) => {
          log(`* Number Of Draws ${storeDrawsSnapshot.size}`);
          if (storeDrawsSnapshot.size > 0) {
            storeDrawsSnapshot.forEach(async (storeDrawDoc) => {

              const townOrInstitution = storeDrawDoc.data()["townOrInstitution"];

              /* Only initiate the conversion step if there are
              groups belonging in a section which is the same
              as the store draw's.*/
              getFirestore().collection("groups")
                .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                .onSnapshot(async (groupsSnapshot) => {
                  log(`* NO OF GROUPS ${groupsSnapshot.size}`);
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
                      grandPriceToWinIndex:
                        storeDrawDoc.data()["grandPriceToWinIndex"],
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
                      grandPriceToWinIndex: storeDraw.grandPriceToWinIndex,
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
      const grandPriceToWinIndex = event.data.data()["grandPriceToWinIndex"];

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
            // grandPricesOrder.push(Math.floor(Math.random() * numberOfGrandPrices));
            if (grandPriceToWinIndex != -1) {
              grandPricesOrder.push(grandPriceToWinIndex);
            }
            else {
              grandPricesOrder.push(Math.floor(Math.random() * numberOfGrandPrices));
            }


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
        )

        // Can Be A Bit Tricky If You Think About It.
        // As a result competitions shouldn't start at o'clock.
        // Find competitions starting in the next minute.
        .where("drawDateAndTime.minute",
          "<=", justNow.getMinutes() + 1,
        )
        .where("drawDateAndTime.minute",
          ">=", justNow.getMinutes(),
        )
        .onSnapshot(async (storeDrawsSnapshot) => {

          if (storeDrawsSnapshot.size > 0) {
            log(`# No of draws ${storeDrawsSnapshot.size}`);

            storeDrawsSnapshot.docs.map(async (storeDrawDoc) => {
              const batch = getFirestore().batch();
              const townOrInstitution = storeDrawDoc.data()["townOrInstitution"];

              /* Only initiate the conversion step if there are
              groups belonging in a section which is the same
              as the store draw's.*/
              getFirestore().collection("groups")
                .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                .onSnapshot(async (groupsSnapshot) => {
                  // log(`# No of groups ${groupsSnapshot.size}`);
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
                      grandPriceToWinIndex:
                        storeDrawDoc.data()["grandPriceToWinIndex"],
                      townOrInstitution: townOrInstitution,
                    };

                    const reference = getFirestore()
                      .collection("competitions")
                      // .doc();
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
                      grandPriceToWinIndex: storeDraw.grandPriceToWinIndex,
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

      const countDownId = `${year}-${month}-${day}@${hour}h${minute}`;

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



// Marketing Strategy 1-1 : Use Specific Area Residence To Find Contributors.
// Marketing Strategy 1-2 : Use Kids Gift To Find Contributors.
// Marketing Strategy 1-2 : Approach Stores
// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeGroups
export const createFakeGroups = onRequest(async (req, res) => {

  switch (parseInt(req.query.hostIndex)) {
    case 0:// Mayville

      await mayvilleFakeGroups.catoCrestGroups();  // Marketing Strategy 1-2
      // await mayvilleFakeGroups.richviewKoPeachGroups(); // Marketing Strategy 1-1
      // await mayvilleFakeGroups.richviewKoYellowGroups(); // Marketing Strategy 1-1
      // await mayvilleFakeGroups.richviewKoGreenGroups();  // Marketing Strategy 1-1
      // await mayvilleFakeGroups.richviewEmathininiGroups(); // Marketing Strategy 1-1

      // await mayvilleFakeGroups.nsimbini1Groups();  // Marketing Strategy 1-1
      // await mayvilleFakeGroups.nsimbini2Groups();  // Marketing Strategy 1-1
      // await mayvilleFakeGroups.nsimbini3Groups();  // Marketing Strategy 1-1

      // await mayvilleFakeGroups.masxhaGroups();  // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All Mayville Fake Groups Are Saved.` });
      break;
    case 1:// DUT

      await dutFakeGroups.dutBereaGroups(); // Marketing Strategy 1-1
      // await dutFakeGroups.dutSydenhamGroups(); // Marketing Strategy 1-1
      // await dutFakeGroups.dutMixedGroups(); // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All DUT Fake Groups Are Saved.` });
      break;
    case 2:// UKZN
      await howardFakeGroups.onCompusGroups();  // Marketing Strategy 1-1

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All   Howard Fake Groups Are Saved.` });
      break;
    case 3:// Sydenham

      await sydenhamFakeGroups.foreman1Groups(); // Marketing Strategy 1-1
      // await sydenhamFakeGroups.foreman2Groups(); // Marketing Strategy 1-1

      // await sydenhamFakeGroups.burnwoodGroups(); // Marketing Strategy 1-1
      // await sydenhamFakeGroups.kennedyGroups();  // Marketing Strategy 1-1
      // await sydenhamFakeGroups.palmetGroups();  // Marketing Strategy 1-1

      /// await sydenhamFakeGroups.sydenhamHeightGroups(); // Marketing Strategy 1-1
      // await sydenhamFakeGroups.threeRandGroups(); // Marketing Strategy 1-1
      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All Sydenham Fake Groups Are Saved.` });
      break;
    default:
      await durbanCentralFakeGroups.durbanCentralGroups();  // Marketing Strategy 2

      // Send back a message that we"ve successfully written to the db.
      res.json({ result: `All Durban Central Fake Groups Are Saved.` });
  }
});

// http://127.0.0.1:5001/alcoholic-expressions/us-central1/createFakeDraws
export const createFakeDraws = onRequest(async (req, res) => {
  const drawDateAndTime = new Date();
  const year = drawDateAndTime.getFullYear();
  const month = drawDateAndTime.getMonth() + 1;
  const date = drawDateAndTime.getDate();
  const hour = drawDateAndTime.getHours() + 2;
  const minute = drawDateAndTime.getMinutes() + 3;


  let reference;

  let storeFK;
  let storeName;
  let townOrInstitution;

  // Start listing users from the beginning, 1000 at a time.
  // listAllUsers();

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
      storeFK = "+27744127814";
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
    case 3:
      storeFK = "+27651482118";
      storeName = "Sydenham";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Sydenham",
        townOrInstitutionNo: "6",
      };
    case 4:
      storeFK = "+27661813561";
      storeName = "Durban Central";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Durban Central",
        townOrInstitutionNo: "7",
      };
    default:
      storeFK = "+27782578628";
      storeName = "Durban Central";
      townOrInstitution = {
        cityFK: "1",
        townOrInstitutionName: "Durban Central",
        townOrInstitutionNo: "7",
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

    "grandPriceToWinIndex": -1,
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
      // .doc(`${storeDrawId}-${priceIndex}`);
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
    else if (parseInt(req.query.hostIndex) == 3) {

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

    // Dubran Central [Glenwood]
    else if (parseInt(req.query.hostIndex) == 4) {
      switch (priceIndex) {
        case 0:
          description = "Hunters Gold 24x330ml [Bottles]";
          break;
        case 1:
          description = "Absolute 750ml";
          break;
        case 2:
          description = "Extreme 24x330ml";
          break;
        case 3:
          description = "Absolute 750ml";
          break;
        default:
          description = "Carling Black Label 24x330ml";
      }
    }

    // Durban Central [Berea]
    else {
      switch (priceIndex) {
        case 0:
          description = "Savana Lemon 24x360ml";
          break;
        case 1:
          description = "Black Label Vodka 12x750ml [Box]";
          break;
        case 2:
          description = "Savana 24x360ml";
          break;
        case 3:
          description = "Hunters Gold 24x330ml [Bottles]";
          break;
        default:
          description = "Black Label Vodka 12x750ml [Box]";
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


  storeNameInfoReference.get().then(async (doc) => {
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
  reference = getFirestore().collection("alcoholics").doc("xHylOxUqu7JZJLTaLsqzmK0pNSX0");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "mayville/alcoholics/profile_images/+27612345678.jpg",
    phoneNumber: "+27612345678",
    area: {
      townOrInstitutionFK: "5",
      areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "31",
    },
    username: "Sakhile",
    password: "12abc12",
  };
  await reference.set(alcoholic);


  // UKZN
  reference = getFirestore().collection("alcoholics").doc("KmtOMzr1UQ5HERElRWRQmxXRhAlw");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "ukzn/alcoholics/profile_images/+27623456789.jpg",
    phoneNumber: "+27623456789",
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
  reference = getFirestore().collection("alcoholics").doc("v6bHYeYwgYh2uoP45gtHzpreoHgj");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "sydenham/alcoholics/profile_images/+27634567890.jpg",
    phoneNumber: "+27634567890",
    area: {
      townOrInstitutionFK: "6",
      areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "37",
    },
    username: "Sizwe",
    password: "czwe21",
  };
  await reference.set(alcoholic);

  // Durban Central
  reference = getFirestore().collection("alcoholics").doc("mFXUtMuBumC3oJ0SfMfqpsYpMz0m");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "durban central/alcoholics/profile_images/+27645678901.jpg",
    phoneNumber: "+27645678901",
    area: {
      townOrInstitutionFK: "7",
      areaName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "44",
    },
    username: "Thando",
    password: "cii0",
  };
  await reference.set(alcoholic);

  // DUT
  reference = getFirestore().collection("alcoholics").doc("FjfBwPidh4pg6jHHjEAXcEIR6f9e");
  alcoholic = {
    userId: reference.id,
    profileImageURL: "dut/alcoholics/profile_images/+27656789012.jpg",
    phoneNumber: "+27656789012",
    area: {
      townOrInstitutionFK: "3",
      areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
      areaNo: "29",
    },
    username: "Nelly",
    password: "ytc",
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


