// Collection Name /supported_towns_or_institutions/{townOrInstitutionId}
import 'package:alco/models/locations/converter.dart';
import 'package:alco/models/locations/town_or_institution.dart';

class SupportedTownOrInstitution {
  String townOrInstitutionNo;
  String cityFK;
  TownOrInstitution townOrInstitutionName;

  SupportedTownOrInstitution({
    this.townOrInstitutionNo = '2',
    this.cityFK = '1',
    this.townOrInstitutionName = TownOrInstitution.howardUKZN,
  });

  Map<String, dynamic> toJson() => {
        "townOrInstitutionNo": townOrInstitutionNo,
        "cityFK": cityFK,
        "townOrInstitutionName":
            Converter.townOrInstitutionAsString(townOrInstitutionName),
      };

  factory SupportedTownOrInstitution.fromJson(dynamic json) =>
      SupportedTownOrInstitution(
          townOrInstitutionNo: json['townOrInstitutionNo'],
          cityFK: json['cityFK'],
          townOrInstitutionName:
              Converter.toTownOrInstitution(json['townOrInstitutionName']));

  @override
  String toString() {
    return Converter.townOrInstitutionAsString(townOrInstitutionName);
  }
}
