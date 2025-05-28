import 'dart:math';

import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';

import '../../controllers/admin_controller.dart';
import '../../controllers/location_controller.dart';
import '../../main.dart';
import '../../models/locations/converter.dart';
import '../../models/locations/supported_town_or_institution.dart';
import '../../models/users/admin.dart';
import 'package:flutter/material.dart';
import 'dart:developer' as debug;

import '../utils/globals.dart';

class AdminsWidget extends StatelessWidget {
  AdminController adminController = AdminController.adminController;
  Reference storageReference = FirebaseStorage.instance
      .refFromURL("gs://alcoholic-expressions.appspot.com/");

  late Stream<List<SupportedTownOrInstitution>>
      supportedTownOrInstitutionStream =
      locationController.readAllSupportedTownsOrSuburbsOrInstitutions();
  late List<String> items;
  LocationController locationController = LocationController.locationController;
  late DropdownButton2<String> dropDowButton;
  late List<Reference> groupMembersImageReferences;

  AdminsWidget({Key? key}) : super(key: key);

  Future<String> findProfileImageURL(String imageURL) async {
    return await storageReference.child(imageURL).getDownloadURL();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApplication.scaffoldColor,
      body: GetBuilder<AdminController>(builder: (_) {
        return StreamBuilder<List<Admin>>(
          stream: adminController.readAdmins(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Admin> admins = snapshot.data!;
              return Column(
                children: [
                  Expanded(child: adminMembers()),
                ],
              );
            } else if (snapshot.hasError) {
              getSnapbar('Error', snapshot.error.toString());
              debug.log("Error Fetching admin Data - ${snapshot.error}");
              return getCircularProgressBar();
            } else {
              return getCircularProgressBar();
            }
          },
        );
      }),
    );
  }

  Widget singleUser(String profileImageURL, String phoneNumber) {
    return Expanded(
      child: FutureBuilder(
          future: findProfileImageURL(profileImageURL),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return SizedBox(
                height: 150,
                width: 150,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      height: 110,
                      width: 110,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        image: DecorationImage(
                            image: NetworkImage(snapshot.data! as String),
                            fit: BoxFit.contain),
                      ),
                    ),
                    Text(
                      phoneNumber,
                      style: TextStyle(
                          color: MyApplication.storesTextColor,
                          fontSize: 16,
                          fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              );
            } else if (snapshot.hasError) {
              getSnapbar('Error', snapshot.error.toString());
              debug
                  .log("Error Fetching Profile Image Data - ${snapshot.error}");
              return getCircularProgressBar();
            } else {
              debug.log(
                  "Error Fetching Admin Profile Image Data - ${snapshot.error}");
              return getCircularProgressBar();
            }
          }),
    );
  }

  Widget createAdmin(BuildContext context, int memberIndex) {
    return FutureBuilder(
        future: groupMembersImageReferences[memberIndex].getDownloadURL(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Padding(
              padding: const EdgeInsets.only(top: 5, right: 5, bottom: 5),
              child: Container(
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.lightBlue,
                ),
                child: CircleAvatar(
                  radius: MediaQuery.of(context).size.width / 8,
                  backgroundImage: NetworkImage(snapshot.data as String),
                ),
              ),
            );
          } else if (snapshot.hasError) {
            debug.log("Error Fetching Data - ${snapshot.error}");
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        });
  }

  Widget createAdmins(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 15),
      child: GridView.builder(
          itemCount: groupMembersImageReferences.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisSpacing: 10, crossAxisCount: 3),
          itemBuilder: (context, index) {
            return createAdmin(context, index);
          }),
    );
  }

  Future<ListResult> findGroupMembersImageURLs() async {
    return storageReference.child('admins/profile_images').listAll();
  }

  Widget adminMembers() {
    return FutureBuilder(
        future: findGroupMembersImageURLs(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            ListResult allDownloadURLs = snapshot.data! as ListResult;

            groupMembersImageReferences = allDownloadURLs.items;

            return createAdmins(context);
          } else if (snapshot.hasError) {
            debug.log("Error Fetching Data - ${snapshot.error}");
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        });
  }
}
