library plus.group;

import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';

@CustomTag("plus-group")
class PlusGroup extends XKanban {
  PlusGroup.created() : super.created();

  attached() {
    super.attached();
  }

  bool isFollowing(Map g) {
    if (g.containsKey("Followers")
        && g['Followers'].contains(data.context.user)) {
      return true;
    }
    return false;
  }

  /// дагах
  follow(Event e, var detail, Element target) {
    e.preventDefault();

    String groupId = target.attributes['data-msg'];

    data.context.call('plus/follow/${groupId}').then((resp) {
      if (!resp.containsKey("Error")) {
        // followed
        //isFollowing = true;
      }
    }).catchError((e) {
      //
    });
  }

  /// болих
  unfollow(Event e, var detail, Element target) {
    e.preventDefault();

    String groupId = target.attributes['data-msg'];

    data.context.call('plus/unfollow/${groupId}').then((resp) {
      if (!resp.containsKey("Error")) {
        // unfollowed
        //isFollowing = false;
      }
    }).catchError((e) {
      //
    });
  }


}

@CustomTag("group-form")
class GroupForm extends XForm {
  @observable bool isFollowing = false;

  GroupForm.created() : super.created() {

  }

  attached() {
    super.attached();

    if (data.current != null) {
      if (data.current.containsKey("Followers")
          && data.current['Followers'].contains(data.context.user)) {
        isFollowing = true;
      } else {
        isFollowing = false;
      }
    }
  }


  /// дагах
  follow(Event e, var detail, Element target) {
    e.preventDefault();

    data.context.call('plus/follow/${data.current['_id']}').then((resp) {
      if (!resp.containsKey("Error")) {
        // followed
        isFollowing = true;
      }
    }).catchError((e) {
      //
    });
  }

  /// болих
  unfollow(Event e, var detail, Element target) {
    e.preventDefault();

    data.context.call('plus/unfollow/${data.current['_id']}').then((resp) {
      if (!resp.containsKey("Error")) {
        // unfollowed
        isFollowing = false;
      }
    }).catchError((e) {
      //
    });
  }
}
