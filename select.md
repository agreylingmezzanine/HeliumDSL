  


## Description

The select widget represents a labelled single select dropdown. The selected result can be [bound](/wiki/spaces/HTUT/pages/5739434/binding) to a variable with a basic data type, object instance, object instance attribute or an custom enum variable.

The default initial value for binding is null and is displayed as "Not Specified" on the widget.

The collection source for the widget that will be displayed can be a collection of basic data types, an object collection or an enum.

In the case of an object collection as source, one or more attributes can be specified to be displayed in the dropdown list. 

The title is specified as a key to a lang file entry and is required. A tooltip can also be specified as a key to a lang file entry but is optional. [Visibility bindings](https://mezzaninewiki.atlassian.net/wiki/pages/viewpage.action?pageId=5739808) are also supported.

A new addition in version 1.57.0 (specific to the new UI) is the `description` attribute. The description attribute works similarly to the title in that it is specified as a key to a lang file entry, however, its purpose is to allow for additional information related to an input and will appear beneath the input.

The select widget can be used to submit the values on a view to the backend.

  


  


## Example

### Enum as collection source

The abbreviated code snippets and screenshots below shows the use of `<select/>` with a custom enum as collection source.

**Model enum and object attribute**
    
    
     enum STATES {
        West_Coast,
        South_Coast,
        Inland
    }
    persistent object Farmer {
        .
        .
        STATES state;
        .
        .
    }

**View XML**
    
    
     <select label="select.state">
        <binding variable="farmer">
            <attribute name="state"/>
        </binding>
        <enum>STATES</enum>
    </select>

**Backing unit**
    
    
    Farmer farmer;
    
    void init() {
        farmer = Farmer:new();
        .
        .
    }

**en.lang file entry**
    
    
    select.state = State: 

<select> with enum collection source example screenshot

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.22.35.png?version=1&modificationDate=1488990175377&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.12.57.png?version=2&modificationDate=1488989988567&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.23.53.png?version=1&modificationDate=1488990254539&cacheVersion=1&api=v2)

  


  


### Object array/collection as collection source

The abbreviated code snippets and screenshots below shows the use of `<select/>` with a collection of object instances as collection source.

**Model object attribute**
    
    
     persistent object Shop {
        .
        .
        @OneToOne
        ShopOwner owners via shops;
    }
    
    persistent object ShopOwner {
        string firstName;
        string lastName;
        bool deleted;
        .
        .
    }

**View XML**
    
    
     <select label="select.shop_owner">
        <binding variable="ownerToAdd"/>
        <collectionSource function="getAllShopOwners">
            <displayAttribute name="firstName"/>
            <displayAttribute name="lastName"/>
        </collectionSource>
    </select>

**Backing unit**
    
    
    ShopOwner ownerToAdd;
    
    void init() {
        ownerToAdd = null;
    }
    
    ShopOwner[] getAllShopOwners() {
        return ShopOwner:equals(deleted, false);
    }

**en.lang file entry**
    
    
     select.shop_owner = Shop owner:

<select> with object collection as collection source

  
![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.36.12.png?version=1&modificationDate=1488991095709&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.36.28.png?version=1&modificationDate=1488991096050&cacheVersion=1&api=v2)

  


### Basic data type array/collection as collection source

The abbreviated code snippets and screenshots below shows the use of `<select/>` with a collection of strings as collection source.

**View XML**
    
    
    <select label="select.crop_type">
        <binding variable="selectedCropType"/>
        <collectionSource variable="cropTypes"/>
    </select>

**Backing unit**
    
    
    string[] cropTypes;
    string selectedCropType;
     
    void init() {
    	cropTypes.append("Coffee");
    	cropTypes.append("Nuts");
    }

**en.lang file entry**
    
    
     select.crop_type = Crop type:

<select> with basic data type collection as collection source

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.49.03.png?version=1&modificationDate=1488991893837&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5743751/Screenshot%202017-03-08%2016.52.46.png?version=1&modificationDate=1488991985698&cacheVersion=1&api=v2)

  


  


  


### Submit view on change event

An attribute called submitOnChange can be declared on a view, when this is set as "true" the view will be submitted to Helium when an option of the select is clicked by the user. The submit event will bind user input to the unit variables and reload the view in the same way as the [<submit/>](/wiki/spaces/HTUT/pages/5737528/submit) widget. The use case for doing this is to filter results displayed on a view when a user selects an item from a select dropdown, without the need to click a submit button.

In the following example, when a user selects a value from the rendered select widget then the view will be submitted.
    
    
    <select label="view.select.Select" submitOnChange="true">
        <binding variable="selectedOption"/>
        <collectionSource variable="options"/>
    </select>

Note that similarly to using a submit button and then reloading the current view by navigating to it from itself, a view's init function will not be executed when reloading a view as a result of an "on change" event. Init functions are only executed when navigating to a view from a different view or as a result of a menu navigation. Collection sources for any view widgets are, however, re-evaluated.

  


  


  


## Additional Mentions and References

  * Devoted section in the Helium Tutorial [Lesson 5: Model Objects, Enums](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Lesson+5%3A+Model+Objects%2C+Enums#Lesson5:ModelObjects,Enums-MakingUseOfaSelectBox)
  * Mentioned in section in the Helium Tutorial [Lesson 6: Relationships ](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Lesson+6%3A+Relationships#Lesson6:Relationships-OnetoOneRelationships)
  * [Helium DSL and View Quick Reference](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)



  


  

