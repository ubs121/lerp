// Copyright 2013 ubs121
package hr

import (
	"errors"
	"fmt"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
	"lerp/db"
	"memex/rpc"
	"net/http"
	"time"
)

const colWfAction string = "wf_ActionRequest"

// wf/leave/start/{id}
func LeaveStart(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("Leave")
	q := c.FindId(vars["id"])

	var leaveObj bson.M
	if err = q.One(&leaveObj); err != nil {
		rpc.WriteJson(r, w, nil, errors.New("Чөлөөний мэдээлэл олдсонгүй!"))
		return
	}

	// хүсэлтэд санамсаргүй дугаар үүсгэх
	actionRequestId := bson.NewObjectId().Hex()
	approveUrl := "http://localhost:8000/wf/approve/" + actionRequestId
	rejectUrl := "http://localhost:8000/wf/reject/" + actionRequestId

	c1 := db.C(colWfAction)
	c1.Insert(bson.M{
		"_id":     actionRequestId,
		"LeaveId": vars["id"],
		"Date":    time.Now().String()[:19],
		"Active":  true})

	// Э-мэйл загвар
	msg := fmt.Sprintf(`<p>Танд чөлөөний хүсэлт ирлээ.</p>
	<br/>
	--------------------------
	<br/>
	<strong>Чөлөөний төрөл:</strong> %v <br/>
	<strong>Явах огноо:</strong> %v %v <br/>
	<strong>Хугацаа:</strong> %v цаг <br/>
	<strong>Шалтгаан:</strong> %v <br/>
	<br/>
    <p><a href=%s>Зөвшөөрөх</a> &nbsp;&nbsp;  <a href=%s>Татгалзах</a></p>
    `, leaveObj["Name"], leaveObj["DateFrom"], leaveObj["TimeFrom"],
		leaveObj["Duration"], leaveObj["Notes"],
		approveUrl, rejectUrl)

	// менежерийн э-мэйл хаягийг олох
	var mgr bson.M
	if mgr, err = MyManager(r.Header.Get("User")); err != nil {
		rpc.WriteJson(r, w, nil, errors.New("Таны дээд удирдлага тодорхойгүй байна!"))
		return
	}

	if mgr["WorkEmail"] == nil || mgr["WorkEmail"] == "" {
		rpc.WriteJson(r, w, nil, errors.New("Таны дээд удирдлагын э-мэйл хаяг тодорхойгүй байна!"))
		return
	}

	// э-мэйлийг илгээх
	m := NewMessage("Чөлөөний хүсэлт", msg, mgr["WorkEmail"].(string))
	m.BodyContentType = "text/html"
	m.From = r.Header.Get("Name")

	if err = _sendEmail(m); err == nil {
		// төлөв өөрчлөх
		c.UpdateId(vars["id"], bson.M{"$set": bson.M{"State": "хүсэлт"}})
	}

	rpc.WriteJson(r, w, "OK", err)
}

// wf/leave/approve/{reqid}
func LeaveApprove(w http.ResponseWriter, r *http.Request) {
	_approveOrReject(true, w, r)
}

// wf/leave/reject/{id}
func LeaveReject(w http.ResponseWriter, r *http.Request) {
	_approveOrReject(false, w, r)
}

func _approveOrReject(approve bool, w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	// wf хүсэлтийг олох
	c := db.C(colWfAction)
	q := c.FindId(vars["id"])

	var reqObj bson.M
	if err = q.One(&reqObj); err != nil {
		rpc.WriteJson(r, w, nil, errors.New("Буруу хүсэлт !"))
		return
	}

	if reqObj["Active"].(bool) == false {
		rpc.WriteJson(r, w, nil, errors.New("Өмнө нь ашиглагдсан холбоос байна !"))
		return
	}

	state := "зөвшөөрсөн"
	msg := "Чөлөө зөвшөөрөгдлөө"
	if !approve {
		state = "татгалзсан"
		msg = "Чөлөөг татгалзлаа"
	}

	c1 := db.C("Leave")
	if err = c1.UpdateId(reqObj["LeaveId"], bson.M{"$set": bson.M{"State": state}}); err == nil {
		err = c.UpdateId(vars["id"], bson.M{"$set": bson.M{"Active": false}})
	}

	rpc.WriteJson(r, w, msg, err)
}
