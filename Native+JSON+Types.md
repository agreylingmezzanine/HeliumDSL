  


## Description

Helium provides two native JSON types, namely **`json`** and **`jsonarray.`** These types allow developers to represent data in a manner that can, under certain circumstances, be more flexible than only making use of persistent or non-persistent objects. This document details how values for these types can be set and manipulated as well as typical use cases where they might be useful.

  


  


## Creating and Manipulating JSON

### Creating json and jsonarray values from strings

The simplest way to populate a **`json`** or **`jsonarray`** variable is to make use of implicit casting from **`string`** values to the **`json`** and **`jsonarray`** types. With the multiline string declaration this can be achieved as follows:
    
    
    json jsonPerson = /%
    	{
    		"name": "Jack",
    		"surname": "Marques",
    		"phoneNumber": "555-6162"
    	}
    %/;
    
    
    jsonarray jsonPeople = /%
    	[
    		{
                "name": "Jack",
                "surname": "Marques",
                "phoneNumber": "555-6162"
            },
            {
                "name": "Bevin",
                "surname": "Sharp",
                "phoneNumber": "555-0123"
            }
        ]
    %/;

Note, that no compile time validation is done to validate that the values being converted represents correctly formatted JSON. This means that if any such conversion issues were to arise, it will only be at runtime. Any conversion errors will result in an error message being logged to the [Helium Logging Service](/wiki/spaces/HTUT/pages/5741051/Helium+Logging+Service):
    
    
    < {"id":"ca7963c5-4d5d-44e9-ba65-dcbb68127b9f","key":"Runtime Error","value":"[PersonResourceV2:23] {\n            \"name\": \"Jack\",\n            \"surname\": \"Marques\",\n            \"phoneNumber\": \"555-6162\n        } could not be converted to a com.mezzanine.program.web.core.type.JsonType@577db227 value","millis":1536562229362,"appId":"a7c76024-b379-49e4-a3c0-bd2ef30d28ab","appUserId":null}

In addition to the above conversion error, the result of the conversion will be **`null`**. This might lead to unexpected null pointer exceptions if not handled appropriately in DSL apps.

  


Although casting from **`string`** values to **`json`** and **`jsonarray`** might be quick and useful in some specific cases, its uses might be limited and, if the values are constructed "by hand", there is a high probability of undesirable runtime errors. 

A better approach for constructing JSON values in a DSL app, is to use the supplied **`json`** manipulation built-in functions namely `jsonPut` and `jsonGet`.

  


### Manipulating json values using jsonPut and jsonGet

In order to use `jsonPut` and `jsonGet` a **`json`** variable needs to be declared and instantiated. If the variable is not instantiated, any subsequent operations might lead to null pointer exceptions. For instantiation, the implicit casting between **`string`** and **`json`** can again be utilised:
    
    
    json jsonPersonObject = "{}";

`jsonPut` can be used to add fields and values to a **`json`** variable:
    
    
    jsonPersonObject.jsonPut("name", "John");
    jsonPersonObject.jsonPut("surname", "Smith");
    jsonPersonObject.jsonPut("luckyNumber", 13);
    jsonPersonObject.jsonPut("dob", Date:fromString("1936-05-02"));
    jsonPersonObject.jsonPut("age", (Date:daysBetween(Date:fromString("1936-05-02"), Mez:now()))/365);
    jsonPersonObject.jsonPut("gender", GENDER.Male);
    jsonPersonObject.jsonPut("height", 1.83);
    jsonPersonObject.jsonPut("militaryService", true);

The arguments required for `jsonPut` is firstly the name of the **`json`** field, followed by the value for that field.

**`json`** values can also be nested:
    
    
    // JSON representing contact details
    json jsonContactDetails = "{}";
    jsonContactDetails.jsonPut("phoneNumber", "555-6162");
    jsonContactDetails.jsonPut("emailAddress", "john.smith@gmail.com");
     
    // Adding contact details JSON to a JSON person
    jsonPersonObject.jsonPut("contactDetails", jsonContactDetails);

Similarly, `jsonGet` can be used to retrieve values:
    
    
    string name = jsonPersonObject.jsonGet("name");
    string surname = jsonPersonObject.jsonGet("surname");
    string phoneNumber = jsonPersonObject.jsonGet("phoneNumber");
    int luckyNumber = jsonPersonObject.jsonGet("luckyNumber");
    date dob = jsonPersonObject.jsonGet("dob");
    int age = jsonPersonObject.jsonGet("age");
    GENDER gender = jsonPersonObject.jsonGet("gender");
    decimal height = jsonPersonObject.jsonGet("height");
    bool milService = jsonPersonObject.jsonGet("militaryService");
    json contactDetails = jsonPersonObject.jsonGet("contactDetails");

In the code segment above, note the implicit casting for the values being retrieved.

To reference a value that is nested more that one level deep, for example a person's contact detail phone number from the example above, one needs to make use of multiple `jsonGet` statements and intermediate variables. Chaining references to `jsonGet` is not valid syntax in the Helium DSL.
    
    
    // First we get the contact details json object and assign it to an intermediate variable
    json contactDetails = jsonPersonObject.jsonGet("contactDetails");
     
    // Now we can get specific field values for the contact details
    string phoneNum = contactDetails.jsonGet("phoneNumber");
    string emailAddr = contactDetails.jsonGet("emailAddress");

### Manipulating jsonarray values

In the above example we added a single contact detail object to a person where each field represents a channel of communication. Consider an example where we want to add multiple contact details for a person. For example, a collection of emergency contacts.

At present, no built-in functions are provided to help with the construction of **`jsonarray`** variables. Implicit casting between any primitive array and **`jsonarray`** and between arrays of **`json`** and **`jsonarray`** is, however, provided:
    
    
    // Create parent as emergency contact
    json parentEmergencyContact = "{}";
    parentEmergencyContact.jsonPut("description", "parent");
    parentEmergencyContact.jsonPut("mobileNumber", "27763300000");
     
    // Create spouse as emergency contact
    json spouseEmergencyContact = "{}";
    spouseEmergencyContact.jsonPut("description", "spouse");
    spouseEmergencyContact.jsonPut("mobileNumber", "27763300001");
     
    // Create a json[] of the above
    json[] emergencyContacts;
    emergencyContacts.append(parentEmergencyContact);
    emergencyContacts.append(spouseEmergencyContact);
     
    // Cast it to jsonarray so we can add it to the json object
    jsonarray emergencyContactsArray = emergencyContacts;
     
    // Add it to the person object
    jsonPersonObject.jsonPut("emergencyContacts", emergencyContactsArray);

To retrieve the individual values one can make use of `jsonGet` and implicit casting to `**json**[]`:
    
    
    // Retrieve the emergency contacts
    jsonarray retrievedEmergencyContacts = jsonPersonObject.jsonGet("emergencyContacts");
     
    // Cast back to json[]
    json[] convertedEmergencyContacts = retrievedEmergencyContacts;
     
    // Iterate over or reference as normal DSL collection
    foreach(json currentEmergencyContact: convertedEmergencyContacts) {
    	.
    	.
    	.
    }
     
    json firstEmergencyContact = convertedEmergencyContacts.get(0);

Note that casting from **`jsonarray`** to `**json**[]` is a relatively expensive operation and if possible, it should be avoided for large arrays.

The example below describes the same concepts as discussed above.
    
    
    json pet1 = /%
    	{
    		"name": "Jasmine",
    		"type": "Dog"
    	}
    %/;
        
    json pet2 = /%
    	{
    		"name": "Markus",
    		"type": "Mole-rat"
    	}
    %/;
     
    json[] petsArray;
    petsArray.append(pet1);
    petsArray.append(pet2);
     
    // json[] converted to jsonarray
    jsonarray petsJsonArray = petsArray;
     
    // jsonarray converted json[]
    json[] convertedPetsArray = petsJsonArray;

In the above examples the implicit casting between `**json**[]` and **`jsonarray`** is shown. Casting to primitive arrays is also supported:
    
    
    int[] numbersPrimitiveArray;
    numbersPrimitiveArray.append(1);
    numbersPrimitiveArray.append(2);
    numbersPrimitiveArray.append(3);
     
    // int[] converted to jsonarray
    jsonarray numbersJsonArray = numbersPrimitiveArray;
     
    // jsonarray converted back to int[]
    int[] numbersPrimitiveArray2 = numbersJsonArray;
    
    
    // string representing a number array in json format converted to jsonarray
    jsonarray primeNumbersJsonArray = /%[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]%/;
     
    // jsonarray converted to int[]
    int[] primeNumbersPrimitiveArray = primeNumbersJsonArray;

  


  


### Reading json values from the app schema

At present, only **`json`** is supported as valid object attribute type. Values for **`json`** types are represented in the app schema by the PostgresSQL **jsonb** type and can be retrieved in any way that other attribute values can.

  


  


  


  


No compile time validation is done when converting **`string`** values to **`json`** or **`jsonarray`**. This means that if any incorrectly formatted JSON is used, it will result in a runtime error. These errors will be logged and can be inspected using the [Helium Logging Service](/wiki/spaces/HTUT/pages/5741051/Helium+Logging+Service).

  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


Helium does not support chaining of the `jsonGet` built-in function. To get values for a **`json`** field that is more than one level deep in a top level **`json`** object, multiple `jsonGet` statements and intermediate variables need to be used.

  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


## JSON Values as Object Attributes

Lets consider a different example where a `Person` object is created to represent most of the attributes of a person while including a single **`json`** attribute to represent the contact details of a person:
    
    
    @NotTracked
    persistent object Person {
        string name;
        string surname;
        date dob;
        json contactDetails;
    }

Currently integration between Helium and Journey does not support JSON types. Note the inclusion of the NotTracked annotation above to avoid any possible syncing for this object. This is compulsory for any persistent object that contains a **`json`** attribute. If the NotTracked annotation is not included for persistent objects containing **`json`** attributes, a compiler error will generated:
    
    
    Loading source files...
    Compiling the application...
    |--------------------------------------------------------------------------------------------------------------------------------------------|
    | The module "Web" generated the following errors                                                                                            |
    |--------------------------------------------------------------------------------------------------------------------------------------------|
    | #     | Message                                                                                                                            |
    |--------------------------------------------------------------------------------------------------------------------------------------------|
    | 1     | [Person:2] The custom object Person is persistent, thus needs to be marked with @NotTracked if json attribute types are declared.  |
    |--------------------------------------------------------------------------------------------------------------------------------------------|

Inspecting the database table created by Helium for the Person object, reveals the contactdetails column represented by the jsonb type in PostgreSQL:
    
    
    helium-app-1=# \d person
                                      Table "snapshot_1535373223392_001.person"
         Column     |            Type             |                          Modifiers                           
    ----------------+-----------------------------+--------------------------------------------------------------
     _id_           | uuid                        | not null
     _tstamp_       | timestamp without time zone | not null
     person         | text                        | 
     _tx_id_        | bigint                      | not null default txid_current()
     _change_type_  | __he_obj_change_type__      | not null default 'create'::__he_obj_change_type__
     _change_seq_   | bigint                      | not null default nextval('__he_sync_change_seq__'::regclass)
     name           | text                        | 
     surname        | text                        | 
     dob            | date                        | 
     contactdetails | jsonb                       | 
    Indexes:
        "person_pkey" PRIMARY KEY, btree (_id_)
        "__idx_he_sync_person_txid__" btree (_tx_id_)

Any method of populating attributes in general is also applicable to JSON attributes. This includes the use of database functions.

  


  


  


  


  


  


  


  


  


  


Helium Journey integration does not currently support objects with **`json`** attributes. For this reason, any persistent object with **`json`** attributes needs to be annotated with NotTracked. Failure to do so will result in a compiler error.

## Using Native JSON with an Inbound API

The native JSON types **`json`** and **`jsonarray,`** as discussed in this document, are supported as valid return types for any inbound API function. They are also supported as valid parameters for put and post API functions. More details regarding the inbound API annotations and supported parameter and return types for API functions can be found [here](/wiki/spaces/HTUT/pages/5740441/Inbound+API).

  


  


  


  

