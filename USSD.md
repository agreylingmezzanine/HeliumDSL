  


## Introduction

Helium and the Helium DSL provides built-in functionality for USSD integration. The DSL provides an interface for these integrations through a USSD function annotation, and `MezUssdMenu` and `MezUssdMenuOption` built-in objects.

Functions that are annotated with **`@USSD`** serve as integration endpoints that are available to be executed for inbound requests from USSD gateways. These functions then return an instance of `MezUssdMenu` that describes the next menu structure that is to be presented to the end user during his USSD session.

  


  


  


## Overview

The basis of integrating with a USSD gateway is through calls from the USSD gateway to Helium.

When a user initiates a USSD session on the mobile device an API call is made to Helium's API. The calls are then routed to a specific **`@USSD`** annotated DSL function within an app. The app then responds with the menu structure that is to be presented to the end user and Helium translates this response as is required by the specific gateway.

  


  


  


## @USSD

One of the following signatures is expected for USSD annotated functions:
    
    
    @USSD("description")
    MezUssdMenu processUssd(int menu, int selection) {
    	...
    }
    
    
    @USSD("description")
    MezUssdMenu processUssd(int menu, int selection, json gatewayArgs) {
    	...
    }

The "description" values in the example above and below represents a unique string literal identifier for the specific USSD function. More than one USSD method can be included as long as the descriptions are unique. Further more the descriptions are used as path parameter values in Helium's internal API and can thus be used to route inbound calls to the correct DSL USSD functions.

The method parameters above represents the following:

**menu** : An integer that indicates the menu from which the USSD request originated. For an initial call a value of 0 is sent.

**selection** : An integer that indicates the menu option that was selected for the current request. For an initial call a value of 0 is sent.

**gatewayArgs** : A json parameter that is populated with all additional query parameters sent by the gateway to Helium. At present the only gateway that is supported is Vodacom USSD gateway. Note that this parameter is optional. The following shows an example of a value sent for this parameter using the Vodacom USSD gateway:
    
    
     

The json attributes listed in the above example represent the following and can be used in the DSL logic for more context or can be ignored.

Attribute| Description  
---|---  
**msisdn**|  The msisdn / mobile number that initiated the USSD session and request.  
**request**|  A field that describes the request made by the mobile end user:

  * For requests where free text answers are provided, this field will contain the provided free text value.
  * For requests where an options was selected, this field will contain the position of the selected option.
  * For requests that are initiating requests, this field will contain the requested USSD code. For example *120*247253#.

  
**provider**|  Name of the USSD provider. At present this will always be "Vodacom" until support for additional gateways are included.  
**ussdSessionId**|  An integer value sent by the gateway that identifies the current USSD session. Note that at present Helium does not do any internal tracking or management of USSD sessions.  
  
  


  


  


## MezUssdMenu and MezUssdMenuOption

The DSL provides the `MezUssdMenu` and `MezUssdMenuOption` built-in objects that are used to structure return values for any USSD annotated functions. The details of these objects are as follows:
    
    
    object MezUssdMenu {
    
        // Integer representing the id of this menu
        // This id is sent back to the DSL as the 'menu' argument for calls originating from this menu
        // Helium does not do any validation or uniqueness of this value
        int menuId;
    
        // The header text / question for this menu
        string headerText;
    
        // Flag indicating whether this menu is to be used for a free text question
        // By default (for both null and 'false' values) it is assumed that the menu is not a free text menu
        bool isFreeText;
    }
    
    
    object MezUssdMenuOption {
    
        // The text for this menu option
        string text;
    
        // The order for this menu option
        // This value is sent back to the DSL as the 'selection' argument for calls that 
        // originated from user requests that selected this option
        int order;
    
        // The menu options that are available for this menu
        // Menus that require free text input will not have any menu options
        @ManyToOne
        MezUssdMenu menu via menuOptions;
    }

  


  


  


## Multiple Option Example

For this example a workflow that uses multiple choice USSD menus is demonstrated.

### Screenshots

The following screenshots demonstrate the USSD menu structure that is implemented in this example:

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5740523/mc-2.png?version=1&modificationDate=1620810860923&cacheVersion=1&api=v2&width=400&height=210)

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5740523/mc-3.png?version=1&modificationDate=1620810860679&cacheVersion=1&api=v2&width=400&height=259)

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5740523/mc-1.png?version=1&modificationDate=1620810860415&cacheVersion=1&api=v2&width=400&height=159)

### Source Code

The following source code shows the implementation in the DSL:

**Mode additions** Expand source
    
    
    @NotTracked
    persistent object UssdRequest {
        datetime createdOn;
        int menu;
        int selection;
        string workflow;
        json params;
    }

  


**@USSD Usage** Expand source
    
    
    @USSD("options")
    MezUssdMenu processUssd(int menu, int selection, json params) {
    
        // Keep a record of this request
        recordUssdRequest(menu, selection, params, "options");
    
        // Request originates from menu 0, this is the initiating request
        if(menu == 0) {
            return constructMenuOne();
        }
        
        // Request originates from menu 1
        if(menu == 1 && selection == 1) {
        	return constructMenuTwo();
        }
        
        // Requests originate from menu 2
        if(menu == 2 && selection == 1) {
        	return constructMenuThree();
        }
    
        if(menu == 2 && selection == 2) {
        	return constructMenuOne();
        }
    
        // We don't expect to ever encounter this but if we do it will show as an error on the device
        return null;
    }
    
    // Keep track of request simply for introspection
    void recordUssdRequest(int menu, int selection, json params, string workflow) {
        UssdRequest request = UssdRequest:new();
        request.createdOn = Mez:now();
        request.menu = menu;
        request.selection = selection;
        request.params = params;
        request.workflow = workflow;
        request.save();
    }
    
    // Construct menu 1 for multiple option USSD workflow
    MezUssdMenu constructMenuOne() {
        MezUssdMenu menu = MezUssdMenu:new();
        menu.headerText = "Can you answer the question?";
        menu.menuId = 1;
    
        MezUssdMenuOption option1 = MezUssdMenuOption:new();
        option1.text = "Yes I can";
        option1.order = 1;
    
        menu.menuOptions.append(option1);
        return menu;
    }
    
    // Construct menu 2 for multiple option USSD workflow
    MezUssdMenu constructMenuTwo() {
        MezUssdMenu menu = MezUssdMenu:new();
        menu.headerText = "Can you answer the second question?";
        menu.menuId = 2;
    
        MezUssdMenuOption option1 = MezUssdMenuOption:new();
        option1.text = "Yes I can";
        option1.order = 1;
    
        MezUssdMenuOption option2 = MezUssdMenuOption:new();
        option2.text = "Take me back to the first one!";
        option2.order = 2;
    
        menu.menuOptions.append(option1);
        menu.menuOptions.append(option2);
        return menu;
    }
    
    // Construct menu 3 for multiple option USSD workflow
    MezUssdMenu constructMenuThree() {
        MezUssdMenu menu = MezUssdMenu:new();
        menu.headerText = "Congratulations, you pass the test!";
        menu.menuId = 3;
        return menu;
    }

Note that the logic in this example simply create log of the request, checks the incoming requests' originating selection and menu and then constructs the menu that needs to be sent as a response. 

In a more real world use case any logic can be included here including but not limited to sending of an SMS, further reading or writing to the data base etc.

Is should also be noted though that USSD sessions should be relatively short lived and any operations that take too long will results in the end users' USSD session being terminated due to a timeout. This is controlled by the USSD gateway and, in general, cannot be changed or configured.

### Database Result

The workflow in this example results in `UssdRequest` records being written into the database:
    
    
    -[ RECORD 1 ]---------------------------------------------------------------------------------------------------------
    _id_      | cb1184ff-3505-4d73-94a3-b30348a01de3
    _tstamp_  | 2021-05-11 13:41:56.292499
    createdon | 2021-05-11 11:41:56.287
    menu      | 0
    selection | 0
    workflow  | options
    params    | {"msisdn": "27763303333", "request": "*120*247253#", "provider": "Vodacom", "ussdSessionId": "2499285386"}
    -[ RECORD 2 ]---------------------------------------------------------------------------------------------------------
    _id_      | f5b2b6e4-87cb-47b6-acb8-6fb9f1121ed5
    _tstamp_  | 2021-05-11 13:42:01.479261
    createdon | 2021-05-11 11:42:01.478
    menu      | 1
    selection | 1
    workflow  | options
    params    | {"msisdn": "27763303333", "request": "1", "provider": "Vodacom", "ussdSessionId": "2499285386"}
    -[ RECORD 3 ]---------------------------------------------------------------------------------------------------------
    _id_      | 852e6970-d96c-4b3e-a25a-a614932af46e
    _tstamp_  | 2021-05-11 13:42:07.046493
    createdon | 2021-05-11 11:42:07.045
    menu      | 2
    selection | 1
    workflow  | options
    params    | {"msisdn": "27763303333", "request": "1", "provider": "Vodacom", "ussdSessionId": "2499285386"}

  


  


  


## Free Text Example

For this example a workflow that uses a free text USSD menu is demonstrated.

### Screenshots

The following screenshots demonstrate the USSD menu structure that is implemented in this example:

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5740523/ft-1.png?version=1&modificationDate=1620811046932&cacheVersion=1&api=v2&width=400&height=196)

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5740523/ft-2.png?version=1&modificationDate=1620811047033&cacheVersion=1&api=v2&width=400&height=159)

### Source Code

The following source code shows the implementation in the DSL:

**Mode additions** Expand source
    
    
    @NotTracked
    persistent object UssdRequest {
        datetime createdOn;
        int menu;
        int selection;
        string workflow;
        json params;
    }

**@USSD Usage** Expand source
    
    
    @USSD("freetext")
    MezUssdMenu processFreeTextUssd(int menu, int selection, json params) {
    
        // Keep a record of this request
        recordUssdRequest(menu, selection, params, "freetext");
    
        // Request originates from menu 0, this is the initiating request
        if(menu == 0) {
            return constructFreeText("What is your name?");
        }
    
        // Request originates from menu 1
        if(menu == 1) {
    		Person person = Person:new();
    		person.name = params.jsonGet("request");
    		person.save();
    		return constructFreeTextConfirmation(person.name);
        }
    
        // We don't expect to ever encounter this, if we do it will show as an error on the device
        return null;
    }
    
    // Keep track of request simply for introspection
    void recordUssdRequest(int menu, int selection, json params, string workflow) {
        UssdRequest request = UssdRequest:new();
        request.createdOn = Mez:now();
        request.menu = menu;
        request.selection = selection;
        request.params = params;
        request.workflow = workflow;
        request.save();
    }
    
    // Construct menu 1 for free text USSD workflow
    MezUssdMenu constructFreeText(string question) {
        MezUssdMenu menu = MezUssdMenu:new();
        menu.headerText = question;
        menu.menuId = 1;
        menu.isFreeText = true;
        return menu;
    }
    
    // Construct menu 2 for free text USSD workflow
    MezUssdMenu constructFreeTextConfirmation(string name) {
        MezUssdMenu menu = MezUssdMenu:new();
        menu.headerText = Strings:concat(name, ", you have been saved on the system.");
        menu.menuId = 2;
        menu.isFreeText = false;
        return menu;
    }

### Database Result

The workflow in this example results in a `Person` record and `UssdRequest` record being written into the database:
    
    
    -[ RECORD 1 ]---------------------------------------------------------------------------------------------------------
    _id_      | a787512e-7344-483c-8ea6-ff487889cc7d
    _tstamp_  | 2021-05-11 13:58:05.253324
    createdon | 2021-05-11 11:58:04.844
    menu      | 0
    selection | 0
    workflow  | freetext
    params    | {"msisdn": "27763303624", "request": "*120*247253#", "provider": "Vodacom", "ussdSessionId": "1627057272"}
    -[ RECORD 2 ]---------------------------------------------------------------------------------------------------------
    _id_      | 5e745483-e316-4162-a5bd-13626e208507
    _tstamp_  | 2021-05-11 13:58:16.341301
    createdon | 2021-05-11 11:58:16.337
    menu      | 1
    selection | 1
    workflow  | freetext
    params    | {"msisdn": "27763303624", "request": "Jacques", "provider": "Vodacom", "ussdSessionId": "1627057272"}
    
    
    -[ RECORD 1 ]-+-------------------------------------
    _id_          | 90eb0382-88f2-44ba-ac40-267231a3ba25
    _tstamp_      | 2021-05-11 13:58:16.341301
    name          | Jacques
    _tx_id_       | 767958907
    _change_type_ | create
    _change_seq_  | 36

  


  


  


## Additional Notes and Considerations

  * Note that the internal Helium API, that serves as an endpoint for inbound USSD requests, uses the description of the USSD annotated function in order to determine which function in the app it should be routed to.
  * As mentioned USSD sessions will timeout if they are idle for too long. It is therefore important that USSD functions in the DSL be performant and avoid unnecessary processing. If a USSD session results in an outcome where heavy processing needs to be done, it should be done asynchronously where possible. For example using a scheduled function. 
  * Some configuration will be required on the USSD aggregator's system in order for requests to be correctly sent to Helium. In addition to this, Helium API credentials with roles for **UssdServiceReader** and **UssdServiceWriter** will be required. These configuration requests can be made on Jira and directed to DevOps.



  


  

