class SelectionClock {
  int passedTime;
  int multiple;

  SelectionClock({required this.passedTime, required this.multiple});

  factory SelectionClock.fromJson(dynamic json) => SelectionClock(
      passedTime: json["passedTime"], multiple: json['multiple']);
}
