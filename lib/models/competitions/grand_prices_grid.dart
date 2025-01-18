// Collection Name /competition/competitionId/grand_prices_grids

import 'package:alcoholic/models/Utilities/may_be_fake.dart';

// Competition & CompetitorGrid Have Similar IDs
class GrandPricesGrid extends MayBeFake {
  String grandPricesGridId;
  String competitionFK;
  int numberOfGrandPrices;
  int currentlyPointedTokenIndex;

  // The order in which grand prices were visited when this competition was live.
  // This property is used for the sake of viewing competitons which have already played.
  List<int> grandPricesOrder;

  // Contain a sub collection of grand prices tokens.

  Duration duration;
  bool? hasStarted;
  bool? hasStopped;

  GrandPricesGrid({
    required this.grandPricesGridId,
    required this.competitionFK,
    required this.numberOfGrandPrices,
    required this.currentlyPointedTokenIndex,
    required this.grandPricesOrder,
    required this.duration,
    this.hasStarted = false,
    this.hasStopped = false,
    isFake,
  }) : super(isFake: isFake);

  factory GrandPricesGrid.fromJson(dynamic json) {
    return GrandPricesGrid(
        grandPricesGridId: json['grandPricesGridId'],
        competitionFK: json['competitionFK'],
        numberOfGrandPrices: json['numberOfGrandPrices'],
        currentlyPointedTokenIndex: json['currentlyPointedTokenIndex'],
        grandPricesOrder: convert(json['grandPricesOrder']),
        duration: Duration(seconds: json['duration']),
        hasStarted: json['hasStarted'],
        hasStopped: json['hasStopped'],
        isFake: json['isFake'] == 'Yes' ? true : false);
  }

  static List<int> convert(List<dynamic> list) {
    List<int> newList = [];

    for (int i = 0; i < list.length; i++) {
      newList.add(list[i] as int);
    }

    return newList;
  }
}
