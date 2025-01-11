> _As a System Admin I want to view the names and surnames of System Admins as they have entered it on their user profiles._

## Lesson Outcomes

After this lesson you should know how to use the `Identity` built-in object.

## New & Modified App Files

**`./web-app/presenters/user_managment/SystemAdminUserMgmt.mez`  
**

**`./web-app/views/user_management/SystemAdminUserDetails.vxml`**

**  
**

## Definition

The `Identity` object is an implicit interface that is implemented by every persistence object in your application that has a **`@Role`** annotation. This object has the following implicit declaration:
    
    
    object Identity {
       string _firstNames;
       string _nickName;
       string _surname;
       string _locale;
       string _timeZone;
    }

## Populating the Identity Object

Attributes of the `Identity` object are automatically populated from the information users update on their profiles. You see this profile screen when you exit the app by clicking on "More Apps" on the right-hand corner mouseover menu. These details apply server wide, and are not app specific.

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5742504/Screen%20Shot%202017-02-06%20at%209.13.59%20AM.png?version=1&modificationDate=1486410038671&cacheVersion=1&api=v2&width=495&height=400)

Outside of above context, the Identity object and all of its attributes are read-only.

## Accessing Identity Attributes from Custom Objects

When displaying a system administrator's details (see [Lesson 2](/wiki/spaces/HTUT/pages/5736773/Lesson+02+The+Table+Widget+and+Basic+Navigation) and [Lesson 3](/wiki/spaces/HTUT/pages/5741853/Lesson+03+User+Input+Persistence+Validation+and+Tables+continued)), we'll give precedence to a user's profile information (which they would have entered themselves) over the values entered when they were invited. Since all persistent custom objects with **`@Role`** annotations implement the `Identity` object we can access the `Identity` attributes directly from such custom objects.

We can therefore change the `SystemAdminUserMgmt` unit and `SystemAdminUserDetails` view as below to check first if the user has entered a name and/or surname on his profile, and if so, display that instead.
    
    
    string systemAdminFirstName;
    string systemAdminLastName;
    .
    .
    .
    void initViewDetails() {
       if (selectedSystemAdmin._firstNames != null) {
          systemAdminFirstName = selectedSystemAdmin._firstNames; //Identity object attribute
       } else {
          systemAdminFirstName = selectedSystemAdmin.firstName;
       }
       if (selectedSystemAdmin._surname != null) {
          systemAdminLastName = selectedSystemAdmin._surname; //Identity object attribute
       } else {
          systemAdminLastName = selectedSystemAdmin.lastName;
       }
    }
    
    
    <view label="view_heading.system_admin_user_details" unit="SystemAdminUserMgmt" init="initViewDetails">
    .
    .
    .
    	<info label="info.first_name">
    		<binding variable="systemAdminFirstName" />
    	</info>
    	<info label="info.last_name">
    		<binding variable="systemAdminLastName" />
    	</info>

## Accessing Identity Attributes from the Identity Object

As mentioned earlier, the `Identity` object is read-only. It _cannot_ be directly instantiated by `Identity:new()`. However, the compiler can implicitly convert any custom persistent object with a **`@Role`** annotation to an `Identity` object instance. The following changes to `SystemAdminUserMgmt` would have**** achieved the same as the previous approach:
    
    
    string systemAdminFirstName;
    string systemAdminLastName;
    .
    .
    .
    void initViewDetails() {
       Identity identity = selectedSystemAdmin;
       if (selectedSystemAdmin._firstNames != null) {
          systemAdminFirstName = identity._firstNames;
       } else {
          systemAdminFirstName = identity.firstName;
       }
       if (selectedSystemAdmin._surname != null) {
          systemAdminLastName = identity._surname;
       } else {
          systemAdminLastName = identity.lastName;
       }
    }




