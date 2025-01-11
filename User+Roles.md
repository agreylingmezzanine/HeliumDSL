  


## Creating a User Role

The @**`Role`** object annotation indicates that the persistent object is associated with a user role.
    
    
    @Role("Manager")
    persistent object ManagerProfile
    {
        string fname;
        string sname;
        string title;
    }

Any persistent object that is annotated with **`@Role`** has these implicit attributes:

  * `_firstNames`
  * `_nickName`
  * `_surname`  
`  
`



  


  


## Invitations via HeliumDev / Core App

Inviting a user to an app via the Helium core app web portal or as an initial user through the HeliumDev client requires that you annotate a function returning the role type with **`@InviteUser`**. Due to the context from which these functions are executed developers usually hard code attribute values or generate them on the fly. This method is therefore only valid for users used for testing and the initial setup user.

**@InviteUser function**
    
    
    @InviteUser
    SystemAdmin inviteSystemAdmin() {
    	SystemAdmin systemAdmin = SystemAdmin:new();
    	systemAdmin.firstName = "Test";
    	systemAdmin.lastName = "User";
    	systemAdmin.mobileNumber = "278212345678";
    	systemAdmin.emailAddress = "user@domain.com";
    	return systemAdmin;
    }

  


  


  


## Get the Current User's Role

The `userRole()` BIF available on the `Mez` namespace returns a string representation of the current logged in user role.
    
    
    if (Mez:userRole() == "Manager") {}

Note that if the function is being executed from the context of an inbound API call, the value that is returned will be "__web_services__".

Similarly, if the function is being executed from the context of a scheduled function, the value that is returned will be "__scheduler__".

  


  


  


  


## Customizing Role Names at Runtime

The **`@RoleName`** function annotation allows a custom role name to be displayed in the app that differs from role name specified in the data model and can be determined at runtime.

  

    
    
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

  


  


  


## Role Restrictions on Viewing Data

Annotating an object with **`@Restrict`** restricts which data is visible, on the front-end, to the specified user role, according to the specified selector function (see [Querying Data](/wiki/spaces/HTUT/pages/5735157/Querying+Data) for more on selector functions).

For example, with the `"Manager"` role and the `all()` selector:
    
    
    @Restrict("Manager", all())
    object EmployeeRecord
    {
        string fname;
        string sname;
    }

The default restrictions per role, without any **`@Restrict`** specified, is no restrictions, so the above usage is redundant.

Note that the filtering as specified by the **`@Restrict`** annotation is only applied to data when it is displayed on the front-end by means of, for example, data tables, select widgets etc. 

All the data is still available in a presenter itself even though the presenter is executing from the context of a logged in user for which filtering is applied on the front-end.

  


DEPRECATED secondary function of @Restrict

Use this for users of Helium Android to be able to access specific types. The selector defines which objects of the requested type are accessible to the specified role. Objects that have relationships to objects included by an `@Restrict` are **not** automatically synchronized, they must have their own `@Restrict` annotations in order for the relationship to remain valid across the network. This technique is especially useful with many-to-many relationships, which can be used to reduce the amount of data synchronized to Helium Android users, and improve the user-experience of the application. Types without an `@Restrict` annotation will **not** be synchronized to Helium Android users, and may cause null-pointer errors in your application.

  


  


  


  


  


  


  


  


  


  


  


  


Take note that **`@Restrict`** only filters data on the front-end widgets and not in presenters.

## Read / Write Privileges

The **`@RolesAllowed`** annotation on persistent objects specifies the access rights for a specific role on an object.
    
    
    @RolesAllowed("Manager", "rw")
    persistent object EmployeeRecord
    {
        string fname;
        string sname;
    }

  


  


  


## Sending Notifications

The `notify` built-in function prompts Helium to send a notification to the user associated with the object if the object declaration was annotated with **`@Role`** (this method can be called on a variable holding a reference to a collection as well, provided that objects in the collection are instances of **`@Role`** objects).
    
    
    p.notify("description.key", "sms.content.key",
    "email.subj.key", "email.content.key");

  


  


  


## The Identity object

The Identity object is an implicit interface that is implemented by every persistence object in your application that has a **`@Role`** annotation. This object has the following implicit declaration:
    
    
    object Identity {
        string _firstNames;
        string _nickName;
        string _surname;
        string _locale;
        string _timeZone;
    }

  


The `Identity` object is read-only and cannot be directly instantiate by `Identity:new()`. All attributes of the `Identity` object are read-only as well and are automatically populated from the information users update in Mezzanine ID.

The compiler can implicitly convert any custom persistent object with a **`@Role`** annotation to an `Identity` object instance. The following shows an example:
    
    
    @Role("Doctor")
    persistent object Doctor{
    }
     
    @Role("Nurse")
    persistent object Nurse {
    }
     
    persistent object Patient {
        Doctor doctor;
        Nurse nurse;
    }
     
    Identity getUser(Patient p){
        if(p.doctor != null)
            return p.doctor;
        else
            return p.nurse;
    }

Since all persistent custom objects with **`@Role`** annotations implement the Identity object you can also access the Identity attributes directly from such custom objects, for example:
    
    
    @Role("Doctor")
    persistent object Doctor{
    }
     
    void test(){
        Doctor d = Doctor:new();
        string firstNames = d._firstNames;
        string surname = d._surname;
        //etc.
    }

  


  


  


## Additional Mentions and References

  * **`@Role`** and `Mez:userRole()` feature in [Lesson 01: A Basic Helium App#AddingaUserRole](/wiki/spaces/HTUT/pages/5745786/Lesson+01+A+Basic+Helium+App#Lesson01:ABasicHeliumApp-AddingaUserRole).**`  
`**
  * **`@RoleName`** features in [Lesson 20](/wiki/spaces/HTUT/pages/5739173/Lesson+20+The+RoleName+Annotation).
  * **`@Restrict`** features in [Lesson 15: The Map Widget and Restricting Access to Data#PlacingRestrictionRulesonObjects](/wiki/spaces/HTUT/pages/5744335/Lesson+15+The+Map+Widget+and+Restricting+Access+to+Data#Lesson15:TheMapWidgetandRestrictingAccesstoData-PlacingRestrictionRulesonObjects).
  * The `Identity` object is covered in [Lesson 21](/wiki/spaces/HTUT/pages/5742504/Lesson+21+The+Identity+Object).
  * The Quick Reference mentions the above mostly under [Object Annotations and Function Annotations](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-ObjectAnnotations).



  


  


  

