import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';

/**
 * форм
 * 
 */
@CustomTag("user-form")
class UserForm extends XForm  {
  UserForm.created() : super.created() {
    
  }
  
  attached() {
    super.attached();
  }
  
  // ажилтны мэдээллээс нэмэлт мэдээлэл олох
  updateFromEmp(Event e, var detail, Node target) {
    e.preventDefault();
    
    if (data.current['_id'] == null) {
      window.alert("ID талбарт регистрийн дугаар оруулна уу!");
      return;
    }
    
    data.context.call("db/findId/Employee/${data.current['_id']}").then((resp){
      data.current['Name'] = resp['Name'];
      data.current['Email'] = resp['WorkEmail'];
      data.current['Dept'] = resp['Dept'];
    }).catchError((e){
      window.alert("Алдаа ${e}");
    });
  }
}
