class SydenhamFakeGroups {

    constructor() {

    }

    // Ekhontena KaNkosi, Emashaweni, Emastebhinini, Emathuneni
    async foreman1Groups() {
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
    async foreman2Groups() {
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
    async burnwoodGroups() {
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

    async kennedyGroups() {
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

    async palmetGroups() {
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
        const specificArea1 = 'Emarikana KaLeft';

        const group2Area = {
            townOrInstitutionFK: "6",
            areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "40",
        };
        const specificArea2 = 'KaL';

        const group3Area = {
            townOrInstitutionFK: "6",
            areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "40",
        };
        const specificArea3 = 'Phesheya';

        const group4Area = {
            townOrInstitutionFK: "6",
            areaName: "Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "40",
        };
        const specificArea4 = 'Zone 1';

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
}

export default SydenhamFakeGroups