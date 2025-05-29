import 'package:flutter/material.dart';

import '../../controllers/admin_controller.dart';
import '../../controllers/group_controller.dart';
import '../../controllers/shared_dao_functions.dart';
import '../../main.dart';
import '../../models/locations/converter.dart';
import '../../models/users/admin.dart';
import '../../models/users/group.dart';
import '../utils/globals.dart';
import 'dart:developer' as debug;

class RecruitmentWidget extends StatefulWidget {
  RecruitmentWidget();

  @override
  State<StatefulWidget> createState() => RecruitmentWidgetState();
}

class RecruitmentWidgetState extends State<RecruitmentWidget> {
  late GroupController groupController;
  late AdminController adminController;
  late Stream<List<Group>> groupsStream;

  List<String> groupAction = ["No Action", "Activate", "Deactivate"];
  int groupActionIndex = 0;

  List<String> groupsAction = ["No Action", "Activate", "Deactivate"];
  int groupsActionIndex = 0;

  @override
  void initState() {
    super.initState();
    groupController = GroupController.instance;
    adminController = AdminController.adminController;
    groupsStream = groupController.readAllGroups();
  }

  void updateGroupsAction(index) {
    setState(() {
      groupsActionIndex = index;
    });
  }

  updateGroupAction(index) {
    setState(() {
      groupActionIndex = index;
    });
  }

  Widget groupInfo(Group group) => Container(
        margin: const EdgeInsets.only(left: 15, right: 15, bottom: 15),
        child: InkWell(
          onTap: (() => setState(() {
                groupController.activateOrDeactivateGroup(
                    group.groupCreatorPhoneNumber, !group.active);
              })),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Expanded(
                child: FutureBuilder(
                    future: findFullImageURL(group.groupCreatorImageURL),
                    builder: ((context, snapshot) {
                      if (snapshot.hasData) {
                        return CircleAvatar(
                          radius: MediaQuery.of(context).size.width * 0.09,
                          backgroundColor: Colors.grey,
                          backgroundImage:
                              NetworkImage(snapshot.data as String),
                        );
                      } else if (snapshot.hasError) {
                        return getCircularProgressBar();
                      } else {
                        return getCircularProgressBar();
                      }
                    })),
              ),
              Expanded(
                flex: 4,
                child: Container(
                  margin: const EdgeInsets.only(left: 5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            group.groupName,
                            style: TextStyle(
                                fontSize: 12,
                                color: MyApplication.logoColor1,
                                decoration: TextDecoration.none,
                                overflow: TextOverflow.ellipsis),
                          ),
                          CircleAvatar(
                            radius: 7,
                            backgroundColor:
                                group.active ? Colors.green : Colors.grey,
                          )
                        ],
                      ),
                      Text(
                        '@${group.groupCreatorUsername} [${group.groupCreatorPhoneNumber}]',
                        //textAlign: TextAlign.center,
                        style: TextStyle(
                          decoration: TextDecoration.none,
                          color: MyApplication.logoColor2,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          // overflow: TextOverflow.ellipsis
                        ),
                      ),
                      Text(
                        Converter.asString(group.groupArea.sectionName),
                        // textAlign: TextAlign.center,
                        style: TextStyle(
                            decoration: TextDecoration.none,
                            color: MyApplication.attractiveColor1,
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            overflow: TextOverflow.ellipsis),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      );

  @override
  Widget build(BuildContext context) => Column(children: [
        const SizedBox(
          height: 5,
        ),
        Expanded(
          child: StreamBuilder(
              stream: groupsStream,
              builder: ((context, snapshot) {
                if (snapshot.hasData) {
                  List<Group> groups = snapshot.data as List<Group>;
                  return ListView.builder(
                      itemCount: groups.length,
                      itemBuilder: ((context, index) {
                        return groupInfo(groups[index]);
                      }));
                } else if (snapshot.hasError) {
                  debug.log('Error Groups Data');
                  return getCircularProgressBar();
                } else {
                  return getCircularProgressBar();
                }
              })),
        ),
      ]);
}
