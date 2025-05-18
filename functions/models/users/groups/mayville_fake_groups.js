import { getFirestore } from "firebase-admin/firestore";

class MayvilleFakeGroups {

    constructor() {

    }

    // Images exist on emulator [Real Areas & Fake Members]
    async catoCrestGroups() {

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

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoGreenGroups() {

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

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoPeachGroups() {

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
        const specificArea1 = 'Eringini Ko-Peach';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Russell Mngomezulu ST';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Bothi Dladla Way';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Emaflethini';

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

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoYellowGroups() {

        const host = "mayville";
        const group1Members = ["+27724738493", "+27724738494", "+27724738495", "+27724738496", "+27724738497"];
        const group1CreatorPhoneNumber = "+27724738493";
        const group2Members = ["+27734738493", "+27734738494", "+27734738495", "+27734738496", "+27734738497"];
        const group2CreatorPhoneNumber = "+27734738493";
        const group3Members = ["+27744738493", "+27744738494", "+27744738495", "+27744738496", "+27744738497"];
        const group3CreatorPhoneNumber = "+27744738493";
        const group4Members = ["+27714738493", "+27714738492", "+27718395831", "+27718395830", "+27718395839"];
        const group4CreatorPhoneNumber = "+27714738493";
        const group5Members = ["+27764738493", "+27764738492", "+27764738491", "+27764738490", "+27764738499"];
        const group5CreatorPhoneNumber = "+27764738493";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Embalenhle Road';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Hot Corner Car Wash';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Izwelabasha St';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Embalenhle Road';

        const group5Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea5 = 'Izwelabasha St';

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

        const groupName5 = "Africans";
        const group5CreatorUsername = "James";

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

        const group5 = {
            groupName: groupName4,
            groupImageURL: `/${host}/groups_specific_locations/${group5CreatorPhoneNumber}.jpg`,
            groupArea: group5Area,
            groupSpecificArea: specificArea5,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group5CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group5CreatorPhoneNumber}/profile_images/${group5CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group5CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group5Members,
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

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewEmathininiGroups() {

        const host = "mayville";
        const group1Members = ["+27834857938", "+27834857937", "+27834857936", "+27834857935", "+27834857934"];
        const group1CreatorPhoneNumber = "+27834857938";
        const group2Members = ["+27844857938", "+27844857939", "+27844857930", "+27844857931", "+27844857932"];
        const group2CreatorPhoneNumber = "+27844857938";
        const group3Members = ["+27824857938", "+27824857937", "+27824857936", "+27824857935", "+27824857934"];
        const group3CreatorPhoneNumber = "+27824857938";
        const group4Members = ["+27814857938", "+27814857937", "+27814857936", "+27814857935", "+27814857934"];
        const group4CreatorPhoneNumber = "+27814857938";
        const group5Members = ["+27864857938", "+27864857937", "+27864857936", "+27864857935", "+27864857934"];
        const group5CreatorPhoneNumber = "+27864857938";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Emathinini E-Ringini';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Emathinini Ka-K';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Emathinini E-Passage Lesibili';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Emathinini Ka-A';

        const group5Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea5 = 'Emathinini Empompini';

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

        const groupName5 = "Fellows";
        const group5CreatorUsername = "Zamani";

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

        const group5 = {
            groupName: groupName5,
            groupImageURL: `/${host}/groups_specific_locations/${group5CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea5,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group5CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group5CreatorPhoneNumber}/profile_images/${group5CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group5CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group5Members,
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

        groupReference = getFirestore().collection("groups").doc(group5.groupCreatorPhoneNumber);
        await groupReference.set(group5);
    }

    async masxhaGroups() {
        const host = "mayville";
        const group1Members = ["+27812993395", "+27812993394", "+27812993393", "+27812993392", "+27812993391"];
        const group1CreatorPhoneNumber = "+27812993395";
        const group2Members = ["+27822993395", "+27822993394", "+27822993393", "+27822993392", "+27822993391"];
        const group2CreatorPhoneNumber = "+27822993395";
        const group3Members = ["+27832993395", "+27832993394", "+27832993393", "+27832993392", "+27832993391"];
        const group3CreatorPhoneNumber = "+27832993395";
        const group4Members = ["+27842993395", "+27842993394", "+27842993393", "+27842993392", "+27842993391"];
        const group4CreatorPhoneNumber = "+27842993395";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "34",
        };
        const specificArea1 = 'E-Paki';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "34",
        };
        const specificArea2 = 'E-Groundin';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "34",
        };
        const specificArea3 = '__________';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "34",
        };
        const specificArea4 = '__________';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Ezophawu";
        const group1CreatorUsername = "Zee";

        const groupName2 = "Rich Gang";
        const group2CreatorUsername = "Buke";

        const groupName3 = "Superiors";
        const group3CreatorUsername = "Thobani";

        const groupName4 = "Opelepele";
        const group4CreatorUsername = "Syanda";

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

    async nsimbini1Groups() {

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

    async nsimbini2Groups() {

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

    async nsimbini3Groups() {

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

}

export default MayvilleFakeGroups