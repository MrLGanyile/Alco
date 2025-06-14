import 'package:alco/controllers/post_controller.dart';
import 'package:alco/screens/admins/admin_entrance_widget.dart';
import 'package:alco/screens/admins/admin_registration_widget.dart';
import 'package:alco/screens/utils/login_widget.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controllers/admin_controller.dart';
import 'controllers/alcoholic_controller.dart';
import 'controllers/competition_controller.dart';
import 'controllers/location_controller.dart';

import 'controllers/store_controller.dart';
import 'controllers/group_controller.dart';

import 'screens/utils/firebase_options.dart';
import 'screens/utils/start_screen.dart';

import 'package:firebase_phone_auth_handler/firebase_phone_auth_handler.dart';

// Branching Strategy - Trunk-Based Dev
/* 
   FNB ACC No 63117824359
   Mlu NERD 0842457343
   Crouch 0762816517
   Njabulo 0835367834
   Mafungwashe, 0766915230
   Msizi Dle 0782578628
   Cebo 0658040676
   Zee 
*/
Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform)
      .then((value) {
    final firestore = FirebaseFirestore.instance;
    final functions = FirebaseFunctions.instance;
    final storage = FirebaseStorage.instance
        .refFromURL("gs://alcoholic-expressions.appspot.com/");
    final auth = FirebaseAuth.instance;

    Get.put(AlcoholicController());
    Get.put(AdminController());
    Get.put(PostController());
    Get.put(LocationController());

    Get.put(GroupController(
        firestore: firestore,
        functions: functions,
        storage: storage,
        auth: auth));

    Get.put(StoreController());
    Get.put(CompetitionController());
  });
  // Ideal time to initialize
  await FirebaseAuth.instance.useAuthEmulator('127.0.0.1', 9099);
  await FirebaseStorage.instance.useStorageEmulator('127.0.0.1', 9199);
  FirebaseFunctions.instance.useFunctionsEmulator('127.0.0.1', 5001);
  FirebaseFirestore.instance.useFirestoreEmulator('127.0.0.1', 8080);

  runApp(MyApplication());
}

class MyApplication extends StatefulWidget {
  MyApplication({super.key});

  static String title = 'Alco';
  // Assets are not added into the pubspec.yaml file.

  static double backArrowFontSize = 20;
  static Color backArrowColor = Colors.blue;
  static double backArrowTitleFontSize = 14;
  static Color backArrowTitleColor = Colors.pink;

  static EdgeInsets storeDataPadding =
      const EdgeInsets.only(left: 20, right: 20, top: 10);

  //static Color scaffoldColor = const Color.fromARGB(240, 23, 212, 212);
  static Color scaffoldColor = const Color.fromARGB(31, 1, 24, 24);

  static Color scaffoldBodyColor = const Color.fromARGB(255, 173, 235, 229);

  static Color attractiveColor1 = Colors.pink;
  static Color attractiveColor2 = Colors.purple;

  static LinearGradient priceslinearGradient = const LinearGradient(
    colors: [Colors.white, Color.fromARGB(255, 44, 35, 46)],
    begin: Alignment.bottomLeft,
    end: Alignment.topRight,
  );

  static Color textColor = const Color.fromARGB(255, 154, 46, 173);
  static double infoTextFontSize = 15;

  static Color storeInfoTextColor = Colors.lightBlue;
  //static Color storeInfoTextColor = const Color.fromARGB(169, 27, 3, 114);

  static Color storesTextColor = const Color.fromARGB(255, 40, 236, 210);
  static Color storesSpecialTextColor = const Color.fromARGB(255, 244, 3, 184);

  //static Color headingColor = const Color.fromARGB(169, 106, 3, 124);

  static Color logoColor1 = Colors.green;
  static Color logoColor2 = Colors.blue;

  static String userPhoneNumber = '';

  static BoxDecoration userThoughtsAreaDecoration = const BoxDecoration(
      color: Color.fromARGB(255, 190, 183, 209),
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(30),
        topRight: Radius.circular(30),
      ));

  static BoxDecoration userThoughtsDecoration = const BoxDecoration(
      color: Color.fromARGB(255, 182, 142, 189),
      borderRadius: BorderRadius.only(
        bottomRight: Radius.circular(20),
        topRight: Radius.circular(20),
      ));

  static TextStyle usernameStyle = const TextStyle(
    color: Colors.grey,
    fontSize: 15,
    fontWeight: FontWeight.bold,
  );

  static TextStyle userMessageStyle = const TextStyle(
    color: Colors.blueGrey,
    fontSize: 15,
    fontWeight: FontWeight.w600,
  );

  static double playCompetitionIconFontSize = 75;
  static double alarmIconFontSize = 60;

  @override
  State<MyApplication> createState() => _MyApplicationState();
}

class _MyApplicationState extends State<MyApplication> {
  @override
  void initState() {
    // This method execute only when this state is created for the first time.
    // It get executed befor the build method.
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    CompetitionController competitionController =
        CompetitionController.competitionController;

    competitionController.saveFakeWonPriceComments();
    return FirebasePhoneAuthProvider(
        child: GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Alco',
      theme: ThemeData(
        primaryColor: const Color.fromARGB(115, 231, 195, 214),
        secondaryHeaderColor: const Color.fromARGB(115, 231, 195, 214),
      ),

      // Make sure to create a draw given there are groups belonging to the host's location.
      home: StartScreen(),
      // home: AdminRegistrationWidget()
      // home: LoginWidget(forAdmin: true),
      // home: AlcoholicRegistrationWidget(),
      // home: PastPostCreationWidget()
    ));
  }
}
