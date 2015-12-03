goog.provide('hr.row.Applicant');
goog.provide('hr.row.ApplicantDbType');
goog.provide('hr.row.ApplicantType');
goog.provide('hr.row.Appraisal');
goog.provide('hr.row.AppraisalDbType');
goog.provide('hr.row.AppraisalType');
goog.provide('hr.row.Attendance');
goog.provide('hr.row.AttendanceDbType');
goog.provide('hr.row.AttendanceType');
goog.provide('hr.row.Contract');
goog.provide('hr.row.ContractDbType');
goog.provide('hr.row.ContractType');
goog.provide('hr.row.Dept');
goog.provide('hr.row.DeptDbType');
goog.provide('hr.row.DeptType');
goog.provide('hr.row.Education');
goog.provide('hr.row.EducationDbType');
goog.provide('hr.row.EducationType');
goog.provide('hr.row.Employee');
goog.provide('hr.row.EmployeeDbType');
goog.provide('hr.row.EmployeeType');
goog.provide('hr.row.Family');
goog.provide('hr.row.FamilyDbType');
goog.provide('hr.row.FamilyType');
goog.provide('hr.row.Holiday');
goog.provide('hr.row.HolidayDbType');
goog.provide('hr.row.HolidayType');
goog.provide('hr.row.Job');
goog.provide('hr.row.JobDbType');
goog.provide('hr.row.JobType');
goog.provide('hr.row.Leave');
goog.provide('hr.row.LeaveDbType');
goog.provide('hr.row.LeaveType');
goog.provide('hr.row.Performance');
goog.provide('hr.row.PerformanceDbType');
goog.provide('hr.row.PerformanceType');
goog.provide('hr.row.Personal');
goog.provide('hr.row.PersonalDbType');
goog.provide('hr.row.PersonalType');
goog.provide('hr.row.Rewards');
goog.provide('hr.row.RewardsDbType');
goog.provide('hr.row.RewardsType');
goog.provide('hr.row.Skill');
goog.provide('hr.row.SkillDbType');
goog.provide('hr.row.SkillType');
goog.provide('hr.row.Training');
goog.provide('hr.row.TrainingDbType');
goog.provide('hr.row.TrainingType');
goog.provide('hr.row.WorkHistory');
goog.provide('hr.row.WorkHistoryDbType');
goog.provide('hr.row.WorkHistoryType');
goog.provide('hr.schema.Applicant');
goog.provide('hr.schema.Appraisal');
goog.provide('hr.schema.Attendance');
goog.provide('hr.schema.Contract');
goog.provide('hr.schema.Database');
goog.provide('hr.schema.Dept');
goog.provide('hr.schema.Education');
goog.provide('hr.schema.Employee');
goog.provide('hr.schema.Family');
goog.provide('hr.schema.Holiday');
goog.provide('hr.schema.Job');
goog.provide('hr.schema.Leave');
goog.provide('hr.schema.Performance');
goog.provide('hr.schema.Personal');
goog.provide('hr.schema.Rewards');
goog.provide('hr.schema.Skill');
goog.provide('hr.schema.Training');
goog.provide('hr.schema.WorkHistory');

/** @suppress {extraRequire} */
goog.require('lf.ConstraintAction');
goog.require('lf.ConstraintTiming');
goog.require('lf.Order');
goog.require('lf.Row');
goog.require('lf.Type');
goog.require('lf.schema.BaseColumn');
goog.require('lf.schema.Constraint');
goog.require('lf.schema.Database');
goog.require('lf.schema.ForeignKeySpec');
goog.require('lf.schema.Index');
goog.require('lf.schema.Info');
goog.require('lf.schema.Table');



/**
 * @implements {lf.schema.Database}
 * @constructor
 */
hr.schema.Database = function() {
  /** @private {!Object} */
  this.tableMap_ = {};

  /** @private {!lf.schema.Database.Pragma} */
  this.pragma_ = {
    enableBundledMode: false
  };

  /** @private {!hr.schema.Employee} */
  this.employee_ = new hr.schema.Employee();
  this.tableMap_['Employee'] = this.employee_;

  /** @private {!hr.schema.Contract} */
  this.contract_ = new hr.schema.Contract();
  this.tableMap_['Contract'] = this.contract_;

  /** @private {!hr.schema.Job} */
  this.job_ = new hr.schema.Job();
  this.tableMap_['Job'] = this.job_;

  /** @private {!hr.schema.Dept} */
  this.dept_ = new hr.schema.Dept();
  this.tableMap_['Dept'] = this.dept_;

  /** @private {!hr.schema.Applicant} */
  this.applicant_ = new hr.schema.Applicant();
  this.tableMap_['Applicant'] = this.applicant_;

  /** @private {!hr.schema.Personal} */
  this.personal_ = new hr.schema.Personal();
  this.tableMap_['Personal'] = this.personal_;

  /** @private {!hr.schema.Family} */
  this.family_ = new hr.schema.Family();
  this.tableMap_['Family'] = this.family_;

  /** @private {!hr.schema.Education} */
  this.education_ = new hr.schema.Education();
  this.tableMap_['Education'] = this.education_;

  /** @private {!hr.schema.Skill} */
  this.skill_ = new hr.schema.Skill();
  this.tableMap_['Skill'] = this.skill_;

  /** @private {!hr.schema.WorkHistory} */
  this.workHistory_ = new hr.schema.WorkHistory();
  this.tableMap_['WorkHistory'] = this.workHistory_;

  /** @private {!hr.schema.Rewards} */
  this.rewards_ = new hr.schema.Rewards();
  this.tableMap_['Rewards'] = this.rewards_;

  /** @private {!hr.schema.Attendance} */
  this.attendance_ = new hr.schema.Attendance();
  this.tableMap_['Attendance'] = this.attendance_;

  /** @private {!hr.schema.Leave} */
  this.leave_ = new hr.schema.Leave();
  this.tableMap_['Leave'] = this.leave_;

  /** @private {!hr.schema.Appraisal} */
  this.appraisal_ = new hr.schema.Appraisal();
  this.tableMap_['Appraisal'] = this.appraisal_;

  /** @private {!hr.schema.Performance} */
  this.performance_ = new hr.schema.Performance();
  this.tableMap_['Performance'] = this.performance_;

  /** @private {!hr.schema.Training} */
  this.training_ = new hr.schema.Training();
  this.tableMap_['Training'] = this.training_;

  /** @private {!hr.schema.Holiday} */
  this.holiday_ = new hr.schema.Holiday();
  this.tableMap_['Holiday'] = this.holiday_;

  /** @private {!lf.schema.Info} */
  this.metaInfo_;
};


/** @override */
hr.schema.Database.prototype.name = function() {
  return 'lerp';
};


/** @override */
hr.schema.Database.prototype.version = function() {
  return 1;
};


/** @override */
hr.schema.Database.prototype.tables = function() {
  return [
    this.employee_,
    this.contract_,
    this.job_,
    this.dept_,
    this.applicant_,
    this.personal_,
    this.family_,
    this.education_,
    this.skill_,
    this.workHistory_,
    this.rewards_,
    this.attendance_,
    this.leave_,
    this.appraisal_,
    this.performance_,
    this.training_,
    this.holiday_
  ];
};


/** @override */
hr.schema.Database.prototype.info = function() {
  if (!this.metaInfo_) {
    this.metaInfo_ = new lf.schema.Info(this);
  }
  return this.metaInfo_;
};


/** @override */
hr.schema.Database.prototype.table = function(tableName) {
  return this.tableMap_[tableName] || null;
};


/** @override */
hr.schema.Database.prototype.pragma = function() {
  return this.pragma_;
};


/** @return {!hr.schema.Employee} */
hr.schema.Database.prototype.getEmployee = function() {
  return this.employee_;
};


/** @return {!hr.schema.Contract} */
hr.schema.Database.prototype.getContract = function() {
  return this.contract_;
};


/** @return {!hr.schema.Job} */
hr.schema.Database.prototype.getJob = function() {
  return this.job_;
};


/** @return {!hr.schema.Dept} */
hr.schema.Database.prototype.getDept = function() {
  return this.dept_;
};


/** @return {!hr.schema.Applicant} */
hr.schema.Database.prototype.getApplicant = function() {
  return this.applicant_;
};


/** @return {!hr.schema.Personal} */
hr.schema.Database.prototype.getPersonal = function() {
  return this.personal_;
};


/** @return {!hr.schema.Family} */
hr.schema.Database.prototype.getFamily = function() {
  return this.family_;
};


/** @return {!hr.schema.Education} */
hr.schema.Database.prototype.getEducation = function() {
  return this.education_;
};


/** @return {!hr.schema.Skill} */
hr.schema.Database.prototype.getSkill = function() {
  return this.skill_;
};


/** @return {!hr.schema.WorkHistory} */
hr.schema.Database.prototype.getWorkHistory = function() {
  return this.workHistory_;
};


/** @return {!hr.schema.Rewards} */
hr.schema.Database.prototype.getRewards = function() {
  return this.rewards_;
};


/** @return {!hr.schema.Attendance} */
hr.schema.Database.prototype.getAttendance = function() {
  return this.attendance_;
};


/** @return {!hr.schema.Leave} */
hr.schema.Database.prototype.getLeave = function() {
  return this.leave_;
};


/** @return {!hr.schema.Appraisal} */
hr.schema.Database.prototype.getAppraisal = function() {
  return this.appraisal_;
};


/** @return {!hr.schema.Performance} */
hr.schema.Database.prototype.getPerformance = function() {
  return this.performance_;
};


/** @return {!hr.schema.Training} */
hr.schema.Database.prototype.getTraining = function() {
  return this.training_;
};


/** @return {!hr.schema.Holiday} */
hr.schema.Database.prototype.getHoliday = function() {
  return this.holiday_;
};



/**
 * @extends {lf.schema.Table.<!hr.row.EmployeeType,
 *     !hr.row.EmployeeDbType>}
 * @constructor
 */
hr.schema.Employee = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.lastName = new lf.schema.BaseColumn(
      this, 'lastName', false, false, lf.Type.STRING);
  cols.push(this.lastName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.familyName = new lf.schema.BaseColumn(
      this, 'familyName', false, false, lf.Type.STRING);
  cols.push(this.familyName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.gender = new lf.schema.BaseColumn(
      this, 'gender', false, false, lf.Type.STRING);
  cols.push(this.gender);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.dept = new lf.schema.BaseColumn(
      this, 'dept', false, false, lf.Type.STRING);
  cols.push(this.dept);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.job = new lf.schema.BaseColumn(
      this, 'job', false, false, lf.Type.STRING);
  cols.push(this.job);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.position = new lf.schema.BaseColumn(
      this, 'position', false, false, lf.Type.STRING);
  cols.push(this.position);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.reportTo = new lf.schema.BaseColumn(
      this, 'reportTo', false, false, lf.Type.STRING);
  cols.push(this.reportTo);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.workAddress = new lf.schema.BaseColumn(
      this, 'workAddress', false, false, lf.Type.STRING);
  cols.push(this.workAddress);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.workLocation = new lf.schema.BaseColumn(
      this, 'workLocation', false, false, lf.Type.STRING);
  cols.push(this.workLocation);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.workEmail = new lf.schema.BaseColumn(
      this, 'workEmail', false, false, lf.Type.STRING);
  cols.push(this.workEmail);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.workPhone = new lf.schema.BaseColumn(
      this, 'workPhone', false, false, lf.Type.STRING);
  cols.push(this.workPhone);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.mobilePhone = new lf.schema.BaseColumn(
      this, 'mobilePhone', false, false, lf.Type.STRING);
  cols.push(this.mobilePhone);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.cardNo = new lf.schema.BaseColumn(
      this, 'cardNo', false, false, lf.Type.STRING);
  cols.push(this.cardNo);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.coach = new lf.schema.BaseColumn(
      this, 'coach', false, false, lf.Type.STRING);
  cols.push(this.coach);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.status = new lf.schema.BaseColumn(
      this, 'status', false, false, lf.Type.STRING);
  cols.push(this.status);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.hireDate = new lf.schema.BaseColumn(
      this, 'hireDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.hireDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.timeTable = new lf.schema.BaseColumn(
      this, 'timeTable', false, false, lf.Type.STRING);
  cols.push(this.timeTable);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.trialEndDate = new lf.schema.BaseColumn(
      this, 'trialEndDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.trialEndDate);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.resignationDate = new lf.schema.BaseColumn(
      this, 'resignationDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.resignationDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.resignationReason = new lf.schema.BaseColumn(
      this, 'resignationReason', false, false, lf.Type.STRING);
  cols.push(this.resignationReason);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.bankName = new lf.schema.BaseColumn(
      this, 'bankName', false, false, lf.Type.STRING);
  cols.push(this.bankName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.bankAccount = new lf.schema.BaseColumn(
      this, 'bankAccount', false, false, lf.Type.STRING);
  cols.push(this.bankAccount);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.tags = new lf.schema.BaseColumn(
      this, 'tags', false, false, lf.Type.STRING);
  cols.push(this.tags);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.evalPlan = new lf.schema.BaseColumn(
      this, 'evalPlan', false, false, lf.Type.STRING);
  cols.push(this.evalPlan);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.evalDate = new lf.schema.BaseColumn(
      this, 'evalDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.evalDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.casual = new lf.schema.BaseColumn(
      this, 'casual', false, false, lf.Type.STRING);
  cols.push(this.casual);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.casualNotes = new lf.schema.BaseColumn(
      this, 'casualNotes', false, false, lf.Type.STRING);
  cols.push(this.casualNotes);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.attachments = new lf.schema.BaseColumn(
      this, 'attachments', false, false, lf.Type.STRING);
  cols.push(this.attachments);

  var indices = [
    new lf.schema.Index('Employee', 'pkEmployee', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Employee.base(
      this, 'constructor', 'Employee', cols, indices, false);
};
goog.inherits(hr.schema.Employee, lf.schema.Table);


/** @override */
hr.schema.Employee.prototype.createRow = function(opt_value) {
  return new hr.row.Employee(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Employee.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.hireDate = new Date(data.hireDate);
  data.trialEndDate = new Date(data.trialEndDate);
  data.resignationDate = new Date(data.resignationDate);
  data.evalDate = new Date(data.evalDate);
  return new hr.row.Employee(dbRecord['id'], data);
};


/** @override */
hr.schema.Employee.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = this.getIndices()[0];
  var notNullable = [
    this.id,
    this.name,
    this.lastName,
    this.familyName,
    this.gender,
    this.dept,
    this.job,
    this.position,
    this.reportTo,
    this.workAddress,
    this.workLocation,
    this.workEmail,
    this.workPhone,
    this.mobilePhone,
    this.cardNo,
    this.coach,
    this.notes,
    this.type,
    this.status,
    this.hireDate,
    this.timeTable,
    this.trialEndDate,
    this.resignationDate,
    this.resignationReason,
    this.bankName,
    this.bankAccount,
    this.tags,
    this.evalPlan,
    this.evalDate,
    this.casual,
    this.casualNotes,
    this.attachments
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.EmployeeType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.lastName;
  /** @export @type {string} */
  this.familyName;
  /** @export @type {string} */
  this.gender;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.job;
  /** @export @type {string} */
  this.position;
  /** @export @type {string} */
  this.reportTo;
  /** @export @type {string} */
  this.workAddress;
  /** @export @type {string} */
  this.workLocation;
  /** @export @type {string} */
  this.workEmail;
  /** @export @type {string} */
  this.workPhone;
  /** @export @type {string} */
  this.mobilePhone;
  /** @export @type {string} */
  this.cardNo;
  /** @export @type {string} */
  this.coach;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.status;
  /** @export @type {!Date} */
  this.hireDate;
  /** @export @type {string} */
  this.timeTable;
  /** @export @type {!Date} */
  this.trialEndDate;
  /** @export @type {!Date} */
  this.resignationDate;
  /** @export @type {string} */
  this.resignationReason;
  /** @export @type {string} */
  this.bankName;
  /** @export @type {string} */
  this.bankAccount;
  /** @export @type {string} */
  this.tags;
  /** @export @type {string} */
  this.evalPlan;
  /** @export @type {!Date} */
  this.evalDate;
  /** @export @type {string} */
  this.casual;
  /** @export @type {string} */
  this.casualNotes;
  /** @export @type {string} */
  this.attachments;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.EmployeeDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.lastName;
  /** @export @type {string} */
  this.familyName;
  /** @export @type {string} */
  this.gender;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.job;
  /** @export @type {string} */
  this.position;
  /** @export @type {string} */
  this.reportTo;
  /** @export @type {string} */
  this.workAddress;
  /** @export @type {string} */
  this.workLocation;
  /** @export @type {string} */
  this.workEmail;
  /** @export @type {string} */
  this.workPhone;
  /** @export @type {string} */
  this.mobilePhone;
  /** @export @type {string} */
  this.cardNo;
  /** @export @type {string} */
  this.coach;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.status;
  /** @export @type {number} */
  this.hireDate;
  /** @export @type {string} */
  this.timeTable;
  /** @export @type {number} */
  this.trialEndDate;
  /** @export @type {number} */
  this.resignationDate;
  /** @export @type {string} */
  this.resignationReason;
  /** @export @type {string} */
  this.bankName;
  /** @export @type {string} */
  this.bankAccount;
  /** @export @type {string} */
  this.tags;
  /** @export @type {string} */
  this.evalPlan;
  /** @export @type {number} */
  this.evalDate;
  /** @export @type {string} */
  this.casual;
  /** @export @type {string} */
  this.casualNotes;
  /** @export @type {string} */
  this.attachments;
};



/**
 * Constructs a new Employee row.
 * @constructor
 * @extends {lf.Row.<!hr.row.EmployeeType,
 *     !hr.row.EmployeeDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.EmployeeType=} opt_payload
 */
hr.row.Employee = function(rowId, opt_payload) {
  hr.row.Employee.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Employee, lf.Row);


/** @override */
hr.row.Employee.prototype.defaultPayload = function() {
  var payload = new hr.row.EmployeeType();
  payload.id = '';
  payload.name = '';
  payload.lastName = '';
  payload.familyName = '';
  payload.gender = '';
  payload.dept = '';
  payload.job = '';
  payload.position = '';
  payload.reportTo = '';
  payload.workAddress = '';
  payload.workLocation = '';
  payload.workEmail = '';
  payload.workPhone = '';
  payload.mobilePhone = '';
  payload.cardNo = '';
  payload.coach = '';
  payload.notes = '';
  payload.type = '';
  payload.status = '';
  payload.hireDate = new Date(0);
  payload.timeTable = '';
  payload.trialEndDate = new Date(0);
  payload.resignationDate = new Date(0);
  payload.resignationReason = '';
  payload.bankName = '';
  payload.bankAccount = '';
  payload.tags = '';
  payload.evalPlan = '';
  payload.evalDate = new Date(0);
  payload.casual = '';
  payload.casualNotes = '';
  payload.attachments = '';
  return payload;
};


/** @override */
hr.row.Employee.prototype.toDbPayload = function() {
  var payload = new hr.row.EmployeeDbType();
  payload.id = this.payload().id;
  payload.name = this.payload().name;
  payload.lastName = this.payload().lastName;
  payload.familyName = this.payload().familyName;
  payload.gender = this.payload().gender;
  payload.dept = this.payload().dept;
  payload.job = this.payload().job;
  payload.position = this.payload().position;
  payload.reportTo = this.payload().reportTo;
  payload.workAddress = this.payload().workAddress;
  payload.workLocation = this.payload().workLocation;
  payload.workEmail = this.payload().workEmail;
  payload.workPhone = this.payload().workPhone;
  payload.mobilePhone = this.payload().mobilePhone;
  payload.cardNo = this.payload().cardNo;
  payload.coach = this.payload().coach;
  payload.notes = this.payload().notes;
  payload.type = this.payload().type;
  payload.status = this.payload().status;
  payload.hireDate = this.payload().hireDate.getTime();
  payload.timeTable = this.payload().timeTable;
  payload.trialEndDate = this.payload().trialEndDate.getTime();
  payload.resignationDate = this.payload().resignationDate.getTime();
  payload.resignationReason = this.payload().resignationReason;
  payload.bankName = this.payload().bankName;
  payload.bankAccount = this.payload().bankAccount;
  payload.tags = this.payload().tags;
  payload.evalPlan = this.payload().evalPlan;
  payload.evalDate = this.payload().evalDate.getTime();
  payload.casual = this.payload().casual;
  payload.casualNotes = this.payload().casualNotes;
  payload.attachments = this.payload().attachments;
  return payload;
};


/** @override */
hr.row.Employee.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Employee.pkEmployee':
      return this.payload().id;
    case 'Employee.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Employee.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getLastName = function() {
  return this.payload().lastName;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setLastName = function(value) {
  this.payload().lastName = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getFamilyName = function() {
  return this.payload().familyName;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setFamilyName = function(value) {
  this.payload().familyName = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getGender = function() {
  return this.payload().gender;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setGender = function(value) {
  this.payload().gender = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getDept = function() {
  return this.payload().dept;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setDept = function(value) {
  this.payload().dept = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getJob = function() {
  return this.payload().job;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setJob = function(value) {
  this.payload().job = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getPosition = function() {
  return this.payload().position;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setPosition = function(value) {
  this.payload().position = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getReportTo = function() {
  return this.payload().reportTo;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setReportTo = function(value) {
  this.payload().reportTo = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getWorkAddress = function() {
  return this.payload().workAddress;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setWorkAddress = function(value) {
  this.payload().workAddress = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getWorkLocation = function() {
  return this.payload().workLocation;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setWorkLocation = function(value) {
  this.payload().workLocation = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getWorkEmail = function() {
  return this.payload().workEmail;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setWorkEmail = function(value) {
  this.payload().workEmail = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getWorkPhone = function() {
  return this.payload().workPhone;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setWorkPhone = function(value) {
  this.payload().workPhone = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getMobilePhone = function() {
  return this.payload().mobilePhone;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setMobilePhone = function(value) {
  this.payload().mobilePhone = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getCardNo = function() {
  return this.payload().cardNo;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setCardNo = function(value) {
  this.payload().cardNo = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getCoach = function() {
  return this.payload().coach;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setCoach = function(value) {
  this.payload().coach = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getStatus = function() {
  return this.payload().status;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setStatus = function(value) {
  this.payload().status = value;
  return this;
};


/** @return {!Date} */
hr.row.Employee.prototype.getHireDate = function() {
  return this.payload().hireDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setHireDate = function(value) {
  this.payload().hireDate = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getTimeTable = function() {
  return this.payload().timeTable;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setTimeTable = function(value) {
  this.payload().timeTable = value;
  return this;
};


/** @return {!Date} */
hr.row.Employee.prototype.getTrialEndDate = function() {
  return this.payload().trialEndDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setTrialEndDate = function(value) {
  this.payload().trialEndDate = value;
  return this;
};


/** @return {!Date} */
hr.row.Employee.prototype.getResignationDate = function() {
  return this.payload().resignationDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setResignationDate = function(value) {
  this.payload().resignationDate = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getResignationReason = function() {
  return this.payload().resignationReason;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setResignationReason = function(value) {
  this.payload().resignationReason = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getBankName = function() {
  return this.payload().bankName;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setBankName = function(value) {
  this.payload().bankName = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getBankAccount = function() {
  return this.payload().bankAccount;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setBankAccount = function(value) {
  this.payload().bankAccount = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getTags = function() {
  return this.payload().tags;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setTags = function(value) {
  this.payload().tags = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getEvalPlan = function() {
  return this.payload().evalPlan;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setEvalPlan = function(value) {
  this.payload().evalPlan = value;
  return this;
};


/** @return {!Date} */
hr.row.Employee.prototype.getEvalDate = function() {
  return this.payload().evalDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setEvalDate = function(value) {
  this.payload().evalDate = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getCasual = function() {
  return this.payload().casual;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setCasual = function(value) {
  this.payload().casual = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getCasualNotes = function() {
  return this.payload().casualNotes;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setCasualNotes = function(value) {
  this.payload().casualNotes = value;
  return this;
};


/** @return {string} */
hr.row.Employee.prototype.getAttachments = function() {
  return this.payload().attachments;
};


/**
 * @param {string} value
 * @return {!hr.row.Employee}
*/
hr.row.Employee.prototype.setAttachments = function(value) {
  this.payload().attachments = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.ContractType,
 *     !hr.row.ContractDbType>}
 * @constructor
 */
hr.schema.Contract = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.STRING);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.employeeName = new lf.schema.BaseColumn(
      this, 'employeeName', false, false, lf.Type.STRING);
  cols.push(this.employeeName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.dept = new lf.schema.BaseColumn(
      this, 'dept', false, false, lf.Type.STRING);
  cols.push(this.dept);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.job = new lf.schema.BaseColumn(
      this, 'job', false, false, lf.Type.STRING);
  cols.push(this.job);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.dateStart = new lf.schema.BaseColumn(
      this, 'dateStart', false, false, lf.Type.DATE_TIME);
  cols.push(this.dateStart);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.dateEnd = new lf.schema.BaseColumn(
      this, 'dateEnd', false, false, lf.Type.DATE_TIME);
  cols.push(this.dateEnd);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.wage = new lf.schema.BaseColumn(
      this, 'wage', false, false, lf.Type.NUMBER);
  cols.push(this.wage);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.fixedAllowances = new lf.schema.BaseColumn(
      this, 'fixedAllowances', false, false, lf.Type.NUMBER);
  cols.push(this.fixedAllowances);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.workingHours = new lf.schema.BaseColumn(
      this, 'workingHours', false, false, lf.Type.INTEGER);
  cols.push(this.workingHours);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.advantages = new lf.schema.BaseColumn(
      this, 'advantages', false, false, lf.Type.STRING);
  cols.push(this.advantages);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.visaNo = new lf.schema.BaseColumn(
      this, 'visaNo', false, false, lf.Type.STRING);
  cols.push(this.visaNo);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.visaExpire = new lf.schema.BaseColumn(
      this, 'visaExpire', false, false, lf.Type.DATE_TIME);
  cols.push(this.visaExpire);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.reason = new lf.schema.BaseColumn(
      this, 'reason', false, false, lf.Type.STRING);
  cols.push(this.reason);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.salaryProfile = new lf.schema.BaseColumn(
      this, 'salaryProfile', false, false, lf.Type.STRING);
  cols.push(this.salaryProfile);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.schedulePay = new lf.schema.BaseColumn(
      this, 'schedulePay', false, false, lf.Type.STRING);
  cols.push(this.schedulePay);

  var indices = [
    new lf.schema.Index('Contract', 'pkContract', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Contract.base(
      this, 'constructor', 'Contract', cols, indices, false);
};
goog.inherits(hr.schema.Contract, lf.schema.Table);


/** @override */
hr.schema.Contract.prototype.createRow = function(opt_value) {
  return new hr.row.Contract(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Contract.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.dateStart = new Date(data.dateStart);
  data.dateEnd = new Date(data.dateEnd);
  data.visaExpire = new Date(data.visaExpire);
  return new hr.row.Contract(dbRecord['id'], data);
};


/** @override */
hr.schema.Contract.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = this.getIndices()[0];
  var notNullable = [
    this.id,
    this.name,
    this.date,
    this.type,
    this.emp,
    this.employeeName,
    this.dept,
    this.job,
    this.dateStart,
    this.dateEnd,
    this.wage,
    this.fixedAllowances,
    this.workingHours,
    this.advantages,
    this.visaNo,
    this.visaExpire,
    this.reason,
    this.notes,
    this.salaryProfile,
    this.schedulePay
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.ContractType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.date;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.employeeName;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.job;
  /** @export @type {!Date} */
  this.dateStart;
  /** @export @type {!Date} */
  this.dateEnd;
  /** @export @type {number} */
  this.wage;
  /** @export @type {number} */
  this.fixedAllowances;
  /** @export @type {number} */
  this.workingHours;
  /** @export @type {string} */
  this.advantages;
  /** @export @type {string} */
  this.visaNo;
  /** @export @type {!Date} */
  this.visaExpire;
  /** @export @type {string} */
  this.reason;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.salaryProfile;
  /** @export @type {string} */
  this.schedulePay;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.ContractDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.date;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.employeeName;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.job;
  /** @export @type {number} */
  this.dateStart;
  /** @export @type {number} */
  this.dateEnd;
  /** @export @type {number} */
  this.wage;
  /** @export @type {number} */
  this.fixedAllowances;
  /** @export @type {number} */
  this.workingHours;
  /** @export @type {string} */
  this.advantages;
  /** @export @type {string} */
  this.visaNo;
  /** @export @type {number} */
  this.visaExpire;
  /** @export @type {string} */
  this.reason;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.salaryProfile;
  /** @export @type {string} */
  this.schedulePay;
};



/**
 * Constructs a new Contract row.
 * @constructor
 * @extends {lf.Row.<!hr.row.ContractType,
 *     !hr.row.ContractDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.ContractType=} opt_payload
 */
hr.row.Contract = function(rowId, opt_payload) {
  hr.row.Contract.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Contract, lf.Row);


/** @override */
hr.row.Contract.prototype.defaultPayload = function() {
  var payload = new hr.row.ContractType();
  payload.id = '';
  payload.name = '';
  payload.date = '';
  payload.type = '';
  payload.emp = '';
  payload.employeeName = '';
  payload.dept = '';
  payload.job = '';
  payload.dateStart = new Date(0);
  payload.dateEnd = new Date(0);
  payload.wage = 0;
  payload.fixedAllowances = 0;
  payload.workingHours = 0;
  payload.advantages = '';
  payload.visaNo = '';
  payload.visaExpire = new Date(0);
  payload.reason = '';
  payload.notes = '';
  payload.salaryProfile = '';
  payload.schedulePay = '';
  return payload;
};


/** @override */
hr.row.Contract.prototype.toDbPayload = function() {
  var payload = new hr.row.ContractDbType();
  payload.id = this.payload().id;
  payload.name = this.payload().name;
  payload.date = this.payload().date;
  payload.type = this.payload().type;
  payload.emp = this.payload().emp;
  payload.employeeName = this.payload().employeeName;
  payload.dept = this.payload().dept;
  payload.job = this.payload().job;
  payload.dateStart = this.payload().dateStart.getTime();
  payload.dateEnd = this.payload().dateEnd.getTime();
  payload.wage = this.payload().wage;
  payload.fixedAllowances = this.payload().fixedAllowances;
  payload.workingHours = this.payload().workingHours;
  payload.advantages = this.payload().advantages;
  payload.visaNo = this.payload().visaNo;
  payload.visaExpire = this.payload().visaExpire.getTime();
  payload.reason = this.payload().reason;
  payload.notes = this.payload().notes;
  payload.salaryProfile = this.payload().salaryProfile;
  payload.schedulePay = this.payload().schedulePay;
  return payload;
};


/** @override */
hr.row.Contract.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Contract.pkContract':
      return this.payload().id;
    case 'Contract.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Contract.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getEmployeeName = function() {
  return this.payload().employeeName;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setEmployeeName = function(value) {
  this.payload().employeeName = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getDept = function() {
  return this.payload().dept;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setDept = function(value) {
  this.payload().dept = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getJob = function() {
  return this.payload().job;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setJob = function(value) {
  this.payload().job = value;
  return this;
};


/** @return {!Date} */
hr.row.Contract.prototype.getDateStart = function() {
  return this.payload().dateStart;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setDateStart = function(value) {
  this.payload().dateStart = value;
  return this;
};


/** @return {!Date} */
hr.row.Contract.prototype.getDateEnd = function() {
  return this.payload().dateEnd;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setDateEnd = function(value) {
  this.payload().dateEnd = value;
  return this;
};


/** @return {number} */
hr.row.Contract.prototype.getWage = function() {
  return this.payload().wage;
};


/**
 * @param {number} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setWage = function(value) {
  this.payload().wage = value;
  return this;
};


/** @return {number} */
hr.row.Contract.prototype.getFixedAllowances = function() {
  return this.payload().fixedAllowances;
};


/**
 * @param {number} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setFixedAllowances = function(value) {
  this.payload().fixedAllowances = value;
  return this;
};


/** @return {number} */
hr.row.Contract.prototype.getWorkingHours = function() {
  return this.payload().workingHours;
};


/**
 * @param {number} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setWorkingHours = function(value) {
  this.payload().workingHours = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getAdvantages = function() {
  return this.payload().advantages;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setAdvantages = function(value) {
  this.payload().advantages = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getVisaNo = function() {
  return this.payload().visaNo;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setVisaNo = function(value) {
  this.payload().visaNo = value;
  return this;
};


/** @return {!Date} */
hr.row.Contract.prototype.getVisaExpire = function() {
  return this.payload().visaExpire;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setVisaExpire = function(value) {
  this.payload().visaExpire = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getReason = function() {
  return this.payload().reason;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setReason = function(value) {
  this.payload().reason = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getSalaryProfile = function() {
  return this.payload().salaryProfile;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setSalaryProfile = function(value) {
  this.payload().salaryProfile = value;
  return this;
};


/** @return {string} */
hr.row.Contract.prototype.getSchedulePay = function() {
  return this.payload().schedulePay;
};


/**
 * @param {string} value
 * @return {!hr.row.Contract}
*/
hr.row.Contract.prototype.setSchedulePay = function(value) {
  this.payload().schedulePay = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.JobType,
 *     !hr.row.JobDbType>}
 * @constructor
 */
hr.schema.Job = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', false, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.categ = new lf.schema.BaseColumn(
      this, 'categ', false, false, lf.Type.STRING);
  cols.push(this.categ);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.expectedEmployees = new lf.schema.BaseColumn(
      this, 'expectedEmployees', false, false, lf.Type.INTEGER);
  cols.push(this.expectedEmployees);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.description = new lf.schema.BaseColumn(
      this, 'description', false, false, lf.Type.STRING);
  cols.push(this.description);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.requirements = new lf.schema.BaseColumn(
      this, 'requirements', false, false, lf.Type.STRING);
  cols.push(this.requirements);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.dept = new lf.schema.BaseColumn(
      this, 'dept', false, false, lf.Type.STRING);
  cols.push(this.dept);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.company = new lf.schema.BaseColumn(
      this, 'company', false, false, lf.Type.STRING);
  cols.push(this.company);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  var indices = [
    new lf.schema.Index('Job', 'fkId', false,
        [
          {schema: this.dept, order: lf.Order.ASC}
        ])
  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Job.base(
      this, 'constructor', 'Job', cols, indices, false);
};
goog.inherits(hr.schema.Job, lf.schema.Table);


/** @override */
hr.schema.Job.prototype.createRow = function(opt_value) {
  return new hr.row.Job(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Job.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new hr.row.Job(dbRecord['id'], data);
};


/** @override */
hr.schema.Job.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.id,
    this.name,
    this.categ,
    this.expectedEmployees,
    this.description,
    this.requirements,
    this.dept,
    this.company,
    this.state
  ];
  var foreignKeys = [
    new lf.schema.ForeignKeySpec(
        {
          'local': 'dept',
          'ref': 'Dept.id',
          'action': lf.ConstraintAction.CASCADE,
          'timing': lf.ConstraintTiming.IMMEDIATE
        }, 'Job', 'fkId')
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.JobType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.categ;
  /** @export @type {number} */
  this.expectedEmployees;
  /** @export @type {string} */
  this.description;
  /** @export @type {string} */
  this.requirements;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.company;
  /** @export @type {string} */
  this.state;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.JobDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.categ;
  /** @export @type {number} */
  this.expectedEmployees;
  /** @export @type {string} */
  this.description;
  /** @export @type {string} */
  this.requirements;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.company;
  /** @export @type {string} */
  this.state;
};



/**
 * Constructs a new Job row.
 * @constructor
 * @extends {lf.Row.<!hr.row.JobType,
 *     !hr.row.JobDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.JobType=} opt_payload
 */
hr.row.Job = function(rowId, opt_payload) {
  hr.row.Job.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Job, lf.Row);


/** @override */
hr.row.Job.prototype.defaultPayload = function() {
  var payload = new hr.row.JobType();
  payload.id = '';
  payload.name = '';
  payload.categ = '';
  payload.expectedEmployees = 0;
  payload.description = '';
  payload.requirements = '';
  payload.dept = '';
  payload.company = '';
  payload.state = '';
  return payload;
};


/** @override */
hr.row.Job.prototype.toDbPayload = function() {
  var payload = new hr.row.JobDbType();
  payload.id = this.payload().id;
  payload.name = this.payload().name;
  payload.categ = this.payload().categ;
  payload.expectedEmployees = this.payload().expectedEmployees;
  payload.description = this.payload().description;
  payload.requirements = this.payload().requirements;
  payload.dept = this.payload().dept;
  payload.company = this.payload().company;
  payload.state = this.payload().state;
  return payload;
};


/** @override */
hr.row.Job.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Job.fkId':
      return this.payload().dept;
    case 'Job.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Job.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getCateg = function() {
  return this.payload().categ;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setCateg = function(value) {
  this.payload().categ = value;
  return this;
};


/** @return {number} */
hr.row.Job.prototype.getExpectedEmployees = function() {
  return this.payload().expectedEmployees;
};


/**
 * @param {number} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setExpectedEmployees = function(value) {
  this.payload().expectedEmployees = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getDescription = function() {
  return this.payload().description;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setDescription = function(value) {
  this.payload().description = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getRequirements = function() {
  return this.payload().requirements;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setRequirements = function(value) {
  this.payload().requirements = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getDept = function() {
  return this.payload().dept;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setDept = function(value) {
  this.payload().dept = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getCompany = function() {
  return this.payload().company;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setCompany = function(value) {
  this.payload().company = value;
  return this;
};


/** @return {string} */
hr.row.Job.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!hr.row.Job}
*/
hr.row.Job.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.DeptType,
 *     !hr.row.DeptDbType>}
 * @constructor
 */
hr.schema.Dept = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', true, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager = new lf.schema.BaseColumn(
      this, 'manager', false, false, lf.Type.STRING);
  cols.push(this.manager);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.parent = new lf.schema.BaseColumn(
      this, 'parent', false, false, lf.Type.STRING);
  cols.push(this.parent);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.company = new lf.schema.BaseColumn(
      this, 'company', false, false, lf.Type.STRING);
  cols.push(this.company);

  var indices = [
    new lf.schema.Index('Dept', 'pkDept', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ]),
    new lf.schema.Index('Dept', 'uniqFN', true,
        [
          {schema: this.name, order: lf.Order.ASC}
        ])
  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Dept.base(
      this, 'constructor', 'Dept', cols, indices, false);
};
goog.inherits(hr.schema.Dept, lf.schema.Table);


/** @override */
hr.schema.Dept.prototype.createRow = function(opt_value) {
  return new hr.row.Dept(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Dept.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new hr.row.Dept(dbRecord['id'], data);
};


/** @override */
hr.schema.Dept.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = this.getIndices()[0];
  var notNullable = [
    this.id,
    this.name,
    this.manager,
    this.parent,
    this.notes,
    this.company
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.DeptType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.manager;
  /** @export @type {string} */
  this.parent;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.company;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.DeptDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.manager;
  /** @export @type {string} */
  this.parent;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.company;
};



/**
 * Constructs a new Dept row.
 * @constructor
 * @extends {lf.Row.<!hr.row.DeptType,
 *     !hr.row.DeptDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.DeptType=} opt_payload
 */
hr.row.Dept = function(rowId, opt_payload) {
  hr.row.Dept.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Dept, lf.Row);


/** @override */
hr.row.Dept.prototype.defaultPayload = function() {
  var payload = new hr.row.DeptType();
  payload.id = '';
  payload.name = '';
  payload.manager = '';
  payload.parent = '';
  payload.notes = '';
  payload.company = '';
  return payload;
};


/** @override */
hr.row.Dept.prototype.toDbPayload = function() {
  var payload = new hr.row.DeptDbType();
  payload.id = this.payload().id;
  payload.name = this.payload().name;
  payload.manager = this.payload().manager;
  payload.parent = this.payload().parent;
  payload.notes = this.payload().notes;
  payload.company = this.payload().company;
  return payload;
};


/** @override */
hr.row.Dept.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Dept.pkDept':
      return this.payload().id;
    case 'Dept.uniqFN':
      return this.payload().name;
    case 'Dept.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Dept.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Dept.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Dept.prototype.getManager = function() {
  return this.payload().manager;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setManager = function(value) {
  this.payload().manager = value;
  return this;
};


/** @return {string} */
hr.row.Dept.prototype.getParent = function() {
  return this.payload().parent;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setParent = function(value) {
  this.payload().parent = value;
  return this;
};


/** @return {string} */
hr.row.Dept.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};


/** @return {string} */
hr.row.Dept.prototype.getCompany = function() {
  return this.payload().company;
};


/**
 * @param {string} value
 * @return {!hr.row.Dept}
*/
hr.row.Dept.prototype.setCompany = function(value) {
  this.payload().company = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.ApplicantType,
 *     !hr.row.ApplicantDbType>}
 * @constructor
 */
hr.schema.Applicant = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', false, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.lastName = new lf.schema.BaseColumn(
      this, 'lastName', false, false, lf.Type.STRING);
  cols.push(this.lastName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.familyName = new lf.schema.BaseColumn(
      this, 'familyName', false, false, lf.Type.STRING);
  cols.push(this.familyName);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.gender = new lf.schema.BaseColumn(
      this, 'gender', false, false, lf.Type.STRING);
  cols.push(this.gender);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.job = new lf.schema.BaseColumn(
      this, 'job', false, false, lf.Type.STRING);
  cols.push(this.job);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.salaryExpected = new lf.schema.BaseColumn(
      this, 'salaryExpected', false, false, lf.Type.NUMBER);
  cols.push(this.salaryExpected);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.salaryProposed = new lf.schema.BaseColumn(
      this, 'salaryProposed', false, false, lf.Type.NUMBER);
  cols.push(this.salaryProposed);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.probability = new lf.schema.BaseColumn(
      this, 'probability', false, false, lf.Type.INTEGER);
  cols.push(this.probability);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.response = new lf.schema.BaseColumn(
      this, 'response', false, false, lf.Type.STRING);
  cols.push(this.response);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.phone = new lf.schema.BaseColumn(
      this, 'phone', false, false, lf.Type.STRING);
  cols.push(this.phone);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.email = new lf.schema.BaseColumn(
      this, 'email', false, false, lf.Type.STRING);
  cols.push(this.email);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.photo = new lf.schema.BaseColumn(
      this, 'photo', false, false, lf.Type.STRING);
  cols.push(this.photo);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.currentJob = new lf.schema.BaseColumn(
      this, 'currentJob', false, false, lf.Type.STRING);
  cols.push(this.currentJob);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.availableDate = new lf.schema.BaseColumn(
      this, 'availableDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.availableDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.reference = new lf.schema.BaseColumn(
      this, 'reference', false, false, lf.Type.STRING);
  cols.push(this.reference);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.source = new lf.schema.BaseColumn(
      this, 'source', false, false, lf.Type.STRING);
  cols.push(this.source);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.stage = new lf.schema.BaseColumn(
      this, 'stage', false, false, lf.Type.STRING);
  cols.push(this.stage);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.DATE_TIME);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.company = new lf.schema.BaseColumn(
      this, 'company', false, false, lf.Type.STRING);
  cols.push(this.company);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created = new lf.schema.BaseColumn(
      this, 'created', false, false, lf.Type.DATE_TIME);
  cols.push(this.created);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated = new lf.schema.BaseColumn(
      this, 'updated', false, false, lf.Type.DATE_TIME);
  cols.push(this.updated);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.tags = new lf.schema.BaseColumn(
      this, 'tags', false, false, lf.Type.STRING);
  cols.push(this.tags);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Applicant.base(
      this, 'constructor', 'Applicant', cols, indices, false);
};
goog.inherits(hr.schema.Applicant, lf.schema.Table);


/** @override */
hr.schema.Applicant.prototype.createRow = function(opt_value) {
  return new hr.row.Applicant(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Applicant.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.availableDate = new Date(data.availableDate);
  data.date = new Date(data.date);
  data.created = new Date(data.created);
  data.updated = new Date(data.updated);
  return new hr.row.Applicant(dbRecord['id'], data);
};


/** @override */
hr.schema.Applicant.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.id,
    this.name,
    this.lastName,
    this.familyName,
    this.gender,
    this.job,
    this.salaryExpected,
    this.salaryProposed,
    this.probability,
    this.response,
    this.phone,
    this.email,
    this.photo,
    this.currentJob,
    this.availableDate,
    this.reference,
    this.source,
    this.stage,
    this.state,
    this.date,
    this.company,
    this.created,
    this.updated,
    this.tags
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.ApplicantType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.lastName;
  /** @export @type {string} */
  this.familyName;
  /** @export @type {string} */
  this.gender;
  /** @export @type {string} */
  this.job;
  /** @export @type {number} */
  this.salaryExpected;
  /** @export @type {number} */
  this.salaryProposed;
  /** @export @type {number} */
  this.probability;
  /** @export @type {string} */
  this.response;
  /** @export @type {string} */
  this.phone;
  /** @export @type {string} */
  this.email;
  /** @export @type {string} */
  this.photo;
  /** @export @type {string} */
  this.currentJob;
  /** @export @type {!Date} */
  this.availableDate;
  /** @export @type {string} */
  this.reference;
  /** @export @type {string} */
  this.source;
  /** @export @type {string} */
  this.stage;
  /** @export @type {string} */
  this.state;
  /** @export @type {!Date} */
  this.date;
  /** @export @type {string} */
  this.company;
  /** @export @type {!Date} */
  this.created;
  /** @export @type {!Date} */
  this.updated;
  /** @export @type {string} */
  this.tags;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.ApplicantDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.lastName;
  /** @export @type {string} */
  this.familyName;
  /** @export @type {string} */
  this.gender;
  /** @export @type {string} */
  this.job;
  /** @export @type {number} */
  this.salaryExpected;
  /** @export @type {number} */
  this.salaryProposed;
  /** @export @type {number} */
  this.probability;
  /** @export @type {string} */
  this.response;
  /** @export @type {string} */
  this.phone;
  /** @export @type {string} */
  this.email;
  /** @export @type {string} */
  this.photo;
  /** @export @type {string} */
  this.currentJob;
  /** @export @type {number} */
  this.availableDate;
  /** @export @type {string} */
  this.reference;
  /** @export @type {string} */
  this.source;
  /** @export @type {string} */
  this.stage;
  /** @export @type {string} */
  this.state;
  /** @export @type {number} */
  this.date;
  /** @export @type {string} */
  this.company;
  /** @export @type {number} */
  this.created;
  /** @export @type {number} */
  this.updated;
  /** @export @type {string} */
  this.tags;
};



/**
 * Constructs a new Applicant row.
 * @constructor
 * @extends {lf.Row.<!hr.row.ApplicantType,
 *     !hr.row.ApplicantDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.ApplicantType=} opt_payload
 */
hr.row.Applicant = function(rowId, opt_payload) {
  hr.row.Applicant.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Applicant, lf.Row);


/** @override */
hr.row.Applicant.prototype.defaultPayload = function() {
  var payload = new hr.row.ApplicantType();
  payload.id = '';
  payload.name = '';
  payload.lastName = '';
  payload.familyName = '';
  payload.gender = '';
  payload.job = '';
  payload.salaryExpected = 0;
  payload.salaryProposed = 0;
  payload.probability = 0;
  payload.response = '';
  payload.phone = '';
  payload.email = '';
  payload.photo = '';
  payload.currentJob = '';
  payload.availableDate = new Date(0);
  payload.reference = '';
  payload.source = '';
  payload.stage = '';
  payload.state = '';
  payload.date = new Date(0);
  payload.company = '';
  payload.created = new Date(0);
  payload.updated = new Date(0);
  payload.tags = '';
  return payload;
};


/** @override */
hr.row.Applicant.prototype.toDbPayload = function() {
  var payload = new hr.row.ApplicantDbType();
  payload.id = this.payload().id;
  payload.name = this.payload().name;
  payload.lastName = this.payload().lastName;
  payload.familyName = this.payload().familyName;
  payload.gender = this.payload().gender;
  payload.job = this.payload().job;
  payload.salaryExpected = this.payload().salaryExpected;
  payload.salaryProposed = this.payload().salaryProposed;
  payload.probability = this.payload().probability;
  payload.response = this.payload().response;
  payload.phone = this.payload().phone;
  payload.email = this.payload().email;
  payload.photo = this.payload().photo;
  payload.currentJob = this.payload().currentJob;
  payload.availableDate = this.payload().availableDate.getTime();
  payload.reference = this.payload().reference;
  payload.source = this.payload().source;
  payload.stage = this.payload().stage;
  payload.state = this.payload().state;
  payload.date = this.payload().date.getTime();
  payload.company = this.payload().company;
  payload.created = this.payload().created.getTime();
  payload.updated = this.payload().updated.getTime();
  payload.tags = this.payload().tags;
  return payload;
};


/** @override */
hr.row.Applicant.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Applicant.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Applicant.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getLastName = function() {
  return this.payload().lastName;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setLastName = function(value) {
  this.payload().lastName = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getFamilyName = function() {
  return this.payload().familyName;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setFamilyName = function(value) {
  this.payload().familyName = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getGender = function() {
  return this.payload().gender;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setGender = function(value) {
  this.payload().gender = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getJob = function() {
  return this.payload().job;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setJob = function(value) {
  this.payload().job = value;
  return this;
};


/** @return {number} */
hr.row.Applicant.prototype.getSalaryExpected = function() {
  return this.payload().salaryExpected;
};


/**
 * @param {number} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setSalaryExpected = function(value) {
  this.payload().salaryExpected = value;
  return this;
};


/** @return {number} */
hr.row.Applicant.prototype.getSalaryProposed = function() {
  return this.payload().salaryProposed;
};


/**
 * @param {number} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setSalaryProposed = function(value) {
  this.payload().salaryProposed = value;
  return this;
};


/** @return {number} */
hr.row.Applicant.prototype.getProbability = function() {
  return this.payload().probability;
};


/**
 * @param {number} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setProbability = function(value) {
  this.payload().probability = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getResponse = function() {
  return this.payload().response;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setResponse = function(value) {
  this.payload().response = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getPhone = function() {
  return this.payload().phone;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setPhone = function(value) {
  this.payload().phone = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getEmail = function() {
  return this.payload().email;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setEmail = function(value) {
  this.payload().email = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getPhoto = function() {
  return this.payload().photo;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setPhoto = function(value) {
  this.payload().photo = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getCurrentJob = function() {
  return this.payload().currentJob;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setCurrentJob = function(value) {
  this.payload().currentJob = value;
  return this;
};


/** @return {!Date} */
hr.row.Applicant.prototype.getAvailableDate = function() {
  return this.payload().availableDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setAvailableDate = function(value) {
  this.payload().availableDate = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getReference = function() {
  return this.payload().reference;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setReference = function(value) {
  this.payload().reference = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getSource = function() {
  return this.payload().source;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setSource = function(value) {
  this.payload().source = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getStage = function() {
  return this.payload().stage;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setStage = function(value) {
  this.payload().stage = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {!Date} */
hr.row.Applicant.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getCompany = function() {
  return this.payload().company;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setCompany = function(value) {
  this.payload().company = value;
  return this;
};


/** @return {!Date} */
hr.row.Applicant.prototype.getCreated = function() {
  return this.payload().created;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setCreated = function(value) {
  this.payload().created = value;
  return this;
};


/** @return {!Date} */
hr.row.Applicant.prototype.getUpdated = function() {
  return this.payload().updated;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setUpdated = function(value) {
  this.payload().updated = value;
  return this;
};


/** @return {string} */
hr.row.Applicant.prototype.getTags = function() {
  return this.payload().tags;
};


/**
 * @param {string} value
 * @return {!hr.row.Applicant}
*/
hr.row.Applicant.prototype.setTags = function(value) {
  this.payload().tags = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.PersonalType,
 *     !hr.row.PersonalDbType>}
 * @constructor
 */
hr.schema.Personal = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', false, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.interest = new lf.schema.BaseColumn(
      this, 'interest', false, false, lf.Type.STRING);
  cols.push(this.interest);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.goal = new lf.schema.BaseColumn(
      this, 'goal', false, false, lf.Type.STRING);
  cols.push(this.goal);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.behavior = new lf.schema.BaseColumn(
      this, 'behavior', false, false, lf.Type.STRING);
  cols.push(this.behavior);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.birthday = new lf.schema.BaseColumn(
      this, 'birthday', false, false, lf.Type.DATE_TIME);
  cols.push(this.birthday);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.birthPlace = new lf.schema.BaseColumn(
      this, 'birthPlace', false, false, lf.Type.STRING);
  cols.push(this.birthPlace);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.nationality = new lf.schema.BaseColumn(
      this, 'nationality', false, false, lf.Type.STRING);
  cols.push(this.nationality);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.marital = new lf.schema.BaseColumn(
      this, 'marital', false, false, lf.Type.STRING);
  cols.push(this.marital);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.children = new lf.schema.BaseColumn(
      this, 'children', false, false, lf.Type.INTEGER);
  cols.push(this.children);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.homeAddress = new lf.schema.BaseColumn(
      this, 'homeAddress', false, false, lf.Type.STRING);
  cols.push(this.homeAddress);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.homePhone = new lf.schema.BaseColumn(
      this, 'homePhone', false, false, lf.Type.STRING);
  cols.push(this.homePhone);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.email = new lf.schema.BaseColumn(
      this, 'email', false, false, lf.Type.STRING);
  cols.push(this.email);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.bloodType = new lf.schema.BaseColumn(
      this, 'bloodType', false, false, lf.Type.STRING);
  cols.push(this.bloodType);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.height = new lf.schema.BaseColumn(
      this, 'height', false, false, lf.Type.NUMBER);
  cols.push(this.height);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.weight = new lf.schema.BaseColumn(
      this, 'weight', false, false, lf.Type.NUMBER);
  cols.push(this.weight);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Personal.base(
      this, 'constructor', 'Personal', cols, indices, false);
};
goog.inherits(hr.schema.Personal, lf.schema.Table);


/** @override */
hr.schema.Personal.prototype.createRow = function(opt_value) {
  return new hr.row.Personal(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Personal.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.birthday = new Date(data.birthday);
  return new hr.row.Personal(dbRecord['id'], data);
};


/** @override */
hr.schema.Personal.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.id,
    this.interest,
    this.goal,
    this.behavior,
    this.birthday,
    this.birthPlace,
    this.nationality,
    this.marital,
    this.children,
    this.homeAddress,
    this.homePhone,
    this.email,
    this.bloodType,
    this.height,
    this.weight,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.PersonalType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.interest;
  /** @export @type {string} */
  this.goal;
  /** @export @type {string} */
  this.behavior;
  /** @export @type {!Date} */
  this.birthday;
  /** @export @type {string} */
  this.birthPlace;
  /** @export @type {string} */
  this.nationality;
  /** @export @type {string} */
  this.marital;
  /** @export @type {number} */
  this.children;
  /** @export @type {string} */
  this.homeAddress;
  /** @export @type {string} */
  this.homePhone;
  /** @export @type {string} */
  this.email;
  /** @export @type {string} */
  this.bloodType;
  /** @export @type {number} */
  this.height;
  /** @export @type {number} */
  this.weight;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.PersonalDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.interest;
  /** @export @type {string} */
  this.goal;
  /** @export @type {string} */
  this.behavior;
  /** @export @type {number} */
  this.birthday;
  /** @export @type {string} */
  this.birthPlace;
  /** @export @type {string} */
  this.nationality;
  /** @export @type {string} */
  this.marital;
  /** @export @type {number} */
  this.children;
  /** @export @type {string} */
  this.homeAddress;
  /** @export @type {string} */
  this.homePhone;
  /** @export @type {string} */
  this.email;
  /** @export @type {string} */
  this.bloodType;
  /** @export @type {number} */
  this.height;
  /** @export @type {number} */
  this.weight;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Personal row.
 * @constructor
 * @extends {lf.Row.<!hr.row.PersonalType,
 *     !hr.row.PersonalDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.PersonalType=} opt_payload
 */
hr.row.Personal = function(rowId, opt_payload) {
  hr.row.Personal.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Personal, lf.Row);


/** @override */
hr.row.Personal.prototype.defaultPayload = function() {
  var payload = new hr.row.PersonalType();
  payload.id = '';
  payload.interest = '';
  payload.goal = '';
  payload.behavior = '';
  payload.birthday = new Date(0);
  payload.birthPlace = '';
  payload.nationality = '';
  payload.marital = '';
  payload.children = 0;
  payload.homeAddress = '';
  payload.homePhone = '';
  payload.email = '';
  payload.bloodType = '';
  payload.height = 0;
  payload.weight = 0;
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Personal.prototype.toDbPayload = function() {
  var payload = new hr.row.PersonalDbType();
  payload.id = this.payload().id;
  payload.interest = this.payload().interest;
  payload.goal = this.payload().goal;
  payload.behavior = this.payload().behavior;
  payload.birthday = this.payload().birthday.getTime();
  payload.birthPlace = this.payload().birthPlace;
  payload.nationality = this.payload().nationality;
  payload.marital = this.payload().marital;
  payload.children = this.payload().children;
  payload.homeAddress = this.payload().homeAddress;
  payload.homePhone = this.payload().homePhone;
  payload.email = this.payload().email;
  payload.bloodType = this.payload().bloodType;
  payload.height = this.payload().height;
  payload.weight = this.payload().weight;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Personal.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Personal.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Personal.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getInterest = function() {
  return this.payload().interest;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setInterest = function(value) {
  this.payload().interest = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getGoal = function() {
  return this.payload().goal;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setGoal = function(value) {
  this.payload().goal = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getBehavior = function() {
  return this.payload().behavior;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setBehavior = function(value) {
  this.payload().behavior = value;
  return this;
};


/** @return {!Date} */
hr.row.Personal.prototype.getBirthday = function() {
  return this.payload().birthday;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setBirthday = function(value) {
  this.payload().birthday = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getBirthPlace = function() {
  return this.payload().birthPlace;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setBirthPlace = function(value) {
  this.payload().birthPlace = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getNationality = function() {
  return this.payload().nationality;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setNationality = function(value) {
  this.payload().nationality = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getMarital = function() {
  return this.payload().marital;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setMarital = function(value) {
  this.payload().marital = value;
  return this;
};


/** @return {number} */
hr.row.Personal.prototype.getChildren = function() {
  return this.payload().children;
};


/**
 * @param {number} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setChildren = function(value) {
  this.payload().children = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getHomeAddress = function() {
  return this.payload().homeAddress;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setHomeAddress = function(value) {
  this.payload().homeAddress = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getHomePhone = function() {
  return this.payload().homePhone;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setHomePhone = function(value) {
  this.payload().homePhone = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getEmail = function() {
  return this.payload().email;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setEmail = function(value) {
  this.payload().email = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getBloodType = function() {
  return this.payload().bloodType;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setBloodType = function(value) {
  this.payload().bloodType = value;
  return this;
};


/** @return {number} */
hr.row.Personal.prototype.getHeight = function() {
  return this.payload().height;
};


/**
 * @param {number} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setHeight = function(value) {
  this.payload().height = value;
  return this;
};


/** @return {number} */
hr.row.Personal.prototype.getWeight = function() {
  return this.payload().weight;
};


/**
 * @param {number} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setWeight = function(value) {
  this.payload().weight = value;
  return this;
};


/** @return {string} */
hr.row.Personal.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Personal}
*/
hr.row.Personal.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.FamilyType,
 *     !hr.row.FamilyDbType>}
 * @constructor
 */
hr.schema.Family = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.person = new lf.schema.BaseColumn(
      this, 'person', false, false, lf.Type.STRING);
  cols.push(this.person);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.relation = new lf.schema.BaseColumn(
      this, 'relation', false, false, lf.Type.STRING);
  cols.push(this.relation);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.birthYear = new lf.schema.BaseColumn(
      this, 'birthYear', false, false, lf.Type.INTEGER);
  cols.push(this.birthYear);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.phone = new lf.schema.BaseColumn(
      this, 'phone', false, false, lf.Type.STRING);
  cols.push(this.phone);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Family.base(
      this, 'constructor', 'Family', cols, indices, false);
};
goog.inherits(hr.schema.Family, lf.schema.Table);


/** @override */
hr.schema.Family.prototype.createRow = function(opt_value) {
  return new hr.row.Family(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Family.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new hr.row.Family(dbRecord['id'], data);
};


/** @override */
hr.schema.Family.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.person,
    this.name,
    this.relation,
    this.birthYear,
    this.phone
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.FamilyType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.relation;
  /** @export @type {number} */
  this.birthYear;
  /** @export @type {string} */
  this.phone;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.FamilyDbType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.relation;
  /** @export @type {number} */
  this.birthYear;
  /** @export @type {string} */
  this.phone;
};



/**
 * Constructs a new Family row.
 * @constructor
 * @extends {lf.Row.<!hr.row.FamilyType,
 *     !hr.row.FamilyDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.FamilyType=} opt_payload
 */
hr.row.Family = function(rowId, opt_payload) {
  hr.row.Family.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Family, lf.Row);


/** @override */
hr.row.Family.prototype.defaultPayload = function() {
  var payload = new hr.row.FamilyType();
  payload.person = '';
  payload.name = '';
  payload.relation = '';
  payload.birthYear = 0;
  payload.phone = '';
  return payload;
};


/** @override */
hr.row.Family.prototype.toDbPayload = function() {
  var payload = new hr.row.FamilyDbType();
  payload.person = this.payload().person;
  payload.name = this.payload().name;
  payload.relation = this.payload().relation;
  payload.birthYear = this.payload().birthYear;
  payload.phone = this.payload().phone;
  return payload;
};


/** @override */
hr.row.Family.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Family.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Family.prototype.getPerson = function() {
  return this.payload().person;
};


/**
 * @param {string} value
 * @return {!hr.row.Family}
*/
hr.row.Family.prototype.setPerson = function(value) {
  this.payload().person = value;
  return this;
};


/** @return {string} */
hr.row.Family.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Family}
*/
hr.row.Family.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Family.prototype.getRelation = function() {
  return this.payload().relation;
};


/**
 * @param {string} value
 * @return {!hr.row.Family}
*/
hr.row.Family.prototype.setRelation = function(value) {
  this.payload().relation = value;
  return this;
};


/** @return {number} */
hr.row.Family.prototype.getBirthYear = function() {
  return this.payload().birthYear;
};


/**
 * @param {number} value
 * @return {!hr.row.Family}
*/
hr.row.Family.prototype.setBirthYear = function(value) {
  this.payload().birthYear = value;
  return this;
};


/** @return {string} */
hr.row.Family.prototype.getPhone = function() {
  return this.payload().phone;
};


/**
 * @param {string} value
 * @return {!hr.row.Family}
*/
hr.row.Family.prototype.setPhone = function(value) {
  this.payload().phone = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.EducationType,
 *     !hr.row.EducationDbType>}
 * @constructor
 */
hr.schema.Education = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.person = new lf.schema.BaseColumn(
      this, 'person', false, false, lf.Type.STRING);
  cols.push(this.person);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.school = new lf.schema.BaseColumn(
      this, 'school', false, false, lf.Type.STRING);
  cols.push(this.school);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.duration = new lf.schema.BaseColumn(
      this, 'duration', false, false, lf.Type.INTEGER);
  cols.push(this.duration);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.graduatedYear = new lf.schema.BaseColumn(
      this, 'graduatedYear', false, false, lf.Type.INTEGER);
  cols.push(this.graduatedYear);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.profession = new lf.schema.BaseColumn(
      this, 'profession', false, false, lf.Type.STRING);
  cols.push(this.profession);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.diplomaNo = new lf.schema.BaseColumn(
      this, 'diplomaNo', false, false, lf.Type.STRING);
  cols.push(this.diplomaNo);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.thesis = new lf.schema.BaseColumn(
      this, 'thesis', false, false, lf.Type.STRING);
  cols.push(this.thesis);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.degree = new lf.schema.BaseColumn(
      this, 'degree', false, false, lf.Type.STRING);
  cols.push(this.degree);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.gpa = new lf.schema.BaseColumn(
      this, 'gpa', false, false, lf.Type.NUMBER);
  cols.push(this.gpa);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Education.base(
      this, 'constructor', 'Education', cols, indices, false);
};
goog.inherits(hr.schema.Education, lf.schema.Table);


/** @override */
hr.schema.Education.prototype.createRow = function(opt_value) {
  return new hr.row.Education(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Education.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new hr.row.Education(dbRecord['id'], data);
};


/** @override */
hr.schema.Education.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.person,
    this.school,
    this.duration,
    this.graduatedYear,
    this.profession,
    this.diplomaNo,
    this.thesis,
    this.degree,
    this.gpa,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.EducationType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.school;
  /** @export @type {number} */
  this.duration;
  /** @export @type {number} */
  this.graduatedYear;
  /** @export @type {string} */
  this.profession;
  /** @export @type {string} */
  this.diplomaNo;
  /** @export @type {string} */
  this.thesis;
  /** @export @type {string} */
  this.degree;
  /** @export @type {number} */
  this.gpa;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.EducationDbType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.school;
  /** @export @type {number} */
  this.duration;
  /** @export @type {number} */
  this.graduatedYear;
  /** @export @type {string} */
  this.profession;
  /** @export @type {string} */
  this.diplomaNo;
  /** @export @type {string} */
  this.thesis;
  /** @export @type {string} */
  this.degree;
  /** @export @type {number} */
  this.gpa;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Education row.
 * @constructor
 * @extends {lf.Row.<!hr.row.EducationType,
 *     !hr.row.EducationDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.EducationType=} opt_payload
 */
hr.row.Education = function(rowId, opt_payload) {
  hr.row.Education.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Education, lf.Row);


/** @override */
hr.row.Education.prototype.defaultPayload = function() {
  var payload = new hr.row.EducationType();
  payload.person = '';
  payload.school = '';
  payload.duration = 0;
  payload.graduatedYear = 0;
  payload.profession = '';
  payload.diplomaNo = '';
  payload.thesis = '';
  payload.degree = '';
  payload.gpa = 0;
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Education.prototype.toDbPayload = function() {
  var payload = new hr.row.EducationDbType();
  payload.person = this.payload().person;
  payload.school = this.payload().school;
  payload.duration = this.payload().duration;
  payload.graduatedYear = this.payload().graduatedYear;
  payload.profession = this.payload().profession;
  payload.diplomaNo = this.payload().diplomaNo;
  payload.thesis = this.payload().thesis;
  payload.degree = this.payload().degree;
  payload.gpa = this.payload().gpa;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Education.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Education.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Education.prototype.getPerson = function() {
  return this.payload().person;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setPerson = function(value) {
  this.payload().person = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getSchool = function() {
  return this.payload().school;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setSchool = function(value) {
  this.payload().school = value;
  return this;
};


/** @return {number} */
hr.row.Education.prototype.getDuration = function() {
  return this.payload().duration;
};


/**
 * @param {number} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setDuration = function(value) {
  this.payload().duration = value;
  return this;
};


/** @return {number} */
hr.row.Education.prototype.getGraduatedYear = function() {
  return this.payload().graduatedYear;
};


/**
 * @param {number} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setGraduatedYear = function(value) {
  this.payload().graduatedYear = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getProfession = function() {
  return this.payload().profession;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setProfession = function(value) {
  this.payload().profession = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getDiplomaNo = function() {
  return this.payload().diplomaNo;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setDiplomaNo = function(value) {
  this.payload().diplomaNo = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getThesis = function() {
  return this.payload().thesis;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setThesis = function(value) {
  this.payload().thesis = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getDegree = function() {
  return this.payload().degree;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setDegree = function(value) {
  this.payload().degree = value;
  return this;
};


/** @return {number} */
hr.row.Education.prototype.getGpa = function() {
  return this.payload().gpa;
};


/**
 * @param {number} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setGpa = function(value) {
  this.payload().gpa = value;
  return this;
};


/** @return {string} */
hr.row.Education.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Education}
*/
hr.row.Education.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.SkillType,
 *     !hr.row.SkillDbType>}
 * @constructor
 */
hr.schema.Skill = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.person = new lf.schema.BaseColumn(
      this, 'person', false, false, lf.Type.STRING);
  cols.push(this.person);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.level = new lf.schema.BaseColumn(
      this, 'level', false, false, lf.Type.STRING);
  cols.push(this.level);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.duration = new lf.schema.BaseColumn(
      this, 'duration', false, false, lf.Type.INTEGER);
  cols.push(this.duration);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Skill.base(
      this, 'constructor', 'Skill', cols, indices, false);
};
goog.inherits(hr.schema.Skill, lf.schema.Table);


/** @override */
hr.schema.Skill.prototype.createRow = function(opt_value) {
  return new hr.row.Skill(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Skill.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new hr.row.Skill(dbRecord['id'], data);
};


/** @override */
hr.schema.Skill.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.person,
    this.type,
    this.level,
    this.duration,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.SkillType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.level;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.SkillDbType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.level;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Skill row.
 * @constructor
 * @extends {lf.Row.<!hr.row.SkillType,
 *     !hr.row.SkillDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.SkillType=} opt_payload
 */
hr.row.Skill = function(rowId, opt_payload) {
  hr.row.Skill.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Skill, lf.Row);


/** @override */
hr.row.Skill.prototype.defaultPayload = function() {
  var payload = new hr.row.SkillType();
  payload.person = '';
  payload.type = '';
  payload.level = '';
  payload.duration = 0;
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Skill.prototype.toDbPayload = function() {
  var payload = new hr.row.SkillDbType();
  payload.person = this.payload().person;
  payload.type = this.payload().type;
  payload.level = this.payload().level;
  payload.duration = this.payload().duration;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Skill.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Skill.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Skill.prototype.getPerson = function() {
  return this.payload().person;
};


/**
 * @param {string} value
 * @return {!hr.row.Skill}
*/
hr.row.Skill.prototype.setPerson = function(value) {
  this.payload().person = value;
  return this;
};


/** @return {string} */
hr.row.Skill.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!hr.row.Skill}
*/
hr.row.Skill.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {string} */
hr.row.Skill.prototype.getLevel = function() {
  return this.payload().level;
};


/**
 * @param {string} value
 * @return {!hr.row.Skill}
*/
hr.row.Skill.prototype.setLevel = function(value) {
  this.payload().level = value;
  return this;
};


/** @return {number} */
hr.row.Skill.prototype.getDuration = function() {
  return this.payload().duration;
};


/**
 * @param {number} value
 * @return {!hr.row.Skill}
*/
hr.row.Skill.prototype.setDuration = function(value) {
  this.payload().duration = value;
  return this;
};


/** @return {string} */
hr.row.Skill.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Skill}
*/
hr.row.Skill.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.WorkHistoryType,
 *     !hr.row.WorkHistoryDbType>}
 * @constructor
 */
hr.schema.WorkHistory = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.person = new lf.schema.BaseColumn(
      this, 'person', false, false, lf.Type.STRING);
  cols.push(this.person);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.org = new lf.schema.BaseColumn(
      this, 'org', false, false, lf.Type.STRING);
  cols.push(this.org);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.joinedDate = new lf.schema.BaseColumn(
      this, 'joinedDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.joinedDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.position = new lf.schema.BaseColumn(
      this, 'position', false, false, lf.Type.STRING);
  cols.push(this.position);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager = new lf.schema.BaseColumn(
      this, 'manager', false, false, lf.Type.STRING);
  cols.push(this.manager);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.contact = new lf.schema.BaseColumn(
      this, 'contact', false, false, lf.Type.STRING);
  cols.push(this.contact);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.leaveDate = new lf.schema.BaseColumn(
      this, 'leaveDate', false, false, lf.Type.DATE_TIME);
  cols.push(this.leaveDate);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.WorkHistory.base(
      this, 'constructor', 'WorkHistory', cols, indices, false);
};
goog.inherits(hr.schema.WorkHistory, lf.schema.Table);


/** @override */
hr.schema.WorkHistory.prototype.createRow = function(opt_value) {
  return new hr.row.WorkHistory(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.WorkHistory.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.joinedDate = new Date(data.joinedDate);
  data.leaveDate = new Date(data.leaveDate);
  return new hr.row.WorkHistory(dbRecord['id'], data);
};


/** @override */
hr.schema.WorkHistory.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.person,
    this.org,
    this.joinedDate,
    this.position,
    this.manager,
    this.contact,
    this.leaveDate,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.WorkHistoryType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.org;
  /** @export @type {!Date} */
  this.joinedDate;
  /** @export @type {string} */
  this.position;
  /** @export @type {string} */
  this.manager;
  /** @export @type {string} */
  this.contact;
  /** @export @type {!Date} */
  this.leaveDate;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.WorkHistoryDbType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.org;
  /** @export @type {number} */
  this.joinedDate;
  /** @export @type {string} */
  this.position;
  /** @export @type {string} */
  this.manager;
  /** @export @type {string} */
  this.contact;
  /** @export @type {number} */
  this.leaveDate;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new WorkHistory row.
 * @constructor
 * @extends {lf.Row.<!hr.row.WorkHistoryType,
 *     !hr.row.WorkHistoryDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.WorkHistoryType=} opt_payload
 */
hr.row.WorkHistory = function(rowId, opt_payload) {
  hr.row.WorkHistory.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.WorkHistory, lf.Row);


/** @override */
hr.row.WorkHistory.prototype.defaultPayload = function() {
  var payload = new hr.row.WorkHistoryType();
  payload.person = '';
  payload.org = '';
  payload.joinedDate = new Date(0);
  payload.position = '';
  payload.manager = '';
  payload.contact = '';
  payload.leaveDate = new Date(0);
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.WorkHistory.prototype.toDbPayload = function() {
  var payload = new hr.row.WorkHistoryDbType();
  payload.person = this.payload().person;
  payload.org = this.payload().org;
  payload.joinedDate = this.payload().joinedDate.getTime();
  payload.position = this.payload().position;
  payload.manager = this.payload().manager;
  payload.contact = this.payload().contact;
  payload.leaveDate = this.payload().leaveDate.getTime();
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.WorkHistory.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'WorkHistory.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getPerson = function() {
  return this.payload().person;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setPerson = function(value) {
  this.payload().person = value;
  return this;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getOrg = function() {
  return this.payload().org;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setOrg = function(value) {
  this.payload().org = value;
  return this;
};


/** @return {!Date} */
hr.row.WorkHistory.prototype.getJoinedDate = function() {
  return this.payload().joinedDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setJoinedDate = function(value) {
  this.payload().joinedDate = value;
  return this;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getPosition = function() {
  return this.payload().position;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setPosition = function(value) {
  this.payload().position = value;
  return this;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getManager = function() {
  return this.payload().manager;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setManager = function(value) {
  this.payload().manager = value;
  return this;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getContact = function() {
  return this.payload().contact;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setContact = function(value) {
  this.payload().contact = value;
  return this;
};


/** @return {!Date} */
hr.row.WorkHistory.prototype.getLeaveDate = function() {
  return this.payload().leaveDate;
};


/**
 * @param {!Date} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setLeaveDate = function(value) {
  this.payload().leaveDate = value;
  return this;
};


/** @return {string} */
hr.row.WorkHistory.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.WorkHistory}
*/
hr.row.WorkHistory.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.RewardsType,
 *     !hr.row.RewardsDbType>}
 * @constructor
 */
hr.schema.Rewards = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.person = new lf.schema.BaseColumn(
      this, 'person', false, false, lf.Type.STRING);
  cols.push(this.person);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.DATE_TIME);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.orderId = new lf.schema.BaseColumn(
      this, 'orderId', false, false, lf.Type.STRING);
  cols.push(this.orderId);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.org = new lf.schema.BaseColumn(
      this, 'org', false, false, lf.Type.STRING);
  cols.push(this.org);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Rewards.base(
      this, 'constructor', 'Rewards', cols, indices, false);
};
goog.inherits(hr.schema.Rewards, lf.schema.Table);


/** @override */
hr.schema.Rewards.prototype.createRow = function(opt_value) {
  return new hr.row.Rewards(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Rewards.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.date = new Date(data.date);
  return new hr.row.Rewards(dbRecord['id'], data);
};


/** @override */
hr.schema.Rewards.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.person,
    this.name,
    this.date,
    this.orderId,
    this.type,
    this.org,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.RewardsType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.name;
  /** @export @type {!Date} */
  this.date;
  /** @export @type {string} */
  this.orderId;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.org;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.RewardsDbType = function() {
  /** @export @type {string} */
  this.person;
  /** @export @type {string} */
  this.name;
  /** @export @type {number} */
  this.date;
  /** @export @type {string} */
  this.orderId;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.org;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Rewards row.
 * @constructor
 * @extends {lf.Row.<!hr.row.RewardsType,
 *     !hr.row.RewardsDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.RewardsType=} opt_payload
 */
hr.row.Rewards = function(rowId, opt_payload) {
  hr.row.Rewards.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Rewards, lf.Row);


/** @override */
hr.row.Rewards.prototype.defaultPayload = function() {
  var payload = new hr.row.RewardsType();
  payload.person = '';
  payload.name = '';
  payload.date = new Date(0);
  payload.orderId = '';
  payload.type = '';
  payload.org = '';
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Rewards.prototype.toDbPayload = function() {
  var payload = new hr.row.RewardsDbType();
  payload.person = this.payload().person;
  payload.name = this.payload().name;
  payload.date = this.payload().date.getTime();
  payload.orderId = this.payload().orderId;
  payload.type = this.payload().type;
  payload.org = this.payload().org;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Rewards.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Rewards.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Rewards.prototype.getPerson = function() {
  return this.payload().person;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setPerson = function(value) {
  this.payload().person = value;
  return this;
};


/** @return {string} */
hr.row.Rewards.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {!Date} */
hr.row.Rewards.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Rewards.prototype.getOrderId = function() {
  return this.payload().orderId;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setOrderId = function(value) {
  this.payload().orderId = value;
  return this;
};


/** @return {string} */
hr.row.Rewards.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {string} */
hr.row.Rewards.prototype.getOrg = function() {
  return this.payload().org;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setOrg = function(value) {
  this.payload().org = value;
  return this;
};


/** @return {string} */
hr.row.Rewards.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Rewards}
*/
hr.row.Rewards.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.AttendanceType,
 *     !hr.row.AttendanceDbType>}
 * @constructor
 */
hr.schema.Attendance = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.DATE_TIME);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.action = new lf.schema.BaseColumn(
      this, 'action', false, false, lf.Type.STRING);
  cols.push(this.action);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.actionDesc = new lf.schema.BaseColumn(
      this, 'actionDesc', false, false, lf.Type.STRING);
  cols.push(this.actionDesc);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager = new lf.schema.BaseColumn(
      this, 'manager', false, false, lf.Type.STRING);
  cols.push(this.manager);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.workcode = new lf.schema.BaseColumn(
      this, 'workcode', false, false, lf.Type.INTEGER);
  cols.push(this.workcode);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.enrollNumder = new lf.schema.BaseColumn(
      this, 'enrollNumder', false, false, lf.Type.INTEGER);
  cols.push(this.enrollNumder);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.remoteAddr = new lf.schema.BaseColumn(
      this, 'remoteAddr', false, false, lf.Type.STRING);
  cols.push(this.remoteAddr);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Attendance.base(
      this, 'constructor', 'Attendance', cols, indices, false);
};
goog.inherits(hr.schema.Attendance, lf.schema.Table);


/** @override */
hr.schema.Attendance.prototype.createRow = function(opt_value) {
  return new hr.row.Attendance(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Attendance.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.date = new Date(data.date);
  return new hr.row.Attendance(dbRecord['id'], data);
};


/** @override */
hr.schema.Attendance.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.emp,
    this.date,
    this.action,
    this.actionDesc,
    this.manager,
    this.workcode,
    this.enrollNumder,
    this.remoteAddr
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.AttendanceType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {!Date} */
  this.date;
  /** @export @type {string} */
  this.action;
  /** @export @type {string} */
  this.actionDesc;
  /** @export @type {string} */
  this.manager;
  /** @export @type {number} */
  this.workcode;
  /** @export @type {number} */
  this.enrollNumder;
  /** @export @type {string} */
  this.remoteAddr;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.AttendanceDbType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {number} */
  this.date;
  /** @export @type {string} */
  this.action;
  /** @export @type {string} */
  this.actionDesc;
  /** @export @type {string} */
  this.manager;
  /** @export @type {number} */
  this.workcode;
  /** @export @type {number} */
  this.enrollNumder;
  /** @export @type {string} */
  this.remoteAddr;
};



/**
 * Constructs a new Attendance row.
 * @constructor
 * @extends {lf.Row.<!hr.row.AttendanceType,
 *     !hr.row.AttendanceDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.AttendanceType=} opt_payload
 */
hr.row.Attendance = function(rowId, opt_payload) {
  hr.row.Attendance.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Attendance, lf.Row);


/** @override */
hr.row.Attendance.prototype.defaultPayload = function() {
  var payload = new hr.row.AttendanceType();
  payload.emp = '';
  payload.date = new Date(0);
  payload.action = '';
  payload.actionDesc = '';
  payload.manager = '';
  payload.workcode = 0;
  payload.enrollNumder = 0;
  payload.remoteAddr = '';
  return payload;
};


/** @override */
hr.row.Attendance.prototype.toDbPayload = function() {
  var payload = new hr.row.AttendanceDbType();
  payload.emp = this.payload().emp;
  payload.date = this.payload().date.getTime();
  payload.action = this.payload().action;
  payload.actionDesc = this.payload().actionDesc;
  payload.manager = this.payload().manager;
  payload.workcode = this.payload().workcode;
  payload.enrollNumder = this.payload().enrollNumder;
  payload.remoteAddr = this.payload().remoteAddr;
  return payload;
};


/** @override */
hr.row.Attendance.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Attendance.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Attendance.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {!Date} */
hr.row.Attendance.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Attendance.prototype.getAction = function() {
  return this.payload().action;
};


/**
 * @param {string} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setAction = function(value) {
  this.payload().action = value;
  return this;
};


/** @return {string} */
hr.row.Attendance.prototype.getActionDesc = function() {
  return this.payload().actionDesc;
};


/**
 * @param {string} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setActionDesc = function(value) {
  this.payload().actionDesc = value;
  return this;
};


/** @return {string} */
hr.row.Attendance.prototype.getManager = function() {
  return this.payload().manager;
};


/**
 * @param {string} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setManager = function(value) {
  this.payload().manager = value;
  return this;
};


/** @return {number} */
hr.row.Attendance.prototype.getWorkcode = function() {
  return this.payload().workcode;
};


/**
 * @param {number} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setWorkcode = function(value) {
  this.payload().workcode = value;
  return this;
};


/** @return {number} */
hr.row.Attendance.prototype.getEnrollNumder = function() {
  return this.payload().enrollNumder;
};


/**
 * @param {number} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setEnrollNumder = function(value) {
  this.payload().enrollNumder = value;
  return this;
};


/** @return {string} */
hr.row.Attendance.prototype.getRemoteAddr = function() {
  return this.payload().remoteAddr;
};


/**
 * @param {string} value
 * @return {!hr.row.Attendance}
*/
hr.row.Attendance.prototype.setRemoteAddr = function(value) {
  this.payload().remoteAddr = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.LeaveType,
 *     !hr.row.LeaveDbType>}
 * @constructor
 */
hr.schema.Leave = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.dateFrom = new lf.schema.BaseColumn(
      this, 'dateFrom', false, false, lf.Type.DATE_TIME);
  cols.push(this.dateFrom);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.dateTo = new lf.schema.BaseColumn(
      this, 'dateTo', false, false, lf.Type.DATE_TIME);
  cols.push(this.dateTo);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.duration = new lf.schema.BaseColumn(
      this, 'duration', false, false, lf.Type.INTEGER);
  cols.push(this.duration);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager1 = new lf.schema.BaseColumn(
      this, 'manager1', false, false, lf.Type.STRING);
  cols.push(this.manager1);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager2 = new lf.schema.BaseColumn(
      this, 'manager2', false, false, lf.Type.STRING);
  cols.push(this.manager2);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.dept = new lf.schema.BaseColumn(
      this, 'dept', false, false, lf.Type.STRING);
  cols.push(this.dept);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Leave.base(
      this, 'constructor', 'Leave', cols, indices, false);
};
goog.inherits(hr.schema.Leave, lf.schema.Table);


/** @override */
hr.schema.Leave.prototype.createRow = function(opt_value) {
  return new hr.row.Leave(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Leave.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.dateFrom = new Date(data.dateFrom);
  data.dateTo = new Date(data.dateTo);
  return new hr.row.Leave(dbRecord['id'], data);
};


/** @override */
hr.schema.Leave.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.name,
    this.emp,
    this.type,
    this.state,
    this.dateFrom,
    this.dateTo,
    this.duration,
    this.manager1,
    this.manager2,
    this.dept,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.LeaveType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.state;
  /** @export @type {!Date} */
  this.dateFrom;
  /** @export @type {!Date} */
  this.dateTo;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.manager1;
  /** @export @type {string} */
  this.manager2;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.LeaveDbType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.type;
  /** @export @type {string} */
  this.state;
  /** @export @type {number} */
  this.dateFrom;
  /** @export @type {number} */
  this.dateTo;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.manager1;
  /** @export @type {string} */
  this.manager2;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Leave row.
 * @constructor
 * @extends {lf.Row.<!hr.row.LeaveType,
 *     !hr.row.LeaveDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.LeaveType=} opt_payload
 */
hr.row.Leave = function(rowId, opt_payload) {
  hr.row.Leave.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Leave, lf.Row);


/** @override */
hr.row.Leave.prototype.defaultPayload = function() {
  var payload = new hr.row.LeaveType();
  payload.name = '';
  payload.emp = '';
  payload.type = '';
  payload.state = '';
  payload.dateFrom = new Date(0);
  payload.dateTo = new Date(0);
  payload.duration = 0;
  payload.manager1 = '';
  payload.manager2 = '';
  payload.dept = '';
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Leave.prototype.toDbPayload = function() {
  var payload = new hr.row.LeaveDbType();
  payload.name = this.payload().name;
  payload.emp = this.payload().emp;
  payload.type = this.payload().type;
  payload.state = this.payload().state;
  payload.dateFrom = this.payload().dateFrom.getTime();
  payload.dateTo = this.payload().dateTo.getTime();
  payload.duration = this.payload().duration;
  payload.manager1 = this.payload().manager1;
  payload.manager2 = this.payload().manager2;
  payload.dept = this.payload().dept;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Leave.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Leave.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Leave.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {!Date} */
hr.row.Leave.prototype.getDateFrom = function() {
  return this.payload().dateFrom;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setDateFrom = function(value) {
  this.payload().dateFrom = value;
  return this;
};


/** @return {!Date} */
hr.row.Leave.prototype.getDateTo = function() {
  return this.payload().dateTo;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setDateTo = function(value) {
  this.payload().dateTo = value;
  return this;
};


/** @return {number} */
hr.row.Leave.prototype.getDuration = function() {
  return this.payload().duration;
};


/**
 * @param {number} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setDuration = function(value) {
  this.payload().duration = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getManager1 = function() {
  return this.payload().manager1;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setManager1 = function(value) {
  this.payload().manager1 = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getManager2 = function() {
  return this.payload().manager2;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setManager2 = function(value) {
  this.payload().manager2 = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getDept = function() {
  return this.payload().dept;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setDept = function(value) {
  this.payload().dept = value;
  return this;
};


/** @return {string} */
hr.row.Leave.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Leave}
*/
hr.row.Leave.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.AppraisalType,
 *     !hr.row.AppraisalDbType>}
 * @constructor
 */
hr.schema.Appraisal = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.dept = new lf.schema.BaseColumn(
      this, 'dept', false, false, lf.Type.STRING);
  cols.push(this.dept);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.noteAction = new lf.schema.BaseColumn(
      this, 'noteAction', false, false, lf.Type.STRING);
  cols.push(this.noteAction);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.rating = new lf.schema.BaseColumn(
      this, 'rating', false, false, lf.Type.INTEGER);
  cols.push(this.rating);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.plan = new lf.schema.BaseColumn(
      this, 'plan', false, false, lf.Type.STRING);
  cols.push(this.plan);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.dateClose = new lf.schema.BaseColumn(
      this, 'dateClose', false, false, lf.Type.DATE_TIME);
  cols.push(this.dateClose);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.manager = new lf.schema.BaseColumn(
      this, 'manager', false, false, lf.Type.STRING);
  cols.push(this.manager);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Appraisal.base(
      this, 'constructor', 'Appraisal', cols, indices, false);
};
goog.inherits(hr.schema.Appraisal, lf.schema.Table);


/** @override */
hr.schema.Appraisal.prototype.createRow = function(opt_value) {
  return new hr.row.Appraisal(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Appraisal.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.dateClose = new Date(data.dateClose);
  return new hr.row.Appraisal(dbRecord['id'], data);
};


/** @override */
hr.schema.Appraisal.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.emp,
    this.dept,
    this.notes,
    this.noteAction,
    this.rating,
    this.plan,
    this.state,
    this.dateClose,
    this.manager
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.AppraisalType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.noteAction;
  /** @export @type {number} */
  this.rating;
  /** @export @type {string} */
  this.plan;
  /** @export @type {string} */
  this.state;
  /** @export @type {!Date} */
  this.dateClose;
  /** @export @type {string} */
  this.manager;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.AppraisalDbType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {string} */
  this.dept;
  /** @export @type {string} */
  this.notes;
  /** @export @type {string} */
  this.noteAction;
  /** @export @type {number} */
  this.rating;
  /** @export @type {string} */
  this.plan;
  /** @export @type {string} */
  this.state;
  /** @export @type {number} */
  this.dateClose;
  /** @export @type {string} */
  this.manager;
};



/**
 * Constructs a new Appraisal row.
 * @constructor
 * @extends {lf.Row.<!hr.row.AppraisalType,
 *     !hr.row.AppraisalDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.AppraisalType=} opt_payload
 */
hr.row.Appraisal = function(rowId, opt_payload) {
  hr.row.Appraisal.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Appraisal, lf.Row);


/** @override */
hr.row.Appraisal.prototype.defaultPayload = function() {
  var payload = new hr.row.AppraisalType();
  payload.emp = '';
  payload.dept = '';
  payload.notes = '';
  payload.noteAction = '';
  payload.rating = 0;
  payload.plan = '';
  payload.state = '';
  payload.dateClose = new Date(0);
  payload.manager = '';
  return payload;
};


/** @override */
hr.row.Appraisal.prototype.toDbPayload = function() {
  var payload = new hr.row.AppraisalDbType();
  payload.emp = this.payload().emp;
  payload.dept = this.payload().dept;
  payload.notes = this.payload().notes;
  payload.noteAction = this.payload().noteAction;
  payload.rating = this.payload().rating;
  payload.plan = this.payload().plan;
  payload.state = this.payload().state;
  payload.dateClose = this.payload().dateClose.getTime();
  payload.manager = this.payload().manager;
  return payload;
};


/** @override */
hr.row.Appraisal.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Appraisal.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Appraisal.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getDept = function() {
  return this.payload().dept;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setDept = function(value) {
  this.payload().dept = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getNoteAction = function() {
  return this.payload().noteAction;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setNoteAction = function(value) {
  this.payload().noteAction = value;
  return this;
};


/** @return {number} */
hr.row.Appraisal.prototype.getRating = function() {
  return this.payload().rating;
};


/**
 * @param {number} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setRating = function(value) {
  this.payload().rating = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getPlan = function() {
  return this.payload().plan;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setPlan = function(value) {
  this.payload().plan = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {!Date} */
hr.row.Appraisal.prototype.getDateClose = function() {
  return this.payload().dateClose;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setDateClose = function(value) {
  this.payload().dateClose = value;
  return this;
};


/** @return {string} */
hr.row.Appraisal.prototype.getManager = function() {
  return this.payload().manager;
};


/**
 * @param {string} value
 * @return {!hr.row.Appraisal}
*/
hr.row.Appraisal.prototype.setManager = function(value) {
  this.payload().manager = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.PerformanceType,
 *     !hr.row.PerformanceDbType>}
 * @constructor
 */
hr.schema.Performance = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.DATE_TIME);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.rating = new lf.schema.BaseColumn(
      this, 'rating', false, false, lf.Type.STRING);
  cols.push(this.rating);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.evalPlan = new lf.schema.BaseColumn(
      this, 'evalPlan', false, false, lf.Type.STRING);
  cols.push(this.evalPlan);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Performance.base(
      this, 'constructor', 'Performance', cols, indices, false);
};
goog.inherits(hr.schema.Performance, lf.schema.Table);


/** @override */
hr.schema.Performance.prototype.createRow = function(opt_value) {
  return new hr.row.Performance(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Performance.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.date = new Date(data.date);
  return new hr.row.Performance(dbRecord['id'], data);
};


/** @override */
hr.schema.Performance.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.emp,
    this.date,
    this.rating,
    this.evalPlan
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.PerformanceType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {!Date} */
  this.date;
  /** @export @type {string} */
  this.rating;
  /** @export @type {string} */
  this.evalPlan;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.PerformanceDbType = function() {
  /** @export @type {string} */
  this.emp;
  /** @export @type {number} */
  this.date;
  /** @export @type {string} */
  this.rating;
  /** @export @type {string} */
  this.evalPlan;
};



/**
 * Constructs a new Performance row.
 * @constructor
 * @extends {lf.Row.<!hr.row.PerformanceType,
 *     !hr.row.PerformanceDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.PerformanceType=} opt_payload
 */
hr.row.Performance = function(rowId, opt_payload) {
  hr.row.Performance.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Performance, lf.Row);


/** @override */
hr.row.Performance.prototype.defaultPayload = function() {
  var payload = new hr.row.PerformanceType();
  payload.emp = '';
  payload.date = new Date(0);
  payload.rating = '';
  payload.evalPlan = '';
  return payload;
};


/** @override */
hr.row.Performance.prototype.toDbPayload = function() {
  var payload = new hr.row.PerformanceDbType();
  payload.emp = this.payload().emp;
  payload.date = this.payload().date.getTime();
  payload.rating = this.payload().rating;
  payload.evalPlan = this.payload().evalPlan;
  return payload;
};


/** @override */
hr.row.Performance.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Performance.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Performance.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Performance}
*/
hr.row.Performance.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {!Date} */
hr.row.Performance.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Performance}
*/
hr.row.Performance.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Performance.prototype.getRating = function() {
  return this.payload().rating;
};


/**
 * @param {string} value
 * @return {!hr.row.Performance}
*/
hr.row.Performance.prototype.setRating = function(value) {
  this.payload().rating = value;
  return this;
};


/** @return {string} */
hr.row.Performance.prototype.getEvalPlan = function() {
  return this.payload().evalPlan;
};


/**
 * @param {string} value
 * @return {!hr.row.Performance}
*/
hr.row.Performance.prototype.setEvalPlan = function(value) {
  this.payload().evalPlan = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.TrainingType,
 *     !hr.row.TrainingDbType>}
 * @constructor
 */
hr.schema.Training = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.date = new lf.schema.BaseColumn(
      this, 'date', false, false, lf.Type.DATE_TIME);
  cols.push(this.date);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.emp = new lf.schema.BaseColumn(
      this, 'emp', false, false, lf.Type.STRING);
  cols.push(this.emp);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.duration = new lf.schema.BaseColumn(
      this, 'duration', false, false, lf.Type.INTEGER);
  cols.push(this.duration);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.notes = new lf.schema.BaseColumn(
      this, 'notes', false, false, lf.Type.STRING);
  cols.push(this.notes);

  var indices = [

  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Training.base(
      this, 'constructor', 'Training', cols, indices, false);
};
goog.inherits(hr.schema.Training, lf.schema.Table);


/** @override */
hr.schema.Training.prototype.createRow = function(opt_value) {
  return new hr.row.Training(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Training.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.date = new Date(data.date);
  return new hr.row.Training(dbRecord['id'], data);
};


/** @override */
hr.schema.Training.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = null;
  var notNullable = [
    this.name,
    this.date,
    this.emp,
    this.duration,
    this.notes
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.TrainingType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {!Date} */
  this.date;
  /** @export @type {string} */
  this.emp;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.notes;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.TrainingDbType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {number} */
  this.date;
  /** @export @type {string} */
  this.emp;
  /** @export @type {number} */
  this.duration;
  /** @export @type {string} */
  this.notes;
};



/**
 * Constructs a new Training row.
 * @constructor
 * @extends {lf.Row.<!hr.row.TrainingType,
 *     !hr.row.TrainingDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.TrainingType=} opt_payload
 */
hr.row.Training = function(rowId, opt_payload) {
  hr.row.Training.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Training, lf.Row);


/** @override */
hr.row.Training.prototype.defaultPayload = function() {
  var payload = new hr.row.TrainingType();
  payload.name = '';
  payload.date = new Date(0);
  payload.emp = '';
  payload.duration = 0;
  payload.notes = '';
  return payload;
};


/** @override */
hr.row.Training.prototype.toDbPayload = function() {
  var payload = new hr.row.TrainingDbType();
  payload.name = this.payload().name;
  payload.date = this.payload().date.getTime();
  payload.emp = this.payload().emp;
  payload.duration = this.payload().duration;
  payload.notes = this.payload().notes;
  return payload;
};


/** @override */
hr.row.Training.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Training.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Training.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Training}
*/
hr.row.Training.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {!Date} */
hr.row.Training.prototype.getDate = function() {
  return this.payload().date;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Training}
*/
hr.row.Training.prototype.setDate = function(value) {
  this.payload().date = value;
  return this;
};


/** @return {string} */
hr.row.Training.prototype.getEmp = function() {
  return this.payload().emp;
};


/**
 * @param {string} value
 * @return {!hr.row.Training}
*/
hr.row.Training.prototype.setEmp = function(value) {
  this.payload().emp = value;
  return this;
};


/** @return {number} */
hr.row.Training.prototype.getDuration = function() {
  return this.payload().duration;
};


/**
 * @param {number} value
 * @return {!hr.row.Training}
*/
hr.row.Training.prototype.setDuration = function(value) {
  this.payload().duration = value;
  return this;
};


/** @return {string} */
hr.row.Training.prototype.getNotes = function() {
  return this.payload().notes;
};


/**
 * @param {string} value
 * @return {!hr.row.Training}
*/
hr.row.Training.prototype.setNotes = function(value) {
  this.payload().notes = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!hr.row.HolidayType,
 *     !hr.row.HolidayDbType>}
 * @constructor
 */
hr.schema.Holiday = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', true, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.begin = new lf.schema.BaseColumn(
      this, 'begin', false, false, lf.Type.DATE_TIME);
  cols.push(this.begin);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.end = new lf.schema.BaseColumn(
      this, 'end', false, false, lf.Type.DATE_TIME);
  cols.push(this.end);

  var indices = [
    new lf.schema.Index('Holiday', 'pkHoliday', true,
        [
          {schema: this.name, order: lf.Order.ASC, autoIncrement: false}
        ]),
    new lf.schema.Index('Holiday', 'idx_begin', false,
        [
          {schema: this.begin, order: lf.Order.ASC}
        ])
  ];

  /** @private {!lf.schema.Constraint} */
  this.constraint_;

  hr.schema.Holiday.base(
      this, 'constructor', 'Holiday', cols, indices, true);
};
goog.inherits(hr.schema.Holiday, lf.schema.Table);


/** @override */
hr.schema.Holiday.prototype.createRow = function(opt_value) {
  return new hr.row.Holiday(lf.Row.getNextId(), opt_value);
};


/** @override */
hr.schema.Holiday.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.begin = new Date(data.begin);
  data.end = new Date(data.end);
  return new hr.row.Holiday(dbRecord['id'], data);
};


/** @override */
hr.schema.Holiday.prototype.getConstraint = function() {
  if (goog.isDefAndNotNull(this.constraint_)) {
    return this.constraint_;
  }

  var pk = this.getIndices()[0];
  var notNullable = [
    this.name,
    this.begin,
    this.end
  ];
  var foreignKeys = [
  ];
  this.constraint_ = new lf.schema.Constraint(
      pk, notNullable, foreignKeys);
  return this.constraint_;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.HolidayType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {!Date} */
  this.begin;
  /** @export @type {!Date} */
  this.end;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
hr.row.HolidayDbType = function() {
  /** @export @type {string} */
  this.name;
  /** @export @type {number} */
  this.begin;
  /** @export @type {number} */
  this.end;
};



/**
 * Constructs a new Holiday row.
 * @constructor
 * @extends {lf.Row.<!hr.row.HolidayType,
 *     !hr.row.HolidayDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!hr.row.HolidayType=} opt_payload
 */
hr.row.Holiday = function(rowId, opt_payload) {
  hr.row.Holiday.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(hr.row.Holiday, lf.Row);


/** @override */
hr.row.Holiday.prototype.defaultPayload = function() {
  var payload = new hr.row.HolidayType();
  payload.name = '';
  payload.begin = new Date(0);
  payload.end = new Date(0);
  return payload;
};


/** @override */
hr.row.Holiday.prototype.toDbPayload = function() {
  var payload = new hr.row.HolidayDbType();
  payload.name = this.payload().name;
  payload.begin = this.payload().begin.getTime();
  payload.end = this.payload().end.getTime();
  return payload;
};


/** @override */
hr.row.Holiday.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Holiday.pkHoliday':
      return this.payload().name;
    case 'Holiday.idx_begin':
      return this.payload().begin.getTime();
    case 'Holiday.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
hr.row.Holiday.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!hr.row.Holiday}
*/
hr.row.Holiday.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {!Date} */
hr.row.Holiday.prototype.getBegin = function() {
  return this.payload().begin;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Holiday}
*/
hr.row.Holiday.prototype.setBegin = function(value) {
  this.payload().begin = value;
  return this;
};


/** @return {!Date} */
hr.row.Holiday.prototype.getEnd = function() {
  return this.payload().end;
};


/**
 * @param {!Date} value
 * @return {!hr.row.Holiday}
*/
hr.row.Holiday.prototype.setEnd = function(value) {
  this.payload().end = value;
  return this;
};
goog.provide('hr');

goog.require('hr.schema.Database');
goog.require('lf.Global');
/** @suppress {extraRequire} */
goog.require('lf.fn');
/** @suppress {extraRequire} */
goog.require('lf.op');
goog.require('lf.proc.Database');
goog.require('lf.service');
goog.require('lf.service.ServiceId');


/**
 * @return {!lf.Global} The Global instance that refers to hr.
 */
hr.getGlobal = function() {
  var namespacedGlobalId = new lf.service.ServiceId('ns_lerp');
  var global = lf.Global.get();

  var namespacedGlobal = null;
  if (!global.isRegistered(namespacedGlobalId)) {
    namespacedGlobal = new lf.Global();
    global.registerService(namespacedGlobalId, namespacedGlobal);
  } else {
    namespacedGlobal = global.getService(namespacedGlobalId);
  }

  return namespacedGlobal;
};


/** @return {!lf.schema.Database} */
hr.getSchema = function() {
  var global = hr.getGlobal();

  if (!global.isRegistered(lf.service.SCHEMA)) {
    var schema = new hr.schema.Database();
    global.registerService(lf.service.SCHEMA, schema);
  }
  return global.getService(lf.service.SCHEMA);
};


/**
 * @param {!lf.schema.ConnectOptions=} opt_options
 * @return {!IThenable<!lf.proc.Database>}
 */
hr.connect = function(opt_options) {
  hr.getSchema();
  var db = new lf.proc.Database(hr.getGlobal());
  return db.init(opt_options);
};
