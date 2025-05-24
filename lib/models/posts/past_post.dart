import '../users/alcoholic.dart';
import '../users/user.dart';

class PastPost implements Comparable<PastPost> {
  String postId;
  Alcoholic postCreator;
  DateTime? dateCreated;

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
      this.dateCreated,
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
        'dateCreated': dateCreated,
        'whereWereYouText': whereWereYouText,
        'whereWereYouImageURL': whereWereYouImageURL,
        'whereWereYouVoiceRecordURL': whereWereYouVoiceRecordURL,
        'whereWereYouVideoURL': whereWereYouVideoURL,
        'whoWereYouWithText': whoWereYouWithText,
        'whoWereYouWithImageURL': whoWereYouWithImageURL,
        'whoWereYouWithVoiceRecordURL': whoWereYouWithVoiceRecordURL,
        'whoWereYouWithVideoURL': whoWereYouWithVideoURL,
        'whatHappenedText': whatHappenedText,
        'whatHappenedVoiceRecordURL': whatHappenedVoiceRecordURL,
        'whatHappenedVideoURL': whatHappenedVideoURL
      };

  factory PastPost.fromJson(dynamic json) => PastPost(
        postId: json['postId'],
        postCreator: Alcoholic.fromJson(json['postCreator']),
        dateCreated: json['dateCreated'],
        whereWereYouText: json['whereWereYouText'],
        whereWereYouImageURL: json['whereWereYouImageURL'],
        whereWereYouVoiceRecordURL: json['whereWereYouVoiceRecordURL'],
        whereWereYouVideoURL: json['whereWereYouVideoURL'],
        whoWereYouWithText: json['whoWereYouWithText'],
        whoWereYouWithImageURL: json['whoWereYouWithImageURL'],
        whoWereYouWithVoiceRecordURL: json['whoWereYouWithVoiceRecordURL'],
        whoWereYouWithVideoURL: json['whoWereYouWithVideoURL'],
        whatHappenedText: json['whatHappenedText'],
        whatHappenedVoiceRecordURL: json['whatHappenedVoiceRecordURL'],
        whatHappenedVideoURL: json['whatHappenedVideoURL'],
      );

  @override
  int compareTo(PastPost other) {
    return dateCreated!.compareTo(other.dateCreated!);
  }
}
