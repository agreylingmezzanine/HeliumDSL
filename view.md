## Description

The view element is used to specify details of the view. These include the view title, backing unit for the view and init function that should be called when the view is loaded. Using the view element is required for all Helium application views as all other view components including [data input widgets](/wiki/spaces/HTUT/pages/5749256/Data+Input+Widgets) and [data output widgets](/wiki/spaces/HTUT/pages/5744819/Data+Output+Widgets) are placed within it.

  


  


## Example

The following code snippet shows and example of how to use the view element.

**View XML**
    
    
    <?xml version="1.0" encoding="UTF-8"?>
    <ui xmlns="http://uiprogram.mezzanine.com/View"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://uiprogram.mezzanine.com/View ../View.xsd">
        <view label="view_heading.shop_management" unit="ShopMgmt" init="init" hideMenu="false" 	hideFooter="false" hideTopBar="false" initialScroll="default">
        .
        .
        </view>
    </ui>

**Backing unit**
    
    
    unit ShopMgmt;
    .
    .
    void init() {
        .
        .
    }

**en.lang file entry**
    
    
     view_heading.shop_management = Shop Management

  * `label="view_heading.shop_management"`  
This specifies the heading that will be displayed for the view. It is required and references a key in the lang file.  
  

  * `unit="ShopMgmt"`

References from views to unit functions and variables can be done in two ways. Firstly, using the fully qualified name for the function or variables. This includes the unit name followed by a colon followed by the name of the function or variables. For example: `MyUnit:myFunction` or `MyUnit:myVariable`. Another way to reference a function or variables in a view is to first specify the default unit for the view, as shown the code example above and them simply using the function and variable name for reference.  
  

  * `init="init"`

It is often useful to have a unit function execute when a view loads in order to perform some initialization operations such as initializing unit variables used in the view. This is achieved by specifying the init function as in the example above: `init="init"`. Note that if a default unit is not specified, the init function has to be referenced using its fully qualified name: `init="ShopMgmt:init"`. Note that init functions are only executed when a view is loaded as a result of navigation to that view from a different view or as a result of menu action.  
  

  * `hideMenu="false" (optional)  
`This setting specifies whether the side menu of an application should be hidden by default on a page level. If set to `true` the menu will be hidden when navigating to the specific page and users will be forced to click on the hamburger menu icon on the top left of the page in order to access the menu. This can also be set on a global level per application via the DSL admin portal.  
  

  * `hideFooter="false" `(optional)``  
This setting specifies whether the footer of an application should be hidden by default on a page level. This can also be set on a global level per application via the DSL admin portal.  
  

  * `hideTopBar="false" `(optional)``  
This setting specifies whether the top bar of an application should be hidden by default on a page level. If set to `true` then the top bar of the application will be hidden when navigating to the specific page. **Setting`hideTopBar="true"` in conjunction with `hideMenu="true"` should be avoided unless you have specified an action within the view for navigation purposes. **  
This can also be set on a global level per application via the DSL admin portal.  
  

  * `initialScroll="default" ``(optional)  
`In some instances it may be useful to force a specific page to scroll to the top of the view when navigating to that page. Setting `initialScroll="top"` will ensure that when navigating to the specific page that the user is scrolled to the top of the page.



  


  

