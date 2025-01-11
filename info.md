  


## Description

The info widget is a versatile labelled widget that can be used to output text. It supports both binding to a unit variable or function and displaying of lang file values directly.

The title is specified as a key to a lang file entry and is required. A tooltip can also be specified as a key to a lang file entry but is optional. [Visibility bindings](https://wiki.mezzanineware.com/pages/viewpage.action?pageId=17728559) are also supported.

  


  


## Example

  


### Using the Input Widget with a Lang File Entry

**View XML**
    
    
    <info label="info.welcome" tooltip="info.welcome_tooltip" value="info.system_admin_welcome"/>
    
    
    info.welcome = Welcome:
    info.welcome_tooltip = A welcome message
    info.system_admin_welcome = Welcome to your landing page

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5735439/info.png?version=1&modificationDate=1646313356528&cacheVersion=1&api=v2&width=478&height=48)

  


  


  


### Displaying Dynamic Values Using the Lang File

**View XML**
    
    
    <info label="info.welcome" value="info.system_admin_welcome"/>

**Backing unit**
    
    
    unit SystemAdminHome;
    .
    .
    string firstName;
    string lastName;
    
    void init() {
        currentSystemAdminUser = SystemAdmin:user();
        firstName = currentSystemAdminUser.firstName;
        lastName = currentSystemAdminUser.lastName;
    }

**en.lang file entries**
    
    
    info.welcome = Welcome:
    info.system_admin_welcome = Welcome {SystemAdminHome:firstName} {SystemAdminHome:lastName}

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735439/Screenshot%202017-03-13%2010.36.58.png?version=1&modificationDate=1489401547732&cacheVersion=1&api=v2)

  


  


  


### Using the Input Widget with a Binding
    
    
    <info label="info.email_address">
        <binding function="getSystemAdminEmailAddress"/>
    </info>
            
    <info label="info.mobile_number">
        <binding variable="currentSystemAdminUser">
            <attribute name="mobileNumber"/>
        </binding>
    </info>

**Backing unit**
    
    
    SystemAdmin currentSystemAdminUser;
    void init() {
        currentSystemAdminUser = SystemAdmin:user();
    	.
    	.
    }
     
    // Return the mobile number of the current System Admin user 
    string getSystemAdminMobileNumber() {
        return currentSystemAdminUser.mobileNumber;
    }
    // Return the email address of the current System Admin user
    string getSystemAdminEmailAddress() {
        return currentSystemAdminUser.emailAddress;
    }

**en.lang file entries**
    
    
    info.email_address = E-mail address:
    info.mobile_number = Mobile number:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735439/Screenshot%202017-03-13%2010.36.19.png?version=1&modificationDate=1489401561984&cacheVersion=1&api=v2)

  


### Markdown

The info widget can be allowed to render markdown using the optional "allowMarkdown" attribute. Markdown can be used to create hyperlinks or to otherwise style the text in the info widget.
    
    
    <info label="info.welcome" value="info.system_admin_welcome" allowMarkdown="true"/>

The following text in an info widget that allows markdown will create a hyperlink.
    
    
    [Mezzanineware](https://mezzanineware.com)

### Background color

You can change the background color of the infobox to the following types:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735439/Screenshot%202024-05-03%20at%2014.42.16.png?version=1&modificationDate=1714740407268&cacheVersion=1&api=v2)
    
    
    <info label="info.example" allowMarkdown="true" cols-md="3" cols-xs="12" variant="clear">
      <binding function="getBackgroundTextClear"/>
    </info>

The variant types can be: **clear** , **info** , **warning** and **error**

  


## Additional Mentions and References

  * Devoted sections in the Helium Tutorial Lesson 1: A Basic Helium App for [simple info widget usage](https://wiki.mezzanineware.com/display/HTUT/Lesson+1%3A+A+Basic+Helium+App#Lesson1:ABasicHeliumApp-AddingaSimpleInfoWidget) and [more complex info widget usage.](https://wiki.mezzanineware.com/display/HTUT/Lesson+1%3A+A+Basic+Helium+App#Lesson1:ABasicHeliumApp-MoreComplexInfoWidgetUsage)
  * [Helium DSL and View Quick Reference](/wiki/spaces/HTUT/pages/5737643/Quick+Reference)



  


  

