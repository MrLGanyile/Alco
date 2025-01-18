import 'dart:io';

import 'package:alcoholic/models/Utilities/converter.dart';
import 'package:alcoholic/models/social/won_price_summary_comment.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

import '../../models/section_name.dart';
import '../models/competitions/competition.dart';
import '../models/competitions/grand_price_token.dart';
import '../models/competitions/grand_prices_grid.dart';
import '../models/competitions/group_competitor_token.dart';
import '../models/competitions/group_competitors_grid.dart';
import '../models/competitions/won_price_summary.dart';
import '../models/social/group.dart';
import 'dart:developer' as debug;

class CompetitionController extends GetxController {
  static CompetitionController competitionController = Get.find();

  late Rx<File?> groupPickedFile;
  File? get groupImageFile => groupPickedFile.value;

  late Rx<File?> creatorPickedFile;
  File? get creatprImageFile => creatorPickedFile.value;

  /*======================Competitors Group[Start]======================== */
  void saveCompetitorsGroup(
      String groupName,
      File groupImage,
      SectionName groupSectionName,
      String groupSpecificArea,
      String groupCreatorPhoneNumber,
      File groupCreatorImage,
      String groupMembers,
      String groupCreateUsername) {}

  Future<Group?> findGroup(String competitorsGroupId) async {
    DocumentReference reference =
        FirebaseFirestore.instance.collection('groups').doc(competitorsGroupId);

    DocumentSnapshot snapshot = await reference.get();

    if (snapshot.exists) {
      return Group.fromJson(snapshot.data()!);
    }

    return null;
  }

  Stream<List<Group>> readAllGroups() {
    Stream<List<Group>> stream = FirebaseFirestore.instance
        .collection('groups')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Group group = Group.fromJson(doc.data());
              return group;
            }).toList());

    return stream;
  }

  Stream<List<Group>> readGroups(SectionName sectionName) {
    Stream<List<Group>> stream = FirebaseFirestore.instance
        .collection('groups')
        .where("groupSectionName", isEqualTo: Converter.asString(sectionName))
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Group group = Group.fromJson(doc.data());
              return group;
            }).toList());

    return stream;
  }

  void switchGroup(String? fromGroupId, String toGroupId) {
    if (fromGroupId != null) {
      FirebaseFirestore.instance
          .collection('competitors_groups')
          .doc(fromGroupId);
    }
  }

  /*======================Groups[End]======================== */

  /*=======================Won Price Summary [Start]===================== */
  Future<WonPriceSummary?> findWonPriceSummary(
      String storeFK, String competitionId) async {
    Future<QuerySnapshot> querySnapshot = FirebaseFirestore.instance
        .collection('stores')
        .doc(storeFK)
        .collection('won_prices_summaries')
        .where('wonPriceSummaryId', isEqualTo: competitionId)
        .get();

    querySnapshot.then((value) => value.docs.map((doc) {
          debug.log(doc.data().toString());
          return WonPriceSummary.fromJson(doc.data());
        }));

    return null;
  }

  Stream<List<WonPriceSummary>> readAllWonPriceSummaries() =>
      FirebaseFirestore.instance
          .collection('won_prices_summaries')
          .snapshots()
          .map((wonPriceSummariesSnapshot) =>
              wonPriceSummariesSnapshot.docs.map((wonPriceSummaryDoc) {
                WonPriceSummary wonPriceSummary =
                    WonPriceSummary.fromJson(wonPriceSummaryDoc.data());
                return wonPriceSummary;
              }).toList());

  /*=======================Won Price Summary [End]===================== */

  Stream<List<WonPriceSummaryComment>> readAllWonPriceComments(
          String wonPriceId) =>
      FirebaseFirestore.instance
          .collection("won_prices_summaries")
          .doc(wonPriceId)
          .collection("comments")
          .snapshots()
          .map((wonPriceCommentsSnapshot) => wonPriceCommentsSnapshot.docs
              .map((wonPriceCommentDoc) =>
                  WonPriceSummaryComment.fromJson(wonPriceCommentDoc.data()))
              .toList());

  /*=======================Competition [Start]===================== */

  Stream<DocumentSnapshot>? findCompetition(String competitionId) {
    return FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionId)
        .snapshots();
  }

  Future<Competition?> retrieveCompetition(String competitionId) async {
    DocumentReference reference = FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionId);

    reference.snapshots().map((competitionDoc) {
      return Competition.fromJson(competitionDoc.data());
    });

    return null;
  }

  bool areAllCompetitionsFinished(
      int year, int month, int day, int hour, int minute) {
    bool result = true;

    FirebaseFirestore.instance
        .collection('competitions')
        .where("dateTime.year", isEqualTo: year)
        .where("dateTime.month", isEqualTo: month)
        .where("dateTime.day", isEqualTo: day)
        .where("dateTime.hour", isEqualTo: hour)
        .where("dateTime.minute", isEqualTo: minute)
        .snapshots()
        .map((competitionsSnapshot) => {
              competitionsSnapshot.docs.map((competitionDocumentSnapshot) => {
                    if (competitionDocumentSnapshot.exists &&
                        competitionDocumentSnapshot.data()["isOver"] == false)
                      result = false
                  })
            });
    return result;
  }

  /*=======================Competition [End]===================== */

  /*=======================Grand Price Grid [Start]===================== */

  Stream<DocumentSnapshot>? findGrandPricesGrid(
      String competitionId, String grandPricesGridId) {
    return FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionId)
        .collection('grand_prices_grids')
        .doc(grandPricesGridId)
        .snapshots();
  }

  Future<GrandPricesGrid?> retrieveGrandPricesGrid(
      String competitionId, String grandPricesGridId) async {
    DocumentReference reference = FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionId)
        .collection('grand_prices_grids')
        .doc(grandPricesGridId);

    reference.snapshots().map((grandPricesGridDoc) {
      return GrandPricesGrid.fromJson(grandPricesGridDoc.data());
    });

    return null;
  }

  String? findGrandPricesGridId(String competitionFK) {
    FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionFK)
        .collection('grand_prices_grids')
        .snapshots()
        .map((grandPricesGridSnapshot) {
      if (grandPricesGridSnapshot.size == 1) {
        grandPricesGridSnapshot.docs.map((grandPricesGridDoc) {
          return grandPricesGridDoc.data()["grandPriceGridId"];
        });
      }
    });

    return null;
  }
  /*=======================Grand Price Grid [End]===================== */

  /*===================Grand Price Grid Token [Start]================= */

  Stream<List<GrandPriceToken>> readCompetitionGrandPricesTokens(
          String competitionId, String grandPricesGridId) =>
      FirebaseFirestore.instance
          .collection('competitions')
          .doc(competitionId)
          .collection('grand_prices_grids')
          .doc(grandPricesGridId)
          .collection('grand_prices_tokens')
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => GrandPriceToken.fromJson(doc.data()))
              .toList());

  /*===================Grand Price Grid Token [End]================= */

  /*===================Competitors Grid [Start]================= */

  Stream<GroupCompetitorsGrid>? findCompetitorsGrid(String competitionFK) {
    FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionFK)
        .collection('competitors_grids')
        .snapshots()
        .map((competitorsGridSnapshot) {
      if (competitorsGridSnapshot.size == 1) {
        competitorsGridSnapshot.docs.map((competitorsGridDoc) {
          return competitorsGridDoc.reference.get().asStream();
        });
      }
    });

    return null;
  }

  String? findCompetitorsGridId(String competitionFK) {
    FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionFK)
        .collection('competitors_grids')
        .snapshots()
        .map((competitorsGridSnapshot) {
      if (competitorsGridSnapshot.size == 1) {
        competitorsGridSnapshot.docs.map((competitorsGridDoc) {
          return competitorsGridDoc.data()["competitorsGridId"];
        });
      }
    });

    return null;
  }
  /*===================Competitors Grid [End]================= */

  /*===================Competitors Grid Token[Start]================= */

  Stream<List<GroupCompetitorToken>> readCompetitionCompetitorsTokens(
      String competitionFK) {
    return FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionFK)
        .collection('grand_prices_grids')
        .doc(findCompetitorsGridId(competitionFK))
        .collection('grand_prices_tokens')
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => GroupCompetitorToken.fromJson(doc.data()))
            .toList());
  }
  /*===================Competitors Grid Token[End]================= */

  Stream<DocumentSnapshot<Object?>> retrieveReadOnlyClock(String readOnlyId) {
    DocumentReference reference = FirebaseFirestore.instance
        .collection('read_only_clocks')
        .doc(readOnlyId);

    return reference.snapshots();
  }
}
