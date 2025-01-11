  


## Description

Helium provides a top level menu within Helium applications. The menu items for these menus are specified using the menu item element. Menu items provide a user interface entry point to the application by providing access to the view in which the menu item is specified. As part of this element, the user role that has access to the menu item needs to be specified as well as the label for the menu item. The label is specified using a key to a lang file entry and is required.

In addition the menu item icon can be specified using the icon attribute. This icon needs to satisfy the following:

  * Be placed in the web-app/images folder
  * Preferably be a png image with an alpha channel and alpha background instead of white (where applicable)
  * Have a width of 40 pixels and height of 30 pixels. Higher resolution images can be used but the aspect ratio should not differ from a 40 x 30 pixel image



Further more, the position of the menu item in the menu can be set by specifying the index in the menu as a value for the `order` attribute.

A view can have more than one menu item given that the menu items are specified for different roles. Having more than one menu item on a view allows the same view to be accessible from different user roles with the possibility of using different positions in the menu and using different icons for the different roles.

If a view should be accessible by a menu item for more than one role, but still use the same menu item position and icon, more than one role can be specified for a single menu item.

If an icon and menu item position is not specified, Helium will use a default icon and menu item position.

  


  


## Basic Example

### Default menu item icon
    
    
     <menuitem label="menu_item.farmer_map">
        <userRole>System Admin</userRole>
    </menuitem>

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5748417/Screenshot%202017-03-09%2015.10.29.png?version=1&modificationDate=1489072688603&cacheVersion=1&api=v2)

  


### Menu item with custom icon and menu position
    
    
     <menuitem label="menu_item.farmer_map" icon="Globe" order="5">
        <userRole>System Admin</userRole>
    </menuitem>

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5748417/Screenshot%202017-03-09%2015.11.52.png?version=1&modificationDate=1489072703546&cacheVersion=1&api=v2)

  


### View with multiple menu items with different positions and icons
    
    
    <menuitem label="menu_item.farmer_map" icon="Globe" order="5">
        <userRole>System Admin</userRole>
    </menuitem>
            
    <menuitem label="menu_item.farmer_map" icon="Map" order="3">
        <userRole>Shop Owner</userRole>
    </menuitem> 

  


### View with single menu item for different user roles
    
    
     <menuitem label="menu_item.farmer_map" icon="Globe" order="5">
        <userRole>System Admin</userRole>
        <userRole>Shop Owner</userRole>
    </menuitem>

  


  


  


## Advanced Example

In addition to specifying the roles, label, icon and preferred order for a menu item in a static manner as shown in the basic example above, these values can also be dynamically specified using bindings. Bindings for each of these properties support binding to a function, unit variable or object attribute. The example above can be re-implemented dynamically as follows:
    
    
    <menuitem>
        <dynamicUserRoles function="getRoles"/>
        <dynamicIcon function="getIcon"/>
        <dynamicLabel function="getLabel"/>
        <dynamicOrder function="getOrder"/>
    </menuitem>

Backing unit functions used for bindings:
    
    
    DSL_ROLES[] getRoles() {
        DSL_ROLES[] roles;
        roles.append(DSL_ROLES.System_Admin);
    	roles.append(DSL_ROLES.Shop_Owner);
        return roles;
    }
    
    string getIcon() {
        return "Globe";
    }
    
    int getOrder() {
        return 5;
    }
    
    string getLabel() {
    	return String:translate("menu_item.farmer_map");
    }

Note the return value above for each binding. Invalid types will result in compile time errors.

Note specifically the use of the `DSL_ROLES` built-in enumeration. This enumeration has values that represent each role in your application. For each role, the value is the role name as specified in the `@**Role**` annotation on the accompanying model object formatted to have white space and dashes replaced by underscores.

No other special characters are replaced when creating the enumeration options and might result in compile errors if the characters in the role name do not confirm to valid enum option syntax.

Keep in mind that the values for these bindings are executed before the main menu of your app loads and thus before any init function is executed. This means that you will not be able to make use of values set in an init function. The values for the bindings are only re-evaluated when the app is refreshed or reloaded from the browser.

  


Bindings for menu item properties are support from [Helium 1.18 ](/wiki/spaces/HTUT/pages/5746818/1.18+Release+Notes)onwards.

## Sub Menu Items

A new addition in release v1.57.0 allows for the specification of sub menu items. Sub menu items are defined within a particular menu item with the sub menu item element. Sub menu items can be seen as children of the menu item and as such do not support icons. When sub menu items are defined, the menu item view becomes inaccessible in favour of the sub menu items. The resulting view of a sub menu item is defined by means of an action declared in your presenter. Sub menu items also support visibility bindings, however these visibility bindings will only register on load of the application.

  


## Basic example

VXML view
    
    
    <menuitem label="menu_item.entity_management" icon="manage-entities" order="4">
    	<userRole>System Admin</userRole>
    			
    	<subMenuItem label="sub_menu_item.summary" action="subMenuShowSummary" order="1">
    		<visible function="showSideMenu"/>
    	</subMenuItem>
    	<subMenuItem label="sub_menu_item.shops" action="subMenuShowShops" order="2">
    		<visible function="showSideMenu"/>
    	</subMenuItem>
    	<subMenuItem label="sub_menu_item.stock_items" action="subMenuShowStock" order="3">
    		<visible function="showSideMenu"/>
    	</subMenuItem>
    </menuitem>

Backing unit functions used for bindings:
    
    
    DSL_VIEWS subMenuShowSummary() {
        return DSL_VIEWS.EntityMgmtMenu;
    }
    
    DSL_VIEWS subMenuShowShops() {
        initMenu();
        setMenuItem(DSL_VIEWS.ShopMgmt);
        return selectMenuItem();
    }
    
    DSL_VIEWS subMenuShowStock() {
        initMenu();
        setMenuItem(DSL_VIEWS.StockMgmt);
        return selectMenuItem();
    }

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5748417/Screenshot%202024-05-10%20at%2014.09.13.png?version=1&modificationDate=1715342983739&cacheVersion=1&api=v2&width=166&height=250)

  


## Additional Mentions and References

  * Used throughout the [Helium Tutorial](/wiki/spaces/HTUT/pages/5735883/Helium+Beginner+s+Tutorial) with first mention in [Lesson 01: A Basic Helium App](/wiki/spaces/HTUT/pages/5745786/Lesson+01+A+Basic+Helium+App)
  * [Helium DSL and View Quick Reference](/wiki/spaces/HTUT/pages/5737643/Quick+Reference)



  


  

