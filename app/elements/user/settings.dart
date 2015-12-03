import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/core.dart';

/**
 * Тохиргооны хуудас
 * 
 */
@CustomTag("user-settings")
class UserSettings extends NavPage {
  
  UserSettings.created() : super.created() {
    page = '#/user';
  }
  
}