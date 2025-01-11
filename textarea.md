  


## Description

The text area widget is similar to the [text field](/wiki/spaces/HTUT/pages/5736890/textfield) widget with two important differences:

  * Although it still supports binding to basic variables or object instance attributes, only **`string`** basic types are supported. As a result text areas do not allow for additional hints, formatting and validation using a datatype XML attribute.
  * The physical widget area is larger, it is scrollable and also allows for users to resize it by dragging the bottom right corner.



The title is specified as a key to a lang file entry and is required. A tooltip can also be specified as a key to a lang file entry but is optional. [Visibility bindings](https://wiki.mezzanineware.com/pages/viewpage.action?pageId=17728559) are also supported.

A new addition in version 1.57.0 (specific to the new UI) is the `description` attribute. The description attribute works similarly to the title in that it is specified as a key to a lang file entry, however, its purpose is to allow for additional information related to an input and will appear beneath the input.

  


## Example

The abbreviated code snippets and screenshot below shows the use of `<textarea/>` with a value binding to an object instance attribute.

**View XML**
    
    
    <textarea label="textarea.farm_address">
        <binding variable="farmer">
            <attribute name="farmAddress"/>
        </binding>
    </textarea>

**Backing unit**
    
    
    Farmer farmer;
     
    void init() {
    	farmer = Farmer:new();
    }
    .
    .
    .
    
    
    textarea.farm_address = Farm address:

<textarea> example screenshot

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735348/Screenshot%202017-02-15%2014.28.53_2.png?version=1&modificationDate=1488900935397&cacheVersion=1&api=v2)

  


scrolling <textarea> screenshot

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735348/Screenshot%202017-03-07%2015.39.14.png?version=1&modificationDate=1488901212758&cacheVersion=1&api=v2)

resized <textarea> screenshot

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5735348/Screenshot%202017-03-08%2013.04.02.png?version=1&modificationDate=1488978684266&cacheVersion=1&api=v2)

  


  


  


## Additional Mentions and References

  * Mentioned in the Helium Tutorial [Lesson 07: Dynamic Tables](/wiki/spaces/HTUT/pages/5743716/Lesson+07+Dynamic+Tables)
  * [Helium DSL and View Quick Reference](https://wiki.mezzanineware.com/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)



  


  

