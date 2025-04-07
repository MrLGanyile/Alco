import 'package:alco/models/locations/converter.dart';
import 'package:alco/models/locations/section_name.dart';
import 'package:alco/models/users/group.dart' as alias;
import 'package:flutter_test/flutter_test.dart';

void main() {
  late final alias.Group validGroup;
  const String groupCreatorPhoneNumber = "+27612345678";
  const String host = 'umlazi';

  //Pre-Tests
  setUp(() => null); // Called Prior Each Test [Multiple Times]

  // Called Prior All Test [One Time]
  setUpAll(() {
    validGroup = alias.Group(
        groupName: 'Izinja',
        groupImageURL:
            '/$host/groups_specific_locations/$groupCreatorPhoneNumber.jpg',
        groupArea: Converter.toSupportedArea(
            SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica),
        groupTownOrInstitution: Converter.toSupportedTownOrInstitution(
            SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica),
        groupCreatorPhoneNumber: groupCreatorPhoneNumber,
        groupCreatorImageURL:
            '/$host/group_members/$groupCreatorPhoneNumber/profile_images/$groupCreatorPhoneNumber.jpg',
        groupCreatorUsername: 'Sebenzile',
        groupMembers: [groupCreatorPhoneNumber, '+27712345678', '+27812345678'],
        maxNoOfMembers: 5);
  });

  // Test Description Guide - Given, When, Then.
  // Test Body Guide - Arrange, Action, Assert.

  // Groups Can Be Nasted.
  group('Group Class -', () {
    test(
        'Given A Group Class, When It Is Created, Then maxNoOfMembers Equals 5.',
        () {
      // Arrange - Already taken care of by setAll

      // Act
      final maxNoOfMembers = validGroup.maxNoOfMembers;

      // Assert
      expect(maxNoOfMembers, 5);
    });

    test(
        'Given A Group Class, When A Member That Do Not Exist Is Removed, Then The Operation Should Fail.',
        () {
      // Act
      final result = validGroup.removeMember('+27710000000');

      // Assert
      expect(result, false);
    });

    test(
        'Given A Group Class, When A Member That Exist Is Removed, Then The Operation Should Pass.',
        () {
      // Act
      final result = validGroup.removeMember('+27712345678');

      // Assert
      expect(result, true);
    });

    test(
        'Given A Group Class, When It Creator Member Is Removed, Then The Operation Should Fail.',
        () {
      // Act
      final result = validGroup.removeMember(groupCreatorPhoneNumber);

      // Assert
      expect(result, false);
    });
  });

  // Post-Tests
  tearDown(() => null); // Called After Each Test [Multiple Times]
  tearDownAll(() => null); // // Called After All Test [One Time]
}
