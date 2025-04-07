// Collection Name /supported_areas/{supportedAreaId}
// Branch : lsupported_locations_resources_crud ->  create_supported_locations_front_end
import 'package:alco/models/locations/converter.dart';
import 'package:alco/models/locations/section_name.dart';

class SupportedArea {
  String areaNo;
  String townOrInstitutionFK;
  SectionName sectionName;

  SupportedArea({
    required this.areaNo,
    required this.townOrInstitutionFK,
    required this.sectionName,
  });

  Map<String, dynamic> toJson() => {
        "areaNo": areaNo,
        "townOrInstitutionFK": townOrInstitutionFK,
        "areaName": Converter.asString(sectionName),
      };

  factory SupportedArea.fromJson(dynamic json) => SupportedArea(
      areaNo: json['areaNo'],
      townOrInstitutionFK: json['townOrInstitutionFK'],
      sectionName: Converter.toSectionName(json['areaName']));

  @override
  String toString() {
    return Converter.asString(sectionName);
  }
}
