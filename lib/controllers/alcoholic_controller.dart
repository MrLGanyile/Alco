import 'dart:io';
import 'dart:developer' as debug;

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../models/locations/converter.dart';
import '../models/locations/section_name.dart';
import '../models/locations/supported_area.dart';
import '../models/users/alcoholic.dart';
import 'shared_dao_functions.dart';

enum AlcoholicSavingStatus {
  incompleteData,
  adminAlreadyExist,
  loginRequired,
  unathourized,
  saved,
}

class AlcoholicController extends GetxController {
  static AlcoholicController alcoholicController = Get.find();

  final firestore = FirebaseFirestore.instance;
  final functions = FirebaseFunctions.instance;
  final storage = FirebaseStorage.instance
      .refFromURL("gs://alcoholic-expressions.appspot.com/");

  // ignore: prefer_final_fields
  Rx<Alcoholic?> _currentlyLoggedInAlcoholic = Rx(//null
      Alcoholic(
          userId: 'xHylOxUqu7JZJLTaLsqzmK0pNSX0',
          phoneNumber: '+27612345678',
          profileImageURL:
              'mayville/alcoholics/profile_images/+27612345678.jpg',
          area: SupportedArea.fromJson({
            "townOrInstitutionFK": "5",
            "areaName":
                "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            "areaNo": "31",
          }),
          username: 'Sakhile',
          password: "12abc12"));
  Alcoholic? get currentlyLoggedInAlcoholic =>
      _currentlyLoggedInAlcoholic.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicPhoneNumber = Rx('');
  String? get newAlcoholicPhoneNumber => _newAlcoholicPhoneNumber.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicUsername = Rx('');
  String? get newAlcoholicUsername => _newAlcoholicUsername.value;

  // ignore: prefer_final_fields
  late Rx<SupportedArea> _newAlcoholicArea = Rx(Converter.toSupportedArea(
      SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica));
  SupportedArea get newAlcoholicArea => _newAlcoholicArea.value;

  late Rx<File?> _newAlcoholicProfileImageFile;
  File? get newAlcoholicProfileImageFile => _newAlcoholicProfileImageFile.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicImageURL = Rx('');
  String? get newAlcoholicImageURL => _newAlcoholicImageURL.value;

  // ignore: prefer_final_fields
  late Rx<String> _newAlcoholicPassword = Rx('');
  String get newAlcoholicPassword => _newAlcoholicPassword.value;

  Rx<SectionName?> locateableSectionName =
      Rx<SectionName>(SectionName.dutDurbanKwaZuluNatalSouthAfrica);
  SectionName? get searchedSectionName => locateableSectionName.value;

  void setNewAlcoholicPassword(String password) {
    _newAlcoholicPassword = Rx(password);
  }

  void loginAlcoholic(String uid) async {
    DocumentReference reference = firestore.collection('alcoholics').doc(uid);

    reference.get().then((alcoholicDoc) {
      if (alcoholicDoc.exists) {
        Alcoholic alcoholic = Alcoholic.fromJson(alcoholicDoc.data());
        _currentlyLoggedInAlcoholic = Rx(alcoholic);
        auth.authStateChanges();
        debug.log('${alcoholicDoc.id}[${alcoholic.phoneNumber}] has logged in');
      }
    });
  }

  void loginUserUsingObject(Alcoholic alcoholic) {
    _currentlyLoggedInAlcoholic = Rx(alcoholic);
    auth.authStateChanges();
  }

  void logoutAlcoholic() {
    if (_currentlyLoggedInAlcoholic.value != null) {
      _currentlyLoggedInAlcoholic = Rx(null);
      auth.signOut();
    }
  }

  void captureAlcoholicProfileImageWithCamera(
      String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Capturing An Image.');
      debug.log('Phone Number Is Required Before Capturing An Image.');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Capturing An Image.');
      debug.log('Username Is Required Before Capturing An Image.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        _newAlcoholicProfileImageFile = Rx<File?>(File(pickedImageFile.path));
        _newAlcoholicImageURL = Rx<String?>(await uploadResource(
            _newAlcoholicProfileImageFile.value!,
            '/alcoholics/profile_images/$phoneNumber'));
        _newAlcoholicPhoneNumber = Rx<String?>(phoneNumber);
        _newAlcoholicUsername = Rx<String?>(username);
        debug.log('Image File Successfully Captured.');
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
        debug.log('Image Wasn\'t Captured');
      }
    }
  }

  void chooseAlcoholicProfileImageFromGallery(
      String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Capturing An Image.');
      debug.log('Phone Number Is Required Before Capturing An Image');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Capturing An Image.');
      debug.log('Username Is Required Before Capturing An Image');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        _newAlcoholicProfileImageFile = Rx<File?>(File(pickedImageFile.path));
        _newAlcoholicImageURL = Rx<String?>(await uploadResource(
            _newAlcoholicProfileImageFile.value!,
            '/alcoholics/profile_images/$phoneNumber'));
        _newAlcoholicPhoneNumber = Rx<String?>(phoneNumber);
        _newAlcoholicUsername = Rx<String?>(username);
        debug.log('Image File Successfully Captured');
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
        debug.log('Image Wasn\'t Captured');
      }
    }
  }

  String trimmedImageURL() {
    return _newAlcoholicImageURL.value!
        .substring(_newAlcoholicImageURL.value!.indexOf('/alcoholics'),
            _newAlcoholicImageURL.value!.indexOf('?'))
        .replaceAll('%2F', '/');
  }

  Stream<List<Alcoholic>> readAlcoholics() {
    Stream<List<Alcoholic>> stream;
    if (locateableSectionName.value == null) {
      stream = firestore
          .collection('alcoholics')
          .snapshots()
          .map((snapshot) => snapshot.docs.map((doc) {
                Alcoholic alcoholic = Alcoholic.fromJson(doc.data());
                return alcoholic;
              }).toList());
    } else {
      stream = firestore
          .collection('alcoholics')
          .where('sectionName',
              isEqualTo: Converter.asString(locateableSectionName.value!))
          .snapshots()
          .map((snapshot) => snapshot.docs.map((doc) {
                Alcoholic alcoholic = Alcoholic.fromJson(doc.data());
                return alcoholic;
              }).toList());
    }

    return stream;
  }

  void setNewAlcoholicArea(String chosenSectionName) {
    _newAlcoholicArea = Rx<SupportedArea>(
        Converter.toSupportedArea(Converter.toSectionName(chosenSectionName)));
    update();
  }

  void setSearchedSectionName(String chosenSectionName) {
    locateableSectionName =
        Rx<SectionName?>(Converter.toSectionName(chosenSectionName));
    update();
  }

  Future<AlcoholicSavingStatus> saveAlcoholic(String uid) async {
    if (newAlcoholicProfileImageFile != null &&
        _newAlcoholicImageURL.value != null &&
        _newAlcoholicPhoneNumber.value != null &&
        _newAlcoholicUsername.value != null) {
      try {
        DocumentReference reference =
            firestore.collection('alcoholics').doc(uid);

        Alcoholic alcoholic = Alcoholic(
            userId: reference.id,
            password: _newAlcoholicPassword.value,
            phoneNumber: _newAlcoholicPhoneNumber.value,
            profileImageURL: trimmedImageURL(),
            username: _newAlcoholicUsername.value!,
            area: _newAlcoholicArea.value);

        await firestore
            .collection('alcoholics')
            .doc(alcoholic.userId!)
            .set(alcoholic.toJson());
        loginUserUsingObject(alcoholic);
        showProgressBar = false;
        return AlcoholicSavingStatus.saved;
      } catch (error) {
        Get.snackbar("Saving Error", "Alcoholic Couldn'\t Be Saved.");
        debug.log(error.toString());
        showProgressBar = false;
        return AlcoholicSavingStatus.unathourized;
      }
    } else {
      return AlcoholicSavingStatus.incompleteData;
    }
  }
}
