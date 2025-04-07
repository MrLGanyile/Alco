import '../users/alcoholic.dart';

class PastPost implements Comparable<PastPost> {
  String postId;
  Alcoholic postCreator;
  DateTime dateCreated;

  String whereWereYouText;
  String whereWereYouImageURL;
  String whereWereYouVoiceRecordURL;
  String whereWereYouVideoURL;

  String whoWereYouWithText;
  String whoWereYouWithImageURL;
  String whoWereYouWithVoiceRecordURL;
  String whoWereYouWithVideoURL;

  String whatHappenedText;
  String whatHappenedVoiceRecordURL;
  String whatHappenedVideoURL;

  PastPost(
      {required this.postId,
      required this.postCreator,
      required this.dateCreated,
      this.whereWereYouImageURL = '',
      this.whereWereYouText = '',
      this.whereWereYouVoiceRecordURL = '',
      this.whereWereYouVideoURL = '',
      this.whoWereYouWithText = '',
      this.whoWereYouWithImageURL = '',
      this.whoWereYouWithVoiceRecordURL = '',
      this.whoWereYouWithVideoURL = '',
      this.whatHappenedText = '',
      this.whatHappenedVoiceRecordURL = '',
      this.whatHappenedVideoURL = ''});

  Map<String, dynamic> toJson() => {
        'postId': postId,
        'postCreator': postCreator.toJson(),
        'dateCreated': dateCreated
      };

  factory PastPost.fromJson(dynamic json) => PastPost(
      postId: json['postId'],
      postCreator: Alcoholic.fromJson(json['postCreator']),
      dateCreated: json['dateCreated']);

  @override
  int compareTo(PastPost other) {
    return dateCreated.compareTo(other.dateCreated);
  }
}
