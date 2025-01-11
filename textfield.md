  


## Description

The text field widget is a basic labeled input widget with a small area for text representing an **`int`** , **`decimal`** or **`string`** basic data type.

Is allows for [binding](/wiki/spaces/HTUT/pages/5739434/binding) of values to basic variables or attributes of objects instances in a unit.

It also allows for binding to a variable, object instance attribute or function in order to determine if the widget is [hidden or not](/wiki/spaces/HTUT/pages/5739808/visible).

The title is specified as a key to a lang file entry and is required.

A new addition in version 1.57.0 (specific to the new UI) is the `description` attribute. The description attribute works similarly to the title in that it is specified as a key to a lang file entry, however, its purpose is to allow for additional information related to an input and will appear beneath the input.

In addition, the text field widget provides a `datatype` attribute that can be used to slightly alter the behaviour of the text field widget. Possible values and their related behaviour is as follows:

`datatype="number"`| Allows only numbers to be entered. Provides scroller buttons that increment and decrement the current value.  
---|---  
`datatype="password"`| Displays a * character instead of the characters entered by the user in order to hide a password.  
`datatype="text"`| Default behaviour assuming the widget is bound to a basic data type that is not of type **`int.`**  
`datatype="tel"`  
| Provides additional validation for phone numbers.  
`datatype="email"`  
| Provides additional validation for email addresses.  
`datatype="url"`  
| Provides additional validation for URLs.  
  
Note that when the text field is bound to a variable of type **`int`** it will behave as though `datatype="number"` has been specified even though it hasn't.

The title is specified as a key to a lang file entry and is required. A tooltip can also be specified as a key to a lang file entry but is optional. [Visibility bindings](https://wiki.mezzanineware.com/pages/viewpage.action?pageId=17728559) are also supported.

  


## Example

### Implied number datatype

The abbreviated code snippets and screenshot below shows the use of `<textfield/>` with a value binding to an object instance attribute and a visibility binding to a unit function. It uses the default datatype behaviour.

**View XML**
    
    
     <textfield label="textfield.quantity_to_purchase">
    	<visible function="showPurchaseForm"/>
        <binding variable="farmerPurchase">
    		<attribute name="purchaseQuantity"/>
    	</binding>
    </textfield>

**Backing unit**
    
    
    FarmerPurchase farmerPurchase;
    bool makingPurchase;
    bool stockItemSelected;
    
    void init() {
        farmerPurchase = FarmerPurchase:new();
        makingPurchase = true;
        stockItemSelected = false;
    }
    .
    .
    .
    bool showPurchaseForm() {
        if(makingPurchase == true && stockItemSelected == true) {
            return true;
        }
        return false;
    }

**en.lang file entry**
    
    
     textfield.quantity_to_purchase = Quantity to purchase:

<textfield> bound to int type or using datatype="number"

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5736890/Screenshot%202017-03-07%2014.41.24.png?version=1&modificationDate=1488897723702&cacheVersion=1&api=v2)

### Password datatype

**View XML**
    
    
    <textfield label="textfield.password" datatype="password">
        <binding variable="userPassword"/>
    </textfield>

<textfield> using datatype="password"

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5736890/Screenshot%202017-03-08%2014.10.58.png?version=1&modificationDate=1488982332596&cacheVersion=1&api=v2)

### Implied text datatype

**Model object attribute**
    
    
    persistent object SystemAdmin {
        
        @requiredFieldValidator("validator.required_field")
        string firstName;
        .
        .
    }

**View XML**
    
    
    <textfield label="textfield.first_name">
        <binding variable="systemAdmin">
            <attribute name="firstName"/>
        </binding>
    </textfield>

<textfield> not bound to an int type and using the default behaviour

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5736890/Screenshot%202017-03-08%2014.11.54.png?version=1&modificationDate=1488982351381&cacheVersion=1&api=v2)

  


  


  


## Additional Mentions and References

  * Devoted section to the text field widget in the Helium Tutorial [Lesson 3: User Input, Persistence, Validation, and Tables (continued)](https://wiki.mezzanineware.com/pages/viewpage.action?pageId=17137802#Lesson3:UserInput,Persistence,Validation,andTables\(continued\)-AddingSomeTextFieldsforUserInput)
  * Devoted sub section to the datatype attribute in the Helium Tutorial [Lesson 3: User Input, Persistence, Validation, and Tables (continued)](https://wiki.mezzanineware.com/pages/viewpage.action?pageId=17137802#Lesson3:UserInput,Persistence,Validation,andTables\(continued\)-DateTypeHints)
  * [Helium DSL and View Quick Reference](https://wiki.mezzanineware.com/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)



  

