import 'dart:io';
import 'dart:developer' as debug;

import 'package:alco/models/locations/supported_area.dart';
import 'package:alco/models/locations/supported_town_or_institution.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../models/locations/converter.dart';
import '../models/locations/section_name.dart';
import '../models/users/group.dart';
import 'share_dao_functions.dart';

enum GroupSavingStatus {
  incorrectData,
  incompleteData,
  loginRequired,
  alreadyCreatedGroup,
  saved,
}

enum GroupUpdatingStatus {
  loginRequired,
  destinationGroupFilled,
  groupDeletionRequired,
  unathourized,
  updated,
}

// Some Unit Test Strucutures Exist.
// Branch : group_resources_crud ->  group_crud_data_access
class GroupController extends GetxController {
  FirebaseFirestore firestore;
  FirebaseFunctions functions;
  Reference storage;
  FirebaseAuth auth;

  GroupController({
    required this.firestore,
    required this.functions,
    required this.storage,
    required this.auth,
  });

  static GroupController instance = Get.find();

  Rx<bool> _hasPickedGroupArea = Rx<bool>(false);
  bool get hasPickedGroupArea => _hasPickedGroupArea.value;

  void setHasPickedGroupArea(bool hasPickedGroupArea) {
    _hasPickedGroupArea = Rx<bool>(hasPickedGroupArea);
  }

  late Rx<File?> _groupImageFile;
  File? get groupImageFile => _groupImageFile.value;
  late Rx<String?> _groupImageURL = Rx('');
  String? get groupImageURL => _groupImageURL.value;
  late Rx<String?> _groupName = Rx('');
  String? get groupName => _groupName.value;

  late Rx<SupportedArea> _groupArea = Rx(Converter.toSupportedArea(
      SectionName.foremanSydenhamDurbanKwaZuluNatalSouthAfrica));

  SupportedArea get groupSupportedArea => _groupArea.value;

  late Rx<bool> _isActive; // A group is active if it has atleast 10 members.
  bool get isActive => _isActive.value;
  Rx<int> _maxNoOfMembers = Rx(5);
  int get maxNoOfMembers => _maxNoOfMembers.value;

  late Rx<File?> _member1ProfileImageFile;
  File? get member1ProfileImageFile => _member1ProfileImageFile.value;
  late Rx<String?> _member1ImageURL = Rx('');
  String? get member1ImageURL => _member1ImageURL.value;
  late Rx<String?> _member1PhoneNumber = Rx('');
  String? get member1PhoneNumber => _member1PhoneNumber.value;
  late Rx<String?> _member1Username = Rx('');
  String? get member1Username => _member1Username.value;

  late Rx<File?> _member2ProfileImageFile;
  File? get member2ProfileImageFile => _member2ProfileImageFile.value;
  late Rx<String?> _member2ImageURL = Rx('');
  String? get member2ImageURL => _member2ImageURL.value;
  late Rx<String?> _member2PhoneNumber = Rx('');
  String? get member2PhoneNumber => _member2PhoneNumber.value;
  late Rx<String?> _member2Username = Rx('');
  String? get member2Username => _member2Username.value;

  late Rx<File?> _member3ProfileImageFile;
  File? get member3ProfileImageFile => _member3ProfileImageFile.value;
  late Rx<String?> _member3ImageURL = Rx('');
  String? get member3ImageURL => _member3ImageURL.value;
  late Rx<String?> _member3PhoneNumber = Rx('');
  String? get member3PhoneNumber => _member3PhoneNumber.value;
  late Rx<String?> _member3Username = Rx('');
  String? get member3Username => _member3Username.value;

  late Rx<File?> _member4ProfileImageFile;
  File? get member4ProfileImageFile => _member4ProfileImageFile.value;
  late Rx<String?> _member4ImageURL = Rx('');
  String? get member4ImageURL => _member4ImageURL.value;
  late Rx<String?> _member4PhoneNumber = Rx('');
  String? get member4PhoneNumber => _member4PhoneNumber.value;
  late Rx<String?> _member4Username = Rx('');
  String? get member4Username => _member4Username.value;

  late Rx<File?> _leaderProfileImageFile;
  File? get leaderProfileImageFile => _leaderProfileImageFile.value;
  late Rx<String?> _leaderImageURL = Rx('');
  String? get leaderImageURL => _leaderImageURL.value;
  late Rx<String?> _leaderPhoneNumber = Rx('');
  String? get leaderPhoneNumber => _leaderPhoneNumber.value;
  late Rx<String?> _leaderUsername = Rx('');
  String? get leaderUsername => _leaderUsername.value;

  // Unit Test Strucuture Exist.

  void clearAll() {
    _groupImageFile = Rx(null);
    _groupImageURL = Rx('');
    _groupName = Rx('');

    _isActive = Rx(true);

    _member1ProfileImageFile = Rx(null);
    _member1ImageURL = Rx('');
    _member1PhoneNumber = Rx('');
    _member1Username = Rx('');

    _member2ProfileImageFile = Rx(null);
    _member2ImageURL = Rx('');
    _member2PhoneNumber = Rx('');
    _member2Username = Rx('');

    _member3ProfileImageFile = Rx(null);
    _member3ImageURL = Rx('');
    _member3PhoneNumber = Rx('');
    _member3Username = Rx('');

    _member4ProfileImageFile = Rx(null);
    _member4ImageURL = Rx('');
    _member4PhoneNumber = Rx('');
    _member4Username = Rx('');

    _leaderProfileImageFile = Rx(null);
    _leaderImageURL = Rx('');
    _leaderPhoneNumber = Rx('');
    _leaderUsername = Rx('');
  }

  // Unit Test Strucuture Exist.
  void chooseMemberProfileImageFromGallery(
      int memberIndex, String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Picking An Image.');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Picking An Image.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);
      String host = Converter.townOrInstitutionAsString(
              Converter.toSupportedTownOrInstitution(
                      _groupArea.value.sectionName)
                  .townOrInstitutionName)
          .toLowerCase();

      if (pickedImageFile != null) {
        switch (memberIndex) {
          case 1:
            _member1ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member1ImageURL = Rx<String?>(await uploadResource(
                _member1ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member1PhoneNumber = Rx<String?>(phoneNumber);
            _member1Username = Rx<String?>(username);
            break;
          case 2:
            _member2ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member2ImageURL = Rx<String?>(await uploadResource(
                _member2ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member2PhoneNumber = Rx<String?>(phoneNumber);
            _member2Username = Rx<String?>(username);
            break;
          case 3:
            _member3ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member3ImageURL = Rx<String?>(await uploadResource(
                _member3ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member3PhoneNumber = Rx<String?>(phoneNumber);
            _member3Username = Rx<String?>(username);
            break;
          case 4:
            _member4ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member4ImageURL = Rx<String?>(await uploadResource(
                _member4ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member4PhoneNumber = Rx<String?>(phoneNumber);
            _member4Username = Rx<String?>(username);
            break;
          default:
            _leaderProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _leaderImageURL = Rx<String?>(await uploadResource(
                _leaderProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _leaderPhoneNumber = Rx<String?>(phoneNumber);
            _leaderUsername = Rx<String?>(username);
        }
        Get.snackbar('Image Status', 'Image File Successfully Picked.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Picked.');
      }
    }
  }

  // Unit Test Strucuture Exist.
  void captureMemberProfileImageFromCamera(
      int memberIndex, String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Capturing An Image.');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Capturing An Image.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);
      String host = Converter.townOrInstitutionAsString(
              Converter.toSupportedTownOrInstitution(
                      _groupArea.value.sectionName)
                  .townOrInstitutionName)
          .toLowerCase();
      if (pickedImageFile != null) {
        switch (memberIndex) {
          case 1:
            _member1ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member1ImageURL = Rx<String?>(await uploadResource(
                _member1ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member1PhoneNumber = Rx<String?>(phoneNumber);
            _member1Username = Rx<String?>(username);
            break;
          case 2:
            _member2ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member2ImageURL = Rx<String?>(await uploadResource(
                _member2ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member2PhoneNumber = Rx<String?>(phoneNumber);
            _member2Username = Rx<String?>(username);
            break;
          case 3:
            _member3ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member3ImageURL = Rx<String?>(await uploadResource(
                _member3ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member3PhoneNumber = Rx<String?>(phoneNumber);
            _member3Username = Rx<String?>(username);
            break;
          case 4:
            _member4ProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _member4ImageURL = Rx<String?>(await uploadResource(
                _member4ProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _member4PhoneNumber = Rx<String?>(phoneNumber);
            _member4Username = Rx<String?>(username);
            break;
          default:
            _leaderProfileImageFile = Rx<File?>(File(pickedImageFile.path));
            _leaderImageURL = Rx<String?>(await uploadResource(
                _leaderProfileImageFile.value!,
                '/$host/group_members/${_leaderPhoneNumber.value}/profile_images/$phoneNumber'));
            _leaderPhoneNumber = Rx<String?>(phoneNumber);
            _leaderUsername = Rx<String?>(username);
        }
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
      }
    }
  }

  void setSupportedArea(String chosenSectionName) {
    _groupArea = Rx<SupportedArea>(
        Converter.toSupportedArea(Converter.toSectionName(chosenSectionName)));
    update();
  }

  void setMaxNoOfMembers(int noOfMembers) {
    if (noOfMembers >= 3) {
      _maxNoOfMembers = Rx<int>(noOfMembers);
    }
  }

  void setIsActive(bool isActive) {
    _isActive = Rx<bool>(isActive);
  }

  void chooseGroupImageFromGallery(
    String groupName,
    SectionName sectionName,
    String groupSpecificArea,
  ) async {
    if (groupName.isEmpty) {
      Get.snackbar('Error', 'Group Name Is Missing.');
    } else if (groupSpecificArea.isEmpty) {
      Get.snackbar('Error', 'Group Specific Area Is Missing.');
    } else if (_leaderPhoneNumber.value == null) {
      Get.snackbar('Error', 'Group Leaders\'s Phone Number Is Missing.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        debug.log('Image Chosen Using Gallery');
        // Share the chosen image file on Getx State Management.
        _groupImageFile = Rx<File?>(File(pickedImageFile.path));

        _groupImageURL = Rx<String?>(await uploadResource(
            _groupImageFile.value!,
            '/groups_specific_locations/${_leaderPhoneNumber.value}'));
        _groupName = Rx<String?>(groupName);
        _groupArea = Rx(Converter.toSupportedArea(
            Converter.toSectionName(groupSpecificArea)));

        Get.snackbar('Image Status', 'Image File Successfully Picked.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Picked.');
        update();
      }
    }
  }

  void captureGroupImageWithCamera(
    String groupName,
    SectionName sectionName,
    String groupSpecificArea,
  ) async {
    if (groupName.isEmpty) {
      debug.log('Group Name Is Empty.');
      Get.snackbar('Error', 'Group Name Is Missing.');
    } else if (groupSpecificArea.isEmpty) {
      debug.log('Group Specific Area Is Empty.');
      Get.snackbar('Error', 'Group Specific Area Is Missing.');
    } else if (_leaderPhoneNumber.value == null) {
      debug.log('Group Leader\'s Phone Number Is Empty Is Empty.');
      Get.snackbar('Error', 'Group Leaders\'s Phone Number Is Missing.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        // Share the chosen image file on Getx State Management.
        _groupImageFile = Rx<File?>(File(pickedImageFile.path));

        _groupImageURL = Rx<String?>(await uploadResource(
            _groupImageFile.value!,
            '/groups_specific_locations/${_leaderPhoneNumber.value}'));
        _groupName = Rx<String>(groupName);
        _groupArea = Rx(Converter.toSupportedArea(
            Converter.toSectionName(groupSpecificArea)));

        Get.snackbar('Image Status', 'Image File Successfully Picked.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Picked.');
      }
    }
  }

  Future<void> createGroup1() async {
    final httpCallable = functions.httpsCallable('createGroup1');

    const data = {
      'param1': 1,
      'param2': 2,
    };

    final result = await httpCallable.call(data);

    debug.log(result.data.toString());
  }

  // when(()=>mockGroupController.clear()).thenReturn... because does not return future.
  bool hasMember(int memberIndex) {
    switch (memberIndex) {
      case 1:
        return member1ProfileImageFile != null &&
            _member1ImageURL.value != null &&
            _member1PhoneNumber.value != null &&
            _member1Username.value != null;
      case 2:
        return member2ProfileImageFile != null &&
            _member2ImageURL.value != null &&
            _member2PhoneNumber.value != null &&
            _member2Username.value != null;
      case 3:
        return member3ProfileImageFile != null &&
            _member3ImageURL.value != null &&
            _member3PhoneNumber.value != null &&
            _member3Username.value != null;
      case 4:
        return member4ProfileImageFile != null &&
            _member4ImageURL.value != null &&
            _member4PhoneNumber.value != null &&
            _member4Username.value != null;
      default:
        return leaderProfileImageFile != null &&
            _leaderImageURL.value != null &&
            _leaderPhoneNumber.value != null &&
            _leaderUsername.value != null;
    }
  }

  // when(()=>mockGroupController.clear()).thenReturn... because does not return future.
  int countMember() {
    int count = 0;

    if (leaderPhoneNumber != null &&
        leaderUsername != null &&
        leaderProfileImageFile != null) {
      count++;
    }

    if (member1PhoneNumber != null &&
        member1Username != null &&
        member1ProfileImageFile != null) {
      count++;
    }

    if (member2PhoneNumber != null &&
        member2Username != null &&
        member2ProfileImageFile != null) {
      count++;
    }

    if (member3PhoneNumber != null &&
        member3Username != null &&
        member3ProfileImageFile != null) {
      count++;
    }

    if (member4PhoneNumber != null &&
        member4Username != null &&
        member4ProfileImageFile != null) {
      count++;
    }

    return count;
  }

  // when(()=>mockGroupController.clear()).thenReturn... because does not return future.
  bool allValidPhoneNumbers() {
    switch (countMember()) {
      case 1:
        return isValidPhoneNumber(leaderPhoneNumber!);

      case 2:
        return isValidPhoneNumber(leaderPhoneNumber!) &&
            isValidPhoneNumber(member1PhoneNumber!);
      case 3:
        return isValidPhoneNumber(leaderPhoneNumber!) &&
            isValidPhoneNumber(member1PhoneNumber!) &&
            isValidPhoneNumber(member2PhoneNumber!);
      case 4:
        return isValidPhoneNumber(leaderPhoneNumber!) &&
            isValidPhoneNumber(member1PhoneNumber!) &&
            isValidPhoneNumber(member2PhoneNumber!) &&
            isValidPhoneNumber(member3PhoneNumber!);
      default:
        return isValidPhoneNumber(leaderPhoneNumber!) &&
            isValidPhoneNumber(member1PhoneNumber!) &&
            isValidPhoneNumber(member2PhoneNumber!) &&
            isValidPhoneNumber(member3PhoneNumber!) &&
            isValidPhoneNumber(member4PhoneNumber!);
    }
  }

  // when(()=>mockGroupController.clear()).thenReturn... because does not return future.
  String trimmedImageURL(int index) {
    switch (index) {
      case 0:
        return _leaderImageURL.value!
            .substring(_leaderImageURL.value!.indexOf('/alcoholics'),
                _leaderImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
      case 1:
        return _member1ImageURL.value!
            .substring(_member1ImageURL.value!.indexOf('/alcoholics'),
                _member1ImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
      case 2:
        return _member2ImageURL.value!
            .substring(_member2ImageURL.value!.indexOf('/alcoholics'),
                _member2ImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
      case 3:
        return _member3ImageURL.value!
            .substring(_member3ImageURL.value!.indexOf('/alcoholics'),
                _member3ImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
      case 4:
        return _member4ImageURL.value!
            .substring(_member4ImageURL.value!.indexOf('/alcoholics'),
                _member4ImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
      default:
        return _groupImageURL.value!
            .substring(_groupImageURL.value!.indexOf('/groups'),
                _groupImageURL.value!.indexOf('?'))
            .replaceAll('%2F', '/');
    }
  }

  Future<GroupSavingStatus> createGroup() async {
    if (_groupImageFile.value != null &&
        _groupImageURL.value != null &&
        _groupName.value != null) {
      if (!allValidPhoneNumbers()) {
        Get.snackbar('Error', 'Invalid Phone Number Entered.');
        return GroupSavingStatus.incorrectData;
      }

      List<String> members = [];

      if (hasMember(0)) {
        members.add(_leaderPhoneNumber.value!);

        if (hasMember(1)) {
          members.add(_member1PhoneNumber.value!);

          if (hasMember(2)) {
            members.add(_member2PhoneNumber.value!);

            if (hasMember(3)) {
              members.add(_member3PhoneNumber.value!);

              if (hasMember(4)) {
                members.add(_member4PhoneNumber.value!);

                Map<String, dynamic> registrationGroup = {
                  'groupName': _groupName.value,
                  'groupImageURL': trimmedImageURL(5),
                  'groupArea': _groupArea.value.toJson(),
                  'groupTownOrInstitution':
                      Converter.toSupportedTownOrInstitution(
                          _groupArea.value.sectionName),
                  'groupCreatorPhoneNumber': _leaderPhoneNumber.value,
                  'groupCreatorImageURL': trimmedImageURL(0),
                  'groupCreatorUsername': _leaderUsername.value,
                  'isActive': false,
                  'maxNoOfMembers': 5,
                  'groupMembers': members
                };

                // Saving With A Cloud Function.
                /*final httpCallable =
                    functions.httpsCallable('createGroup');
                await httpCallable.call(group);*/

                Group group = Group(
                    groupName: registrationGroup['groupName'],
                    groupImageURL: registrationGroup['groupImageURL'],
                    groupTownOrInstitution:
                        registrationGroup['groupTownOrInstitution'],
                    groupArea: registrationGroup['groupArea'],
                    groupCreatorPhoneNumber:
                        registrationGroup['groupCreatorPhoneNumber'],
                    groupCreatorImageURL:
                        registrationGroup['groupCreatorImageURL'],
                    groupCreatorUsername:
                        registrationGroup['groupCreatorUsername'],
                    groupMembers: members,
                    maxNoOfMembers: registrationGroup['maxNoOfMembers']);

                await firestore
                    .collection('groups')
                    .doc(group.groupCreatorPhoneNumber)
                    .set(group.toJson());

                // Exclude alcoholics when saving groups.

                if (hasMember(0)) {
                  await uploadResource(leaderProfileImageFile!,
                      '${Converter.asString(groupSupportedArea.sectionName).toLowerCase()}/group_members/$_leaderPhoneNumber/profile_images/$_leaderPhoneNumber');
                }

                if (hasMember(1)) {
                  await uploadResource(member1ProfileImageFile!,
                      '${Converter.asString(groupSupportedArea.sectionName).toLowerCase()}/group_members/$_leaderPhoneNumber/profile_images/$_member1PhoneNumber');
                }

                if (hasMember(2)) {
                  await uploadResource(member2ProfileImageFile!,
                      '${Converter.asString(groupSupportedArea.sectionName).toLowerCase()}group_members/$_leaderPhoneNumber/profile_images/$_member2PhoneNumber');
                }

                if (hasMember(3)) {
                  await uploadResource(member3ProfileImageFile!,
                      '${Converter.asString(groupSupportedArea.sectionName).toLowerCase()}group_members/$_leaderPhoneNumber/profile_images/$_member3PhoneNumber');
                }

                if (hasMember(4)) {
                  await uploadResource(member4ProfileImageFile!,
                      '${Converter.asString(groupSupportedArea.sectionName).toLowerCase()}group_members/$_leaderPhoneNumber/profile_images/$_member4PhoneNumber');
                }
                Get.snackbar('Group Status', 'Saved Group Successfully .');

                return GroupSavingStatus.saved;
              } else {
                Get.snackbar('Error', 'Forth Member Info Is Missing .');
                return GroupSavingStatus.incompleteData;
              }
            } else {
              Get.snackbar('Error', 'Third Member Info Is Missing .');
              return GroupSavingStatus.incompleteData;
            }
          } else {
            Get.snackbar('Error', 'Second Member Info Is Missing .');
            return GroupSavingStatus.incompleteData;
          }
        } else {
          Get.snackbar('Error', 'First Member Info Is Missing .');
          return GroupSavingStatus.incompleteData;
        }
      } else {
        Get.snackbar('Error', 'Leader Info Is Missing .');
        return GroupSavingStatus.incompleteData;
      }
    } else {
      Get.snackbar('Error', 'Group Info Is Missing .');
      return GroupSavingStatus.incompleteData;
    }
  }

  Stream<List<Group>> readAllGroups() {
    Stream<List<Group>> stream = firestore
        .collection('groups')
        //.where("groupTownOrInstitution.townOrInstitutionNo", isEqualTo: "4")
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Group group = Group.fromJson(doc.data());
              return group;
            }).toList());

    return stream;
  }

  Stream<List<Group>> readGroups(String townOrInstitutionNo) {
    debug.log('townOrInstitutionNo $townOrInstitutionNo');
    Stream<List<Group>> stream = firestore
        .collection('groups')
        .where("groupTownOrInstitution.townOrInstitutionNo",
            isEqualTo: townOrInstitutionNo)
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Group group = Group.fromJson(doc.data());
              return group;
            }).toList());

    return stream;
  }

  Future<List<Group>> readFutureAllGroups() async {
    return firestore.collection('groups').snapshots().map(((doc) {
      Group group = Group.fromJson(doc);
      return group;
    })).toList();
  }
}
