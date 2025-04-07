// ignore_for_file: prefer_final_fields

import 'dart:io';

import 'package:alco/controllers/share_dao_functions.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import 'dart:developer' as debug;

class PostController extends GetxController {
  static PostController postController = Get.find();

  Rx<DateTime?> _dateCreated = Rx(null);
  DateTime? get dateCreated => _dateCreated.value;

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
  String get whoWereYouWithText => _whereWereYouText.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithImageURL = Rx('');
  String get whoWereYouWithImageURL => _whereWereYouImageURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithImage = Rx(null);
  File? get whoWereYouWithImage => _whereWereYouImage.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithVoiceRecordURL = Rx('');
  String get whoWereYouWithVoiceRecordURL => _whereWereYouVoiceRecordURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithVoiceRecord = Rx(null);
  File? get whoWereYouWithVoiceRecord => _whereWereYouVoiceRecord.value;

  // ignore: unused_field
  Rx<String> _whoWereYouWithVideoURL = Rx('');
  String get whoWereYouWithVideoURL => _whereWereYouVideoURL.value;

  // ignore: unused_field
  Rx<File?> _whoWereYouWithVideo = Rx(null);
  File? get whoWereYouWithVideo => _whereWereYouVideo.value;

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
  File? get whatHappenedVideo => _whereWereYouVideo.value;

  // ======================What happended? [End]======================

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

  void chooseWhereWereYouImageFromGallery() async {
    if (currentlyLoggedInUser == null) {
      Get.snackbar('Error', 'Error Login Required');
    } else {
      debug.log('Pick Where Were You Image From Gallery');
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        _whereWereYouImage = Rx<File?>(File(pickedImageFile.path));
        _whereWereYouImageURL = Rx<String>(await uploadResource(
            _whereWereYouImage.value!,
            '/past_posts/where_were_you/images/${currentlyLoggedInUser!.phoneNumber}'));
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
      }
    }
  }

  void pickWhereWereYouVideo(ImageSource imageSource) async {
    if (currentlyLoggedInUser == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whereWereYouVideo = Rx<File?>(file);
      _whereWereYouVideoURL = Rx<String>(await uploadResource(
          _whereWereYouVideo.value!,
          '/past_posts/where_were_you/videos/${currentlyLoggedInUser!.phoneNumber}'));

      Get.snackbar('Video Status', 'Video File Successfully Picked.');
      update();
    } else {
      Get.snackbar('Error', 'Video Wasn\'t Picked.');
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

  void chooseWhoWereYouWithImageFromGallery() async {
    if (currentlyLoggedInUser == null) {
      Get.snackbar('Error', 'Error Login Required');
    } else {
      debug.log('Pick Who Were You With Image From Gallery');
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        _whoWereYouWithImage = Rx<File?>(File(pickedImageFile.path));
        _whoWereYouWithImageURL = Rx<String>(await uploadResource(
            _whoWereYouWithImage.value!,
            '/past_posts/who_were_you_with/images/${currentlyLoggedInUser!.phoneNumber}'));
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
      }
    }
  }

  void pickWhoWereYouWithVideo(ImageSource imageSource) async {
    if (currentlyLoggedInUser == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whoWereYouWithVideo = Rx<File?>(file);
      _whoWereYouWithVideoURL = Rx<String>(await uploadResource(
          _whereWereYouVideo.value!,
          '/past_posts/who_were_you_with/videos/${currentlyLoggedInUser!.phoneNumber}'));
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

  void pickWhatHappenedVideo(ImageSource imageSource) async {
    if (currentlyLoggedInUser == null) {
      Get.snackbar('Error', 'Error Login Required');
    }

    final pickedVideoFile = await ImagePicker().pickVideo(source: imageSource);

    if (pickedVideoFile != null) {
      File file = File(pickedVideoFile.path);
      _whatHappenedVideo = Rx<File?>(file);
      _whatHappenedVideoURL = Rx<String>(await uploadResource(
          _whereWereYouVideo.value!,
          '/past_posts/what_happened/videos/${currentlyLoggedInUser!.phoneNumber}'));
      Get.snackbar('Video Status', 'Video File Successfully Picked.');
      update();
    } else {
      Get.snackbar('Error', 'Video Wasn\'t Picked.');
    }
  }
  // ======================What happended? [End]======================

  void setDateCreated() {
    _dateCreated = Rx(DateTime.now());
    update();
  }
}
