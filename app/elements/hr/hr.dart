import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/core.dart';

/**
 * HR нүүр хуудас
 */
@CustomTag("hr-home")
class HrHome extends NavPage {
  @observable Map last2month = toObservable({});
  
  HrHome.created() : super.created() {
    // сүүлийн 2 сарын ирц харуулах
    DateTime dt = new DateTime.now().subtract(new Duration(days: 30));
    last2month = toObservable({'Date': {r'$gt': dt.toString().substring(0, 7)} });
  }

  attached() {
    super.attached();
  }
  
  bool hasRole() {
    for (String r in context.roles) {
      if (r.startsWith("hr") || r == "holding") {
        return true;
      }
    }
    return false; 
  }
 
  route(Event e, var detail, AnchorElement target) {
    page = target.hash;
  }
}