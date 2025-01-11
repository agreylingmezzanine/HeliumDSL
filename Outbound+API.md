  


## Introduction

In addition to supporting inbound API functionality, Helium also provides functionality for outbound REST API calls with JSON request and response payloads and basic authentication. This is facilitated by the built-in functions `api:get`, `api:post`, `api:delete` and `api:put`. Additionally, two non persistent built-in objects are provided to be used with the above built-in functions. These objects are `MezApiRequest` and `MezApiResponse`. Finally, Helium provides an encrypted credentials store that allows authentication for outbound calls without the need to store passwords in clear text.

  


  


  


## Credentials Management

The outbound API functionality in Helium provides mechanisms for using basic authentication for outbound calls and also for storing these values in an encrypted credential store within Helium itself.

The core Helium application provides two mechanisms for managing the above mentioned credentials. Firstly it provide an REST API that allows for posting credentials. Secondly it provided a user interface to create, read, updated and delete outbound API credentials.

### Managing credentials using the API

The following shows an example of adding credentials using the above mentioned API:
    
    
    curl -v -u 'usr:pwd' -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST  'https://dev.mezzanineware.com/api/v2/app/outboundApiCredentials' -d '{
      "id":"18db95d2-08cd-421c-bfaa-b9fa9d8750cb",
      "userName":"user3",
      "password": "123456",
      "appId":"eaff0eb2-7f33-4f34-8d5a-1efc524723be"
    }'

Note that the credentials used to make the above call, namely usr:pwd, in this case, represent Helium client credentials. If you are unable to manage your own outbound API credentials as shown above, contact Mezzanine DevOps for assistance.

Also remember to substitute the base url (<https://dev.mezzanineware.com> in the above example) with the base url of the environment that your app is running on.

The JSON fields referenced above represent the following:

id| A unique V4 uuid that will represent the entry in Helium's data base.  
---|---  
userName| The user name that will be used when making the outbound API call. The username will also be used to reference the credentials when using the outbound API built-in functions.  
password| The password that will be used when making the outbound API call.  
appId| The id for the app for which the outbound API credentials are being created.  
  
### Managing credentials using the user interface

A more user friendly method for managing outbound API credentials is provided as part of the app admin user interface in the Helium core web application. To access this functionality simply update and existing app on the Helium core web application. You will then be presented with a panel similar to the following:

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5737217/Screenshot%202020-07-01%20at%2015.06.33.png?version=1&modificationDate=1593616072947&cacheVersion=1&api=v2&width=530&height=400)

  


  


  


  


## MezApiRequest

The outbound API built-in functions, takes a single argument of type `MezApiRequest`. `MezApiRequest` is available as a non-persistent built-in object in the DSL and is available, by default, for use in any application. The object is represented internally as follows:
    
    
    object MezApiRequest {
    	string url;
    	json body;
    	string credentials;
    	json headers;
    	json queryParameters;
    }

The attributes represent the following:

url| The URL for the remote API being invoked.  
---|---  
body| The JSON body being sent to the remote API. This can be ignored if the outbound call is to be made without a body.  
credentials| The user name of the corresponding outbound API credentials that was previously posted to the encrypted credentials store as described here. Note that if the API being invoked does not require basic authentication, this field does not have to be populated.  
headers| A value represented by the native JSON type in the DSL where entries represent key value pairs to be used as headers for the outbound call.  
queryParameters| A value represented by the native JSON type in the DSL which can be used to add queryParameters to the url for the request being made. These query parameters are automatically "url encoded" by Helium before being appended to the url.Also note that Helium does not check if any query parameters have already been manually added to the url. So this method for adding query parameters should not be combined with manually concatenating query parameters to the url field mentioned above.If query parameters are manually concatenated to the url string, they also need to be manually "url encoded". The `String:urlEncode()` built-in function can be used for this. More detail on this can be found [here](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/String+Functions#StringFunctions-urlEncode).  
  
  


  


  


## MezApiResponse

The outbound API built-in functions, returns a single instance of type MezApiResponse. MezApiResponse is available as a non-persistent built-in object in the DSL and is available, by default, for use in any application. The object is represented internally as follows:
    
    
    object MezApiResponse {
        json body;
        int code;
        string message;
        bool success;
    	string url;
    }

The attributes represent the following:

body| JSON body response from the remote API. This can be ignored if the remote API is not expected to return a body.  
---|---  
code| An integer representing the three digit HTTP status code:

  * 1xx: Informational
  * 2xx: Success
  * 3xx: Redirection
  * 4xx: Client Error
  * 5xx: Server Error

  
message| The HTTP response message. For example: HTTP Status-Code 200: OK, HTTP Status-Code 401: Unauthorized  
success| A boolean indicating whether the call resulted in a success response. In other words, whether the value for code is in the 2xx range.  
url| A string value that returns the final URL called by Helium considering it might differ from what was specified as queryParameters have been added.  
  
  


  


  


## Outbound API Built-in Functions

The following built-in functions are provided for the purposes of making outbound API calls. Note the api namespace:

api:get| Performs the outbound call with a GET HTTP method.  
---|---  
api:post| Performs the outbound call with a POST HTTP method.  
api:delete| Performs the outbound call with a DELETE HTTP method.  
api:put| Performs the outbound call with a PUT HTTP method.  
  
The functions all expect a single argument of type MezApiRequest and return a single instance of MezApiResponse. See the Examples section for more details.

  


  


  


## Exception Handling

Any exception resulting from an outbound API call itself, will result in a Program Exception that can be caught and handled using the DSL's built-in exception handling features.

Note that due to the shared nature of some server resources in Helium (and the underlying application service, Glassfish) read and connect timeouts of 12 seconds will apply to outbound API calls. This should be taken into account when designing app features around the outbound API and where possible the outbound API should be used in a non-blocking manner. This can be achieved by making use of the inbound API features in the DSL to implement callback endpoints.

  


  


  


## A Note on Specifying Headers

As briefly mentioned in one of the sections above, the `MezApiRequest` object allows for specifying any headers using the `headers` attribute. There is no limitation to what headers can be specified but the following should be noted:

  * In cases where basic authentication is required, it is possible to omit a value for the credentials attribute in the `MezApiRequest` object and instead specify the basic auth header as shown below. In this example, the second part of the value for the key value pair being specified represents a base 64 encoded representation of the credentials to be used for basic auth:
    
        json createHeaders() {
        json headers = "{}";
        headers.jsonPut("Authorization", "Basic dXNlcjM6MTIzNDU2");
        return headers;
    }

This method should not be favoured above using the credentials attribute in `MezApiRequest`. This is because the mechanism provided by the use of the credentials attribute, specifically retrieves encrypted credentials as stored in Helium. The above method does not and as such is not considered secure.

  * Since the Helium DSL specifically expects JSON structured payloads and API responses, values for the **Accept** and **Content-Type** headers will always be **application/json** and cannot be overridden using the headers attribute of the `MezApiRequest` object.



  


  


  


## Example

Consider the following example that demonstrates an outbound API call to get address book listing records. The records are returned as part of the body in JSON format and then processed in the DSL to the appropriate records. Note the use of `api:get`, `MezApiResponse` and `MezApiRequest`. Also take note of the exception handling in place.

**Presenter logic**
    
    
    AddressBookListing[] getAddressBookListings() {
    
        string baseUrl = "http://127.0.0.1:8090/3ec84978-b8aa-4d03-864e-3c50afebb93a";
        string listingEndpoint = "/1/listing";
        string url = Strings:concat(baseUrl, listingEndpoint);
        string userName = "user3";
    
        AddressBookListing[] result;
    
        try {
    		MezApiRequest request = MezApiRequest:new();
    		request.url = url;
    		request.credentials = userName;
    
    		MezApiResponse response = api:get(request);
    		int responseCode = response.code;
    		string responseMessage = response.message;
    
    		if(responseCode < 200 || responseCode >= 300) {
    	    	Mez:alertError("alert_error.listing_get_failure");
    	    	return result;
    		}
    
    		result = createAddressBookListingsFromJson(response.body);
    		return result;
        } catch(ex) {
    		string exceptionMessage = ex.message;
    		Mez:alertError("alert_error.listing_get_exception");
    		return result;
        }
    }
    
    AddressBookListing createAddressBookListingFromJson(json listingJson) {
        AddressBookListing listing = AddressBookListing:new();
        listing.id = listingJson.jsonGet("id");
        listing.name = listingJson.jsonGet("name");
        listing.address = listingJson.jsonGet("address");
        listing.age = listingJson.jsonGet("age");
        return listing;
    }
    
    AddressBookListing[] createAddressBookListingsFromJson(json listingsJson) {
        jsonarray listingsJsonArray = listingsJson;
        json[] listingsJsonCollection = listingsJsonArray;
    
        AddressBookListing[] result;
        foreach(json jsonListing: listingsJsonCollection) {
    		AddressBookListing newListing = createAddressBookListingFromJson(jsonListing);
    		result.append(newListing);
        }
    
        return result;
    }

**Data model**
    
    
    object AddressBookListing {
    
        // The id of this record from the remote service
        uuid id;
    
        // General attributes of the address book listing
        string name;
        string address;
        int age;
    }

**en.lang entries**
    
    
    alert_error.listing_get_failure = Attempting to get address book listings has resulted in an error API response: {responseCode}, {responseMessage}
    alert_error.listing_get_exception = Attempting to get address book listings has resulted in an exception: {exceptionMessage}

  


## Important Note

While most operations in Helium occur within a transaction that will be rolled back if any exceptions occur, Outbound API calls are executed synchronously. This means that once the call is made, it cannot be rolled back or reverted. Take note of this when using these Outbound API calls within other Helium operations such as scheduled functions as this mismatching of behaviour could cause unexpected results.

Marking which outbound calls were successful or not would also not be possible in this case as this would likely be an operation attempting to persist a value to the database and would therefore also roll back along with the failed transaction.

  


  

