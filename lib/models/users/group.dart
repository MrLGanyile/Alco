import 'package:alco/models/locations/supported_area.dart';
import 'package:alco/models/locations/supported_town_or_institution.dart';

// Collection Name /groups
// Has Unit Tests
class Group implements Comparable<Group> {
  String groupName;

  String groupImageURL;

  SupportedTownOrInstitution groupTownOrInstitution;

  SupportedArea groupArea;

  String groupCreatorPhoneNumber;

  String groupCreatorImageURL;

  String groupCreatorUsername;

  bool isActive; // A group is active if it has atleast 10 members.
  bool get active => isActive;

  int maxNoOfMembers; // 5

  List<String> groupMembers;
  List<String> get members => groupMembers;

  Group({
    required this.groupName,
    required this.groupImageURL,
    required this.groupTownOrInstitution,
    required this.groupArea,
    required this.groupCreatorPhoneNumber,
    required this.groupCreatorImageURL,
    required this.groupCreatorUsername,
    required this.groupMembers,
    this.isActive = false,
    required this.maxNoOfMembers,
  });

  Map<String, dynamic> toJson() => {
        'groupName': groupName,
        'groupImageURL': groupImageURL,
        'groupCreatorPhoneNumber': groupCreatorPhoneNumber,
        'groupTownOrInstitution': groupTownOrInstitution.toJson(),
        'groupArea': groupArea.toJson(),
        'groupCreatorUsername': groupCreatorUsername,
        'groupCreatorImageURL': groupCreatorImageURL,
        'groupMembers': groupMembers,
        'isActive': isActive,
        'maxNoOfMembers': maxNoOfMembers,
      };

  factory Group.fromJson(dynamic json) => Group(
      groupName: json['groupName'],
      groupImageURL: json['groupImageURL'],
      groupTownOrInstitution:
          SupportedTownOrInstitution.fromJson(json['groupTownOrInstitution']),
      groupArea: SupportedArea.fromJson(json['groupArea']),
      groupCreatorPhoneNumber: json['groupCreatorPhoneNumber'],
      groupCreatorImageURL: json['groupCreatorImageURL'],
      groupMembers: toListOfStrings(json['groupMembers']),
      isActive: json['isActive'],
      maxNoOfMembers: json['maxNoOfMembers'],
      groupCreatorUsername: json['groupCreatorUsername']);

  @override
  int compareTo(Group other) {
    return groupName.compareTo(other.groupName);
  }

  // For Learning Unit Testing Purpose.
  bool removeMember(String memberPhoneNumber) {
    if (memberPhoneNumber.compareTo(groupCreatorPhoneNumber) != 0 &&
        groupMembers.length > 1 &&
        groupMembers.contains(memberPhoneNumber)) {
      groupMembers.remove(memberPhoneNumber);
      return true;
    } else {
      return false;
    }
  }

  // For Learning Unit Testing Purpose.
  bool addMember(String memberPhoneNumber) {
    if (memberPhoneNumber.compareTo(groupCreatorPhoneNumber) != 0 &&
        groupMembers.length < maxNoOfMembers &&
        !groupMembers.contains(memberPhoneNumber)) {
      groupMembers.add(memberPhoneNumber);
      return true;
    } else {
      return false;
    }
  }
}

List<String> toListOfStrings(List<dynamic> members) {
  List<String> list = [];

  for (int i = 0; i < members.length; i++) {
    list.add(members[i].toString());
  }
  return list;
}
