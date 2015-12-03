#!/usr/bin/python
# -*- coding: utf-8 -*-

import getpass, imaplib, email, os, zipfile, sys, datetime
import yaml
import pymongo, bson
from pymongo import MongoClient
from multiprocessing import Process

def readEmail():
  
    M = imaplib.IMAP4('imap.abc.mn')
    M.login('abc_hr@abc.mn', 'Y)!Wz#n4')

    M.select('Inbox')
    typ, data = M.search(None, "SUBJECT",  "[Application]")

    if len(data)==0:
        return

    id_list = data[0].split() # ids is a space separated string
    for num in id_list:
        typ, data = M.fetch(num, '(RFC822)')
        email_body = data[0][1] # getting the mail content
        mail = email.message_from_string(email_body) # parsing the mail content to get a mail object

        #Check if any attachments at all
        if mail.get_content_maintype() != 'multipart':
            sys.exit()

        # we use walk to create a generator so we can iterate on the parts and forget about the recursive headache
        for part in mail.walk():
            # multipart are just containers, so we skip them
            if part.get_content_maintype() == 'multipart':
                continue

            # is this part an attachment ?
            if part.get('Content-Disposition') is None:
                continue

            filename = part.get_filename()
            p=part.get_payload(decode=True)

            pr = Process(target=parseAnket, args=(p,))
            pr.start()

        M.store(num, '+FLAGS', '\\Deleted') # mark to delete

    M.expunge()
    M.close()
    M.logout()



def parseAnket(data):
  y = yaml.load(data)

  prsnl=y['datas']['personal_information']
  family=y['datas']['family']
  edu=y['datas']['education']
  award=y['datas']['award']
  skill=y['datas']['skill']
  comp=y['datas']['computer']
  specialty=y['datas']['specialty']
  toefl=y['datas']['toefl']
  exp=y['datas']['work_experience']

  other=y['datas']['other']
  ref=y['datas']['definition']  

  # ерөнхий мэдээлэл
  appl = {}
  appl['_id']=prsnl['cv1_15']
  appl['Updated']=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  appl['Date']=str(y['datas']['date'])
  appl['State']='draft'
  appl['Name']= prsnl['cv1_9']
  appl['LastName']=prsnl['cv1_8']
  appl['FamilyName']=prsnl['cv1_10']
  appl['Job'] = prsnl['cv1_1']
  appl['Gender'] = prsnl['cv1_12']
  appl['SalaryExpected'] = prsnl['cv1_4']
  appl['Phone'] = prsnl['cv1_19']
  appl['Email'] = prsnl['cv1_22']
  appl['CurrentJob']=prsnl['cv1_2']
  appl['AvailableDate']=prsnl['cv1_7']
  appl['Source']=other['cv13_8']
  appl['Goal'] = other['cv13_2']
  
  refStr=""
  if len(ref['cv12_1'])>0:
    refStr=ref['cv12_1']+","+ref['cv12_2']+","+ref['cv12_3']
  if len(ref['cv12_4'])>0:
    refStr=refStr + "\n"+ref['cv12_4']+","+ref['cv12_5']+","+ref['cv12_6']
  if len(ref['cv12_7'])>0:
    refStr=refStr + "\n"+ref['cv12_7']+","+ref['cv12_8']+","+ref['cv12_9']
  appl['Reference']=refStr
  
  appl['Notes']=other['cv13_5']

  personal = {} # хувийн мэдээлэл
  personal['_id']=prsnl['cv1_15']
  personal['Marital'] = prsnl['cv1_11']
  personal['Birthday'] = prsnl['cv1_13']
  personal['BirthPlace'] = prsnl['cv1_14']
  personal['Nationality'] = prsnl['cv1_16']
  personal['Address'] = prsnl['cv1_17']
  
  personal['Interest'] = award['cv11_11']
  personal['Phone'] = prsnl['cv1_19']
  personal['Email'] = prsnl['cv1_22']
  #personal['Behavior']=other['cv13_5']
  personal['Notes']=other['cv13_3']
  personal['Family'] = [
  {
    "Name": family['cv4_1'],
    "Relation": family['cv4_2'],
    "BirthYear": family['cv4_3'],
    "Job": family['cv4_4'],
    "Phone": family['cv4_5'],
  },
  ]

  if len(family['cv4_6']) > 0:
      personal['Family'].append({
          "Name": family['cv4_6'],
    "Relation": family['cv4_7'],
    "BirthYear": family['cv4_8'],
    "Job": family['cv4_9'],
    "Phone": family['cv4_10'],
  })

  if len(family['cv4_11'])>0:
      personal['Family'].append({
          "Name": family['cv4_11'],
    "Relation": family['cv4_12'],
    "BirthYear": family['cv4_13'],
    "Job": family['cv4_14'],
    "Phone": family['cv4_15'],
  })
  
  if len(family['cv4_16'])>0:
      personal['Family'].append({
          "Name": family['cv4_16'],
    "Relation": family['cv4_17'],
    "BirthYear": family['cv4_18'],
    "Job": family['cv4_19'],
    "Phone": family['cv4_20'],
  })

  if len(family['cv4_21'])>0:
      personal['Family'].append({
          "Name": family['cv4_21'],
    "Relation": family['cv4_22'],
    "BirthYear": family['cv4_23'],
    "Job": family['cv4_24'],
    "Phone": family['cv4_25'],
  })


  # карер мэдээлэл
  career = {}
  career['_id']=prsnl['cv1_15']
  career['Education'] = [
    {
        "School": edu['cv2_1'], 
        "Duration": "", 
        "GraduatedYear": edu['cv2_5'],
        "Profession": edu['cv2_2'], 
        "DiplomaNo":"",
        "Thesis":"",
        "Degree": edu['cv2_4'],
        "GPA": edu['cv2_3'],
        "Notes":""
    },
    {
        "School": edu['cv2_6'], 
        "Duration": "", 
        "GraduatedYear": edu['cv2_10'],
        "Profession": edu['cv2_7'], 
        "DiplomaNo":"",
        "Thesis":"",
        "Degree": edu['cv2_9'],
        "GPA": edu['cv2_8'],
        "Notes":""
    },
    {
        "School": edu['cv2_11'], 
        "Duration": "", 
        "GraduatedYear": edu['cv2_15'],
        "Profession": edu['cv2_12'], 
        "DiplomaNo":"",
        "Thesis":"",
        "Degree": edu['cv2_14'],
        "GPA": edu['cv2_13'],
        "Notes":""
    },
  ]
  
  career['WorkingYear'] = ""
  career['WorkHistory'] = []
  if len(exp['cv10_1'])>0:
    career['WorkHistory'].append(
      {
        "Org": exp['cv10_1'],
        "JoinedDate":"",
        "Position": exp['cv10_5'],
        "Manager":"",
        "Contact":"",
        "LeaveDate":"",
        "Notes": exp['cv10_4']
      }
    )
  if len(exp['cv10_7'])>0:
    career['WorkHistory'].append(
      {
        "Org": exp['cv10_7'],
        "JoinedDate":"",
        "Position": exp['cv10_12'],
        "Manager":"",
        "Contact":"",
        "LeaveDate":"",
        "Notes": exp['cv10_10']
      }
    )
  if len(exp['cv10_13'])>0:
    career['WorkHistory'].append(
      {
        "Org": exp['cv10_13'],
        "JoinedDate":"",
        "Position": exp['cv10_18'],
        "Manager":"",
        "Contact":"",
        "LeaveDate":"",
        "Notes": exp['cv10_16']
      }
    )

  career['Skills'] = []
  if len(skill['cv7_1'])>0:
    career['Skills'].append(
    {
      "Skill": skill['cv7_1'],
      "SkillType":u"хэл",
      "Notes": u"бичих:"+skill['cv7_2']+u", ярих: "+skill['cv7_3']+u", ойлгох:"+skill['cv7_4']
    })

  if len(skill['cv7_7'])>0:
    career['Skills'].append(
    {
      "Skill": skill['cv7_7'],
      "SkillType":u"хэл",
      "Notes": u"бичих:"+skill['cv7_8']+u", ярих: "+skill['cv7_9']+u", ойлгох:"+skill['cv7_10']
    })

  if len(skill['cv7_13'])>0:
    career['Skills'].append(
    {
      "Skill": skill['cv7_13'],
      "SkillType":u"хэл",
      "Notes": u"бичих:"+skill['cv7_14']+u", ярих: "+skill['cv7_15']+u", ойлгох:"+skill['cv7_16']
    })
    
  # toefl
  if len(toefl['cv8_1'])>0:
    career['Skills'].append(
    {
      "Skill": toefl['cv8_1'],
      "SkillType":u"хэл",
      "Notes": toefl['cv8_5']+u", Он:"+toefl['cv8_2']
    })
  if len(toefl['cv8_6'])>0:
    career['Skills'].append(
    {
      "Skill": toefl['cv8_6'],
      "SkillType":u"хэл",
      "Notes": toefl['cv8_10']+u", Он:"+toefl['cv8_7']
    })

  if len(comp['cv9_15'])>0:
    career['Skills'].append(
    {
      "Skill": "MS Word",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })
  if len(comp['cv9_16'])>0:
    career['Skills'].append(
    {
      "Skill": "MS Excel",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })
  if len(comp['cv9_17'])>0:
    career['Skills'].append(
    {
      "Skill": "MS PowerPoint",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })
  if len(comp['cv9_18'])>0:
    career['Skills'].append(
    {
      "Skill": "MS Project",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })
  if len(comp['cv9_19'])>0:
    career['Skills'].append(
    {
      "Skill": "Photo Shop",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })
  if len(comp['cv9_20'])>0:
    career['Skills'].append(
    {
      "Skill": "Page Maker",
      "SkillType":u"компютер",
      "Level":u"сайн"
    })

  career['Rewards'] = []
  if len(award['cv11_1'])>0:
    career['Rewards'].append(
      {
        "Name": award['cv11_2'],
        "Date": award['cv11_1'],
        "Notes": award['cv11_3']
      }
    )
  if len(award['cv11_4'])>0:
    career['Rewards'].append(
      {
        "Name": award['cv11_5'],
        "Date": award['cv11_4'],
        "Notes": award['cv11_6']
      }
    )
  if len(award['cv11_7'])>0:
    career['Rewards'].append(
      {
        "Name": award['cv11_8'],
        "Date": award['cv11_7'],
        "Notes": award['cv11_9']
      }
    )
  if len(specialty['cv3_1'])>0:
    career['Rewards'].append(
      {
        "Name": specialty['cv3_2'],
        "Date": specialty['cv3_1'],
        "Org": specialty['cv3_3']
      }
    )
  if len(specialty['cv3_4'])>0:
    career['Rewards'].append(
      {
        "Name": specialty['cv3_5'],
        "Date": specialty['cv3_4'],
        "Org": specialty['cv3_6']
      }
    )
  if len(specialty['cv3_7'])>0:
    career['Rewards'].append(
      {
        "Name": specialty['cv3_8'],
        "Date": specialty['cv3_7'],
        "Org": specialty['cv3_9']
      }
    )


  career['Output'] = []

  

  # анкетыг баазад хадгалах 
  saveAnket(appl, personal, career)

def saveAnket(applicant, personal, career):
    client = MongoClient()
    db = client.lerp

    # үндсэн ажилтны мэдээллийг дарахаас хамгаалах
    emp = db.Employee.find_one({'_id': applicant['_id']})
    if emp:
        print u"Ажилтаны кодтой давхардаж байна!", applicant['_id']
        return


    db.Applicant.save(applicant)
    db.Personal.save(personal)
    db.Career.save(career)

    print personal
    print career

    print u"Анкет ирлээ", applicant['_id']
    client.close()


if __name__ == "__main__":
    readEmail()