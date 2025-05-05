class HowardFakeGroups {

    constructor() {

    }

    async towerGroups() {

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

}

export default HowardFakeGroups