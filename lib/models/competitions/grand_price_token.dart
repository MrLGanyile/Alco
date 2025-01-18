/* Collection Name /competition/competitionId
/grand_prices_grids/grandPriceGridId
/grand_prices_tokens*/

import 'package:alcoholic/models/Utilities/may_be_fake.dart';

// Competition & CompetitorGrid Have Similar IDs
import '../stores/draw_grand_price.dart';

class GrandPriceToken extends MayBeFake {
  String grandPriceTokenId;
  String grandPricesGridFK;
  int tokenIndex;
  //bool isPointed;
  String imageURL;
  String description;

  GrandPriceToken({
    required this.grandPriceTokenId,
    required this.grandPricesGridFK,
    required this.tokenIndex,
    //required this.isPointed,
    required this.imageURL,
    required this.description,
    isFake,
  }) : super(isFake: isFake);

  @override
  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = super.toJson();
    map.addAll({
      'grandPriceTokenId': grandPriceTokenId,
      'grandPricesGridFK': grandPricesGridFK,
      'tokenIndex': tokenIndex,
      //'isPointed': isPointed,
      'imageURL': imageURL,
      'description': description,
    });
    return map;
  }

  factory GrandPriceToken.fromJson(dynamic json) {
    return GrandPriceToken(
        grandPriceTokenId: json['grandPriceTokenId'],
        grandPricesGridFK: json['grandPricesGridFK'],
        tokenIndex: json['tokenIndex'],
        //isPointed: json['isPointed'],
        imageURL: json['imageURL'],
        description: json['description'],
        isFake: json['isFake'] == 'Yes' ? true : false);
  }

  factory GrandPriceToken.fromDrawGrandPrice(DrawGrandPrice drawGrandPrice) {
    return GrandPriceToken(
        grandPriceTokenId: drawGrandPrice.grandPriceId,
        grandPricesGridFK: drawGrandPrice.storeDrawFK,
        tokenIndex: drawGrandPrice.grandPriceIndex,
        //isPointed: false,
        imageURL: '',
        description: drawGrandPrice.description);
  }
}
