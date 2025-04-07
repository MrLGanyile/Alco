import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockFirestore extends Mock implements FirebaseFirestore {}

// class MockFirebaseFunctions extends Mock implements FirebaseFunctions {}

// class MockReference extends Mock implements Reference {}

// class MockFirebaseAuth extends Mock implements FirebaseAuth {}

void main() {
  //Pre-Tests
  setUp(() => null); // Called Prior Each Test [Multiple Times]

  // Called Prior All Test [One Time]
  setUpAll(() {
    // Instantiate MockFirebaseFirestore and set corresponging methods returns.

    // Instantiate MockFirebaseFunctions and set corresponging methods returns.

    // Instantiate MockReference and set corresponging methods returns.

    // Instantiate MockFirebaseAuth and set corresponging methods returns.
  });

  // Test Description Guide - Given, When, Then.
  // Test Body Guide - Arrange, Action, Assert.

  // After calling clearAll()
  group('GroupController -> clearAll() - ', () {
    // After clearAll(), value of _groupImageFile
    test(
        'Given A Group Controller Class, When It clearAll() method is invoked, Then _groupImageFile Equals Rx(null).',
        () {
      // Arrange

      // Act

      // Assert
    });

    // After clearAll(), value of _groupImageFileURL
    test(
        'Given A Group Controller Class, When It clearAll() method is invoked, Then _groupImageURL Equals Rx('
        ').', () {
      // Arrange

      // Act

      // Assert
    });

    // After clearAll(), value of _groupName
    test(
        'Given A Group Controller Class, When It clearAll() method is invoked, Then _groupName Equals Rx('
        ').', () {
      // Arrange

      // Act

      // Assert
    });

    // After clearAll(), value of _isActive
    test(
        'Given A Group Controller Class, When It clearAll() method is invoked, Then _isActive Equals Rx(true).',
        () {
      // Arrange

      // Act

      // Assert
    });

    // After clearAll(), Member1 Info
    group('Member1 Info', () {
      // After clearAll(), value of _member1ProfileImageFile
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member1ProfileImageFile Equals Rx(null).',
          () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member1ImageURL
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member1ImageURL Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member1PhoneNumber
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member1PhoneNumber Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member1Username
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member1Username Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });
    });

    // After clearAll(), Member2 Info
    group('Member2 Info', () {
      // After clearAll(), value of _member2ProfileImageFile
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member2ProfileImageFile Equals Rx(null).',
          () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member2ImageURL
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member2ImageURL Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member2PhoneNumber
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member2PhoneNumber Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member2Username
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member2Username Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });
    });

    // After clearAll(), Member3 Info
    group('Member3 Info', () {
      // After clearAll(), value of _member3ProfileImageFile
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member3ProfileImageFile Equals Rx(null).',
          () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member3ImageURL
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member3ImageURL Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member3PhoneNumber
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member3PhoneNumber Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member3Username
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member3Username Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });
    });

    // After clearAll(), Member4 Info
    group('Member4 Info', () {
      // After clearAll(), value of _member4ProfileImageFile
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member4ProfileImageFile Equals Rx(null).',
          () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member4ImageURL
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member4ImageURL Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member4PhoneNumber
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member4PhoneNumber Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _member4Username
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _member4Username Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });
    });

    // After clearAll(), leader Info
    group('Learder Info', () {
      // After clearAll(), value of _leaderProfileImageFile
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _leaderProfileImageFile Equals Rx(null).',
          () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _leaderImageURL
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _leaderImageURL Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _leaderPhoneNumber
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _leaderPhoneNumber Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });

      // After clearAll(), value of _leaderUsername
      test(
          'Given A Group Controller Class, When It clearAll() method is invoked, Then _leaderUsername Equals Rx('
          ').', () {
        // Arrange

        // Act

        // Assert
      });
    });
  });

  // After calling chooseMemberProfileImageFromGallery()
  group('GroupController -> chooseMemberProfileImageFromGallery() -', () {
    // On Image Pick Success
    group('[Image Picked]', () {
      // On Image Pick Success For Member 1
      group('Member1 Info', () {
        // On Image Pick Success For Member 1 _member1ProfileImageFile Is Set.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member1, Then _member1ProfileImageFile Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Success For Member 1 _member1ProfileImageFileURL Is Set.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member1, Then _member1ProfileImageFileURL Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Success For Member 1 _member1PhoneNumber Is Set.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member1, Then _member1PhoneNumber Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Success For Member 1 _member1Username Is Set.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member1, Then _member1Username Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Success For Member 2
      group('Member2 Info', () {
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member2, Then _member2ProfileImageFile Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member2, Then _member2ProfileImageFileURL Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member2, Then _member2PhoneNumber Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member2, Then _member2Username Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Success For Member 3
      group('Member3 Info', () {
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member3, Then _member3ProfileImageFile Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member3, Then _member3ProfileImageFileURL Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member3, Then _member3PhoneNumber Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member3, Then _member3Username Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Success For Member 4
      group('Member4 Info', () {
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member4, Then _member4ProfileImageFile Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member4, Then _member4ProfileImageFileURL Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member4, Then _member4PhoneNumber Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Member4, Then _member4Username Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Success For Leader
      group('Leader Info', () {
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Leader, Then _leaderProfileImageFile Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Leader, Then _leaderProfileImageFileURL Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Leader, Then _leaderPhoneNumber Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });

        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Picked For Leader, Then _leaderUsername Is Set.',
            () {
          // Arrange

          // Act

          // Assert
        });
      });
    });

    // On Image Pick Failuire
    group('[Image Not Picked]', () {
      // On Image Pick Failuire For Member 1
      group('Member1 Info', () {
        // On Image Pick Failuire For Member 1 _member1ProfileImageFile Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member1, Then _member1ProfileImageFile '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 1 _member1ProfileImageFileURL Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member1, Then _member1ProfileImageFileURL '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 1 _member1PhoneNumber Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member1, Then _member1PhoneNumber '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 1 _member1Username Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member1, Then _member1Username '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Failuire For Member 2
      group('Member2 Info', () {
        // On Image Pick Failuire For Member 2 _member2ProfileImageFile Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member2, Then _member2ProfileImageFile '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 2 _member2ProfileImageFileURL Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member2, Then _member2ProfileImageFileURL '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 2 _member2PhoneNumber Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member2, Then _member2PhoneNumber '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 2 _member2Username Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member2, Then _member2Username '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Failuire For Member 3
      group('Member3 Info', () {
        // On Image Pick Failuire For Member 3 _member3ProfileImageFile Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member3, Then _member3ProfileImageFile '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 3 _member3ProfileImageFileURL Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member3, Then _member3ProfileImageFileURL '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 3 _member3PhoneNumber Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member3, Then _member3PhoneNumber '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 3 _member3Username Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member3, Then _member3Username '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Failuire For Member 4
      group('Member4 Info', () {
        // On Image Pick Failuire For Member 4 _member4ProfileImageFile Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member4, Then _member4ProfileImageFile '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 4 _member4ProfileImageFileURL Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member4, Then _member4ProfileImageFileURL '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 4 _member4PhoneNumber Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member4, Then _member4PhoneNumber '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Member 4 _member4Username Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Member4, Then _member4Username '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });
      });

      // On Image Pick Failuire For Leader
      group('Leader Info', () {
        // On Image Pick Failuire For Leader _leaderProfileImageFile Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Leader, Then _leaderProfileImageFile '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Leader _leaderProfileImageFileURL Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Leader, Then _leaderProfileImageFileURL '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Leader _leaderPhoneNumber Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Leader, Then _leaderPhoneNumber '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });

        // On Image Pick Failuire For Leader _leaderUsername Remains Unchanged.
        test(
            'Given The chooseMemberProfileImageFromGallery() Method Is Invoked, '
            'When An Image Is Not Picked For Leader, Then _leaderUsername '
            'Remains Unchanged.', () {
          // Arrange

          // Act

          // Assert
        });
      });
    });
  });
  // Post-Tests
  tearDown(() => null); // Called After Each Test [Multiple Times]
  tearDownAll(() => null); // // Called After All Test [One Time]
}
