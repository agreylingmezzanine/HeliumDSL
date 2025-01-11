**

  
**

### **High Level Constructs**

**  
**

#### unit

Units are groupings of functions and also variables.

They can be thought of as modules or namespaces. A Mezzanine script must have at least one unit.Unit must be followed with a unique unit name. Units are defined as follows.

  


  1. unit MyUnit;
  2. // Other code follows
  3.   4. string myVar;
  5.   6. int factorial(int x) {
  7. if(x == 0 || x == 1) {
  8. return 1;
  9. } else if (x > 1) {
  10. return factorial(x - 1);
  11. }
  12.   13. return 0;
  14. }



HEADS UP Objects, enums and validators are global, so they can optionally be in a separate source code file without a unit.

#### object

Indicates the start of an object declaration. Must be followed by a unique object name and attribute block

  


  1. object Person
  2. {
  3. string fname;
  4. string sname;
  5. int age;
  6. }



#### persistent

Used to indicate that an object is persistent, must precede the object definition

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5. int age;
  6. }



The _id attribute is also available from any persistent object. It is a uuid type.

#### enum

Used to declare an enumeration. Must be followed by an enumID (all caps and underscores)

  


  1. enum GENDER
  2. {
  3. Male, Female
  4. }



  


#### validator

Used to declare a field validator

  1. validator FirstnameValidator
  2. {
  3. minlen(2); maxlen(250);
  4. }
  5. validator AgeValidator
  6. {
  7. minval(0);
  8. }



### Flow control

#### return

Returns the value of the expression that follows from a function

  1. string getGreeting(string name)
  2. {
  3. return Strings:concat("Hello, ", name);
  4. }



#### if / else

If statement

  1. if(name == "Tom")
  2. {
  3. Mez:log("Hello Tom!");
  4. }
  5. else if (name == "Frank")
  6. {
  7. Mez:log("Hello Frank!");
  8. }
  9. else
  10. {
  11. Mez:log("Hi! Who are you?");
  12. }



#### for

For loop

  1. for(;;)
  2. {
  3. // Technically not possible, as iterations
  4. // have a limit.
  5. Mez:log("Infinite loop!");
  6. }
  7.   8. for(int i = 1; i <= 10; i++)
  9. {
  10. Mez:log(i);
  11. }
  12.   13. int i = 0;
  14. for(; i < 10;)
  15. {
  16. Mez:log("While style loop!");
  17. }



### Primitive types

Type| Description  
---|---  
`int`| Integers  
`string`| Strings  
`decimal`| Numeric type e.g. 3.14 or 123  
`bool`| Boolean values e.g. true or false  
`date`| Date  
`datetime`| Date and time  
`uuid`| UUID type 4 (36 characters)  
`void`| Void type  
`blob`| Binary values e.g. photos  
  
### Annotations

#### @Role

Indicates that the persistent object is associated with a user role (using this annotation on an object automatically makes it persistent, so you don’t have to explicitly use the persistent keyword)

  1. @Role("Manager")
  2. object ManagerProfile
  3. {
  4. string fname;
  5. string sname;
  6. string title;
  7. }



HEADS UPAny persistent object that is annotated with @Role has these implicit attributes:

  * _firstNames
  * _nickName
  * _surname  
  




#### @RoleName

Allows a custom role name to be displayed in the app that differs from role name specified in the data model and can be determined at runtime.

  

    
    
    @RoleName
    string getGymEmployeeRoleName(GymEmployee employee){
    	
    	EN_GYM_EMPLOYEE_ROLE_TYPE employeeRoleType = employee.employeeType;
    	if(employeeRoleType == EN_GYM_EMPLOYEE_ROLE_TYPE.Gym_Trainer){
    		return "Trainer";
    	}
    	else if(employeeRoleType == EN_GYM_EMPLOYEE_ROLE_TYPE.Gym_Admin){
    		return "Gym Admin";
    	}
    	else{
    		return "Gym Employee";
    	}
    }

#### @Restrict

Use this for users of Helium Android to be able to access specific types. The selector defines which objects of the requested type are accessible to the specified role. Objects that have relationships to objects included by an `@Restrict` are **not** automatically synchronized, they must have their own `@Restrict` annotations in order for the relationship to remain valid across the network. This technique is especially useful with many-to-many relationships, which can be used to reduce the amount of data synchronized to Helium Android users, and improve the user-experience of the application.

"Manager" indicates for which roles(s) it applies and all() is the selector.

  1. @Restrict("Manager", all())
  2. object EmployeeRecord
  3. {
  4. string fname;
  5. string sname;
  6. }



Types without an `@Restrict` annotation will **not** be synchronized to Helium Android users, and may cause null-pointer errors in your application.

  


#### @RolesAllowed

Specifies the access rights for a specific role on an object (like the previous annotation, this annotation implicitly makes the object persistent)

  1. @RolesAllowed("Manager", "rw")
  2. object EmployeeRecord
  3. {
  4. string fname;
  5. string sname;
  6. }



#### @Scheduled

Specifies a scheduled task to run at a certain interval

  1. // Run at 2:15 AM every day
  2. @Scheduled("15 2 * * *")
  3. void foobar() { ... }
  4.   5. // Run at 06:00 every week-day (days 1 to 5)
  6. @Scheduled("0 6 * * 1-5")
  7. void foobar() { ... }
  8.   

  9. // Run every ten minutes
  10. @Scheduled("*/10 * * * *")
  11. void foobar() { ... }  




To summarize the schedule string format: 
    
    
    "minute hour day-of-month month day-of-week"

  


#### @ReceiveSms

Indicates that a function can receive an SMS.

  1. @ReceiveSms("Test description")
  2. void receiveSmsNumberText(string number, string text) { ... }
  3.   4. @ReceiveSms("Test description")
  5. void receiveSmsObjectText(Nurse nurse, string text) { ... }
  6.   7. @ReceiveSms("Test description")
  8. void receiveSmsObjectNumberText(Nurse nurse, string number, string text) { ... }



#### @Test

Indicates that a function is a unit test.

  1. @Test
  2. void testIncrement(){
  3. int i = 5;
  4. i++;
  5. Assert:isEqual(6, i, "Increment failed");
  6. }



#### @{ID} eg. @FirstnameValidator

Annotations that start with @ followed by an ID, and that are used on object attributes are validator annotations. The ID value must be the same as any validator that is defined in the application:

  1. object Person
  2. {
  3. @FirstnameValidator("validr.msg.fname")
  4. string fname;
  5.   6. @SurnameValidator("validr.msg.sname")
  7. string sname;
  8. }



#### @OneToOne @ManyToOne @ManyToMany @OneToMany

Indicates the multiplicity of a relationship

  1. object Person
  2. {
  3. string name;
  4. @OneToMany
  5. Person children;
  6.   7. @ManyToOne
  8. House home;
  9. }



#### @NotTracked

Indicates that an object is not tracked and will therefore not result in the generation of any change log entries.

  


  1. @NotTracked
  2. persistent object Person
  3. {
  4. string name;
  5. int age;
  6. }



####   
@OnSmsResultUpdate

Used to annotate a function that will be used as a callback function by Helium when there is any update on sms results. The annotation cannot be used in conjunction with other function annotations and the function must take exactly one parameter of type __sms_result__. Note that this feature will be deployed as part of [Helium 1.5](https://wiki.stb.mezzanineware.com/display/HP/1.5.0+Release+Notes). The example below demonstrates the use of this annotation.
    
    
    @OnSmsResultUpdate
    void smsResultUpdateCallback(__sms_result__ smsResult) {
        if(smsResult.success == false) {
            FailedSms failedSms = FailedSms:new();
            failedSms.failureRecordedOn = Mez:now();
            failedSms.smsResultId = smsResult._id;
            failedSms.save();
        }
    }

Note that duplicating the data from the __sms_result__ object in the above code snippet is done purely for demonstration purposes. Records from this object can be queried directly without needing to duplicate the data into a custom object.

#### @OnScheduledFunctionResultUpdate

Used to annotate a function that will be used as a callback function by Helium when there is any update on scheduled function results. The annotation cannot be used in conjunction with other function annotations and the function must take exactly one parameter of type __scheduled_function_result__. Note that this feature will be deployed as part of [Helium 1.5](https://wiki.stb.mezzanineware.com/display/HP/1.5.0+Release+Notes). The example below demonstrates the use of this annotation.
    
    
    @OnScheduledFunctionResultUpdate
    void scheduledFunctionResultUpdateCallback(__scheduled_function_result__ scheduledFunctionResult) {
        if(scheduledFunctionResult.success == false) {
            FailedScheduledFunction failedScheduledFunction = FailedScheduledFunction:new();
            failedScheduledFunction.failureRecordedOn = Mez:now();
            failedScheduledFunction.scheduledFunctionResultId = scheduledFunctionResult._id;
            failedScheduledFunction.save();
        }
    }

Note that duplicating the data from the __scheduled_function_result__ object in the above code snippet is done purely for demonstration purposes. Records from this object can be queried directly without needing to duplicate the data into a custom object.

### Built In Objects

#### The Identity object

The Identity object is an implicit interface that is implemented by every persistence object in your application that has a @Role annotation. This object has the following implicit declaration:

  


  1. object Identity {
  2. string _firstNames;
  3. string _nickName;
  4. string _surname;
  5. string _locale;
  6. string _timeZone;
  7. }



The Identity object is read-only and cannot be directly instantiate by Identity:new() All attributes of the Identity object are read-only as well and are automatically populated from the information users update in Mezzanine ID.

The compiler can implicitly convert any custom persistent object with a @Role annotation to an Identity object instance. The following shows an example:

  1. @Role("Doctor")
  2. persistent object Doctor{
  3. }
  4.   5. @Role("Nurse")
  6. persistent object Nurse {
  7. }
  8.   9. persistent object Patient {
  10. Doctor doctor;
  11. Nurse nurse;
  12. }
  13.   14. Identity getUser(Patient p){
  15. if(p.doctor != null)
  16. return p.doctor;
  17. else
  18. return p.nurse;
  19. }



Since all persistent custom objects with @Role annotations implement the Identity object you can also access the Identity attributes directly from such custom objects, for example:

  1. @Role(“Doctor”)
  2. persistent object Doctor{
  3. }
  4.   5. void test(){
  6. Doctor d = Doctor:new();
  7. string firstNames = d._firstNames;
  8. string surname = d._surname;
  9. //etc.
  10. }



#### The __sms_result__ object

The __sms_result__ object represents SMS results from Helium that are duplicated in the app schema for easy access to app developers. Records belonging to this object can be queried using the standard selectors. Note that this feature is to be deployed as part of [Helium 1.5](https://wiki.stb.mezzanineware.com/display/HP/1.5.0+Release+Notes). The object declaration is shown below:
    
    
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

#### The __scheduled_function_result__ object

The __scheduled_function_result__ object represents scheduled function results from Helium that are duplicated in the app schema for easy access to app developers. Records belonging to this object can be queried using the standard selectors. Note that this feature is to be deployed as part of [Helium 1.5](https://wiki.stb.mezzanineware.com/display/HP/1.5.0+Release+Notes). The object declaration is shown below:
    
    
    @NotTracked
    persistent object __scheduled_function_result__ {
        datetime datetimestampStarted;
        datetime datetimestampFinished;
        string qualifiedName;
        string schedule;
        string error;
        string stackTrace;
        bool success;
    }

### Date Built-in Functions

These built-in functions are accessed via the pseudo unit “Date”

#### Date:addSeconds

Adds an interval to an existing date or datetime value. The interval expression should return a positive or negative integer value that represents the number of days that is to be added to the date/datetime value. The function returns a new date or datetime instance and doesn't alter the original value.

  1. @Test
  2. void testAddDays(){
  3. startDate = Date:today();
  4. date midDate = Date:addSeconds(startDate, 5);
  5. date endDate = Date:addSeconds(startDate, 10);
  6.   7. Assert:isNotNull(midDate, "Date:addSeconds returned null for valid date and interval values");
  8. Assert:isTrue(midDate > startDate, "Date:addSeconds returned an incorrect date value");
  9. Assert:isTrue(endDate > midDate, "Date:addSeconds returned an incorrect date value");
  10. }



  


#### Date:addDays

Adds an interval to an existing date or datetime value. The interval expression should return a positive or negative integer value that represents the number of days that is to be added to the date/datetime value. The function returns a new date or datetime instance and doesn't alter the original value.

  1. @Test
  2. void testAddDays(){
  3. date startDate = Date:today();
  4. date midDate = Date:addDays(startDate, 5);
  5. date endDate = Date:addDays(startDate, 10);
  6.   7. Assert:isNotNull(midDate, "Date:addDays returned null for valid date and interval values");
  8. Assert:isTrue(midDate > startDate, "Date:addDays returned an incorrect date value");
  9. Assert:isTrue(endDate > midDate, "Date:addDays returned an incorrect date value");
  10. }



#### Date:addMonths

Adds an interval to an existing date or datetime value. The interval expression should return a positive or negative integer value that represents the number of months that is to be added to the date/datetime value. The function returns a new date or datetime instance and doesn't alter the original value.

If the target month has less days than the given one then the date may be reduced so as to not skip an additional month. ie. A month added to 31st January will result in the 28th of February (non leap year).

  1. @Test
  2. void testAddMonths(){
  3. date startDate = Date:today();
  4. date midDate = Date:addMonths(startDate, 5);
  5. date endDate = Date:addMonths(startDate, 10);
  6.   7. Assert:isNotNull(midDate, "Date:addMonths returned null for valid date and interval values");
  8. Assert:isTrue(midDate > startDate, "Date:addMonths returned an incorrect date value");
  9. Assert:isTrue(endDate > midDate, "Date:addMonths returned an incorrect date value");
  10. }



#### Date:daysBetween

Returns the number of full days that have to pass to get from the date returned by the first expression to the date returned by the second expression.

  1. @Test
  2. void testDaysBetween(){
  3. date d1 = Date:fromString("2015-01-01");
  4. date d2 = Date:fromString("2015-01-03");
  5. int days = Date:daysBetween(d1, d2);
  6. Assert:isEqual(2, days, "Date:daysBetween returned an incorrect number of days");
  7.   8. days = Date:daysBetween(d2, d1);
  9. Assert:isEqual(-2, days, "Date:daysBetween returned an incorrect number of days");
  10. }



#### Date:extract

Returns an integer representing the component of the date which is identified by the field name string
    
    
    @Test
    void testFromTimeString(){
        datetime dt = Date:fromTimeString("2013-1-20 08:45:12 GMT");
        Assert:isEqual(2013, Date:extract(dt, "year"), "Date:extract returned an incorrect number of years");
        Assert:isEqual(1, Date:extract(dt, "month"), "Date:extract returned an incorrect number of months");
        Assert:isEqual(20, Date:extract(dt, "day"), "Date:extract returned an incorrect number of days");
        Assert:isEqual(8, Date:extract(dt, "hour"), "Date:extract returned an incorrect number of hours");
        Assert:isEqual(45, Date:extract(dt, "minute"), "Date:extract returned an incorrect number of minutes");
        Assert:isEqual(12, Date:extract(dt, "second"), "Date:extract returned an incorrect number of seconds");
    }

#### Date:monthsBetween

Returns the number of full months that have to pass to get from the date returned by the first expression to the date returned by the second expression.

  1. @Test
  2. void testMonthsBetween(){
  3. date d1 = Date:fromString("2015-01-20);
  4. date d2 = Date:fromString("2015-02-22");
  5. int months = Date:monthsBetween(d1, d2);
  6. Assert:isEqual(1, months, "Date:monthsBetween returned an incorrect number of months");
  7.   8. d1 = Date:fromString("2015-01-20");
  9. d2 = Date:fromString("2015-02-20");
  10. months = Date:monthsBetween(d1, d2);
  11. Assert:isEqual(1, months, "Date:monthsBetween returned an incorrect number of months");
  12.   13. d1 = Date:fromString("2015-01-20");
  14. d2 = Date:fromString("2015-02-19");
  15. months = Date:monthsBetween(d1, d2);
  16. Assert:isEqual(0, months, "Date:monthsBetween returned an incorrect number of months");
  17. }



#### Date:fromString

Returns a date representation of the string value expression

  1. @Test
  2. void testFromString(){
  3. string s = "2013-01-02";
  4. date dt = Date:fromString(s);
  5. Assert:isNotNull(dt, "Date:fromString returned null for a valid date value ");
  6. Assert:isTrue(dt > Mez:now(), "Date:fromString returned an incorrect datetime value");
  7.   8. s = "abc";
  9. dt = Date:fromString(s);
  10. Assert:isNull(dt, "Date:fromString didn't return null for an invalid date value");
  11. }



  


#### Date:fromTimeString

Returns a date-time representation of the string value expression. The time zone component of the expression is optional and will default to the logged in user's preferred time zone.
    
    
    @Test
    void testFromTimeString(){
        datetime dt = Date:fromTimeString("2013-1-20 08:45:12 GMT");
        Assert:isEqual(2013, Date:extract(dt, "year"), "Date:extract returned an incorrect number of years");
        Assert:isEqual(1, Date:extract(dt, "month"), "Date:extract returned an incorrect number of months");
        Assert:isEqual(20, Date:extract(dt, "day"), "Date:extract returned an incorrect number of days");
        Assert:isEqual(8, Date:extract(dt, "hour"), "Date:extract returned an incorrect number of hours");
        Assert:isEqual(45, Date:extract(dt, "minute"), "Date:extract returned an incorrect number of minutes");
        Assert:isEqual(12, Date:extract(dt, "second"), "Date:extract returned an incorrect number of seconds");
    
        dt = Date:fromTimeString("2013-1-20 08:45:12 Africa/Johannesburg");
        Assert:isEqual(2013, Date:extract(dt, "year"), "Date:extract returned an incorrect number of years");
        Assert:isEqual(1, Date:extract(dt, "month"), "Date:extract returned an incorrect number of months");
        Assert:isEqual(20, Date:extract(dt, "day"), "Date:extract returned an incorrect number of days");
        Assert:isEqual(6, Date:extract(dt, "hour"), "Date:extract returned an incorrect number of hours");
        Assert:isEqual(45, Date:extract(dt, "minute"), "Date:extract returned an incorrect number of minutes");
        Assert:isEqual(12, Date:extract(dt, "second"), "Date:extract returned an incorrect number of seconds");
    }

#### Date:secondsBetween

Returns the total number of seconds between the first and second date-time expressions. The value will be negative if the second argument is before the first argument.
    
    
     @Test
    void testSecondsBetween(){
        datetime dt1 = Date:fromTimeString("2013-1-20 08:45:12 GMT");
        datetime dt2 = Date:fromTimeString("2013-1-20 08:45:40 GMT");
        
        int diff1 = Date:secondsBetween(dt1, dt2);
        Assert:isEqual(28, diff1, "Date:secondsBetween returned an incorrect number of seconds");
        
        int diff2 = Date:secondsBetween(dt2, dt1);
        Assert:isEqual(-28, diff2, "Date:secondsBetween returned an incorrect number of seconds");
    }

#### Date:now()

Returns the current date and time as a datetime value.

  1. @Test
  2. void testNow(){
  3. datetime dt = Date:now();
  4. Assert:isNotNull(dt, "Date:now() returned null");
  5. }



#### Date:today()

Returns the current date as a date value.

  1. @Test
  2. void testToday(){
  3. date d = Date:today();
  4. Assert:isNotNull(d, "Date:today() returned null");
  5. }



### Integer Built-in Functions

These built-in functions are accessed via the pseudo unit “Integer”

#### Integer:fromString

Returns an integer representation of the string value expression

  1. @Test
  2. void testFromString(){
  3. string s = "12";
  4. int value = Integer:fromString(s);
  5. Assert:isNotNull(value, "Integer:fromString returned null for a valid integer value");
  6. Assert:isEqual(value, 12, "Integer:fromString returned an incorrect integer value");
  7.   8. s = "abc";
  9. value = Integer:fromString(s);
  10. Assert:isNull(value, "Integer:fromString didn't return null for an invalid integer value");
  11. }



### Decimal Built-in Functions

These built-in functions are accessed via the pseudo unit “Decimal”

  


#### Decimal:fromString

Returns an decimal representation of the string value expression

decimal value = Decimal:fromString(s);

  


### Uuid Built-in Functions

These built-in functions are accessed via the pseudo unit “Uuid”

  


#### Uuid:fromString

Returns an UUID representation of the string value expression  


  


uuid value = Uuid:fromString(s);

### Mez (System) BIFs

These BIFs are accessed via the pseudo unit “Mez”

#### now

Returns the current time

  


  1. datetime t = Mez:now();



#### today

Returns the today's date

  


  1. date d = Mez:today();



#### alert

Displays an alert dialog in the UI with the given message

  


  1. Mez:alert(“translation.key”);



#### log

Writes a log message with level INFO. The logging entry is saved in the __logging_log__ table of your application instance's schema. It will also be available via the [Logging Service](https://wiki.stb.mezzanineware.com/display/HP/App+Execution+Logging+Service).

  


  1. Mez:log(“Hello, World”);



#### warn

Writes a log message with level WARNING

  


  1. Mez:warn(“translation.key”);



#### error

Writes a log message with level SEVERE

  


  1. Mez:error(“translation.key”);



#### userRole

Returns a string representation of the current logged in user role

  


  1. Mez:userRole();



  


### Helium BIFs

#### platform
    
    
    bool isServerEnvironment() {
    	return Helium:platform() == HELIUM_PLATFORM.Server;
    }
     
    bool isMobileEnvironment() {
    	return Helium:platform() == HELIUM_PLATFORM.Mobile;
    }

  


### Math BIFs

These BIFs are accessed via the pseudo unit “Math”

#### pow

Raises the first argument to the power of the second argument

  


int i = Math:pow(2, 8);

#### sqrt

Calculates the square root of the argument

  


decimal d = Math:sqrt(3);

#### random

Generates a random decimal

  


decimal r = Math:random();

### String Built-in Functions

These built-in functions are accessed via the pseudo unit “String”

#### String:concat

Returns a string value that is the concatenated result of two or more arguments passed to the function. As of Helium 1.3.1 null values will be treated as empty strings.

  1. @Test
  2. void testConcatenate(){
  3. Assert:isEqual("abcdef", String:concat("abc","def"), "Concatenate returned an incorrect string");
  4. Assert:isEqual("abcdef", String:concat("abc",null,"def"), "Concatenate returned an incorrect string");
  5. }



  


#### String:split

Returns an array of string values that represent the tokens from the value expression that are separated by the separator expression.

> Note that in order to split a special character such as '|', one needs to escape the string with a '\' character. The '\' may need to be escaped as well, so in this case one will end up with String:split(someText, "\\\|").

  1. @Test
  2. void testSplit(){
  3. string[] result = String:split("abc def", " ");
  4.   5. Assert:isEqual(2, result.length(), "Split returned an incorrect number of tokens");
  6. Assert:isEqual(result.get(0), "abc", "Split returned an incorrect first token");
  7. Assert:isEqual(result.get(1), "def", "Split returned an incorrect second token");
  8. }



#### String:length

Returns the length of the string being passed

  


  1. int i = String:length("Hello world");



#### String:substring

Substring of a string based on index positions

  1. @Test
  2. void testSubstring(){
  3. Assert:isEqual("ello", String:substring("Hello World", 1, 4), "String:substring failed");
  4. Assert:isNotEqual("ello", String:substring("Hello World", 1, 3), "String:substring failed");
  5. }



#### String:lower

Convert string to lowercase

  1. @Test
  2. void testLower(){
  3. Assert:isEqual("hello world", String:lower("Hello World"), "String:lower failed");
  4. Assert:isNotEqual("Hello world", String:lower("Hello World"), "String:lower failed");
  5. }



#### String:upper

Convert string to uppercase

  1. @Test
  2. void testUpper() {
  3. Assert:isEqual("HELLO WORLD", String:upper("hello world"), "String:upper failed");
  4. Assert:isNotEqual("hello world", String:upper("hello world"), "String:upper failed");
  5. }



#### String:startsWith

Check if a particular string starts with a string

  1. @Test
  2. void testStartsWith(){
  3. Assert:isTrue(String:startsWith("Hello World", "Hello"), "String:startsWith failed");
  4. Assert:isFalse(String:startsWith("Hello World", "ello"), "String:startsWith failed");
  5. }



#### String:endsWith

Check if a particular string ends with a string

  1. @Test
  2. void testEndsWith(){
  3. Assert:isTrue(String:endsWith("Hello World", "World"), "String:endsWith failed");
  4. Assert:isFalse(String:endsWith("Hello World", "Worl"), "String:endsWith failed");
  5. }



#### String:indexOf

Returns the index within this string of the first occurrence of the specified substring.

  1. @Test
  2. void testIndexOf(){
  3. Assert:isEqual(0, String:indexOf("Hello World", "Hello"), "String:indexOf failed");
  4. Assert:isEqual(1, String:indexOf("Hello World", "ello "), "String:indexOf failed");
  5. Assert:isEqual(2, String:indexOf("Hello World", "llo W"), "String:indexOf failed");
  6. Assert:isEqual(3, String:indexOf("Hello World", "lo Wo"), "String:indexOf failed");
  7. }



#### String:join

Join a collection of strings into one result string with the specified join character

  1. @Test
  2. void testJoin(){
  3. string original = "abc def ghi";
  4. string separator = " ";
  5. Assert:isEqual(original, String:join(String:split(original, separator), separator), "String:join failed");
  6. }



### Assert Built-in Functions

These built-in functions can be accessed via the psuedo unit “Assert”

#### isEqual

Assert that two expressions are equal

  


  1. Assert:isEqual(3, MyUnit:getNumber(), "Values are not equal.");



#### isTrue

Assert that the expression returns true

  


  1. Assert:isTrue(MyUnit:isPositive(3), "Function returned false.");



#### isFalse

Assert that the expression returns false

  


  1. Assert:isFalse(true, "Expected false");



#### isNull

  1. Person p = Person:new();
  2. Assert:isNull(p.fname, "Expected value to be null.");



#### isNotNull

  1. Person p = Person:new();
  2. Assert:isNotNull(p.fname, "Expected value to not be null.");



#### isGreaterOrEqual

  


  1. Assert:isGreaterOrEqual(p.children.length(), 0, "Expected a non-negative value.");



#### isLessOrEqual

  


  1. Assert:isGreaterOrEqual(doctor.patients.length(), 100, "Doctors shouldn’t have more than 100 patients assigned.");



#### isLess

  


Assert:isGreaterOrEqual(profits, 0, "Expected a number less than 0.");

#### isBoth

  


  1. Assert:isBoth(true, isNameSteve(p), "Failed name test.");



#### isEither

Assert:isEither(p.age > 5, isName(“Steve”, p), “Failed test.”);

  


  1. Assert:isEither(p.age > 5, isName("Steve", p),"Failed test.");



#### isNotEqual

Assert that the two expression do not return the same value

  


  1. Assert:isNotEqual(4, 9, "Failed");



### Collections

These BIFs can be called on any variable that holds an object/collection instance. On variables that hold a reference to a list

#### pop

Pops (remove and return) the first element from the collection

  1. Person [] plist = Person:all();
  2. Person p = plist.pop();



#### drop

  


  


  1. Person [] plist = Person:all();
  2. Person p = plist.drop();



#### length

Returns the current length (number of elements) in the a list

  


  1. int len = plist.length();



#### first

Returns the first element in the list (without removing it)

  


  1. Car c = person.cars.first();



#### last

Returns the last element in the list (without removing it)

  


  1. Car c = person.cars.last();



#### append

Adds an element to the back of a list

  1. Car c = Car:new();
  2. c.make = “BMW”;
  3. person.cars.append(c);



#### prepend

Adds an element to the front of the list

  


  1. person.children.prepend(Person:new());



#### get

Returns an element in the specific location in the list

  


  1. Person child = p.children.get(2);



#### add

Adds an element to the specified position in the list

  


  1. p.children.add(1, Person:new());



#### remove

Remove the element at the specified position in the list

  


  1. p.children.remove(2);



#### sortAsc

Sort the list in ascending order

  


  1. numbers.sortAsc();



#### sortDesc

Sort the list in descending order

  


  1. numbers.sortDesc();



#### clear

Remove all elements from the list

  


  1. p.cars.clear();



If the variable holds a reference to an object instance

#### save

Saves the object to the persistence layer if the object is persistent

  1. Person p = Person:new();
  2. p.save();



#### notify

Prompts Helium to send a notification to the user associated with the object if the object declaration was annotated with @Role (this method can be called on a variable holding a reference to collection as well, provided that objects in the collection are instances of @Role objects)

  1. p.notify(“description.key”, “sms.content.key”,
  2. “email.subj.key”, “email.content.key”);
  3.   4. plist.notify(“description.key”, “sms.content.key”,
  5. “email.subj.key”, “email.content.key”);



#### select

Returns a subset of the items in the original collection as a new collection.
    
    
    object Person {
        string name;
    }
     
    void sampleSubSelect(){
    	Person[] persons;
    
        Person p = Person:new();
        p.name = "A";
        persons.append(p);
    
        p = Person:new();
        p.name = "A";
        persons.append(p);
    
        p = Person:new();
        p.name = "A";
        persons.append(p);
    
        p = Person:new();
        p.name = "B";
        persons.append(p);
    
        Persons[] subset = persons.select(all()); //subset will be a copy of the original collection
     
    	subset = persons.select(equals(name, "A")); //subset will contain only the first three items in the original collection
     
    	subset = persons.select(and(equals(name, "A"), equals(name, "B"))); //and on mutually exclusive selectors will return an empty collection
    }

### Persistence BIFs

These BIFs can be used to build up a complex selector for reading sets of data from the persistence layer. These BIFs are accessed via the pseudo unit with the same name as the object that is being queried eg. “Person” or “Car”

Type| Description  
---|---  
`all`| Simple all  
`equals`| Equality  
`empty`| Determine whether a variable is empty  
`between`| Select a range of data between two values  
`lessThanOrEqual  
`| Less or equals check  
`lessThan`| Check if value is less than the value being compared to  
`greaterThan`| Check if value is greater than the value being compared to  
`attributeIn`| Attribute In  
`relationshipIn`| Relationship In  
`contains`| Check is collection has element(s)  
`beginsWith`| Begin with  
`endsWith`| End with  
`notEquals`| Not Equals  
`notEmpty`| Not empty  
`notBetween`| Not between the data or elements  
`notContains`| Collection does not contain element(s)  
`notBeginWith`| Not begin with  
`notEndsWith`| Check if value does not end with value being compared to  
`notAttributeIn`| Attribute not in the given domain  
`notRelationshipIn`| Use to check for relationship  
`union`| Union  
`diff`| Use to check for differences  
`intersect`| Intersect  
`and`| And (in most cases, use this rather than intersect)  
  
These BIFs perform operations on single persistent entities. They are accessed via a method call on a variable holding an object instance or on the pseudo unit with the same name as the object that the method is being performed on

#### new

Creates a new instance of an object. The object doesn’t have to be persistent for this method to be called on it

  


  1. Person p = Person:new();



#### save

If the object instance is a persistent object it saves the object to the persistence layer, (if the developer added objects to the instance’s relationship member collections, they will be persisted aswell)

  1. Person p = Person:new();
  2.   3. p.cars.append(Car:new());
  4. p.cars.append(Car:new());
  5.   6. p.save();



#### read

Reads an existing object instance from the persistence layer

  


  1. Person p = Person:read(getUserUUID());



#### delete

Delete the instance

  


  1. Person:delete(plist.pop());



#### user

Get the current user object

  


  1. Nurse currentUser = Nurse:user();



#### invite

Creates an identity for the object if one doesn't already exist and grants the user associated with the identity permission to use the current app with the role associated with the object
    
    
    @Role("Nurse")
    persistent object Nurse {
    	string mobileNumber;
    }
     
    void sampleInvite(){
    	Nurse n = Nurse:new();
        n.mobileNumber = "27820010001";
        n.invite(n.mobileNumber);
    }

HEADS UPYou cannot append this directly to a collection, so first assign it to a variable (as in the example above), and then append it.

#### RemoveRole

Practically acts as an "uninvite".
    
    
    @Role("Nurse")
    persistent object Nurse {
    	string mobileNumber;
    }
     
    void exampleToRemoveRole(Nurse nurse){
        nurse.removeRole();
    }

### Trigger Function

Trigger functions are special functions defined within an object declaration, and are executed at specific times during the object’s life cycle.

#### beforeCreate

Executes before the object is created, there is one implicit variable that developers can use within the function body, and that is the variable “before”

  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   8. beforeCreate
  9. {
  10. before.count = 0;
  11. }
  12.   13. }



#### afterCreate

Executes after the object is created, there is one implicit variable that developers can use within the function body, and that is the variable “after”

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   

  8. afterCreate
  9. {
  10. after.count = 0;
  11. {
  12.   13. }



#### beforeDelete

Executes before the object is deleted, there is one implicit variable that developers can use within the function body, and that is the variable “before”

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   8. beforeDelete
  9. {
  10. before.count = 0;
  11. }
  12.   13. }



#### afterDelete

Executes after the object is deleted, there is one implicit variable that developers can use within the function body, and that is the variable “after”

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   8. afterDelete
  9. {
  10. after.count = 0;
  11. }
  12.   13. }



#### beforeUpdate

Executes before the object is updated, there are two implicit variables that developers can use within the function body, and that is the variables “before” and “after”

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   8. beforeUpdate
  9. {
  10. after.count = before.count + 1;
  11. }
  12.   13. }



#### afterUpdate

Executes after the object is updated, there are two implicit variables that developers can use within the function body, and that is the variables “before” and “after”

  


  1. persistent object Person
  2. {
  3. string fname;
  4. string sname;
  5.   6. int count;
  7.   8. afterUpdate
  9. {
  10. after.count = before.count + 1;
  11. }
  12.   13. }



#### before

A variable that holds a reference of an instance of the object that reflects the state before creation

  


#### after

A variable that holds a reference of an instance of the object that reflects the state after creation

### Atomic validators

These are the building blocks used for creating complex validators

  


#### notnull

Check that the attribute is not null. This validator does not take any arguments.

  


#### regex

Checks that the value conforms to a regular expression.

  


  1. // Allows upper & lower case and spaces
  2. regex("^[A-Z a-z]*$");


  1. // Alphanumeric with spaces
  2. regex("^[A-Za-z0-9 ]*$");


  1. // Number starting with 27
  2. regex("^27[0-9]*$");


  1. // Email
  2. regex("\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}\b");  




#### minval

Checks that the value is not less than the supplied minimum value.

  


  1. minval(3.145);



#### maxval

Checks that the values is not greater than the supplied maximum value.

  


  1. maxval(6.18);



#### minlen

Checks that a string value does not have less characters than the supplied minimum value.

  


  1. minlen(2);



#### maxlen

Checks that a string value does not have more characters than the supplied maximum value.

  


  1. maxlen(255);



Some examples:

  1. validator PersonNameValidator {
  2. notnull(); minlen(2); maxlen(50);
  3. }
  4.   5. validator AgeValidator {
  6. notnull(); minval(0);
  7. }
  8.   9. validator CTMetroPhoneNumber {
  10. notnull(); regex(“021-[7..9]{7}”);
  11. }



Comments

Two types of comments are supported

Single line comments

  1. // date tstamp = System.now();
  2. // decimal rand = System.random();



And multi-line comments:

  1. /* date tstamp = System.now();
  2. decimal rand = System.random(); */



### Punctuation

Each block contains exactly one token, even if it has two characters, so typing [ ] (with a space between them) it is not the same token as [] (with no nested whitespace).

Type| Description  
---|---  
`=`| Assignment operator  
`.`| unknown  
`++`| Increment operation  
`--`| Decrement operation  
`+`| additive  
`-`| Subractive  
`*`| Multiplicative  
`/`| Multiplicative  
`,`| Unknown  
`@`| Unknown  
`[]`| Array, block or grouping  
`==`| Equality  
`!=`| Equality  
`<`| Relational  
`>`| Relational  
`<=`| Relational  
`>=`| Relational  
`||`| Logical OR  
`&&`| Logical AND  
`;`| End of  
`:`| Scope  
`-`| Unknown  
`{`| Begin Scope  
`}`| End Scope  
`(`| Open brackets  
`)`| Close brackets  
  
### Emails and SMS

There are essentially four ways to send email messages:

  1. Sending to a single object instance that implements the Identity interface. The Mezzanine ID e-mail address associated with the Identity will automatically be used.
  2. Sending to an arbitrary e-mail address



An example for sending outgoing SMS is also included below.

HEADS UP Note that it is possible to send emails, with optional attachments. Html tags (<table>,<br>,<h2>,<b>,...) can be used to format text.

  1. @Role(“Doctor”)
  2. persistent object Doctor{
  3. }
  4.   5. persistent object Patient {
  6. string emailAddress;
  7. }
  8.   9. void mailToIdentity(Doctor d){
  10. Mez:email(d, "email.descriptionKey", "email.subjectKey", "email.bodyKey");
  11. }
  12.   13. void mailToAddress(Patient p){
  14. Mez:email(p.emailAddress, "email.descriptionKey", "email.subjectKey", "email.bodyKey");
  15. }
  16.   17. void mailAttachments(Doctor d){
  18. Mez:email(d, "email.descriptionKey", "email.subjectKey", "/jasper/report1/master.jxrml");
  19. }
  20.   21. void sendSms() {
  22. Client client = Client:new();
  23. client.mobileNumber = "27730085850";
  24. Mez:sms(client, "mobileNumber", "exampleKey.smsText");
  25. }



Additionally if more flexible naming is required for the emailed reports, there exists an additional syntax that specifies a "naming" function. This function is a 0-arg function that returns a string that will be run when the report is generated/emailed. A function can be specified for each report, or the same function can be specified multiple times. A single report "pair" can be specified or multiple.
    
    
    string myNamingFunctionTwo() {
    	return "Trainee_Workout_Report_No_Two";
    }
    string myNamingFunction() {
    	return "Trainee_Workout_Report_No_One";
    }
    void mailWorkouts() {
    	Trainee uTrainee = Trainee:user();
    	string traineeFname = uTrainee.fname;
    	string traineeSname = uTrainee.sname;
    	string traineeUUID = uTrainee._id;
    	Mez:emailAttach(uTrainee.email, "email_desc.trainee_workouts_report", "email_subject.trainee_workouts_report", "email_body.trainee_workouts_report", {"trainee-workouts-report/trainee_workouts_report.jrxml", myNamingFunction()}, {"trainee-workouts-report/trainee_workouts_report_two.jrxml", myNamingFunctionTwo()});
    } 

#### Specifying Custom E-mail Templates

To change the layout, images or colours of the e-mail for e.g. custom branding purposes, a final enum parameter can be added to the Mez:email or Mez:emailAttach BIFs to specify a custom (html) e-mail template. The enumerated type is EMAIL_TEMPLATES, with the specified enum member the html file name (without the extension), as included by the developer under the web-app/email-templates directory. Images for this template is to be included under web-app/images, and prefixed by "cid" in the html.

**DSL snippet**
    
    
    Mez:email(emailAddress, "input.email_subject_static", "input.email_subject_static", "input.email_body_static", EMAIL_TEMPLATES.myEmailTemplate);

**web-app/email-templates/myEmailTemplate.html snippet**
    
    
    <img alt="logo" width="190" height="61" src="cid:myCustomLogo.png" />

Please note that it is not mandatory to have the email-template folder. If one is not included the original default email template in service will be used to send messages. 

To override this behaviour you can include just one template called "default.html" which will then be used for all the mails instead of the original "default" template. Just including the file will enable the behaviour without you having to explicitly mention the template when the email syntax is used. More customization will require you to indicate the template you want to use via above mentioned enumeration. 
    
    
    └── web-app
        ├── email-templates
        │   └── myEmailTemplate.html
        └── images
            └── myCustomLogo.png

Please refer to the default e-mail template as an example or starting point for your custom template: [email_template.html](/wiki/download/attachments/5736071/email_template.html?version=1&modificationDate=1643289609028&cacheVersion=1&api=v2). Note that it contains ${subject}, ${body} and ${applicationInstanceName} placeholders that are replaced at runtime. In essence these placeholders should always be standard and included in any variation of custom template you introduce.

### CSV

Blob variables and attributes can be parsed to collections of object instances.

  1. Currently the parser only supports plain CSV files. Native Excel formats etc. are not supported.
  2. CSV files must have a single header line.
  3. Column names must match the attribute names as defined in the associated object type. For example an object’s first_name attribute will only be populated from the CSV file if the CSV file has a column with a header that is first_name Column headers that don’t match attributes from the associated object type will be ignored.
  4. Parsing is type-safe. For example an object with a birth_date attribute that is of type date must contain values that can be converted to a date value using the acting user’s preferred Locale and Time Zone.
  5. Any parsing errors will result in the entire transaction being rolled back. Detailed feedback to users in terms of where the parser failed is a work in progress.
  6. Complex attributes are supported. For example the CSV file may contain a column header clinic.name This will automatically populage the name attribute of an object that is associated with the primary object through a simple relationship with the name clinic. Simple relationships are one-to-one and many-to-one relationships. Other relationships aren’t supported and will be ignored. The object instance that represents the named relationships will only be created if the value in the column is not null. So if none of the complex attributes access through a specific relationships is set to a non-null value, then that related object won’t be created.



Example code for extracting nurses from CSV in a blob type:

  1. persistent object Clinic {
  2. string name;
  3. }
  4.   5. persistent object Nurse {
  6. string first_name;
  7. date birth_date;
  8. }
  9.   10. object UploadedFile {
  11. blob data;
  12. }
  13.   14. Nurse[] extractNurses(UploadedFile f) {
  15. return Nurse:fromCsv(f.data);
  16. }



### Detailed Examples

#### Unit

Units are groupings of functions and also variables. They can be thought of as modules or namespaces. A Mezzanine script must have at least one unit. Units are defined as follows

  1. unit MyUnit;
  2.   3. string myVar;
  4.   5. int factorial(int x) {
  6. if(x == 0 || x == 1) {
  7. return 1;
  8. } else if (x > 1) {
  9. return factorial(x - 1);
  10. }
  11. }



This unit has one unit variable named myVar. This variable has unit scope and can be accessed by any function in the unit. The unit also has a function named factorial. A unit must have at least one function. To refer to a unit’s member functions or variables from another unit, you have to use the scope operator

  1. unit TestUnit;
  2.   3. void test() {
  4. MyUnit:myVar = "New string value!";
  5. int f = MyUnit:factorial(5);
  6. }



Note: Unit variables cannot be in line initialized when they are declared. The following code will not compile

  1. unit MyUnit;
  2.   3. string myVar = "some value"; // this is not a legal statement



#### Objects

Although the Mezzanine scripting language is not an object oriented language, objects still play a very important role. The most basic objects in Mezzanine scripts can be likened to structs in C. A very basic object will look like this

  1. object Book {
  2. string author;
  3. string title;
  4. string ISBN;
  5. boolean inPrint;
  6. int edition;
  7. }



You will typically use this object as follows

  1. // this creates a new instance of book
  2. Book myBook = Book:new();
  3.   4. // assign a value to the author member
  5. myBook.author = "Isaac Asimov";
  6. myBook.title = "Foundation";
  7.   8. // pass it to a function
  9. printBook(myBook);



The real power of objects become apparent when you make them persistent. By defining objects as persistent a lot of behind-the-scenes functionality springs into action on the Mezzanine platform.

For every object that is declared as ‘persistent’ in your app Mezzanine will create a database table to store the entity in and synchronise it across all devices that use your app, without you writing a single line of SQL. The easiest way to declare a persistent object is to use the ‘persistent’ keyword

  1. persistent object Book {
  2. string author;
  3. string title;
  4. string ISBN;
  5. boolean inPrint;
  6. int edition;
  7. }


