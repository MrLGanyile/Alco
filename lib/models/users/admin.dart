import 'package:alco/models/locations/converter.dart';
import 'package:alco/models/locations/town_or_institution.dart';

import 'user.dart';

class Admin extends User {
  bool isSuperiorAdmin;
  String key;
  bool isFemale;
  TownOrInstitution townOrInstitution;

  Admin(
      {userId,
      required phoneNumber,
      this.townOrInstitution = TownOrInstitution.umlazi,
      required profileImageURL,
      required this.isFemale,
      required this.isSuperiorAdmin,
      required password,
      required this.key})
      : super(
            userId: userId,
            phoneNumber: phoneNumber,
            profileImageURL: profileImageURL,
            password: password);

  @override
  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = super.toJson();

    map.addAll({
      'isSuperior': isSuperiorAdmin,
      'key': key,
      'isFemale': isFemale,
      'townOrInstitution':
          Converter.townOrInstitutionAsString(townOrInstitution)
    });

    return map;
  }

  factory Admin.fromJson(dynamic json) => Admin(
      userId: json['userId'],
      phoneNumber: json['phoneNumber'],
      townOrInstitution:
          Converter.toTownOrInstitution(json['townOrInstitution']),
      profileImageURL: json['profileImageURL'],
      isFemale: json['isFemale'],
      isSuperiorAdmin: json['isSuperior'],
      password: json['password'],
      key: json['key']);
}
