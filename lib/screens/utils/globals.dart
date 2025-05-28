//import 'package:firebase_phone_auth_handler/firebase_phone_auth_handler.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../main.dart';

bool showProgressBar = false;

Color backgroundResourcesColor = Colors.black;

Widget getCircularProgressBar() => Center(
        child: CircularProgressIndicator(
      color: backgroundResourcesColor,
    ));

void getSnapbar(title, message) {
  Get.snackbar(title, message);
}

Widget retrieveTextField(String description, TextEditingController controller) {
  return Container(
    margin: const EdgeInsets.symmetric(horizontal: 15),
    child: TextField(
      maxLines: 10,
      minLines: 1,
      style: TextStyle(color: MyApplication.scaffoldBodyColor),
      cursorColor: MyApplication.scaffoldBodyColor,
      controller: controller,
      decoration: InputDecoration(
        labelText: description,
        helperMaxLines: 10,
        labelStyle: TextStyle(
          fontSize: 14,
          color: MyApplication.logoColor1,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(6),
          borderSide: BorderSide(
            color: MyApplication.logoColor1,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(6),
          borderSide: BorderSide(
            color: MyApplication.logoColor1,
          ),
        ),
      ),
      obscureText: false,
    ),
  );
}

class Globals {
  const Globals._();

  //static final auth = FirebaseAuth.instance;

  //static User? get firebaseUser => auth.currentUser;

  static final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
}
