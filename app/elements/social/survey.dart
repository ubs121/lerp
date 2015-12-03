import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';

/**
 * Санал асуулгын форм
 * 
 * TODO: Асуултын эрэмбэ өөрчлөх, шууд тоог нь засаж болно
 */
@CustomTag("survey-form")
class SurveyForm extends XForm {
  @published bool real = false;
  @published bool running = false;
  
  Map questionCols = toObservable({
    "Sequence": 1,
    "Question": "",
    "AnswerType": ["m2o","m2m","fill","rating"],
    "Answers": []
  });
  
  Element backDrop = new Element.html("<div class='modal-backdrop fade in'></div>");
  
  SurveyForm.created() : super.created() {
    
  }
  
  
  attached() {
    super.attached();
  }
  
  run(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();
    running = true;
    document.body.classes.add("modal-open");
    document.body.children.add(backDrop);
  }
  
  
  /// Асуулгыг дуусгах, үр дүнг хадгалах
  finish(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();
    
    // жинхэнэ асуулга бол үр дүнг хадгалах хэрэгтэй
    if (real) {
      Map fb = {};
      fb['Survey'] = data.current['_id'];
      fb['User'] = data.context.user;
      fb['Date'] = new DateTime.now().toString().substring(0, 19);
      
      // Формоос хариултыг ялгаж авах
      List<Map> answers = [];
      
      Element formFb = shadowRoot.querySelector("#feedbackForm");
      
      // m2o, m2m төрлийн асуултууд
      List<InputElement> inps = formFb.querySelectorAll("input");
      for (InputElement inp in inps) {
        if (inp.checked) {
          answers.add({
            'Question': inp.attributes['qid'],
            'Answer': inp.attributes['data-msg']
          });
        }
      }
      
      // ratings төрлийн асуултууд
      List<XRatings> rts = formFb.querySelectorAll("x-ratings");
      for (XRatings rt in rts) {
        answers.add({
          'Question': rt.attributes['qid'],
          'Answer': rt.value 
        });
      }
      
      // fill төрлийн асуултууд
      List<TextAreaElement>  tas = formFb.querySelectorAll("textarea");
      for (TextAreaElement ta in tas) {
        answers.add({
          'Question': ta.attributes['qid'],
          'Answer': ta.value 
        });
      }
      
      fb['Answers'] = answers;
      
      data.context.call("plus/survey/feedback/${data.current['_id']}", data: fb).then((resp) {
        window.alert("Танд баярлалаа");
      }).catchError( (e) {
        window.alert("Таны хариултыг хадгалж чадсангүй ${e}");
      });
      
    }
    
    close(e, detail, target);
  }
  
  close(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();
    running = false;
    document.body.classes.remove("modal-open");
    backDrop.remove();
  }
}