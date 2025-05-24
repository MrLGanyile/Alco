// ignore_for_file: prefer_final_fields

import 'dart:io';

import 'package:alco/controllers/shared_dao_functions.dart';
import 'package:alco/models/locations/converter.dart';
import 'package:alco/models/posts/past_post.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import 'dart:developer' as debug;

import '../models/users/admin.dart';
import '../models/users/alcoholic.dart';
import '../models/users/user.dart';
import 'admin_controller.dart';
import 'alcoholic_controller.dart';

enum PastPostStatus { loginRequired, answerAtleastOneQuestion, postSaved }

class PostController extends GetxController {
  static PostController postController = Get.find();
  AdminController adminController = AdminController.adminController;
  AlcoholicController alcoholicController =
      AlcoholicController.alcoholicController;

  Rx<DateTime?> _dateCreated = Rx(null);
  DateTime? get dateCreated => _dateCreated.value;

  Rx<DocumentReference?> _postReference = Rx(null);
  DocumentReference? get postReference => _postReference.value;

  // ======================Where Were You? [Start]======================
  Rx<String> _whereWereYouText = Rx('');
  String get whereWereYouText => _whereWereYouText.value;

  Rx<String> _whereWereYouImageURL = Rx('');
  String get whereWereYouImageURL => _whereWereYouImageURL.value;

  Rx<File?> _whereWereYouImage = Rx(null);
  File? get whereWereYouImage => _whereWereYouImage.value;

  Rx<String> _whereWereYouVoiceRecordURL = Rx('');
  String get whereWereYouVoiceRecordURL => _whereWereYouVoiceRecordURL.value;

  Rx<File?> _whereWereYouVoiceRecord = Rx(null);
  File? get whereWereYouVoiceRecord => _whereWereYouVoiceRecord.value;

  Rx<String> _whereWereYouVideoURL = Rx('');
  String get whereWereYouVideoURL => _whereWereYouVideoURL.value;

  Rx<File?> _whereWereYouVideo = Rx(null);
  File? get whereWereYouVideo => _whereWereYouVideo.value;

  // ======================Where Were You? [End]======================

  // ======================Who Were You With? [Start]======================
  // ignore: unused_field
  Rx<String> _whoWereYouWithText = Rx('');
  String get whoWereYouWithText => _whoWereYouWithText.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithImageURL = Rx('');
  String get whoWereYouWithImageURL => _whoWereYouWithImageURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithImage = Rx(null);
  File? get whoWereYouWithImage => _whoWereYouWithImage.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithVoiceRecordURL = Rx('');
  String get whoWereYouWithVoiceRecordURL =>
      _whoWereYouWithVoiceRecordURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithVoiceRecord = Rx(null);
  File? get whoWereYouWithVoiceRecord => _whoWereYouWithVoiceRecord.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithVideoURL = Rx('');
  String get whoWereYouWithVideoURL => _whoWereYouWithVideoURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithVideo = Rx(null);
  File? get whoWereYouWithVideo => _whoWereYouWithVideo.value;

  // ======================Who Were You With? [End]======================

  // ======================What happended? [Start]======================

  // ignore: unused_field
  Rx<String> _whatHappenedText = Rx('');
  String get whatHappenedText => _whatHappenedText.value;

  // ignore: unused_field
  Rx<String> _whatHappenedVoiceRecordURL = Rx('');
  String get whatHappenedVoiceRecordURL => _whatHappenedVoiceRecordURL.value;

  // ignore: unused_field
  Rx<File?> _whatHappenedVoiceRecord = Rx(null);
  File? get whatHappenedVoiceRecord => _whatHappenedVoiceRecord.value;

  // ignore: unused_field
  Rx<String> _whatHappenedVideoURL = Rx('');
  String get whatHappenedVideoURL => _whatHappenedVideoURL.value;

  // ignore: unused_field
  Rx<File?> _whatHappenedVideo = Rx(null);
  File? get whatHappenedVideo => _whatHappenedVideo.value;

  // ======================What happended? [End]======================

  String trimmedURL(untrimmedURL) {
    if (!untrimmedURL.contains('/o/') && !untrimmedURL.contains('?')) {
      debug.log('do not contain /o/ and ?');
      return "";
    }

    return untrimmedURL
        .substring(untrimmedURL.indexOf('/o/') + 2, untrimmedURL.indexOf('?'))
        .replaceAll('%2F', '/')
        .replaceAll('%2B', '+');
  }

  void setWhereWereYouText(String whereWereYouText) {
    _whereWereYouText = Rx(whereWereYouText);
    update();
  }

  void clearForWhereWereYouText() {
    _whereWereYouImage = Rx(null);
    _whereWereYouImageURL = Rx('');
    _whereWereYouVoiceRecord = Rx(null);
    _whereWereYouVoiceRecordURL = Rx('');
    _whereWereYouVideo = Rx(null);
    _whereWereYouVideoURL = Rx('');
    update();
  }

  void clearForWhereWereYouImage() {
    _whereWereYouText = Rx('');
    _whereWereYouVoiceRecord = Rx(null);
    _whereWereYouVoiceRecordURL = Rx('');
    _whereWereYouVideo = Rx(null);
    _whereWereYouVideoURL = Rx('');
    update();
  }

  void clearForWhereWereYouVoiceRecord() {
    _whereWereYouText = Rx('');
    _whereWereYouImage = Rx(null);
    _whereWereYouImageURL = Rx('');
    _whereWereYouVideo = Rx(null);
    _whereWereYouVideoURL = Rx('');
    update();
  }

  void clearForWhereWereYouVideo() {
    _whereWereYouText = Rx('');
    _whereWereYouImage = Rx(null);
    _whereWereYouImageURL = Rx('');
    _whereWereYouVoiceRecord = Rx(null);
    _whereWereYouVoiceRecordURL = Rx('');
    update();
  }

  void captureWhereWereYouImage() async {
    User? user = getCurrentlyLoggenInUser();
    if (user == null) {
      Get.snackbar('Error', 'Error Login Required');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        _whereWereYouImage = Rx<File?>(File(pickedImageFile.path));

        String host;
        if (user is Admin) {
          debug.log('logged in user is as an admin');
          Admin admin = user;
          host = Converter.townOrInstitutionAsString(admin.townOrInstitution)
              .toLowerCase();
        } else {
          debug.log('logged in user is as an alcoholic');
          Alcoholic alcoholic = user as Alcoholic;
          host = Converter.townOrInstitutionAsString(
                  Converter.toSupportedTownOrInstitution(
                          alcoholic.area.sectionName)
                      .townOrInstitutionName)
              .toLowerCase();
        }

        if (host.contains('howard college ukzn') &&
            'howard college ukzn'.contains(host)) {
          host = 'ukzn'; // Supposed to be ukzn-howard
        } else if (host.contains('mangosuthu (mut)') &&
            'mangosuthu (mut)'.contains(host)) {
          host = 'mut';
        }

        postController.setPostReference();

        _whereWereYouImageURL = Rx<String>(await uploadResource(
            _whereWereYouImage.value!,
            '$host/past_posts/where_were_you/images/${_postReference.value!.id}'));

        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
      }
    }
  }

  void captureWhereWereYouVideo(ImageSource imageSource) async {
    User? user = getCurrentlyLoggenInUser();
    if (user == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whereWereYouVideo = Rx<File?>(file);

      String host;
      if (user is Admin) {
        Admin admin = user;
        host = Converter.townOrInstitutionAsString(admin.townOrInstitution)
            .toLowerCase();
      } else {
        Alcoholic alcoholic = user as Alcoholic;
        host = Converter.townOrInstitutionAsString(
                Converter.toSupportedTownOrInstitution(
                        alcoholic.area.sectionName)
                    .townOrInstitutionName)
            .toLowerCase();
      }

      if (host.contains('howard college ukzn') &&
          'howard college ukzn'.contains(host)) {
        host = 'ukzn'; // Supposed to be ukzn-howard
      } else if (host.contains('mangosuthu (mut)') &&
          'mangosuthu (mut)'.contains(host)) {
        host = 'mut';
      }

      postController.setPostReference();
      _whereWereYouVideoURL = Rx<String>(await uploadResource(
          _whereWereYouVideo.value!,
          '$host/past_posts/where_were_you/videos/${_postReference.value!.id}'));
      debug.log('Video File Successfully Captured');
      Get.snackbar('Video Status', 'Video File Successfully Captured.');
      update();
    } else {
      Get.snackbar('Error', 'Video Wasn\'t Captured.');
    }
  }

  // ======================Where Were You? [End]======================

  // ======================Who Were You With? [Start]======================

  void setWhoWereYouWithText(String whoWereYouWithText) {
    _whoWereYouWithText = Rx(whoWereYouWithText);
    update();
  }

  void clearForWhoWereYouWithText() {
    _whoWereYouWithImage = Rx(null);
    _whoWereYouWithImageURL = Rx('');
    _whoWereYouWithVoiceRecord = Rx(null);
    _whoWereYouWithVoiceRecordURL = Rx('');
    _whoWereYouWithVideo = Rx(null);
    _whoWereYouWithVideoURL = Rx('');
    update();
  }

  void clearForWhoWereYouWithImage() {
    _whoWereYouWithText = Rx('');
    _whoWereYouWithVoiceRecord = Rx(null);
    _whoWereYouWithVoiceRecordURL = Rx('');
    _whoWereYouWithVideo = Rx(null);
    _whoWereYouWithVideoURL = Rx('');
    update();
  }

  void clearForWhoWereYouWithVoiceRecord() {
    _whoWereYouWithText = Rx('');
    _whoWereYouWithImage = Rx(null);
    _whoWereYouWithImageURL = Rx('');
    _whoWereYouWithVideo = Rx(null);
    _whoWereYouWithVideoURL = Rx('');
    update();
  }

  void clearForWhoWereYouWithVideo() {
    _whoWereYouWithText = Rx('');
    _whoWereYouWithImage = Rx(null);
    _whoWereYouWithImageURL = Rx('');
    _whoWereYouWithVoiceRecord = Rx(null);
    _whoWereYouWithVoiceRecordURL = Rx('');
    update();
  }

  void captureWhoWereYouWithImage() async {
    User? user = getCurrentlyLoggenInUser();
    if (user == null) {
      Get.snackbar('Error', 'Error Login Required');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        _whoWereYouWithImage = Rx<File?>(File(pickedImageFile.path));
        String host;
        if (user is Admin) {
          Admin admin = user;
          host = Converter.townOrInstitutionAsString(admin.townOrInstitution)
              .toLowerCase();
        } else {
          Alcoholic alcoholic = user as Alcoholic;
          host = Converter.townOrInstitutionAsString(
                  Converter.toSupportedTownOrInstitution(
                          alcoholic.area.sectionName)
                      .townOrInstitutionName)
              .toLowerCase();
        }

        if (host.contains('howard college ukzn') &&
            'howard college ukzn'.contains(host)) {
          host = 'ukzn'; // Supposed to be ukzn-howard
        } else if (host.contains('mangosuthu (mut)') &&
            'mangosuthu (mut)'.contains(host)) {
          host = 'mut';
        }

        setPostReference();
        _whoWereYouWithImageURL = Rx<String>(await uploadResource(
            _whoWereYouWithImage.value!,
            '$host/past_posts/who_were_you_with/images/${_postReference.value!.id}'));

        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
      }
    }
  }

  void captureWhoWereYouWithVideo(ImageSource imageSource) async {
    User? user = getCurrentlyLoggenInUser();
    if (user == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whoWereYouWithVideo = Rx<File?>(file);
      String host;
      if (user is Admin) {
        Admin admin = user;
        host = Converter.townOrInstitutionAsString(admin.townOrInstitution)
            .toLowerCase();
      } else {
        Alcoholic alcoholic = user as Alcoholic;
        host = Converter.townOrInstitutionAsString(
                Converter.toSupportedTownOrInstitution(
                        alcoholic.area.sectionName)
                    .townOrInstitutionName)
            .toLowerCase();
      }

      if (host.contains('howard college ukzn') &&
          'howard college ukzn'.contains(host)) {
        host = 'ukzn'; // Supposed to be ukzn-howard
      } else if (host.contains('mangosuthu (mut)') &&
          'mangosuthu (mut)'.contains(host)) {
        host = 'mut';
      }

      postController.setPostReference();
      _whoWereYouWithVideoURL = Rx<String>(await uploadResource(
          _whoWereYouWithVideo.value!,
          '$host/past_posts/who_were_you_with/videos/${_postReference.value!.id}'));

      Get.snackbar('Video Status', 'Video File Successfully Picked.');
      update();
    } else {
      Get.snackbar('Error', 'Video Wasn\'t Picked.');
    }
  }

  // ======================Who Were You With? [End]======================

  // ======================What happended? [Start]======================

  void setWhatHappedText(String whatHappenedText) {
    _whatHappenedText = Rx(whatHappenedText);
    update();
  }

  void clearForWhatHappenedText() {
    _whatHappenedVoiceRecord = Rx(null);
    _whatHappenedVoiceRecordURL = Rx('');
    _whatHappenedVideo = Rx(null);
    _whatHappenedVideoURL = Rx('');
    update();
  }

  void clearForWhatHappenedVoiceRecord() {
    _whatHappenedText = Rx('');
    _whatHappenedVideo = Rx(null);
    _whatHappenedVideoURL = Rx('');
    update();
  }

  void clearForWhatHappenedVideo() {
    _whatHappenedText = Rx('');
    _whatHappenedVoiceRecord = Rx(null);
    _whatHappenedVoiceRecordURL = Rx('');
    update();
  }

  void captureWhatHappenedVideo(ImageSource imageSource) async {
    User? user = getCurrentlyLoggenInUser();
    if (user == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whatHappenedVideo = Rx<File?>(file);
      String host;
      if (user is Admin) {
        Admin admin = user;
        host = Converter.townOrInstitutionAsString(admin.townOrInstitution)
            .toLowerCase();
      } else {
        Alcoholic alcoholic = user as Alcoholic;
        host = Converter.townOrInstitutionAsString(
                Converter.toSupportedTownOrInstitution(
                        alcoholic.area.sectionName)
                    .townOrInstitutionName)
            .toLowerCase();
      }

      if (host.contains('howard college ukzn') &&
          'howard college ukzn'.contains(host)) {
        host = 'ukzn'; // Supposed to be ukzn-howard
      } else if (host.contains('mangosuthu (mut)') &&
          'mangosuthu (mut)'.contains(host)) {
        host = 'mut';
      }

      postController.setPostReference();
      _whatHappenedVideoURL = Rx<String>(await uploadResource(
          _whatHappenedVideo.value!,
          '$host/past_posts/what_happened/videos/${_postReference.value!.id}'));

      Get.snackbar('Video Status', 'Video File Successfully Captured.');
      update();
    } else {
      Get.snackbar('Error', 'Video Wasn\'t Captured.');
    }
  }
  // ======================What happended? [End]======================

  void clear() {
    _whereWereYouText = Rx('');
    _whoWereYouWithText = Rx('');
    _whatHappenedText = Rx('');

    _whereWereYouImageURL = Rx('');
    _whoWereYouWithImageURL = Rx('');

    _whereWereYouImage = Rx(null);
    _whoWereYouWithImage = Rx(null);

    _whereWereYouVoiceRecordURL = Rx('');
    _whoWereYouWithVoiceRecordURL = Rx('');
    _whatHappenedVoiceRecordURL = Rx('');

    _whereWereYouVoiceRecord = Rx(null);
    _whoWereYouWithVoiceRecord = Rx(null);
    _whatHappenedVoiceRecord = Rx(null);

    _whereWereYouVideoURL = Rx('');
    _whoWereYouWithVideoURL = Rx('');
    _whatHappenedVideoURL = Rx('');

    _whereWereYouVideo = Rx(null);
    _whoWereYouWithVideo = Rx(null);
    _whatHappenedVideo = Rx(null);
  }

  void setDateCreated() {
    _dateCreated = Rx(DateTime.now());
    update();
  }

  void setPostReference() {
    if (_postReference.value == null) {
      _postReference = Rx(firestore.collection('past_posts').doc());
    }
  }

  void clearPostReference() {
    if (_postReference.value != null) {
      _postReference = Rx(null);
    }
  }

  bool hasAnsweredQuestions() {
    // No text shared.
    if (whereWereYouText.isNotEmpty ||
        whoWereYouWithText.isNotEmpty ||
        whatHappenedText.isNotEmpty) {
      return true;
    }

    // No image shared.
    if (whereWereYouImageURL.isNotEmpty || whoWereYouWithImageURL.isNotEmpty) {
      return true;
    }

    // No voice record shared.
    if (whereWereYouVoiceRecordURL.isNotEmpty ||
        whoWereYouWithVoiceRecordURL.isNotEmpty ||
        whatHappenedVoiceRecordURL.isNotEmpty) {
      return true;
    }

    // No video shared.
    if (whereWereYouVideoURL.isNotEmpty ||
        whoWereYouWithVideoURL.isNotEmpty ||
        _whatHappenedVideoURL.isNotEmpty) {
      return true;
    }

    return false;
  }

  Future<PastPostStatus> savePastPost() async {
    User? user = getCurrentlyLoggenInUser();

    if (user == null || user is Admin) {
      Get.snackbar('Error', 'Login Required.');
      return PastPostStatus.loginRequired;
    } else if (!hasAnsweredQuestions()) {
      Get.snackbar('Error', 'Answerd Atleast One Question.');
      return PastPostStatus.answerAtleastOneQuestion;
    } else {
      PastPost pastPost = PastPost(
        postId: _postReference.value!.id,
        postCreator: user as Alcoholic,
        whereWereYouText: whereWereYouText,
        whereWereYouImageURL: trimmedURL(whereWereYouImageURL),
        whereWereYouVoiceRecordURL: trimmedURL(whereWereYouVoiceRecordURL),
        whereWereYouVideoURL: trimmedURL(whereWereYouVideoURL),
        whoWereYouWithText: whoWereYouWithText,
        whoWereYouWithImageURL: trimmedURL(whoWereYouWithImageURL),
        whoWereYouWithVoiceRecordURL: trimmedURL(whoWereYouWithVoiceRecordURL),
        whoWereYouWithVideoURL: trimmedURL(whoWereYouWithVideoURL),
        whatHappenedText: whatHappenedText,
        whatHappenedVoiceRecordURL: trimmedURL(whatHappenedVoiceRecordURL),
        whatHappenedVideoURL: trimmedURL(whatHappenedVideoURL),
      );

      await _postReference.value!.set(pastPost.toJson());
      clearPostReference();
      clear();
      return PastPostStatus.postSaved;
    }
  }
}
