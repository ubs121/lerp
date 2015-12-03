

db.createTable('Employee').
    addColumn('id', lf.Type.INTEGER).
    addColumn('name', lf.Type.STRING).
    addColumn('lastName', lf.Type.STRING).
    addColumn('familyName', lf.Type.STRING).
    addColumn('gender', lf.Type.BOOLEAN).
    addColumn('dept', lf.Type.STRING).
    addColumn('job', lf.Type.STRING).
    addColumn('position', lf.Type.STRING).
    addColumn('reportTo', lf.Type.STRING).
    addColumn('workAddress', lf.Type.STRING).
    addColumn('workLocation', lf.Type.STRING).
    addColumn('workEmail', lf.Type.STRING).
    addColumn('workPhone', lf.Type.STRING).
    addColumn('mobilePhone', lf.Type.STRING).
    addColumn('cardNo', lf.Type.STRING).
    addColumn('coach', lf.Type.STRING).
    addColumn('notes', lf.Type.STRING).
    addColumn('type', lf.Type.STRING).
    addColumn('status', lf.Type.STRING).
    addColumn('hireDate', lf.Type.DATE_TIME).
    addColumn('timetable', lf.Type.STRING).
    addColumn('trialEndDate', lf.Type.DATE_TIME).
    addColumn('resignationDate', lf.Type.DATE_TIME).
    addColumn('resignationReason', lf.Type.STRING).
    addColumn('bankName', lf.Type.STRING).
    addColumn('bankAccount', lf.Type.STRING).
    addColumn('evalPlan', lf.Type.STRING).
    addColumn('evalDate', lf.Type.DATE_TIME).
    addColumn('casual', lf.Type.STRING).
    addColumn('casualNotes', lf.Type.STRING).
    addColumn('attachment', lf.Type.STRING).
    addPrimaryKey(['id']).
    addIndex('idxJoined', ['joined'], false, lf.Order.DESC);

db.createTable('Contract').
    addColumn('id', lf.Type.STRING).
    addColumn('name', lf.Type.STRING).
    addColumn('date', lf.Type.DATE_TIME).
    addColumn('type', lf.Type.STRING).
    addColumn('emp', lf.Type.STRING).
    addColumn('empName', lf.Type.STRING).
    addColumn('dept', lf.Type.STRING).
    addColumn('job', lf.Type.STRING).
    addColumn('dateStart', lf.Type.DATE_TIME).
    addColumn('dateEnd', lf.Type.DATE_TIME).
    addColumn('wage', lf.Type.NUMBER).
    addColumn('fixedAllowances', lf.Type.NUMBER).
    addColumn('workingHours', lf.Type.INTEGER).
    addColumn('advantages', lf.Type.STRING).
    addColumn('visaNo', lf.Type.STRING).
    addColumn('visaExpire', lf.Type.DATE_TIME).
    addColumn('reason', lf.Type.STRING).
    addColumn('notes', lf.Type.STRING).
    addColumn('salaryProfile', lf.Type.STRING).
    addColumn('paySchedule', lf.Type.STRING);

db.createTable("Ref").
    addColumn('name', lf.Type.STRING).
    addColumn('id', lf.Type.STRING).
