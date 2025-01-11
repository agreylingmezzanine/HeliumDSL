> _As a System Admin I want to see my role name differently depending on whether I'm a developer or a client._

## Lesson Outcomes

After this lesson you should know the purpose and usage of the **`@RoleName`** annotation.

## Purpose

The **`@RoleName`** annotation allows a custom role name to be displayed in the app that differs from role name specified in the data model and can be determined at runtime.

Using the tutorial app as an example, the `"System Admin"` role might be given to developers (or in-field technicians, etc.) tasked with the initial setup of the app (such as inviting the first client users), as well as to client users. Consider a scenario wherein for client users the `"System Admin"` role name sounds like a technical role and therefor confusing. We can use **`@RoleName`** to have their role displayed on the mouseover in the right-hand corner of the screen as e.g. "Programme Manager" instead.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739173/Screen%20Shot%202017-02-07%20at%202.35.16%20PM.png?version=1&modificationDate=1486478971017&cacheVersion=1&api=v2)

## New & Modified App Files

**`./model/enums/Enums.mez`  
**

**`./model/roles/SystemAdmin.mez`  
**

**`./services/CustomRoleName.mez`  
**

**`./services/UserInvite.mez`  
**

**`./web-app/lang/en.lang`  
**

**`./web-app/views/user_management/SystemAdminUserMgmt.vxml`  
**

## Usage

A method that

  * has the **`@RoleName`** annotation,
  * takes an object instance of the role object as parameter, and
  * returns a **`string`**



anywhere in the app, will define what the currently logged in user will see, based on the method logic. We'll create a `services/CustomRoleName.mez` file, containing a unit of the same name, in turn containing our **`@RoleName`** method (shown below). We also need to add a flag to the `SystemAdmin` object to distinguish between the two types of system administrators, and the necessary changes to make the flag take effect.
    
    
    unit CustomRoleName;
    @RoleName
    string getSystemAdminRoleName(SystemAdmin systemAdmin) {
       if (systemAdmin.roleName == EN_SYSTEM_ADMIN_ROLE_NAME.System_Admin) {
          return "System Admin";
       } else {
          return "Programme Manager";
       }   
    }

The above (together with the required flag attribute on the `SystemAdmin` object, new **`enum`** , a change to the **`@InviteUser`** -annotated `inviteSystemAdmin()` method, and change to the view for creating or editing `SystemAdmin` records, to round it all of), will lead to the mouseover in the right-hand corner looking like this for system administrators flagged as "Programme Managers": 

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739173/Screen%20Shot%202017-02-07%20at%202.34.40%20PM.png?version=1&modificationDate=1486478971040&cacheVersion=1&api=v2)




