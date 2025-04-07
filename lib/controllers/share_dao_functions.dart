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

bool showProgressBar = false;
final firestore = FirebaseFirestore.instance;
final functions = FirebaseFunctions.instance;
final storage = FirebaseStorage.instance
    .refFromURL("gs://alcoholic-expressions.appspot.com/");
final auth = FirebaseAuth.instance;

// ignore: prefer_final_fields
Rx<myUser.User?> _currentlyLoggedInUser = Rx(// null
    Admin(
        userId: 'msBfpzfdJDyfQkRfyspgosIbUSSN',
        phoneNumber: '+27611111111',
        password: 'qwerty321',
        profileImageURL: 'admins/profile_images/+27611111111.png',
        isFemale: false,
        isSuperiorAdmin: true,
        key: "000"));
myUser.User? get currentlyLoggedInUser => _currentlyLoggedInUser.value;

// Upload an image into a particular firebase storage bucket.
Future<String> uploadResource(File resource, String storagePath) async {
  Reference reference = FirebaseStorage.instance.ref().child(storagePath);

  final metadata = SettableMetadata(contentType: "image/jpeg");

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

void loginUser(String phoneNumber, bool forAdmin) {
  CollectionReference reference;
  if (forAdmin) {
    reference = firestore.collection('admins');

    reference.snapshots().map((adminsSnapshot) {
      adminsSnapshot.docs.map((adminDoc) {
        if (adminDoc.exists) {
          Map<String, dynamic>? map = adminDoc.data() as Map<String, dynamic>?;
          bool result = map!['phoneNumber'].toString().contains(phoneNumber) &&
              phoneNumber.contains(map['phoneNumber'].toString());
          if (result) {
            Admin admin = Admin.fromJson(map);
            _currentlyLoggedInUser = Rx(admin);
          }
        }
      });
    });
  } else {
    reference = firestore.collection('alcoholics');

    reference.snapshots().map((alcoholicsSnapshot) {
      alcoholicsSnapshot.docs.map((alcoholicDoc) {
        if (alcoholicDoc.exists) {
          Map<String, dynamic>? map =
              alcoholicDoc.data() as Map<String, dynamic>?;
          bool result = map!['phoneNumber'].toString().contains(phoneNumber) &&
              phoneNumber.contains(map['phoneNumber'].toString());
          if (result) {
            Alcoholic alcoholic = Alcoholic.fromJson(map);
            _currentlyLoggedInUser = Rx(alcoholic);
          }
        }
      });
    });
  }
}

void loginUserUsingObject(myUser.User user) {
  _currentlyLoggedInUser = Rx(user);
  auth.authStateChanges();
}

void logoutUser() {
  _currentlyLoggedInUser = Rx(null);
  auth.signOut();
}

bool isLoggedInAdmin() {
  if (_currentlyLoggedInUser.value != null) {
    return _currentlyLoggedInUser.value is Admin;
  }
  return false;
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
  debug.log(phoneNumber);
  return phoneNumber.isNotEmpty &&
      phoneNumber.length == 12 &&
      containsPlusAndNumbersOnly(phoneNumber) &&
      (phoneNumber.startsWith('+276') ||
          phoneNumber.startsWith('+277') ||
          phoneNumber.startsWith('+278'));
}
