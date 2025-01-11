  


  


## Annotating Object Attributes with Validators 

Model-level "validators" are for automatic validation when there are attempts to save values to the object's fields. Annotations that start with **`@`** followed by an ID (validator name), and that are used on object attributes are validator annotations. See "Creating Complex Validators" below on how to define the validators. The ID value must match the name of a defined validator.

It is important to note that the validators will execute in the following situations:

  * Frontend validation:
    * When an object attribute is set on the frontend and then submitted back to the presenter.
    * If this case a message will be displayed to the user of the frontend and submission of the values will be blocked until a valid value is specified.
  * Backend validation:
    * Introduced in [Helium Rapid 1.62.x](/wiki/spaces/HTUT/pages/338558980/1.62.0+Release+Notes): Whenever an object is saved, all validators on its attributes will be used to check the validity of the specified even if those attributes were not submitted from the frontend.
    * Introduced in [Helium Rapid 1.62.x](/wiki/spaces/HTUT/pages/338558980/1.62.0+Release+Notes): If an object has already been saved and is, as a result, being "tracked" by the ORM, any time an attribute is set, validators will be used to check the validity of the field.



In the last two cases a validation exception will be throw from the DSL code and a log entry will be created. This exception can be caught by the DSL [try / catch statemen](/wiki/spaces/HTUT/pages/5735597/Exception+Handling)t. This allows it to be handled more elegantly with, for example, a message to the user as to why validation has failed.

  

    
    
    object Person
    {
        @FirstnameValidator("validr.msg.fname")
        string fname;
     
        @SurnameValidator("validr.msg.sname")
        string sname;
    }

  


  


  


## Creating Complex Validators

In a **`.mez`** file, under **`./model/`** , use the **`validator`** keyword followed by a validator name, followed by a block containing atomic validators:

**Validator Examples**
    
    
    validator FirstnameValidator {
        notnull(); minlen(2); maxlen(250);
    }
    validator AgeValidator {
        minval(0);
    }
     
    validator CTMetroPhoneNumber {
        notnull(); regex("021-[7..9]{7}");
    }

  


  


  


## Available Atomic Validators

These are the building blocks used for creating complex validators:

  


validator/usage| description  
---|---  
`notnull();`| Check that the attribute is not null. This validator does not take any arguments.  
`regex("^[A-Z a-z]*$");`| Checks that the value conforms to a regular expression. Allows upper & lower case and spaces.  
`regex("^[A-Za-z0-9 ]*$");`| Another regex example. Alphanumeric with spaces.  
`regex("^27[0-9]*$");`| Another regex example. Number starting with 27.  
`regex("\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}\b");`| Another regex example. Email.  
`minval(3.145);`| Checks that the value is not less than the supplied minimum value.  
`maxval(6.18);`| Checks that the values is not greater than the supplied maximum value.  
`minlen(2);`| Checks that a string value does not have less characters than the supplied minimum value.  
`maxlen(255);`| Checks that a string value does not have more characters than the supplied maximum value.  
  
  


  


  


## Regex Validation in Presenter Units

Whereas the above validators are entered into the model object for automatic validation upon save attempts, any value in a string variable can be compared to a specified regular expression for manual validation with `bool b = String:egexMatch(s, r).`
    
    
    if (String:regexMatch("27000111abc","^27[0-9]{9,}$") == false) {
        Mez:alertError("alert.invalid.phonenum");
    }

  


  


  


## Removing Validators

Adding validation as described above, adds a constraint on the column in the Postgres database table for the applicable model. This means that the validation error could show up as a postgresql error in the application logs. When removing the validation from the model object however, this constraint is left behind on the column as Helium doesn't compare two source code releases with each other and cannot therefore establish whether a validation has been removed.

This means that a developer will have to remove the validation directly on the database as follows:
    
    
    ALTER TABLE {table_name} DROP CONSTRAINT {constraint_name}

  


## Additional Mentions and References

  * Section [Ensuring Valid Data](https://mezzaninewiki.atlassian.net/wiki/pages/viewpage.action?pageId=5741853#Lesson3:UserInput,Persistence,Validation,andTables\(continued\)-EnsuringValidData) in the tutorial's [Lesson 3](/wiki/spaces/HTUT/pages/5741853/Lesson+03+User+Input+Persistence+Validation+and+Tables+continued)
  * [Atomic Validators](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-AtomicValidators) and [Object Attribute Annotations](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-ObjectAttributeAnnotations) in the Quick Reference
  * String:regexMatch(s, r) in [String Functions](/wiki/spaces/HTUT/pages/5739913/String+Functions)



  


  


  

