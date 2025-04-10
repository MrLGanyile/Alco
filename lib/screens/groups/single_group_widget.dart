import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import '../../../main.dart';

import '../../models/locations/converter.dart';
import '../../models/users/group.dart';
import 'dart:developer' as debug;
import 'dart:math';

// Branch : group_resources_crud ->  create_group_resources_front_end
class SingleGroupWidget extends StatefulWidget {
  Group competitorsGroup;
  SingleGroupWidget({
    required this.competitorsGroup,
  });

  @override
  State createState() => SingleGroupWidgetState();
}

class SingleGroupWidgetState extends State<SingleGroupWidget> {
  Reference storageReference = FirebaseStorage.instance
      .refFromURL("gs://alcoholic-expressions.appspot.com/");
  late List<Reference> groupMembersImageReferences;

  SingleGroupWidgetState();

  Column retrieveGroupDetails(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Group section details
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 1,
              child: Text(
                'Group Home',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 2,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  Converter.townOrInstitutionAsString(widget.competitorsGroup
                      .groupTownOrInstitution.townOrInstitutionName),
                  style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis),
                ),
              ),
            ),
          ],
        ),

        // Group area details
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 1,
              child: Text(
                'Group Area',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    color: MyApplication.storesTextColor,
                    fontWeight: FontWeight.bold,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 2,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.only(right: 15),
                  child: Text(
                    Converter.asString(
                        widget.competitorsGroup.groupArea.sectionName),
                    style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Column retrieveGroupCreatorDetails(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Group creator section details
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                'Creator Username',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.competitorsGroup.groupCreatorUsername,
                  style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  AspectRatio retrieveGroupImage(BuildContext context, String groupImageURL) {
    return AspectRatio(
      aspectRatio: 8 / 2,
      child: Container(
        //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
        decoration: BoxDecoration(
          color: Colors.orange,
          borderRadius: BorderRadius.circular(20),
          image: DecorationImage(
            fit: BoxFit.cover,
            image: NetworkImage(groupImageURL),
          ),
        ),
      ),
    );
  }

  Widget createGroupParticipant(BuildContext context, int memberIndex) {
    return FutureBuilder(
        future: groupMembersImageReferences[memberIndex].getDownloadURL(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Padding(
              padding: const EdgeInsets.only(top: 5, right: 5, bottom: 5),
              child: Container(
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.lightBlue,
                ),
                child: CircleAvatar(
                  radius: MediaQuery.of(context).size.width / 8,
                  backgroundImage: NetworkImage(snapshot.data as String),
                ),
              ),
            );
          } else if (snapshot.hasError) {
            debug.log(
                "Error Fetching Group Participant Data - ${snapshot.error}");
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        });
  }

  Widget createGroupMembers(BuildContext context) {
    Column column;
    Row row;

    List<Widget> rowChildren;
    List<Widget> columnChildren;

    if (groupMembersImageReferences.length <= 3) {
      rowChildren = [];
      for (int i = 0; i < groupMembersImageReferences.length; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );
      return row;
    } else {
      columnChildren = [];
      rowChildren = [];
      for (int i = 0; i < 3; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );
      columnChildren.add(row);

      rowChildren = [];
      for (int i = 3; i < groupMembersImageReferences.length; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );

      columnChildren.add(row);
      column = Column(children: columnChildren);
      return column;
    }
  }

  Future<String> findGroupImageURL() async {
    return await storageReference
        .child(widget.competitorsGroup.groupImageURL)
        .getDownloadURL();
  }

  Future<String> findGroupCreatorImageURL() async {
    return await storageReference
        .child(widget.competitorsGroup.groupCreatorImageURL)
        .getDownloadURL();
  }

  Future<ListResult> findGroupMembersImageURLs() async {
    String host = Converter.townOrInstitutionAsString(widget
            .competitorsGroup.groupTownOrInstitution.townOrInstitutionName)
        .toLowerCase();
    return storageReference
        .child(
            '$host/group_members/${widget.competitorsGroup.groupCreatorPhoneNumber}/profile_images')
        .listAll();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      //height: 550,
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(left: 15),
            child: Column(children: [
              // Group Name
              SizedBox(
                height: 30,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    widget.competitorsGroup.groupName,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.attractiveColor1,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              // Group Location/Area Details
              SizedBox(height: 60, child: retrieveGroupDetails(context)),
              const SizedBox(
                height: 5,
              ),
              // Group Creator Image & Group Image
              SizedBox(
                height: 150,
                child: Container(
                  margin:
                      const EdgeInsets.only(left: 15, right: 15, bottom: 15),
                  child: Row(
                    children: [
                      // Group Creator Image
                      Expanded(
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 5, right: 5, bottom: 5),
                            child: SizedBox(
                              child: Column(
                                children: [
                                  FutureBuilder(
                                    future: findGroupCreatorImageURL(),
                                    builder: (context, snapshot) {
                                      if (snapshot.hasData) {
                                        final data = snapshot.data as String;

                                        return CircleAvatar(
                                          radius: 40,
                                          backgroundImage: NetworkImage(data),
                                        );
                                      } else if (snapshot.hasError) {
                                        debug.log(
                                            "Error Fetching Group Creator Data - ${snapshot.error}");
                                        return Center(
                                          child: CircularProgressIndicator(
                                              color: MyApplication
                                                  .circularProgressBarColor),
                                        );
                                      } else {
                                        return Center(
                                          child: CircularProgressIndicator(
                                              color: MyApplication
                                                  .circularProgressBarColor),
                                        );
                                      }
                                    },
                                  ),
                                  Text(
                                    'Leader',
                                    style: TextStyle(
                                      color: MyApplication.logoColor1,
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  Text(
                                    widget
                                        .competitorsGroup.groupCreatorUsername,
                                    style: TextStyle(
                                      color: MyApplication.logoColor2,
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      // Group Image
                      Expanded(
                        flex: 2,
                        child: SizedBox(
                          height: 140,
                          child: FutureBuilder(
                            future: findGroupImageURL(),
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                final data = snapshot.data as String;

                                return retrieveGroupImage(context, data);
                              } else if (snapshot.hasError) {
                                debug.log(
                                    "Error Fetching Group Image Data - ${snapshot.error}");
                                return Center(
                                  child: CircularProgressIndicator(
                                      color: MyApplication
                                          .circularProgressBarColor),
                                );
                              } else {
                                return Center(
                                  child: CircularProgressIndicator(
                                      color: MyApplication
                                          .circularProgressBarColor),
                                );
                              }
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ]),
          ),
          FutureBuilder(
              future: findGroupMembersImageURLs(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  ListResult allDownloadURLs = snapshot.data! as ListResult;

                  if (allDownloadURLs.items.length > 12) {
                    List<Reference> falseImagesReferences = [];
                    int randomStartIndex =
                        Random().nextInt(allDownloadURLs.items.length - 12);
                    int randomNumberOfGroupMembers = 1 + Random().nextInt(12);

                    for (int index = randomStartIndex;
                        index < randomStartIndex + randomNumberOfGroupMembers;
                        index++) {
                      falseImagesReferences.add(allDownloadURLs.items[index]);
                    }
                    groupMembersImageReferences = falseImagesReferences;
                  } else {
                    groupMembersImageReferences = allDownloadURLs.items;
                  }

                  return createGroupMembers(context);
                } else if (snapshot.hasError) {
                  debug.log(
                      "Error Fetching Group Members Data - ${snapshot.error}");
                  return Center(
                    child: CircularProgressIndicator(
                        color: MyApplication.circularProgressBarColor),
                  );
                } else {
                  return Center(
                    child: CircularProgressIndicator(
                        color: MyApplication.circularProgressBarColor),
                  );
                }
              }),
          const SizedBox(
            height: 5,
          ),
        ],
      ),
    );
  }
}
