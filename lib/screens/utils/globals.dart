//import 'package:firebase_phone_auth_handler/firebase_phone_auth_handler.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

bool showProgressBar = false;

Color backgroundResourcesColor = Colors.black;

Widget getCircularProgressBar() => Center(
        child: CircularProgressIndicator(
      color: backgroundResourcesColor,
    ));

void getSnapbar(title, message) {
  Get.snackbar(title, message);
}

class Globals {
  const Globals._();

  //static final auth = FirebaseAuth.instance;

  //static User? get firebaseUser => auth.currentUser;

  static final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
}
