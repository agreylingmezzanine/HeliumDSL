  


  


## Sending SMS Messages

### With `Mez:sms`

The `Mez:sms` function takes three arguments.

  1. The object instance representing the recipient of the message. This can, however, be any object containing a mobile number field and does not need to be a role.
  2. The attribute on this object representing the mobile number of the recipient.
  3. The key of a lang file entry that contains the message content. In this case the lang file entry simply references a function scoped variable.


    
    
    uuid smsId = Mez:sms(farmer, "mobileNumber", "messaging.message_content");

In the above example the uuid being returned is a reference to Helium's internal id representing the SMS (see also the `smsid` field in the section below). It can be assigned as shown or it can be ignored by simply calling the function without assigning the result.

### With `{RoleObj}.notif`y

See [User Roles#SendingNotifications](/wiki/spaces/HTUT/pages/5737498/User+Roles#UserRoles-SendingNotifications) and the `notify` function under [Collections#CollectionBuilt-inFunctions](/wiki/spaces/HTUT/pages/5738020/Collections#Collections-CollectionBuilt-inFunctions).

  


## Inspecting Sent Message Results

### The __sms_result__ Built-in Object

Represents SMS results that are duplicated in the app schema for easy access to app developers. Records belonging to this object can be queried using the standard selectors.

  

    
    
    @NotTracked
    persistent object __sms_result__ {
        datetime datetimestampStarted;
        datetime datetimestampFinished;
        string destination;    
        int attempt;
        bool success;
        string error;
        bool doneProcessing;
        uuid smsOutboundConfigurationVersionId;
        string smsOutboundConfigurationName;
        uuid smsId;
    }

Note the `smsId` field above matches the id that is returned by the `Mez:sms` built-in function as shown in the previous section.

### @OnSmsResultUpdate

Used to annotate a function that will be used as a callback function by Helium when there is any update on sms results. The annotation cannot be used in conjunction with other function annotations and the function must take exactly one parameter of type `__sms_result__`.
    
    
    @OnSmsResultUpdate
    void smsResultUpdateCallback(__sms_result__ smsResult) {
        if(smsResult.success == false) {
            FailedSms failedSms = FailedSms:new();
            failedSms.failureRecordedOn = Mez:now();
            failedSms.smsResultId = smsResult._id;
            failedSms.save();
        }
    }

Note that duplicating the data from the `__sms_result__` object in the above code snippet is done purely for demonstration purposes. Records from this object can be queried directly without needing to duplicate the data into a custom object.

  


  


  


## Receiving SMS Messages

The `@ReceiveSms` function annotiation indicates that a function can receive an SMS.
    
    
    @ReceiveSms("Test description")
    void receiveSmsNumberText(string number, string text) { ... }
    
    @ReceiveSms("Test description")
    void receiveSmsNumberTextJson(string number, string text, json aggregatorFields) { ... }
     
    @ReceiveSms("Test description")
    void receiveSmsObjectText(Nurse nurse, string text) { ... }
     
    @ReceiveSms("Test description")
    void receiveSmsObjectNumberText(Nurse nurse, string number, string text) { ... }

Note that in the second example above, the aggregator fields represents the exact values that are sent to Helium by the SMS aggregator before any processing is done. At the time of writing the functionality to populate that parameter has only been implemented for the "Africa's Talking" inbound SMS driver.

  


## Additional Mentions and References

  * [Quick Reference#MezBIFs](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-MezBIFs)
  * [Quick Reference#FunctionAnnotations](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-FunctionAnnotations)
  * [Quick Reference#Built-inObjects](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-Built-inObjects)
  * [Lesson 10: Scheduled Functions, Flow Control, Basic Messaging#SendinganSMS](/wiki/spaces/HTUT/pages/5735034/Lesson+10+Scheduled+Functions+Flow+Control+Basic+Messaging#Lesson10:ScheduledFunctions,FlowControl,BasicMessaging-SendinganSMS)
  * [Lesson 18: SMS and Scheduled Function Result Callbacks#AnnotationsforScheduledFunctionandSMSResultUpdateCallbacks](/wiki/spaces/HTUT/pages/5737209/Lesson+18+SMS+and+Scheduled+Function+Result+Callbacks#Lesson18:SMSandScheduledFunctionResultCallbacks-AnnotationsforScheduledFunctionandSMSResultUpdateCallbacks)



  


  


  

