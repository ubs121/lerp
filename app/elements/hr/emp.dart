import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';
import 'package:lerp/core.dart';

/**
 * Ажилтан
 */
@CustomTag("emp-form")
class EmpForm extends XForm {
  @observable String tab = '#/emp';

  EmpForm.created() : super.created() {
  }

  attached() {
    super.attached();
  }

  // таб солих
  showTab(Event e, var detail, AnchorElement target) {
    e.preventDefault();
    e.stopPropagation();

    tab = target.hash;
  }

  saveAsUserPhoto(Event e, String fileName, XFile target) {
    e.preventDefault();
    e.stopPropagation();

    // ажилтны зургийг давхар регистрээр нь хадгална
    data.context.uploadFile("${data.current['_id']}", target.binaryData).then((resp) {
      //data.current['Photo'] = data.current['_id'];
    }).catchError((e) {
      window.alert("Алдаа ${e}");
    });
  }

  // personal loaded
  calcAge(Event e, var detail, RecordSet target) {
    // data.current['Birthday'] дээр үндэслэн насыг тооцоолох
    DateTime dob;
    try {
      dob = DateTime.parse(target.current['Birthday']);
      DateTime now = new DateTime.now();
      int years = now.year - dob.year;
      if (now.month < dob.month) {
        years--;
      }
      target.current['Age'] = years;
    } catch (e) {
    }
  }

  // ажилласан жилийг тооцох
  calcWorkedYear(Event e, var detail, RecordSet target) {
   DateTime joinedDate;
   try {
     joinedDate = DateTime.parse(data.current['JoinedDate']);
     DateTime now = new DateTime.now();
     int years = now.year - joinedDate.year;
     if (now.month < joinedDate.month) {
       years--;
     }
     data.current['WorkingYearHere'] = years;
   } catch (e) {
     print("Ажилласан жил тооцоолоход алдаа гарлаа: " + e.toString());
   }
  }

  onJobChange(Event e, var detail, Element target) {
    e.preventDefault();

    String jobId = detail;
    for (Map o in $['rsJob'].rs) {
      if (o['_id'] == jobId) {
        data.current['Position'] = o['Name'];
        break;
      }
    }

  }
  /*
  onNewAppraisal(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();

    RecordSet rs = $['rsPerf'];
    rs.current['Employee'] = {'_id': data.current['_id'], 'Name': data.current['Name']};
  }

  onNewTraining(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();

    RecordSet rs = $['rsTraining'];
    rs.current['Employee'] = {'_id': data.current['_id'], 'Name': data.current['Name']};
  }

  onNewContract(Event e, var detail, Node target) {
    e.preventDefault();
    e.stopPropagation();

    RecordSet rs = $['rsContract'];
    rs.current['Employee'] = {'_id': data.current['_id'], 'Name': data.current['Name']};
  }*/

}
