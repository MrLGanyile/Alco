import 'package:alcoholic/models/Utilities/converter.dart';
import 'package:alcoholic/models/Utilities/may_be_fake.dart';
import 'package:alcoholic/models/stores/draw_grand_price.dart';

import '../section_name.dart';
import '../social/group.dart';
import 'competition_state.dart';

// All competitions should take the same amount of time to finish.
// Collection Name /competition/competitionId
class Competition extends MayBeFake {
  String? competitionId;
  String storeFK;

  bool isLive;
  bool isOver;
  double joiningFee;

  SectionName competitionSectionName;

  DateTime dateTime;
  int pickingMultipleInSeconds;

  String? grandPricesGridId;
  List<int> grandPricesOrder;
  int numberOfGrandPrices;

  String? competitorsGridId;
  List<String> competitorsOrder;
  int groupPickingStartTime;

  int? timeBetweenPricePickingAndGroupPicking;
  int? displayPeriodAfterWinners;

  bool? isWonGrandPricePicked;
  bool? isWonCompetitorGroupPicked;

  CompetitionState? competitionState;

  DrawGrandPrice? wonPrice;
  Group? wonGroup;

  Competition({
    this.competitionId,
    required this.storeFK,
    required this.competitionSectionName,
    this.isLive = false,
    required this.dateTime,
    required this.joiningFee,
    this.isOver = false,
    required this.grandPricesOrder,
    this.isWonGrandPricePicked = false,
    this.grandPricesGridId,
    required this.numberOfGrandPrices,
    required this.competitorsOrder,
    this.isWonCompetitorGroupPicked = false,
    this.competitorsGridId,
    required this.pickingMultipleInSeconds,
    this.timeBetweenPricePickingAndGroupPicking = 5,
    required this.groupPickingStartTime,
    this.displayPeriodAfterWinners = 30,
    this.competitionState,
    this.wonGroup,
    this.wonPrice,
    isFake,
  }) : super(isFake: isFake);

  factory Competition.fromJson(dynamic json) {
    List<int> grandPricesOrder =
        convertGrandPricesOrder(json["grandPricesOrder"]);
    List<String> competitorsOrder =
        convertCompetitorsOrder(json['competitorsOrder']);
    int pickingMultipleInSeconds = json['pickingMultipleInSeconds'];
    int timeBetweenPricePickingAndGroupPicking =
        json["timeBetweenPricePickingAndGroupPicking"];

    return Competition(
        wonPrice: json['wonPrice'] != null
            ? DrawGrandPrice.fromJson(json['wonPrice'])
            : null,
        wonGroup:
            json['wonGroup'] != null ? Group.fromJson(json['wonGroup']) : null,
        pickingMultipleInSeconds: pickingMultipleInSeconds,
        timeBetweenPricePickingAndGroupPicking:
            timeBetweenPricePickingAndGroupPicking,
        groupPickingStartTime: json['groupPickingStartTime'],
        displayPeriodAfterWinners: json['displayPeriodAfterWinners'],
        competitionId: json['competitionId'],
        storeFK: json['storeFK'],
        competitionSectionName:
            Converter.toSectionName(json['competitionSectionName']),
        isLive: json['isLive'],
        dateTime: DateTime(
          json['dateTime']['year'],
          json['dateTime']['month'],
          json['dateTime']['day'],
          json['dateTime']['hour'],
          json['dateTime']['minute'],
        ),
        joiningFee: json['joiningFee'],
        isOver: json['isOver'],
        isFake: json['isFake'] == 'Yes' ? true : false,
        grandPricesOrder: grandPricesOrder,
        isWonGrandPricePicked: json['isWonGrandPricePicked'],
        grandPricesGridId: json['grandPricesGridId'],
        numberOfGrandPrices: json["numberOfGrandPrices"],
        competitorsOrder: competitorsOrder,
        isWonCompetitorGroupPicked: json['isWonCompetitorGroupPicked'],
        competitorsGridId: json['competitorsGridId'],
        competitionState:
            Converter.toCompetitionState(json['competitionState']));
  }

  static List<int> convertGrandPricesOrder(List<dynamic> order) {
    List<int> list = [];

    for (int i = 0; i < order.length; i++) {
      list.add(order[i]);
    }

    return list;
  }

  static List<String> convertCompetitorsOrder(List<dynamic> order) {
    List<String> list = [];

    for (int i = 0; i < order.length; i++) {
      list.add(order[i]);
    }

    return list;
  }
}
