import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/core.dart';


@CustomTag("user-login")
class UserLogin extends PolymerElement {
  @published UserContext context;
  @observable String id = '';
  @observable String pwd = '';
  
  UserLogin.created() : super.created();
  
  void login(Event e, var detail, Node target) {
    e.preventDefault();
    
    if (id.length > 0 && pwd.length > 0) {
      if (context.login(id, pwd)) {
        fire('login');
      } else {
        window.alert("Хандалт хориотой!");
      };
    } else {
      window.alert("Нэр, нууц үгээ оруулна уу!");
    }
    
  }
}
