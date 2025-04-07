import 'package:alco/models/locations/supported_town_or_institution.dart';

import '/models/locations/supported_area.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

// Branch : supported_locations_resources_crud ->  supported_locations_resources_data_access
class LocationController extends GetxController {
  static LocationController locationController = Get.find();

  Stream<List<SupportedArea>> readAllSupportedAreas() {
    Stream<List<SupportedArea>> stream = FirebaseFirestore.instance
        .collection('supported_areas')
        .orderBy('areaName')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              SupportedArea info = SupportedArea.fromJson(doc.data());
              return info;
            }).toList());

    return stream;
  }

  Stream<List<SupportedTownOrInstitution>>
      readAllSupportedTownsOrSuburbsOrInstitutions() {
    Stream<List<SupportedTownOrInstitution>> stream = FirebaseFirestore.instance
        .collection('supported_towns_or_institutions')
        .orderBy('townOrInstitutionName')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              SupportedTownOrInstitution info =
                  SupportedTownOrInstitution.fromJson(doc.data());
              return info;
            }).toList());

    return stream;
  }
}
