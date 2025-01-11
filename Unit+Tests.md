  


## Setting Up

The DSL unit tests allow for testing persistence and the creation/deletion/updating/querying of objects as well as testing DSL logic implementation. This means that local environments have to be set up correctly first with an instance of PostgreSQL to allow the dev client to connect to the test database and perform tests. It will create a schema using the project name and a random digit in this test database, exactly as it would for any application, and then drop the schema once all tests have completed.

  1. Download and install the latest version of PostgreSQL 11.x on your local machine (you can download and install it from [here](https://www.postgresql.org/download/) or [Homebrew](https://formulae.brew.sh/formula/postgresql@11)).
  2. Follow [this](https://mezzaninewiki.atlassian.net/wiki/display/HP/PostgreSQL+Setup) guide to ensure your database is set up correctly.
  3. Add this line to your **`.bash_profile`** or **`.zshrc`** file (whichever you are using):
    
        #Postgres setup
    export PATH="/usr/local/opt/postgresql@11/bin:$PATH"

  4. Start your PostgreSQL environment using the following command (other useful commands are listed to the right):
    
        pg_ctl -D /usr/local/var/postgresql@11 start

  5. Connect to your PostgreSQL instance using the `postgres` user:
    
        psql -U postgres

  6. Finally you can create the test schema. Note that this setup must be followed exactly to ensure the dev client can connect to this schema with the correct user and password:
    
        create role "mezzanine-test" with login password '123456';
    create database "mezzanine-test" owner "mezzanine-test";
    alter user "mezzanine-test" with superuser;
    alter user "postgres" with superuser; (if not already a superuser)




**pgsql command line commands**
    
    
    #Checks status of PostgreSQL env
    pg_ctl -D /usr/local/var/postgresql@11 status
    
    #Starts PostgreSQL
    pg_ctl -D /usr/local/var/postgresql@11 start
    
    #Stops PostgreSQL
    pg_ctl -D /usr/local/var/postgresql@11 stop

## @Test Annotation

Helium DSL has an annotation used to designate certain functions as unit test functions. These functions can then be tested through the dev client ([1.31 Release Notes](/wiki/spaces/HTUT/pages/5742303/1.31+Release+Notes) and upwards) and return any messages that indicate whether a test has failed. These **`@Test`** functions can be placed anywhere in the logic layers of a DSL application, ie where any functions can be placed.

**@Test annotation**
    
    
    @Test
    void someUnitTest() {
        ...
    	tests (discussed later)
    	...
    }
    
    @Test
    string someUnitTestWithReturn() {
        ...
    	tests (discussed later)
    	...
    	return "nothing";
    }

These test functions can be of any return type, however, whatever value is finally returned is disregarded by the dev client and not used in any way. That being said it is possible to 'chain' test functions that return values or variables from one to the next in order to create more complex unit test, although it is not advised to do so.

Also note that functions annotated as **`@Test`** functions cannot be called from non-test functions, only other test functions can be called in this way:
    
    
    @Test
    void firstTest() {
        ...
    	string returnedFromTest = secondTest();
    	tests
    	...
    }
    
    @Test
    string secondTest() {
        ...
    	tests
    	...
    	return "nothing";
    }

  


## Assert Built-In Functions

There are several **`Assert`** built-in functions that can be used in these test functions to evaluate given values and return a message when the **`Assert`** test has been failed. Multiple **`Assert`** statements can be included in a single test function, although only the first failed **`Assert`** will be returned without starting any of the subsequent **`Assert`** tests in the function. This means that each test function will only return the first failed test encountered.

Each of these **`Assert`** functions takes a message string as their last parameter which will be printed in the dev client if the test has been failed. Also note that all of the following **`Assert`** examples will fail in order to demonstrate how the BIF evaluates.
    
    
    @Test
    void someUnitTest() {
        string value1 = "John Doe";
        string value2 = "Jane Smith";
    
    	//Assert:isEqual takes two values (objects or primitive types) and evaluates whether they are equal
        Assert:isEqual(value1, value2, "value1 and value2 are not equal");
        Assert:isEqual(1, 0, "1 and 0 are not equal");
    
    	//Assert:isNotEqual takes two values (objects or primitive types) and evaluates whether they are not equal
        Assert:isNotEqual(value1, value1, "value1 and value1 are equal");
        Assert:isNotEqual(1, 1, "1 and 1 are equal");
    
    	//Assert:isTrue takes one boolean value (variable/primitive/function that returns bool) and evaluates whether it is true
        Assert:isTrue(false, "false is not true");
        Assert:isTrue(someFunction(), "someFunction() does not return true");
    
    	//Assert:isFalse takes one boolean value (variable/primitive/function that returns bool) and evaluates whether it is true
        Assert:isFalse(true, "true is not false");
        Assert:isFalse(someFunction(), "someFunction() does not return false");
    
    	//Assert:isBoth takes two boolean value (variable/primitive/function that returns bool) and evaluates whether both are true
        Assert:isBoth(true, false, "both true and false are not true");
        Assert:isBoth(someFunction(), anotherFunction(), "someFunction() and anotherFunction() do not both return true");
    
    	//Assert:isEither takes two boolean value (variable/primitive/function that returns bool) and evaluates whether one is true
        Assert:isEither(false, false, "neither false nor false is true");
        Assert:isEither(someFunction(), anotherFunction(), "neither someFunction() nor anotherFunction() returns true");
    
    	//Assert:isNull takes one value (variable/primitive/function) and evaluates whether it is null or returns null
        Assert:isNull(1, "1 is not null");
        Assert:isNull(someFunction(), "someFunction() does not return null");
    
    	//Assert:isNotNull takes one value (variable/primitive/function) and evaluates whether it is not null or returns non-null
        Assert:isNotNull(null, "null is null");
        Assert:isNotNull(someFunction(), "someFunction() returns null");
    
    	//Assert:isGreater takes two values and evaluates whether the second is greater than the first
    	Assert:isGreater(2, 1, "1 is not greater than 2");
    	Assert:isGreater(value1, value2, "value2 is not greater than value1");
    
    	//Assert:isGreaterOrEqual takes two values and evaluates whether the second is greater than or equal to the first
    	Assert:isGreaterOrEqual(2, 1, "1 is not greater than or equal to 2");
    	Assert:isGreaterOrEqual(value1, value2, "value2 is not greater than or equal to value1");
    
    	//Assert:isLess takes two values and evaluates whether the second is less than the first
    	Assert:isLess(1, 2, "2 is not less than 1");
    	Assert:isLess(value1, value2, "value2 is not less than value1");
    
    	//Assert:isLessOrEqual takes two values and evaluates whether the second is less than or equal to the first
    	Assert:isLessOrEqual(1, 2, "2 is not less than or equal to 1");
    	Assert:isLessOrEqual(value1, value2, "value2 is not less than or equal to value1");
    }

Important to note is that the parameters for all of these built-in functions are not validated and can therefore be of most primitive types or custom objects, whether they are literals given to the function, variables declared in the function or unit, or returned from another function. Care should therefore be taken to ensure that the values used in these functions are of the same type when compared, or of a sensible type for what the function will evaluate.

  


## Testing in the Dev Client

A new command has been created in the dev client which can be used to only evaluate the **`@Test`** annotated functions in the application. It uses the project variables as set for the **`build`** /**`run`** /**`release`** commands.
    
    
    he-dev> test
    Loading source files...
    |------------------------------------------------------------------------------|
    | Helium Tutorial's tests produced the following messages:                     |
    |------------------------------------------------------------------------------|
    | #     | Message                                                              |
    |------------------------------------------------------------------------------|
    | 1     | [SomeUnit:137] false is not true				                       |
    |------------------------------------------------------------------------------|
    Tests run
    The last command completed in 1.73 seconds
    he-dev> test
    Loading source files...
    Tests run
    The last command completed in 0.46 seconds

The test messages also support the verbose flag as described [here](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Using+the+HeliumDev+Client+and+Deploying+Apps#UsingtheHeliumDevClientandDeployingApps-VerboseMode):
    
    
    he-dev> test
    Helium Tutorial's tests produced the following messages:
    [ShopMgmt:137] false is not true
    The last command completed in 0.40 seconds

Note that as part of the [Helium 1.43](/wiki/spaces/HTUT/pages/5746190/Helium+Releases) release the verbose flag will also allow displaying of all tests that have passed:
    
    
    Running tests for GymLog...
    0 test(s) failed
    3 test(s) passed
    |----------------------------------------------------|
    | The following test(s) passed                       |
    |----------------------------------------------------|
    | #     | Message                                    |
    |----------------------------------------------------|
    | 1     | TestingUnit:testTheOtherThing              |
    | 2     | TestingUnit:testTheOneThing                |
    | 3     | TestingUnit:testOneMoreThing               |
    |----------------------------------------------------|
    The last command completed in 0.61 seconds

There is also a **`runTests`** global variable that can be used to enable testing when using any of the **`build`** /**`run`** /**`release`** commands. More information on this can be found [here](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Using+the+HeliumDev+Client+and+Deploying+Apps#UsingtheHeliumDevClientandDeployingApps-TestMode).

Lastly, an argument has been added for the noUi dev client to enable testing when using the **`build`** command. More information on this can be found [here](https://mezzaninewiki.atlassian.net/wiki/pages/viewpage.action?pageId=5738824#Usingthe%22NoUI%22DevClient-BuildCommand).

  


  

