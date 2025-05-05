class DUTFakeGroups {
    constructor() {

    }

    async dut1Groups() {
        const host = "dut";
        const group1Members = ["+27701111111", "+27711111111", "+27721111111", "+27731111111", "+27741111111"];
        const group1CreatorPhoneNumber = "+27701111111";
        const group2Members = ["+27702222222", "+27712222222", "+27722222222", "+27732222222", "+27742222222"];
        const group2CreatorPhoneNumber = "+27702222222";
        const group3Members = ["+27703333333", "+27713333333", "+27723333333", "+27733333333", "+27743333333"];
        const group3CreatorPhoneNumber = "+27703333333";
        const group4Members = ["+27704444444", "+27744444444", "+27724444444", "+27734444444", "+27744444444"];
        const group4CreatorPhoneNumber = "+27704444444";
        const group1Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea1 = 'Res 1';

        const group2Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea2 = 'Res 2';

        const group3Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea3 = 'Res 3';

        const group4Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea4 = 'Res 4';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "DUT",
            townOrInstitutionNo: "3",
        };

        const groupName1 = "Game Changers";
        const group1CreatorUsername = "Melo";

        const groupName2 = "Cool Dudes";
        const group2CreatorUsername = "Zonke";

        const groupName3 = "Abashayi Besinqa";
        const group3CreatorUsername = "Ayo";

        const groupName4 = "Durban Rulers";
        const group4CreatorUsername = "Thanda";

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
}

export default DUTFakeGroups