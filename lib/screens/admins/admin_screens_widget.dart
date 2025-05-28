import 'package:alco/screens/admins/notification_creation_widget.dart';

import '../store/store_draw_registration_widget.dart';
import 'admin_registration_widget.dart';
import 'package:get/get.dart';

import 'package:flutter/material.dart';

import '../../main.dart';

import 'admins_widget.dart';

class AdminScreensWidget extends StatefulWidget {
  AdminScreensWidget({
    super.key,
  });

  @override
  _AdminScreensWidgetState createState() => _AdminScreensWidgetState();
}

class _AdminScreensWidgetState extends State<AdminScreensWidget>
    with SingleTickerProviderStateMixin {
  int currentIndex = 0;
  double listTilesFontSize = 15;
  double listTilesIconSize = 30;
  List<String> titles = ['Admins', 'Recruit', 'Draws', 'Notify'];

  void updateCurrentIndex(int index) {
    setState(() => currentIndex = index);
  }

  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
      length: 4,
      vsync: this,
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: MyApplication.scaffoldColor,
        appBar: AppBar(
          backgroundColor: MyApplication.scaffoldColor,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            iconSize: MyApplication.backArrowFontSize,
            color: MyApplication.backArrowColor,
            onPressed: (() => Get.back()),
          ),
          title: Text(
            titles[currentIndex],
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
              color: MyApplication.attractiveColor1,
              fontWeight: FontWeight.bold,
            ),
          ),
          elevation: 0,
          centerTitle: true,
          bottom: TabBar(
            onTap: updateCurrentIndex,
            labelColor: MyApplication.logoColor1,
            controller: _tabController,
            indicatorColor: MyApplication.logoColor2,
            indicatorWeight: 5,
            //dividerHeight: 0,
            indicatorPadding: const EdgeInsets.only(bottom: 8),
            tabs: [
              Tab(
                icon: Icon(
                  Icons.group,
                  color: MyApplication.attractiveColor1,
                ),
                text: 'Admins',
              ),
              Tab(
                icon: Icon(Icons.admin_panel_settings,
                    color: MyApplication.attractiveColor1),
                text: 'Recruit',
              ),
              Tab(
                icon: Icon(Icons.draw, color: MyApplication.attractiveColor1),
                text: 'Draws',
              ),
              Tab(
                icon: Icon(Icons.notifications,
                    color: MyApplication.attractiveColor1),
                text: 'Notify',
              ),
            ],
          ),
        ),
        body: SafeArea(
          child: Container(
            decoration: BoxDecoration(
              color: MyApplication.scaffoldColor,
            ),
            child: TabBarView(controller: _tabController, children: [
              AdminsWidget(),
              AdminRegistrationWidget(),
              const StoreDrawRegistrationWidget(),
              NotificationCreationWidget(),
            ]),
          ),
        ),
      );
}
