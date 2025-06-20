import 'package:alco/main.dart';
import 'package:alco/models/users/won_price_comment.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/shared_dao_functions.dart';

import 'dart:developer' as debug;

import '../utils/globals.dart';

class WonPriceCommentWidget extends StatelessWidget {
  WonPriceComment wonPriceComment;

  WonPriceCommentWidget({required this.wonPriceComment});
  @override
  Widget build(BuildContext context) => Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.only(left: 10),
              // height: MediaQuery.of(context).size.height,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  FutureBuilder(
                      future: findFullImageURL(wonPriceComment.imageURL),
                      builder: ((context, snapshot) {
                        if (snapshot.hasData) {
                          return CircleAvatar(
                            radius: MediaQuery.of(context).size.width * 0.09,
                            backgroundColor: Colors.grey,
                            backgroundImage:
                                NetworkImage(snapshot.data as String),
                          );
                        } else if (snapshot.hasError) {
                          debug.log(snapshot.error.toString());
                          return getCircularProgressBar();
                        } else {
                          return getCircularProgressBar();
                        }
                      })),
                  Column(
                    children: [
                      Text(
                        '@${wonPriceComment.username}',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          decoration: TextDecoration.none,
                          color: MyApplication.logoColor2,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          // overflow: TextOverflow.ellipsis
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: Text(
                          wonPriceComment.passedTimeRepresentation(),
                          style: TextStyle(
                              fontSize: 12,
                              color: MyApplication.logoColor1,
                              decoration: TextDecoration.none,
                              overflow: TextOverflow.ellipsis),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 4,
            child: Card(
              color: Colors.black.withBlue(30),
              margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
              child: Padding(
                padding: const EdgeInsets.all(10),
                child: Text(
                  wonPriceComment.message,
                  textAlign: TextAlign.left,
                  style: TextStyle(
                      fontSize: 16, color: MyApplication.storesTextColor),
                ),
              ),
            ),
          ),
        ],
      );
}
