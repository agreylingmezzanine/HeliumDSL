> _As a System Administrator I want to delete other System Administrators._

  


  


## Lesson Outcomes

By the end of this lesson you will have added user deletion to the functionality completed in [Lesson 2](/wiki/spaces/HTUT/pages/5736773/Lesson+02+The+Table+Widget+and+Basic+Navigation) and [Lesson 3](/wiki/spaces/HTUT/pages/5741853/Lesson+03+User+Input+Persistence+Validation+and+Tables+continued), and thereby have added a full user management component to your app. The key concepts here are:

  * "hard" deletion of objects
  * best practice "soft" deletion of role objects
  * removal of user roles, a.k.a. "uninviting" users



You will also be introduced to in-app alerts (pop-ups).

  


  


## New & Modified App Files

**`./model/SystemAdmin.mez`  
**

**`./services/UserInvite.mez`  
**

**`./web-app/lang/en.lang`  
**

**`./web-app/presenters/SystemAdminUserMgmt.mez`  
**

**`./web-app/views/SystemAdminUserMgmt.vxml`  
**

**  
**

  


## Deleting Objects

Assuming your new `<rowAction>`**** looks like this:
    
    
    <rowAction label="button.remove" action="removeUser">
       <binding variable="selectedSystemAdmin" />
    </rowAction>

The `delete`**** built-in function is used like this:
    
    
    void removeUser() {
       SystemAdmin:delete(selectedSystemAdmin);
    }

Note that the `delete`**** built-in function is called from the object namespace (and not on a variable holding an instance of the object) and is passed the object instance as parameter. Having executed `delete`, the object instance is now gone forever.

  


  


## A "Soft Deletion" Best Practice

When removing an object instance there are various reasons why you might want to keep the record in the database. Common reasons for user role objects are reporting on e.g. how many stock updates were done by a certain user, for which we'll need the reference to the user to still be valid, or simplifying reactivation when a user has been removed by mistake. Instead of deleting an object in such cases, it is recommended to set a deleted/archived/inactive flag, which we'll do for the users in our tutorial's code as well.
    
    
    persistent object SystemAdmin {
       .
       .	
       bool deleted;
    }

`removeUser()` then becomes this:
    
    
    DSL_VIEWS removeUser() {
       selectedSystemAdmin.deleted = true;
       init();
       return null;
    }

This also means we have to set this flag when first creating the object instance, and check this flag when reading from the database.

System administrators are created in either of two ways in our app, so we need to set the `deleted` flag to **`false`** in both cases:
    
    
    unit SystemAdminUserMgmt;
     
    [...]
     
    DSL_VIEWS saveUser() {
       formSystemAdmin.deleted = false;
       formSystemAdmin.save();
       [...]
    
    
    unit UserInvite;
    @InviteUser
    SystemAdmin inviteSystemAdmin() { 
       [...]
       systemAdmin.deleted = false;
       return systemAdmin;
    }

  


In our `init()` where we populate the collection bound to the view table, we replace the `:all() `selector with `:equals(deleted, false)`:
    
    
    void init() {
       systemAdmins = SystemAdmin:equals(deleted, false);
       formSystemAdmin = SystemAdmin:new();
       editing = false;
    }

  


  


Changing an app's data model, like adding an attribute/field to an object, will require the developer to recreate the sandbox app.

## Removing User Roles

In our case the object instance we deleted also represents an invited app user. Deleting the record usually means we should also revoke that user's access. We "uninvite" the user using the `removeRole` BIF, invoked through an object instance.
    
    
    DSL_VIEWS removeUser() {
       selectedSystemAdmin.deleted = true;
       selectedSystemAdmin.removeRole();
       init();
       return null;
    }

  


  


  


## Prompting for Confirmation

Another table widget feature allows for a confirmation prompt to appear when the button is clicked. The `<rowAction>` child element itself has an optional child element named `<confirm>`**** that takes a `subject` and a `body` attribute, both with translation keys from your `.lang` file for values.
    
    
    <rowAction label="button.remove" action="removeUser">
       <binding variable="selectedSystemAdmin" />
       <confirm subject="confirm_subject.removing_user" body="confirm_body.removing_user" />
    </rowAction>

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5737545/Screen%20Shot%202017-02-03%20at%201.18.53%20PM.png?version=2&modificationDate=1486127987729&cacheVersion=1&api=v2)

  


  


  


## Showing an Pop-up Message When You Try to Remove Yourself

Already in [Lesson 1](/wiki/spaces/HTUT/pages/5745786/Lesson+01+A+Basic+Helium+App) it was demonstrated how to assign a reference to the currently logged in user to a variable. To keep system administrators from revoking their own access, we can check this against `selectedSystemAdmin`. Not to look like a silent failure, we'll also add a pop-up, called "alerts" in Helium: `alert`, `alertError`, and `alertWarn`. These BIFs are available on the `Mez` namespace, and the difference between them is only the appearance of the alert pop-ups.
    
    
    DSL_VIEWS removeUser() {
       if (selectedSystemAdmin == SystemAdmin:user()) {
          Mez:alert("alert.currently_logged_in");
       } else {
          selectedSystemAdmin.deleted = true;
          selectedSystemAdmin.removeRole();
       }
       init();
       return null;
    }

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5737545/Screen%20Shot%202017-02-02%20at%203.36.15%20PM.png?version=2&modificationDate=1486118571404&cacheVersion=1&api=v2)

The `alertWarn`**** and `alertError` BIFs display orange and red text, respectively.

  


  






  

