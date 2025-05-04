import 'dart:io';

import 'package:alco/controllers/shared_dao_functions.dart';
import 'package:alco/models/stores/store_draw_state.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../../models/stores/draw_grand_price.dart';
import '../../models/stores/store_draw.dart';
import '../../models/stores/store_name_info.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import '../../models/stores/store.dart';
import 'dart:developer' as debug;

import '../models/locations/converter.dart';

enum StoreDrawSavingStatus { loginRequired, incomplete, saved, notSaved }

// Branch : store_resources_crud ->  store_resources_crud_data_access
class StoreController extends GetxController {
  final firestore = FirebaseFirestore.instance;

  static StoreController storeController = Get.find();

  late Rx<Store?> _hostingStore = Rx<Store?>(null);
  Store? get hostingStore => _hostingStore.value;

  late Rx<File?> storePickedFile;
  File? get storeImageFile => storePickedFile.value;

  late Rx<int?> _drawDateYear = Rx<int?>(-1);
  int? get drawDateYear => _drawDateYear.value;

  late Rx<int?> _drawDateMonth = Rx<int?>(-1);
  int? get drawDateMonth => _drawDateMonth.value;

  late Rx<int?> _drawDateDay = Rx<int?>(-1);
  int? get drawDateDay => _drawDateDay.value;

  late Rx<int?> _drawDateHour = Rx<int?>(-1);
  int? get drawDateHour => _drawDateHour.value;

  late Rx<int?> _drawDateMinute = Rx<int?>(-1);
  int? get drawDateMinute => _drawDateMinute.value;

  late Rx<File?> _drawGrandPrice1ImageFile;
  File? get drawGrandPrice1ImageFile => _drawGrandPrice1ImageFile.value;
  late Rx<String?> _grandPrice1ImageURL = Rx<String?>('');
  String? get grandPrice1ImageURL => _grandPrice1ImageURL.value;
  late Rx<String?> _description1 = Rx<String?>('');
  String? get description1 => _description1.value;

  late Rx<File?> _drawGrandPrice2ImageFile;
  File? get drawGrandPrice2ImageFile => _drawGrandPrice2ImageFile.value;
  late Rx<String?> _grandPrice2ImageURL = Rx<String?>('');
  String? get grandPrice2ImageURL => _grandPrice2ImageURL.value;
  late Rx<String?> _description2 = Rx<String?>('');
  String? get description2 => _description2.value;

  late Rx<File?> _drawGrandPrice3ImageFile;
  File? get drawGrandPrice3ImageFile => _drawGrandPrice3ImageFile.value;
  late Rx<String?> _grandPrice3ImageURL = Rx<String?>('');
  String? get grandPrice3ImageURL => _grandPrice3ImageURL.value;
  late Rx<String?> _description3 = Rx<String?>('');
  String? get description3 => _description3.value;

  late Rx<File?> _drawGrandPrice4ImageFile;
  File? get drawGrandPrice4ImageFile => _drawGrandPrice4ImageFile.value;
  late Rx<String?> _grandPrice4ImageURL = Rx<String?>('');
  String? get grandPrice4ImageURL => _grandPrice4ImageURL.value;
  late Rx<String?> _description4 = Rx<String?>('');
  String? get description4 => _description4.value;

  late Rx<File?> _drawGrandPrice5ImageFile;
  File? get drawGrandPrice5ImageFile => _drawGrandPrice5ImageFile.value;
  late Rx<String?> _grandPrice5ImageURL = Rx<String?>('');
  String? get grandPrice5ImageURL => _grandPrice5ImageURL.value;
  late Rx<String?> _description5 = Rx<String?>('');
  String? get description5 => _description5.value;

  late Rx<String?> _adminCode = Rx<String?>(null);
  String? get adminCode => _adminCode.value;

  void cleanForStoreDraw() {
    _drawDateYear = Rx<int?>(-1);
    _drawDateMonth = Rx<int?>(-1);
    _drawDateDay = Rx<int?>(-1);
    _drawDateHour = Rx<int?>(-1);
    _drawDateMinute = Rx<int?>(-1);

    _drawGrandPrice1ImageFile = Rx(null);
    _grandPrice1ImageURL = Rx<String?>('');
    _description1 = Rx<String?>('');

    _drawGrandPrice2ImageFile = Rx(null);
    _grandPrice2ImageURL = Rx<String?>('');
    _description2 = Rx<String?>('');

    _drawGrandPrice3ImageFile = Rx(null);
    _grandPrice3ImageURL = Rx<String?>('');
    _description3 = Rx<String?>('');

    _drawGrandPrice4ImageFile = Rx(null);
    _grandPrice4ImageURL = Rx<String?>('');
    _description4 = Rx<String?>('');

    _drawGrandPrice5ImageFile = Rx(null);
    _grandPrice5ImageURL = Rx<String?>('');
    _description5 = Rx<String?>('');

    update();
  }

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  void chooseStoreImageFromGallery() async {
    final storePickedImageFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);

    if (storePickedImageFile != null) {
      //Get.snackbar('Image Status', 'Image File Successfully Picked.');

    }

    // Share the chosen image file on Getx State Management.
    storePickedFile = Rx<File?>(File(storePickedImageFile!.path));
  }

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  void captureStoreImageWithCamera() async {
    final storePickedImageFile =
        await ImagePicker().pickImage(source: ImageSource.camera);

    if (storePickedImageFile != null) {
      Get.snackbar('Image Status', 'Image File Successfully Captured.');
    }

    // Share the chosen image file on Getx State Management.
    storePickedFile = Rx<File?>(File(storePickedImageFile!.path));
  }

  /*===========================Stores [Start]============================= */

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  Future<Store?> findStore(String storeId) async {
    DocumentReference reference =
        FirebaseFirestore.instance.collection('stores').doc(storeId);

    DocumentSnapshot snapshot = await reference.get();

    if (snapshot.exists) {
      return Store.fromJson(snapshot.data()!);
    }

    return null;
  }

  Future<void> initiateHostingStore(String storeOwnerPhoneNumber) async {
    DocumentReference storeReference =
        firestore.collection('stores').doc(storeOwnerPhoneNumber);

    DocumentSnapshot snapshot = await storeReference.get();

    if (snapshot.exists) {
      _hostingStore = Rx<Store?>(Store.fromJson(snapshot.data()!));
    }
  }

/*===========================Stores [End]============================= */

/*======================Store Name Info [Start]======================== */
  // Branch : store_resources_crud ->  store_resources_crud_data_access
  Stream<DocumentSnapshot> retrieveStoreNameInfo(String storeNameInfoId) {
    return FirebaseFirestore.instance
        .collection("stores_names_info")
        .doc(storeNameInfoId)
        .snapshots();
  }

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  Future<StoreNameInfo?> findStoreNameInfo(String storeNameInfoId) async {
    DocumentReference reference = FirebaseFirestore.instance
        .collection("stores_names_info")
        .doc(storeNameInfoId);

    reference.snapshots().map((referenceDoc) {
      return StoreNameInfo.fromJson(referenceDoc.data());
    });

    return null;
  }

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  Stream<List<StoreNameInfo>> readAllStoreNameInfo() {
    Stream<List<StoreNameInfo>> stream = FirebaseFirestore.instance
        .collection('stores_names_info')
        .snapshots()
        .map((snapshot) {
      List<StoreNameInfo> list = snapshot.docs.map((doc) {
        StoreNameInfo info = StoreNameInfo.fromJson(doc.data());
        return info;
      }).toList();
      list.shuffle();
      return list;
    });

    return stream;
  }

  // Branch : store_resources_crud ->  store_resources_crud_data_access
  void updateDrawsOrder(String storeNameInfoId) async {
    DocumentReference storeNameInfoReference =
        firestore.collection("stores_names_info").doc(storeNameInfoId);

    storeNameInfoReference.get().then((storeNameInfoDoc) async {
      StoreNameInfo info = StoreNameInfo.fromJson(storeNameInfoDoc.data());
      debug.log('Before Deletion Size ${info.drawsOrder!.length}');
      info.drawsOrder!.removeAt(0);
      await storeNameInfoReference.update({'drawsOrder': info.drawsOrder!});
      debug.log('After Deletion Size ${info.drawsOrder!.length}');
      debug.log('updated draws order list...');
    });
  }

  /*======================Store Name Info [End]======================== */

  /*=========================Store Draws [Start]========================= */

  String trimmedImageURL(int index) {
    int start;
    switch (index) {
      case 0:
        start = _grandPrice1ImageURL.value!.indexOf('/o') + 2;
        debug.log(_grandPrice1ImageURL.value!);

        return start != -1
            ? _grandPrice1ImageURL.value!
                .substring(start, _grandPrice1ImageURL.value!.indexOf('?'))
                .replaceAll('%2F', '/')
                .replaceAll('%40', '@')
                .replaceAll('%3A', ':')
            : _grandPrice1ImageURL.value!;
      case 1:
        start = _grandPrice2ImageURL.value!.indexOf('/o') + 2;

        return start != -1
            ? _grandPrice2ImageURL.value!
                .substring(start, _grandPrice2ImageURL.value!.indexOf('?'))
                .replaceAll('%2F', '/')
                .replaceAll('%40', '@')
                .replaceAll('%3A', ':')
            : _grandPrice2ImageURL.value!;
      case 2:
        start = _grandPrice3ImageURL.value!.indexOf('/o') + 2;

        return start != -1
            ? _grandPrice3ImageURL.value!
                .substring(start, _grandPrice3ImageURL.value!.indexOf('?'))
                .replaceAll('%2F', '/')
                .replaceAll('%40', '@')
                .replaceAll('%3A', ':')
            : _grandPrice3ImageURL.value!;
      case 3:
        start = _grandPrice4ImageURL.value!.indexOf('/o') + 2;

        return start != -1
            ? _grandPrice4ImageURL.value!
                .substring(start, _grandPrice4ImageURL.value!.indexOf('?'))
                .replaceAll('%2F', '/')
                .replaceAll('%40', '@')
                .replaceAll('%3A', ':')
            : _grandPrice4ImageURL.value!;
      default:
        start = _grandPrice5ImageURL.value!.indexOf('/o') + 2;

        return start != -1
            ? _grandPrice5ImageURL.value!
                .substring(start, _grandPrice5ImageURL.value!.indexOf('?'))
                .replaceAll('%2F', '/')
                .replaceAll('%40', '@')
                .replaceAll('%3A', ':')
            : _grandPrice5ImageURL.value!;
    }
  }

  // Branch : competition_resources_crud ->  competitions_data_access
  Stream<List<StoreDraw>> findStoreDraws(String storeFK) {
    return FirebaseFirestore.instance
        .collection('stores')
        .doc(storeFK)
        .collection('store_draws')
        .orderBy('drawDateAndTime.year', descending: false)
        .orderBy('drawDateAndTime.month', descending: false)
        .orderBy('drawDateAndTime.day', descending: false)
        .orderBy('drawDateAndTime.hour', descending: false)
        .orderBy('drawDateAndTime.minute', descending: false)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => StoreDraw.fromJson(doc.data()))
            .toList());
  }

  // Branch : competition_resources_crud ->  competitions_data_access
  Stream<DocumentSnapshot<Object?>> retrieveStoreDraw(
      String storeFK, String storeDrawId) {
    DocumentReference reference = FirebaseFirestore.instance
        .collection('stores')
        .doc(storeFK)
        .collection('store_draws')
        .doc(storeDrawId);

    return reference.snapshots();
  }

  Stream<List<StoreDraw>> retrieveStoreDraws(String storeFK) {
    final query = firestore
        .collectionGroup('store_draws')
        .where('storeFK', isEqualTo: storeFK)
        .snapshots();

    return query.map(((storeDrawsSnapshot) {
      List<StoreDraw> storeDraws = storeDrawsSnapshot.docs.map((storeDrawDoc) {
        return StoreDraw.fromJson(storeDrawDoc.data());
      }).toList();
      storeDraws.sort();
      return storeDraws;
    }));
  }

  // Update - reference.update({'key': 'new value'} or {'param.key': 'new value'})
  // Remove A Field - update({'key': FieldValue.delete())
  void updateIsOpen(String storeFK, String storeDrawId, bool isOpen) {
    FirebaseFirestore.instance
        .collection('stores')
        .doc(storeFK)
        .collection('store_draws')
        .doc(storeDrawId)
        .update({'Is Open': isOpen});
  }

  void updateJoiningFee(String storeFK, String storeDrawId, double joiningFee) {
    if (joiningFee > 0) {
      FirebaseFirestore.instance
          .collection('stores')
          .doc(storeFK)
          .collection('store_draws')
          .doc(storeDrawId)
          .update({'Is Open': joiningFee});
    }
  }

  void setDescription(int grandPriceIndex, String description) {
    switch (grandPriceIndex) {
      case 0:
        _description1 = Rx<String?>(description);
        break;
      case 1:
        _description2 = Rx<String?>(description);
        break;
      case 2:
        _description3 = Rx<String?>(description);
        break;
      case 3:
        _description4 = Rx<String?>(description);
        break;
      default:
        _description5 = Rx<String?>(description);
    }
  }

  void chooseGrandPriceImageFromGallery(int grandPriceIndex) async {
    if (_hostingStore.value == null) {
      Get.snackbar('Error', 'Host Not Chosen.');
      return;
    }
    int year = _drawDateYear.value!,
        month = _drawDateMonth.value!,
        day = _drawDateDay.value!,
        hour = _drawDateHour.value!,
        minute = _drawDateMinute.value!;
    final pickedImageFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedImageFile != null) {
      String grandPriceId = '$day-$month-$year@$hour:$minute-$grandPriceIndex';
      String host = _hostingStore.value!.storeName.toLowerCase();
      switch (grandPriceIndex) {
        case 0:
          _drawGrandPrice1ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice1ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice1ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));

          break;
        case 1:
          _drawGrandPrice2ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice2ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice2ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        case 2:
          _drawGrandPrice3ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice3ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice3ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        case 3:
          _drawGrandPrice4ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice4ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice4ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        default:
          _drawGrandPrice5ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice5ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice5ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
      }
      Get.snackbar('Image Status', 'Image File Successfully Chosen.');
      update();
    }
  }

  void captureGrandPriceImageFromCamera(
    int grandPriceIndex,
  ) async {
    if (_hostingStore.value == null) {
      Get.snackbar('Error', 'Host Not Chosen.');
      return;
    }

    int year = _drawDateYear.value!,
        month = _drawDateMonth.value!,
        day = _drawDateDay.value!,
        hour = _drawDateHour.value!,
        minute = _drawDateMinute.value!;
    final pickedImageFile =
        await ImagePicker().pickImage(source: ImageSource.camera);
    if (pickedImageFile != null) {
      String grandPriceId = '$day-$month-$year@$hour:$minute-$grandPriceIndex';
      String host = _hostingStore.value!.storeName.toLowerCase();
      switch (grandPriceIndex) {
        case 0:
          _drawGrandPrice1ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice1ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice1ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        case 1:
          _drawGrandPrice2ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice2ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice2ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        case 2:
          _drawGrandPrice3ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice3ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice3ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        case 3:
          _drawGrandPrice4ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice4ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice4ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
          break;
        default:
          _drawGrandPrice5ImageFile = Rx<File?>(File(pickedImageFile.path));
          _grandPrice5ImageURL = Rx<String?>(await uploadResource(
              _drawGrandPrice5ImageFile.value!,
              '$host/grand_prices_images/$grandPriceId'));
      }
      Get.snackbar('Image Status', 'Image File Successfully Captured.');
      update();
    }
  }

  bool hasAcceptableAdminCredentials() {
    return _adminCode.value != null &&
        (_adminCode.value!.compareTo('QAZwsxedc321@DUT') == 0 ||
            _adminCode.value!.compareTo('QAZwsxedc321@UKZN') == 0 ||
            _adminCode.value!.compareTo('QAZwsxedc321@CC') == 0 ||
            _adminCode.value!.compareTo('QAZwsxedc321@SYD') == 0);
  }

  void setAdminCode(String adminCode) {
    if (adminCode.contains('QAZwsxedc321@DUT') &&
        'QAZwsxedc321@DUT'.contains(adminCode)) {
      initiateHostingStore('+2744127814');
    } else if (adminCode.contains('QAZwsxedc321@CC') &&
        'QAZwsxedc321@CC'.contains(adminCode)) {
      initiateHostingStore('+27637339962');
    } else if (adminCode.contains('QAZwsxedc321@UKZN') &&
        'QAZwsxedc321@UKZN'.contains(adminCode)) {
      initiateHostingStore('+27766915230');
    } else if (adminCode.contains('QAZwsxedc321@SYD') &&
        'QAZwsxedc321@SYD'.contains(adminCode)) {
      initiateHostingStore('+27651482118');
    } else if (adminCode.isEmpty) {
      Get.snackbar('Warning', 'Hosting Store Not Initialized.');
    } else {
      Get.snackbar('Error', 'Incorrect Admin Code.');
    }

    _adminCode = Rx<String?>(adminCode);
    update();
  }

  bool hasDate() {
    return _drawDateYear.value! >= 2025 &&
        _drawDateMonth.value! > 0 &&
        _drawDateDay.value! > 0;
  }

  bool hasTime() {
    return _drawDateHour.value! >= 0 && _drawDateMinute.value! >= 0;
  }

  bool hasGrandPrice(int memberIndex) {
    switch (memberIndex) {
      case 1:
        return _drawGrandPrice1ImageFile.value != null &&
            _grandPrice1ImageURL.value != null &&
            _description1.value != null;
      case 2:
        return _drawGrandPrice2ImageFile.value != null &&
            _grandPrice2ImageURL.value != null &&
            _description2.value != null;
      case 3:
        return _drawGrandPrice3ImageFile.value != null &&
            _grandPrice3ImageURL.value != null &&
            _description3.value != null;
      case 4:
        return _drawGrandPrice4ImageFile.value != null &&
            _grandPrice4ImageURL.value != null &&
            _description4.value != null;
      default:
        return _drawGrandPrice5ImageFile.value != null &&
            _grandPrice5ImageURL.value != null &&
            _description5.value != null;
    }
  }

  void setDate(int year, int month, int day) {
    _drawDateYear = Rx<int?>(year);
    _drawDateMonth = Rx<int?>(month);
    _drawDateDay = Rx<int?>(day);
    update();
  }

  void setTime(int hour, int minute) {
    _drawDateHour = Rx<int?>(hour);
    _drawDateMinute = Rx<int?>(minute);
    update();
  }

  Future<StoreDrawSavingStatus> createStoreDraw() async {
    if (_adminCode.value!.compareTo('QAZwsxedc321@DUT') != 0 &&
        _adminCode.value!.compareTo('QAZwsxedc321@CC') != 0 &&
        _adminCode.value!.compareTo('QAZwsxedc321@SYD') != 0 &&
        _adminCode.value!.compareTo('QAZwsxedc321@UKZN') != 0) {
      return StoreDrawSavingStatus.loginRequired;
    } else if (!hasDate()) {
      Get.snackbar('Error', 'Date Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasTime()) {
      Get.snackbar('Error', 'Time Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasGrandPrice(1)) {
      Get.snackbar('Error', 'First Price Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasGrandPrice(2)) {
      Get.snackbar('Error', 'Second Price Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasGrandPrice(3)) {
      Get.snackbar('Error', 'Third Price Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasGrandPrice(4)) {
      Get.snackbar('Error', 'Forth Price Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    if (!hasGrandPrice(5)) {
      Get.snackbar('Error', 'Fifth Price Info Missing.');
      return StoreDrawSavingStatus.incomplete;
    }

    String storeDrawId =
        '${_drawDateYear.value}-${_drawDateMonth.value}-${_drawDateDay.value}@${_drawDateHour.value}h${_drawDateMinute.value}@${hostingStore!.storeOwnerPhoneNumber}';
    DocumentReference reference = firestore
        .collection('stores')
        .doc(hostingStore!.storeOwnerPhoneNumber)
        .collection('store_draws')
        .doc(storeDrawId);

    StoreDraw storeDraw = StoreDraw(
        storeDrawId: reference.id,
        storeFK: storeController.hostingStore!.storeOwnerPhoneNumber,
        drawDateAndTime: DateTime(
            storeController.drawDateYear!,
            storeController.drawDateMonth!,
            storeController.drawDateDay!,
            storeController.drawDateHour!,
            storeController.drawDateMinute!),
        numberOfGrandPrices: 5,
        storeName: storeController.hostingStore!.storeName,
        storeImageURL: storeController.hostingStore!.storeImageURL,
        townOrInstitution: Converter.toSupportedTownOrInstitution(
            storeController.hostingStore!.sectionName));

    await reference.set(storeDraw.toJson());

    await _saveDrawGrandPrice(storeDraw.storeDrawId!, 0);
    await _saveDrawGrandPrice(storeDraw.storeDrawId!, 1);
    await _saveDrawGrandPrice(storeDraw.storeDrawId!, 2);
    await _saveDrawGrandPrice(storeDraw.storeDrawId!, 3);
    await _saveDrawGrandPrice(storeDraw.storeDrawId!, 4);

    DocumentReference storeNameInfoReference =
        firestore.collection("/stores_names_info/").doc(storeDraw.storeFK);

    storeNameInfoReference.get().then((storeNameInfoDoc) async {
      StoreNameInfo info = StoreNameInfo.fromJson(storeNameInfoDoc.data());
      info.drawsOrder!.add(storeDrawId);
      await storeNameInfoReference.update({'drawsOrder': info.drawsOrder!});
      debug.log('added to draws order list...');
    });

    await storeNameInfoReference
        .update({'latestStoreDrawId': storeDraw.storeDrawId});

    return StoreDrawSavingStatus.saved;
  }

  /*===========================Store Draws [End]====================== */

  /*======================Draw Grand Price[Start]===================== */

  Future<void> _saveDrawGrandPrice(
      String storeDrawFK, int grandPriceIndex) async {
    late String imageURL;
    late String description;

    switch (grandPriceIndex) {
      case 0:
        imageURL = trimmedImageURL(0);
        description = _description1.value!;
        break;
      case 1:
        imageURL = trimmedImageURL(1);
        description = _description2.value!;
        break;
      case 2:
        imageURL = trimmedImageURL(2);
        description = _description3.value!;
        break;
      case 3:
        imageURL = trimmedImageURL(3);
        description = _description4.value!;
        break;
      default:
        imageURL = trimmedImageURL(4);
        description = _description5.value!;
    }

    DocumentReference reference = firestore
        .collection('stores')
        .doc(hostingStore!.storeOwnerPhoneNumber)
        .collection('store_draws')
        .doc(storeDrawFK)
        .collection('draw_grand_prices')
        .doc('$storeDrawFK-$grandPriceIndex');

    DrawGrandPrice drawGrandPrice = DrawGrandPrice(
        grandPriceId: reference.id,
        storeDrawFK: storeDrawFK,
        imageURL: imageURL,
        description: description,
        grandPriceIndex: grandPriceIndex);

    await reference.set(drawGrandPrice.toJson());
  }

  // Branch : competition_resources_crud ->  competitions_data_access
  Stream<List<DrawGrandPrice>> findDrawGrandPrices(
          String storeId, String storeDrawId) =>
      FirebaseFirestore.instance
          .collection('stores')
          .doc(storeId)
          .collection('store_draws')
          .doc(storeDrawId)
          .collection('draw_grand_prices')
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => DrawGrandPrice.fromJson(doc.data()))
              .toList());

  /*======================Draw Grand Price[End]============================ */
}
