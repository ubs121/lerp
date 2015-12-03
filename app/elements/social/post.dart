library plus.post;

import 'dart:html';
import 'dart:typed_data';
import 'package:polymer/polymer.dart';
import 'package:lerp/core.dart';
import 'survey.dart';

/**
 * Plus нүүр
 */
@CustomTag("plus-post")
class PlusPost extends PolymerElement {
  @published 
  UserContext context;

  // panel-н дээр байрлах post эсэх (шинэ post үүсгэх зориулалттай)
  @published bool top = false;
  @published bool editing = false;
  @observable Map post;
  @observable List likes;
  @observable List comments;

  // нэмэлт туслах өгөгдлүүд
  @published RecordSet groupData, eventData, surveyData;

  @observable bool mouseOver = false;

  PlusPost.created() : super.created() {
    post = toObservable({});
    likes = toObservable([]);
    comments = toObservable([]);
    
    this.onMouseOver.listen((e) => mouseOver = true);
    this.onMouseLeave.listen((e) => mouseOver = false);
  }

  attached() {
    super.attached();
  }


  postChanged(Map oldValue) {
    if (post.containsKey("Likes")) {
      likes = toObservable(post['Likes']);
    } else {
      likes = toObservable([]);
    }

    if (post.containsKey("Comments")) {
      // sort comments
      List lst = post['Comments'];
      lst.sort((a, b) => b['Date'].compareTo(a['Date']));
      comments = toObservable(lst);
    } else {
      comments = toObservable([]);
    }
  }

  edit(Event e, var comment, Element target) {
    e.preventDefault();
    editing = true;

    post['Text'] = "${post['Name']}\n${post['Text']}";

    // шинэ post-н хувьд төрлийг тогтоох
    if (!post.containsKey("_id")) {
      String type = target.attributes["data-msg"];
      if (type != null) {
        post["Type"] = type;
      } else {
        post["Type"] = "news";
      }
    }

    // TODO: to сонголт дээр зөвхөн дагаж байгаа групп харагдана
  }

  cancelEvent(Event e) {
    e.preventDefault();
    e.stopPropagation();
  }


  /// Хадгалах
  save(Event e, var detail, Node target) {
    cancelEvent(e);

    // <h3 contenteditable="true">{{obj['Name']}}</h3>
    // likes, comments хамт хадгалагдана

    // эхний мөрийг гарчиг болгон авах
    String strContent = post['Text'];
    int lineSep = strContent.indexOf('\n');
    if (lineSep > 0) {
      post['Name'] = strContent.substring(0, lineSep);
      post['Text'] = strContent.substring(lineSep + 1);
    }
    post['User'] = context.user;
    post['Date'] = new DateTime.now().toString().substring(0, 10);

    context.call('db/save/Post', data: post).then((resp) {
      post['_id'] = resp;

      fire("savepost", detail: post);
      editing = false;
    }).catchError((e) {
      window.alert(e.toString());
    });
  }

  cancelEdit(Event e, var detail, Node target) {
    cancelEvent(e);

    editing = false;

    fire("cancelpost");
  }


  /// комментийг баазад хадгалах
  onComment(Event e, var comment, Node target) {
    cancelEvent(e);

    context.call('plus/comment/${post['_id']}', data: comment).then((resp) {
      // алдаа гараагүй бол OK
    }).catchError((e) {
      // баазад хадгалж чадаагүй бол буцаан хасах
      comments.removeAt(0);
    });
  }

  ///  like/dislike
  onPlus(Event e, var detail, Node target) {
    cancelEvent(e);

    context.call('plus/like/${post['_id']}').then((resp) {
      if (resp["User"] != "") {
        likes.insert(0, resp);
      } else {
        for (int i = 0; i < likes.length; i++) {
          if (likes[i]["User"] == context.user) {
            likes.removeAt(i);
            break;
          }
        }
      }
    }).catchError((e) {
      print(e);
    });

  }

  /// Файл хавсаргах
  attach(Event e, var detail, InputElement target) {
    cancelEvent(e);

    FileReader reader = new FileReader();
    reader.onLoad.listen((e1) {

      String attachId = new DateTime.now().millisecondsSinceEpoch.toRadixString(16);
      attachId = attachId + "_" + target.files.first.name;

      // upload file
      var dat = new ByteData.view(reader.result);
      context.uploadFile("Post/${attachId}", dat).then((resp) {
        post['Attachment'] = attachId;
      }).catchError((e) {
        window.alert("Алдаа " + e);
      });

    });

    reader.readAsArrayBuffer(target.files.first);
  }

  profile(Event e, var detail, Node target) {
    // TODO: хэрэглэгчийн profile-руу үсрэх
  }


  // delete post
  delete(Event e, var detail, Node target) {
    e.preventDefault();

    if (window.confirm("Энэ мэдээг устгах уу?")) {
      print("notify to delete ${post['_id']}");
      // дээш мэдээлэх
      fire("deletepost", detail: post["_id"]);
    }

  }

  eventSubscribe(Event e, var detail, ButtonElement target) {
    e.preventDefault();

    if (post['Event'] == null) return;

    String yN = target.attributes['data-msg'];
    String method = 'subscribe';
    if (yN == 'no') {
      method = 'unsubscribe';
    }

    context.call('plus/${method}/${post['Event']['_id']}').then((resp) {
      if (resp == "Dup") {
        window.alert("Та өмнө бүртгүүлсэн байна!");
      } else {
        if (method == 'subscribe') {
          window.alert("Таныг бүртгэлээ!");
        } else {
          window.alert("Таныг бүртгэлээс хаслаа!");
        }
      }
    }).catchError((e) {
      window.alert("Алдаа ${e}");
    });

  }

  surveyFeedback(Event e, var detail, ButtonElement target) {
    e.preventDefault();
    
    String surveyId = target.attributes['data-msg'];
    SurveyForm sForm = new Element.tag("survey-form");
    sForm.real = true;
    sForm.data = surveyData;

    // fetch survey & run
    surveyData.findOne(surveyId).then((_) {
      sForm.run(e, detail, target);
      document.body.children.add(sForm);
    }).catchError((e) {
      window.alert("Алдаа ${e}");
    });


  }

}
