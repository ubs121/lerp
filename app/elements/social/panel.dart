library plus.panel;

import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/core.dart';
import 'post.dart';


/**
 * Plus нүүр
 */
@CustomTag("plus-panel")
class PlusPanel extends NavPage {
  @observable final Map newPost = toObservable({ "Type": "news" });
  @observable Map<String, int> postCounts;
  @observable List myGroups;
  @observable RecordSet get posts => $['rsPost']; 

  PlusPost newPostElem;
  DivElement postPanel, postStream, left, right, newPostHost;

  PlusPanel.created():super.created() {
    postCounts = {};
    myGroups = [];
  }

  attached() {
    super.attached();
    
    page = '#/all';
    
    // дэлгэцийн элементүүд
     newPostElem = $['newPost'];
     newPostHost = $['newPostHost'];
     postPanel = $["post-panel"];
     postStream = $["post-stream"];
  }

  groupLoaded(Event e, var detail, Node target) {
    print("Groups loaded !");
    
    for (Map g in $["rsGroup"].rs.where(isFollowing).toList()) {
       myGroups.add(g['_id']);
    }
    
    loadPosts();
  }
  
  

  /// дэлгэц солих
  route(Event e, var detail, AnchorElement target) {
    e.preventDefault();

    page = target.hash;

    postPanel.style.display = 'none';

    if (page == '#/group') {
    } else if (page == '#/surveyEdit') {
    } else if (page == '#/eventEdit') {
    } else {
      postPanel.style.display = 'block';

      if (page == '#/all') {
        posts.q.clear();
      } else if (page == '#/news') {
        posts.q.remove('Type');
        posts.q[r'$or'] = [{
            'Type': 'news'
          }, {
            'Type': {
              r'$exists': false
            }
          }];
      } else if (page == '#/greeting') {
        posts.q['Type'] = 'greeting';
      } else if (page == '#/idea') {
        posts.q['Type'] = 'idea';
      } else if (page == '#/event') {
        posts.q['Type'] = 'event';
      } else if (page == '#/survey') {
        posts.q['Type'] = 'survey';
      }

      //data.filter();
      loadPosts();
    }

  }

  // мэдээ бичих цонхыг голлуулж, томруулах
  focusNewPost(Event e, var detail, Element target) {
    e.preventDefault();
    newPostCenter(newPostHost);
  }

  /// шинэ мэдээг хадгалсны дараа layout дотор нэмж оруулах хэрэгтэй
  afterNewPost(Event e, var detail, Element target) {
    e.preventDefault();

    // copy newPost into p
    Map p = {};
    for (String k in newPost.keys) {
      p[k] = newPost[k];
    }

    // post-ууд руу нэмэх
    _addPost(p);

    // хадгалсаны дараа newPost-г цэвэрлэх
    newPost.clear();

    newPostBack(target);
  }


  /// мэдээ бичих цонхыг байранд нь буцаах
  cancelNewPost(Event e, var detail, Element target) {
    e.preventDefault();
    newPostBack(target);
  }

  newPostCenter(Element elem) {
    //subs.pause();

    elem.classes.remove('normalBox');
    elem.classes.add('centeredBox');
    newPostElem.editing = true;


  }

  // шинэ мэдээний цонхыг байранд нь буцаах
  newPostBack(Element elem) {
    newPostElem.editing = false;
    elem.classes.remove('centeredBox');
    elem.classes.add('normalBox');

    //subs.resume();
  }

  /// g группыг дагасан эсэх
  bool isFollowing(Map g) {
    if (g.containsKey("Followers") 
        && g['Followers'].contains(context.user)) {
      return true;
    }
    return false;
  }

  List map(List list, converter(x)) {
    final List result = [];
    for (final x in list) {
      result.add(converter(x));
    }
    return result;
  }

  ///  мэдээг тоолох
  _countNewPosts() {

    context.call("plus/postcount", data: {}).then((resp) {
        if (resp != null) {
          List lst = toObservable(resp);
          print("plus/postcount ${lst}");
          postCounts.clear();
          int total = 0;
          for (Map p in lst) {
            postCounts[p['_id']] = p['value'];
            total += p['value'];

          }
          postCounts['all'] = total;

        }
    }).catchError((e) {

    });
  }

  loadPosts() {
    postStream.children.clear();

    posts.q[r"$or"] = [{
        'To': {
          r'$exists': false
        }
      }, {
        'To': {
          r'$in': myGroups
        }
      }];

    posts.find().then((_) {
      // мэдээнүүдийг байрлуулах
      _layoutPosts();

      // мэдээний тоог харуулах
      _countNewPosts();

    });
  }

  /// post хайх
  _layoutPosts() {
    _createColumns();

    for (Map p in posts.rs) {
      _addPost(p);
    }
  }


  /// нийтлэлийг layout дотор байрлуулна
  _addPost(Map p) {
    // create a post box
    PlusPost postElem = new Element.tag("plus-post");
    postElem.classes.add("plus-box");

    postElem.groupData = $['rsGroup'];
    postElem.surveyData = $['rsSurvey'];
    postElem.eventData = $['rsEvent'];

    postElem.post = p;
    postElem.on['deletepost'].listen((e) {
      context.deleteById('Post', p['_id']).then((_) {
        postElem.remove();
      }).catchError((e) {
        window.alert("Мэдээллийг устгахад алдаа гарлаа!");
      });

    });

    // place it
    if (p['Size'] == "том" || left.children.length > 3) {
      DivElement center = new DivElement();
      center.style.width = "100%";
      center.style.clear = "left";
      center.children.add(postElem);

      postStream.children.insert(0, center);

      // new columns
      _createColumns();
    } else {
      if (left.clientHeight < right.clientHeight) {
        left.children.insert(0, postElem);
      } else {
        right.children.insert(0, postElem);
      }
    }

  }

  /// 2 багана үүсгэх
  _createColumns() {
    left = new DivElement();
    left.classes.add("post-column");
    postStream.children.insert(0, left);

    right = new DivElement();
    right.classes.add("post-column");
    postStream.children.insert(0, right);
  }



  showMore(Event e, var detail, Element target) {
    e.preventDefault();

    posts.page += 1;

    loadPosts();
  }

  showLess(Event e, var detail, Element target) {
    e.preventDefault();

    posts.page -= 1;

    if (posts.page < 0) {
      posts.page = 0;
    }

    loadPosts();
  }

}
