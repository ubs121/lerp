using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Configuration;

/**
    zkem флатформ бүхий ирц бүртгэх төхөөрөмжтэй холбогдож ирцийн мэдээлэл хүлээн авна.
    Хүлээн авсан ирцийн мэдээллийг Lerp програмд илгээнэ.
*/
public class AttLogs
{
    //Create Standalone SDK class dynamicly.
    public zkemkeeper.CZKEMClass axCZKEM1 = new zkemkeeper.CZKEMClass();
    bool bIsConnected = false;
    int iMachineNumber = 1;//the serial number of the device.After connecting the device ,this value will be changed.

    public delegate void AsyncDbSaver(string data);
    AsyncDbSaver caller = new AsyncDbSaver(_saveAtt);

    public void Disconnect() {
    	axCZKEM1.Disconnect();
            
        //this.axCZKEM1.OnAttTransactionEx -= new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(axCZKEM1_OnAttTransactionEx);

        bIsConnected = false;
    }

    //If your device supports the TCP/IP communications, you can refer to this.
    //when you are using the tcp/ip communication,you can distinguish different devices by their IP address.
    public bool DoConnect()
    {
        int idwErrorCode = 0;
        
        // TODO: Тохиргооноос унших ConfigurationSettings.AppSettings["DeviceIP"]
        bIsConnected = axCZKEM1.Connect_Net(ConfigurationManager.AppSettings["DeviceList"], 4370);
        if (bIsConnected)
        {
            iMachineNumber = 1; //In fact,when you are using the tcp/ip communication,this parameter will be ignored,that is any integer will all right.Here we use 1.
            if (axCZKEM1.RegEvent(iMachineNumber, 65535))//Here you can register the realtime events that you want to be triggered(the parameters 65535 means registering all)
            {
        		Console.WriteLine("Downloading log...");
                //this.axCZKEM1.OnAttTransactionEx += new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(axCZKEM1_OnAttTransactionEx);
            }
        }
        else
        {
            axCZKEM1.GetLastError(ref idwErrorCode);
            Console.WriteLine("Unable to connect the device,ErrorCode=" + idwErrorCode.ToString(), "Error");
        }

        return bIsConnected;
    }

    
    //If your fingerprint(or your card) passes the verification,this event will be triggered
    private void axCZKEM1_OnAttTransactionEx(string sEnrollNumber, int iIsInValid, int iAttState, int iVerifyMethod, int iYear, int iMonth, int iDay, int iHour, int iMinute, int iSecond, int iWorkCode)
    {
        Console.WriteLine("RTEvent OnAttTrasactionEx Has been Triggered,Verified OK");
        Console.WriteLine("...UserID:" + sEnrollNumber);
        Console.WriteLine("...isInvalid:" + iIsInValid.ToString());
        Console.WriteLine("...attState:" + iAttState.ToString());
        Console.WriteLine("...VerifyMethod:" + iVerifyMethod.ToString());
        Console.WriteLine("...Workcode:" + iWorkCode.ToString());//the difference between the event OnAttTransaction and OnAttTransactionEx
        Console.WriteLine("...Time:" + iYear.ToString() + "-" + iMonth.ToString() + "-" + iDay.ToString() + " " + iHour.ToString() + ":" + iMinute.ToString() + ":" + iSecond.ToString());


        string attData = "{\"EmployeeId\":1}";
        // saveAtt(attData);
    }


//Download the attendance records from the device(For both Black&White and TFT screen devices).
        public void GetLogData()
        {

        	int idwErrorCode=0;

            string sdwEnrollNumber = "";
            int idwVerifyMode=0;
            int idwInOutMode=0;
            int idwYear=2014;
            int idwMonth=0;
            int idwDay=0;
            int idwHour=0;
            int idwMinute=0;
            int idwSecond = 0;
            int idwWorkcode = 0;

            axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device
            if (axCZKEM1.ReadGeneralLogData(iMachineNumber))//read all the attendance records to the memory
            {
            	StringBuilder attLog = new StringBuilder();

            	String machineIp = ConfigurationManager.AppSettings["DeviceList"];

                while (axCZKEM1.SSR_GetGeneralLogData(iMachineNumber, out sdwEnrollNumber, out idwVerifyMode,
                            out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode))//get records from the memory
                {
                	attLog.Clear();
                	DateTime now = DateTime.Now;
                	if (idwYear==now.Year && idwMonth==now.Month && idwDay==now.Day) {
	                    attLog.Append("{");
	                    attLog.Append("\"EnrollNumber\":").Append(sdwEnrollNumber).Append(',');
	                    attLog.Append("\"VerifyMode\":").Append(idwVerifyMode).Append(',');
	                    attLog.Append("\"Action\":").Append(idwInOutMode).Append(',');
	                    attLog.Append("\"Date\":").Append('"');
	                    attLog.Append(idwYear).Append('-');
	                    attLog.Append(idwMonth.ToString("00")).Append('-');
	                    attLog.Append(idwDay.ToString("00")).Append(' ');
	                    attLog.Append(idwHour.ToString("00")).Append(':');
	                    attLog.Append(idwMinute.ToString("00")).Append(':');
	                    attLog.Append(idwSecond.ToString("00")).Append('"').Append(',');
	                    attLog.Append("\"DeviceAddr\":").Append('"').Append(machineIp).Append('"').Append(',');
	                    attLog.Append("\"Workcode\":").Append(idwWorkcode);
	                    attLog.Append("}");

	                    //Console.WriteLine(attLog.ToString());
	                    //_saveAtt(attLog.ToString());
			    caller.BeginInvoke(attLog.ToString(), null, null);
                	}
                }

                /*
                if (axCZKEM1.ClearGLog(iMachineNumber))
	            {
	                axCZKEM1.RefreshData(iMachineNumber);//the data in the device should be refreshed
	                Console.WriteLine("All att Logs have been cleared from teiminal!", "Success");
	            }
	            else
	            {
	                axCZKEM1.GetLastError(ref idwErrorCode);
	                Console.WriteLine("Operation failed,ErrorCode=" + idwErrorCode.ToString(), "Error");
	            }*/
            }
            else
            {
                axCZKEM1.GetLastError(ref idwErrorCode);

                if (idwErrorCode != 0)
                {
                    Console.WriteLine("Reading data from terminal failed,ErrorCode: " + idwErrorCode.ToString(),"Error");
                }
                else
                {
                    Console.WriteLine("No data from terminal returns!","Error");
                }
            }
            axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
        }

       
        //Get the count of attendance records in from ternimal
        public void DeviceStatus()
        {
            int idwErrorCode = 0;
            int iValue = 0;

            axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device
            if (axCZKEM1.GetDeviceStatus(iMachineNumber, 6, ref iValue)) //Here we use the function "GetDeviceStatus" to get the record's count.The parameter "Status" is 6.
            {
                Console.WriteLine("The count of the AttLogs in the device is " + iValue.ToString(), "Success");
            }
            else
            {
                axCZKEM1.GetLastError(ref idwErrorCode);
                Console.WriteLine("Operation failed,ErrorCode=" + idwErrorCode.ToString(), "Error");
            }
            axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
        }

    // ирцийн мэдээллийг lerp рүү илгээх
    private static void _saveAtt(string postData) {
        // Create a request using a URL that can receive a post. 
        WebRequest request = WebRequest.Create (ConfigurationManager.AppSettings["LerpAttUrl"]);
        // Set the Method property of the request to POST.
        request.Method = "POST";
        // Create POST data and convert it to a byte array.
        byte[] byteArray = Encoding.UTF8.GetBytes (postData);
        // Set the ContentType property of the WebRequest.
        request.ContentType = "application/json";
        // Set the ContentLength property of the WebRequest.
        request.ContentLength = byteArray.Length;
        // Get the request stream.
        Stream dataStream = request.GetRequestStream ();
        // Write the data to the request stream.
        dataStream.Write (byteArray, 0, byteArray.Length);
        // Close the Stream object.
        dataStream.Close ();
        // Get the response.
        WebResponse response = request.GetResponse ();
        // Display the status.
        Console.WriteLine (((HttpWebResponse)response).StatusDescription);
        // Get the stream containing content returned by the server.
        dataStream = response.GetResponseStream ();
        // Open the stream using a StreamReader for easy access.
        StreamReader reader = new StreamReader (dataStream);
        // Read the content.
        string responseFromServer = reader.ReadToEnd ();
        // Display the content.
        //Console.WriteLine (responseFromServer);
        // Clean up the streams.
        reader.Close ();
        dataStream.Close ();
        response.Close ();
    }

    public static void Main()
    {
        AttLogs attDev = new AttLogs();

        if (attDev.DoConnect()) {
        	attDev.GetLogData();
        	attDev.Disconnect();
        } else {
        	Console.WriteLine("Couldn't connect to the device!");
        }

    }   

}
