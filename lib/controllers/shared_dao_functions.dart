import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dart:io';

import '../models/users/admin.dart';
import '../models/users/alcoholic.dart';
import '../models/users/user.dart' as myUser;
import 'package:get/get.dart';

import 'dart:developer' as debug;

import 'admin_controller.dart';
import 'alcoholic_controller.dart';

bool showProgressBar = false;
final firestore = FirebaseFirestore.instance;
final functions = FirebaseFunctions.instance;
final storage = FirebaseStorage.instance
    .refFromURL("gs://alcoholic-expressions.appspot.com/");
final auth = FirebaseAuth.instance;

Rx<bool> _isLeaderValidated = Rx(true);
bool get isLeaderValidated => _isLeaderValidated.value;

AdminController adminController = AdminController.adminController;
AlcoholicController alcoholicController =
    AlcoholicController.alcoholicController;

void setIsLeaderValidated(bool isLeaderValidated) {
  _isLeaderValidated = Rx(isLeaderValidated);
}

myUser.User? getCurrentlyLoggenInUser() {
  if (adminController.currentlyLoggedInAdmin != null) {
    return adminController.currentlyLoggedInAdmin;
  }

  return alcoholicController.currentlyLoggedInAlcoholic;
}

void logoutUser() {
  if (adminController.currentlyLoggedInAdmin != null) {
    adminController.logoutAdmin();
  }

  if (alcoholicController.currentlyLoggedInAlcoholic != null) {
    alcoholicController.logoutAlcoholic();
  }
}

// Upload an image into a particular firebase storage bucket.
Future<String> uploadResource(File resource, String storagePath,
    {String contentType = "image/jpeg"}) async {
  Reference reference = FirebaseStorage.instance.ref().child(storagePath);

  final metadata = SettableMetadata(contentType: contentType);

  UploadTask uploadTask = reference.putFile(resource, metadata);
  TaskSnapshot taskSnapshot = await uploadTask;

  String downloadURL = await taskSnapshot.ref.getDownloadURL();
  return downloadURL;
}

Future<String> findFullImageURL(String imageURL) async {
  Reference storageReference = FirebaseStorage.instance
      .refFromURL("gs://alcoholic-expressions.appspot.com/");

  return await storageReference.child(imageURL).getDownloadURL();
}

Future<AggregateQuerySnapshot> isCredentialsCorrect(
    String phoneNumber, String password, bool forAdmin) async {
  Query<Map<String, dynamic>> reference;
  if (forAdmin) {
    reference = firestore
        .collection('admins')
        .where("phoneNumber", isEqualTo: phoneNumber)
        .where('password', isEqualTo: password);
  } else {
    reference = firestore
        .collection('alcoholics')
        .where("phoneNumber", isEqualTo: phoneNumber)
        .where('password', isEqualTo: password);
  }

  AggregateQuerySnapshot? result = await reference.count().get();
  return result;
}

bool isLoggedInAdmin() {
  return adminController.currentlyLoggedInAdmin != null;
}

bool containsPlusAndNumbersOnly(String phoneNumber) {
  if (phoneNumber[0] != '+' || phoneNumber[1] != '2' || phoneNumber[2] != '7') {
    return false;
  }
  for (var charIndex = 3; charIndex < phoneNumber.length; charIndex++) {
    if (!(phoneNumber[charIndex] == '0' ||
        phoneNumber[charIndex] == '1' ||
        phoneNumber[charIndex] == '2' ||
        phoneNumber[charIndex] == '3' ||
        phoneNumber[charIndex] == '4' ||
        phoneNumber[charIndex] == '5' ||
        phoneNumber[charIndex] == '6' ||
        phoneNumber[charIndex] == '7' ||
        phoneNumber[charIndex] == '8' ||
        phoneNumber[charIndex] == '9')) {
      return false;
    }
  }
  return true;
}

bool isValidPhoneNumber(String phoneNumber) {
  return phoneNumber.isNotEmpty &&
      phoneNumber.length == 12 &&
      containsPlusAndNumbersOnly(phoneNumber) &&
      (phoneNumber.startsWith('+276') ||
          phoneNumber.startsWith('+277') ||
          phoneNumber.startsWith('+278'));
}
