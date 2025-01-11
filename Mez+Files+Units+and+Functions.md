## Units and Functions

Units are groupings of functions and variables appearing in **`.mez`** files. They can be thought of as modules or namespaces. A Helium app must have at least one unit. The **`unit`** keyword must be followed by a unique unit name. A unit must have at least one function.

**Unit Example**
    
    
    unit MyUnit;
    // Other code follows
     
    string myVar;
     
    int factorial(int x) {
        if(x == 0 || x == 1) {
            return 1;
        } else if (x > 1) {
            return factorial(x - 1);
        }
     
        return 0;
    }

Objects, enums and validators are global, so they can optionally be in a separate source code file without a unit.

## Mez File Comments

Two types of comments are supported: single line comments and multi-line comments:

**Single Line Comments Example**
    
    
    // date tstamp = System.now();
    // decimal rand = System.random();

**Multi-line Comments Example**
    
    
    /* date tstamp = System.now();
    decimal rand = System.random(); */

## Variable and Function Scope

Suppose a unit `MyUnit` has a unit variable named `myVar` and a function named `factorial`. Both have global scope and can be accessed by any function in this or other units, e.g. from `TestUnit` in the example below. The only time a variable or custom object in the Helium DSL is not globally scoped is when it is declared inside a function and thus scoped to the function alone. To refer to a unit’s member functions or variables from another unit, you have to use the scope operator (the colon).
    
    
    unit TestUnit;
    void test() {
        MyUnit:myVar = "New string value!";
        int f = MyUnit:factorial(5);
    }

Note: Unit variables cannot be in line initialized when they are declared. The following code will not compile:
    
    
    unit MyUnit;
    
    string myVar = "some value"; // this is not a legal statement

  


## Additional Mentions and References

  * Sections [Adding a Presenter](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Lesson+1%3A+A+Basic+Helium+App#Lesson1:ABasicHeliumApp-AddingaPresenter) and [Referencing Unit Variables and Functions](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Lesson+1%3A+A+Basic+Helium+App#Lesson1:ABasicHeliumApp-ReferencingUnitVariablesandFunctions) in [Lesson 1](/wiki/spaces/HTUT/pages/5745786/Lesson+01+A+Basic+Helium+App) of the Tutorial.


