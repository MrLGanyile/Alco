class ReadOnlyClock {
  int remainingTime;

  ReadOnlyClock({
    required this.remainingTime,
  });

  factory ReadOnlyClock.fromJson(dynamic json) => ReadOnlyClock(
        remainingTime: json["remainingTime"],
      );
}
