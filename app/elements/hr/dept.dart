import 'dart:html';
import 'dart:async';
import 'dart:js';
import 'package:polymer/polymer.dart';
import 'package:lerp/x-form.dart';

/**
 * Нэгж бүртгэх дэлгэц
 * 
 */
@CustomTag("hr-dept")
class DeptForm extends XForm {
  
  DeptForm.created() : super.created() {
    
  }
  
  
  attached() {
    super.attached();
  }
}

/**
 * Нэгжүүдийн бүтцийн зураг
 * 
 * 
the easy approach of recursion and proportional division. 

At first level of the tree, divide the target area vertically (each area here is a branch, area size depends on branch size):

+-------+-------+-------+
|       |       |       |
|       |       |       |
|       |       |       |
|       |       |       |
|       |       |       |
|       |       |       |
+-------+-------+-------+

At second level, divide horizontally:

+-------+-------+-------+
|       |       |       |
+-------+       |       |
|       +-------+       |
|       |       |       |
|       |       +-------+
|       |       |       |
+-------+-------+-------+

At third level divide vertically again:

+--+----+----+--+----+--+
|  |    |    |  |    |  |
+--+-+--+    |  |    |  |
|    |  +-+--+--+    |  |
|    |  | |     |    |  |
|    |  | |     +---++--+
|    |  | |     |   |   |
+----+--+-+-----+---+---+

Etc.

https://github.com/imranghory/treemap-squared
 */

@CustomTag("dept-chart")
class DeptChart extends XChart {
  List sbuList = [];
  var jsOptions;
  var jsTable;
  var jsChart;
  Element chartHost;

  
  DeptChart.created() : super.created() {
    type = 'org';
    chartHost = shadowRoot.querySelector("#chart");
  }
  
  
  attached() {
    super.attached();
    
   
    data.limit = 0;      
    data.find().then((_) {
      //  TODO: calculate dept sizes
      List dat = [];
      sbuList = companies();
      
      load().then((_) {
        
        for (String c in sbuList) {
          dat.clear();
          
          for (Map r in data.rs) {
            if (r['Company'] == c) {
              if (r['Parent'] == null) {
                dat.add([r['_id'], c, r['Name']]);
              } else {
                dat.add([{'v':r['_id'], 'f':r['Name'] }, r['Parent'], r['Name']]);
              }
            }
          }
          
          DivElement d = new DivElement();
          d.style.width = "100%";
          
          HeadingElement title = new HeadingElement.h2();
          title.text = "${c} компанийн бүтэц";
          
          DivElement d1 = new DivElement();
          d.children.add(title);
          d.children.add(d1);
          chartHost.children.add(d);
          draw(d1, dat);
        }
                      
        
      });

      
    }).catchError((e) {
      window.alert("${e}");
    });
    
  }
  
  
  
  static Future load() {
     Completer c = new Completer();
     context["google"].callMethod('load',
        ['visualization', '1', new JsObject.jsify({
          'packages': ['orgchart'],
          'callback': new JsFunction.withThis(c.complete)
        })]);
     return c.future;
   }

  
 
  
  draw(Element host, List data) {
    final vis = context["google"]["visualization"];
    
    jsTable = vis.callMethod('arrayToDataTable', [new JsObject.jsify(data)]);
    
    jsChart = new JsObject(vis["OrgChart"], [host]);
    jsChart.callMethod('draw', [jsTable,  new JsObject.jsify({'allowHtml':true})]);


  }
  
  /*
  /// оройн нэгжүүдийг зурж эхлэх
  drawTreeMap(Element host) {
    // TODO: Компанийн лого нэмэх, өнгө зөв сонгох
    for (String c in sbuList) {
      DivElement compDiv = new DivElement();
      //compDiv.text = c;
      //compDiv.style.background = "rgb(0,129,120)";
      compDiv.style.border = "1px solid silver";
      compDiv.style.float = "left";
      compDiv.style.width = "100%";
      compDiv.style.margin = "20px";
      compDiv.style.height = "300px";
      
      HeadingElement title = new HeadingElement.h3();
      title.text = "${c} компанийн бүтэц";
      host.children.add(title);
      host.children.add(compDiv);
      
      // толгой нэгжүүд
      List rootDepts = deptsByParent(null, c);
      
      for (Map d in rootDepts) {
        addDept(d, compDiv, 100/rootDepts.length, true);
      }
    }
        
  }
  
  
  /// add depts into chart
  addDept(Map d, Element host, num size, bool vertical) {
    DivElement div = new DivElement();
    div.text = abbrName(d);
    div.style.minHeight = "120px";
    div.style.background = "#5CB85C"; // нэгжийн өнгө
    div.style.border = "1px solid black";
    //div.style.padding = "5px";
    
    if (vertical) {
      div.style.float = "left";
      div.style.width = "${size}%";
      div.style.height = "100%";
    } else {
      div.style.width = "100%";
      div.style.height = "${size}%";
    }
    
    host.children.add(div);
    
    // get children, sort by size
    List children = deptsByParent(d['_id'], d['Company']);
    for (Map c in children) {
      addDept(c, div, 100/children.length, !vertical);
    }google.load('visualization', '1', {packages:['orgchart']});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');
        data.addRows([
          [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
          [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
          ['Alice', 'Mike', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', '']
        ]);
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        chart.draw(data, {allowHtml:true});
    
    
    
  }
  */
  
  /// компаниудыг олох
  List companies() {
    List comps = [];
    for (Map d in data.rs) {
      if (!comps.contains(d['Company'])) {
        comps.add(d['Company']);
      }
    }
    return comps; 
  }
  
  /// нэгжүүдийг олох
  List<Map> deptsByParent(String parent, String company) {
    List<Map> depts = [];
    for (Map d in data.rs) {
      if (d['Parent'] == parent && d['Company'] == company) {
        depts.add(d);
      }
    }
    return depts; 
  }
  
  /// нэгжийн нэрийг товчлох
  String abbrName(Map dept) {
    if (dept['Name'] != null) {
     String deptName = dept['Name'];
     if (deptName.length > 10) {
       List nameParts = deptName.split(' ');
       StringBuffer sb = new StringBuffer();
       for (String np in nameParts) {
         if (np.length > 0) {
          sb.write(np[0].toUpperCase());
         }
       }
       
       return sb.toString();
     } else {
       return deptName;
     }
    }
    return dept['_id'];
  }
}