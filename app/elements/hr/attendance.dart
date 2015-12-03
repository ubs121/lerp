import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';

@CustomTag("att-form")
class AttForm extends XForm {
  @observable List actionOpts = toObservable(["орсон","гарсан"]);
  
  AttForm.created() : super.created() {
  }
  
  attached() {
    super.attached();
  }
  
}


/**
 * Амралт, чөлөөний форм
 */
@CustomTag("leave-form")
class LeaveForm extends XForm {
  
  @observable 
  List typeOpts = toObservable([
    "Цагийн чөлөө",
    "Өвчний чөлөө (цалингүй)",
    "Өвчний чөлөө (лист)",
    "Жирэмсний амралт",
    "Хүүхэд харах чөлөө (цалинтай)",
    "Хүүхэд харах чөлөө (цалингүй)",
    "Гэрлэлт",
    "Ар гэрийн гачигдал",
    "Ээлжийн амралт",
    "Бусад"]);
  
  

  @observable 
  Map leaveDefaults = toObservable({
     'DateFrom': '1900-01-01',
     'TimeFrom': '09:00',
     'State': 'ноорог',
     'Name': 'Цагийн чөлөө'
   });
  
  LeaveForm.created() : super.created() {
    leaveDefaults['Employee'] ={
      "_id": data.context.user,
      "Name": data.context.name
    };
    leaveDefaults['DateFrom'] = new DateTime.now().toString().substring(0, 10);
  }
  
  attached() {
    super.attached();
  }
  
  // чөлөөг илгээх
  send(Event e, var detail, Node target) {
    e.preventDefault();
    
    data.current['State'] = 'хүсэлт';
    
    data.save().then((id) {
      // start request
      data.context.call("wf/leave/start/${id}").then((resp){
        window.alert("Чөлөөг илгээлээ");
      }).catchError((ex) {
        window.alert("Чөлөө илгээхэд алдаа гарлаа! ${ex}");
      });
      
    }).catchError((ex) {
      window.alert("Чөлөөг хадгалахад алдаа гарлаа! ${ex}");
    });
    
  }
  
//  // чөлөөг зөвшөөрөх
//  approve(Event e, var detail, Node target) {
//    e.preventDefault();
//    
//    if (data.current['State'] == 'зөвшөөрсөн') {
//      data.current['State'] = 'зөвшөөрсөн1';
//      data.save();
//    } else {
//      data.current['State'] = 'зөвшөөрсөн';
//      
//      if (data.current['Duration'] > 3 * 8) {
//        // 3 хоногоос дээш бол захирал (manager2) нэмэгдэнэ
//        user.call("hr/mgr/${data.current['Manager1']}").then((resp){
//          if (resp['Error']==null) {
//            data.current['Manager2'] = resp["Result"];
//            data.save();
//          } else {
//            window.alert("Нэгжийн удирдлага тодорхойгүй байна!");
//          }
//        }).catchError((e){
//          window.alert("Чөлөө илгээхэд алдаа гарлаа!");
//        });
//      } else {
//        data.save();
//      }
//    }
//    
//    
//  }
  
//  // татгалзах
//  refuse(Event e, var detail, Node target) {
//    e.preventDefault();
//    
//    data.current['State'] = 'татгалзсан';
//    data.save();
//  }
}