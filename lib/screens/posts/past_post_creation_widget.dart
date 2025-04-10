import 'package:alco/controllers/post_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:developer' as debug;

import '../../main.dart';
import 'package:video_player/video_player.dart';

class PastPostCreationWidget extends StatelessWidget {
  PostController postController = PostController.postController;
  TextEditingController whereWereYouController = TextEditingController();
  TextEditingController whoWereYouWithController = TextEditingController();
  TextEditingController whatHappenedController = TextEditingController();

  // I'm not sure where to dispose these controllers.
  VideoPlayerController? whereWereYouVideoController;
  VideoPlayerController? whoWereYouWithVideoController;
  VideoPlayerController? whatHappenedVideoController;

  double uploadIconsSize = 50;
  Color uploadIconColor = MyApplication.logoColor2;

  PastPostCreationWidget();

  Widget buildPlayIcon(bool forVideo, String url) {
    return Expanded(
      child: SizedBox(
        height: MyApplication.alarmIconFontSize,
        width: MyApplication.alarmIconFontSize,
        child: IconButton(
          onPressed: () {
            // Play record or video
            debug.log('play button pressed...');

            // Play Video On Button Click.
            if (forVideo) {
            }
            // Play Record On Button Click.
            else {}
          },
          icon: Icon(
            Icons.play_circle,
            color: MyApplication.logoColor1,
            size: MyApplication.alarmIconFontSize,
          ),
        ),
      ),
    );
  }

  Widget buildVideoDisplay(int questionNumberIndex) {
    Widget? widget;
    /*
    switch (questionNumberIndex) {
      case 0:
        if (whereWereYouVideoController != null) {
          widget = VideoPlayer(whereWereYouVideoController);
        }
        break;
      case 1:
        if (whoWereYouWithVideoController != null) {
          widget = VideoPlayer(whoWereYouWithVideoController);
        }
        break;
      case 2:
        if (whatHappenedVideoController != null) {
          widget = VideoPlayer(whatHappenedVideoController);
        }
    } */

    if (widget == null) return const SizedBox.square();

    return Builder(builder: (context) {
      return SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height / 1.8,
        child: widget,
      );
    });
  }

  void disposeVideoControllers() {
    if (whereWereYouVideoController != null) {
      whereWereYouVideoController!.dispose();
    }
    if (whoWereYouWithVideoController != null) {
      whoWereYouWithVideoController!.dispose();
    }
    if (whatHappenedVideoController != null) {
      whatHappenedVideoController!.dispose();
    }
  }

  Widget whereWereYouDisplayImage() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: AspectRatio(
        aspectRatio: 2 / 2,
        child: Container(
          //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
          decoration: BoxDecoration(
            color: Colors.orange,
            borderRadius: BorderRadius.circular(20),
            image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(postController.whereWereYouImageURL)),
          ),
        ),
      ),
    );
  }

  Widget whereWereYouDisplay() {
    // Where were you? Image Uploaded
    if (postController.whereWereYouImage != null &&
        postController.whereWereYouImageURL.isNotEmpty) {
      // whereWereYouController.clear();
      disposeVideoControllers();
      // postController.clearForWhereWereYouImage();
      return whereWereYouDisplayImage();
    }
    // Where were you? Voice Record Uploaded
    else if (postController.whereWereYouVoiceRecord != null &&
        postController.whereWereYouVoiceRecordURL.isNotEmpty) {
      // whereWereYouController.clear();
      disposeVideoControllers();
      // postController.clearForWhereWereYouVoiceRecord();
      return buildPlayIcon(false, postController.whereWereYouVoiceRecordURL);
    }
    // Where were you? Video Uploaded
    else if (postController.whereWereYouVideo != null &&
        postController.whereWereYouVideoURL.isNotEmpty) {
      // whereWereYouController.clear();
      // postController.clearForWhereWereYouVideo();
      return buildVideoDisplay(0);
    } else {
      // Where were you? Text Written
      return const SizedBox.shrink();
    }
  }

  Widget whereWereYouUploadIcons() {
    return Row(
      children: [
        Expanded(
          child: IconButton(
            onPressed: () {
              postController.chooseWhereWereYouImageFromGallery();
            },
            icon: const Icon(Icons.image),
            iconSize: uploadIconsSize,
            color: uploadIconColor,
          ),
        ),
        Expanded(
            child: IconButton(
          onPressed: () {},
          icon: const Icon(Icons.mic),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.pickWhereWereYouVideo(ImageSource.gallery);
            if (postController.whereWereYouVideo != null) {
              whereWereYouVideoController =
                  VideoPlayerController.file(postController.whereWereYouVideo!);
              whereWereYouVideoController!.initialize();
              whereWereYouVideoController!.setVolume(10);
              whereWereYouVideoController!.setLooping(false);
            }
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  Widget whoWereYouWithDisplayImage() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: AspectRatio(
        aspectRatio: 2 / 2,
        child: Container(
          //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
          decoration: BoxDecoration(
            color: Colors.orange,
            borderRadius: BorderRadius.circular(20),
            image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(postController.whoWereYouWithImageURL)),
          ),
        ),
      ),
    );
  }

  Widget whoWereYouWithDisplay() {
    // Who were you with? Image Uploaded
    if (postController.whoWereYouWithImage != null &&
        postController.whoWereYouWithImageURL.isNotEmpty) {
      // whoWereYouWithController.clear();
      disposeVideoControllers();
      // postController.clearForWhoWereYouWithImage();
      return whoWereYouWithDisplayImage();
    }
    // Who were you with? Voice Record Uploaded
    else if (postController.whoWereYouWithVoiceRecord != null &&
        postController.whoWereYouWithVoiceRecordURL.isNotEmpty) {
      // whoWereYouWithController.clear();
      disposeVideoControllers();
      // postController.clearForWhoWereYouWithVoiceRecord();
      return buildPlayIcon(false, postController.whoWereYouWithVoiceRecordURL);
    }
    // Who were you with? Video Uploaded
    else if (postController.whoWereYouWithVideo != null &&
        postController.whoWereYouWithVideoURL.isNotEmpty) {
      // whoWereYouWithController.clear();
      // postController.clearForWhoWereYouWithVideo();
      return buildVideoDisplay(1);
    } else {
      // Who were you with? Text Written
      return const SizedBox.shrink();
    }
  }

  Widget whoWereYouWithUploadIcons() {
    return Row(
      children: [
        Expanded(
          child: IconButton(
            onPressed: () {
              postController.chooseWhoWereYouWithImageFromGallery();
            },
            icon: const Icon(Icons.image),
            iconSize: uploadIconsSize,
            color: uploadIconColor,
          ),
        ),
        Expanded(
            child: IconButton(
          onPressed: () {},
          icon: const Icon(Icons.mic),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.pickWhoWereYouWithVideo(ImageSource.gallery);

            if (postController.whoWereYouWithVideo != null) {
              whoWereYouWithVideoController = VideoPlayerController.file(
                  postController.whoWereYouWithVideo!);
              whoWereYouWithVideoController!.initialize();
              whoWereYouWithVideoController!.setVolume(10);
              whoWereYouWithVideoController!.setLooping(false);
            }
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  Widget whatsHappenedDisplay() {
    // What happened? Voice Record Uploaded
    if (postController.whatHappenedVoiceRecord != null &&
        postController.whatHappenedVoiceRecordURL.isNotEmpty) {
      // whatHappenedController.clear();
      disposeVideoControllers();
      // postController.clearForWhatHappenedVoiceRecord();
      return buildPlayIcon(false, postController.whatHappenedVoiceRecordURL);
    }
    // What happened? Video Uploaded
    else if (postController.whatHappenedVideo != null &&
        postController.whatHappenedVideoURL.isNotEmpty) {
      // whatHappenedController.clear();
      // postController.clearForWhatHappenedVideo();
      return buildVideoDisplay(2);
    }

    // What happened? Text Written
    return const SizedBox.shrink();
  }

  Widget whatsHappenedUploadIcons() {
    return Row(
      children: [
        Expanded(
            child: IconButton(
          onPressed: () {},
          icon: const Icon(Icons.mic),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.pickWhatHappenedVideo(ImageSource.gallery);

            if (postController.whatHappenedVideo != null) {
              whatHappenedVideoController =
                  VideoPlayerController.file(postController.whatHappenedVideo!);
              whatHappenedVideoController!.initialize();
              whatHappenedVideoController!.setVolume(10);
              whatHappenedVideoController!.setLooping(false);
            }
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Create Post',
            style: TextStyle(
                fontSize: MyApplication.infoTextFontSize,
                color: MyApplication.attractiveColor1)),
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          iconSize: 20,
          color: MyApplication.logoColor2,
          onPressed: (() {
            Get.back();
          }),
        ),
        elevation: 0,
      ),
      body: SafeArea(
          child: Container(
        decoration: const BoxDecoration(color: Colors.black),
        child: ListView(
          children: [
            Container(
              height: 100,
              width: 100,
              decoration: const BoxDecoration(
                image: DecorationImage(image: AssetImage('assets/logo.png')),
                shape: BoxShape.circle,
              ),
            ),

            const SizedBox(
              height: 10,
            ),
            retrieveTextField('Where Were You?', whereWereYouController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (_) {
              return whereWereYouDisplay();
            }),
            whereWereYouUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            retrieveTextField('Who Were You With?', whoWereYouWithController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (context) {
              return whoWereYouWithDisplay();
            }),
            whoWereYouWithUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            retrieveTextField('What Happened?', whatHappenedController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (_) {
              return whatsHappenedDisplay();
            }),
            whatsHappenedUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            // Create Post
            Container(
              width: MediaQuery.of(context).size.width,
              height: 60,
              margin: const EdgeInsets.symmetric(horizontal: 5),
              decoration: BoxDecoration(
                  color: MyApplication.logoColor1,
                  borderRadius: const BorderRadius.all(
                    Radius.circular(10),
                  )),
              child: InkWell(
                onTap: () async {},
                child: const Center(
                  child: Text(
                    'Post',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 5,
            ),
          ],
        ),
      )),
    );
  }

  Widget retrieveTextField(
      String description, TextEditingController controller) {
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
}
