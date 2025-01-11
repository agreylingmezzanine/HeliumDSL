## Description

The static content widget allows a piece of custom HTML to be rendered on a [<view/>](/wiki/spaces/HTUT/pages/5737617/view).

Static html components are bundled with a Helium release and can access other static content. The static tag requires a source attribute which specifies the resource to be loaded into the component. Bundled resources are available using a REST call with the filename of the resource.

Only a single static widget may be used on a view and also may not be used in combination with other widgets.

## Loading static resources

### URL

Static resources bundled with the source code of a Helium app can be loaded from Helium on the endpoint **/web-api/services/app/exec/static/{id}.** ID is the filename of the resource (Containing the extension).

Resources can be loaded using [jquery ajax](https://api.jquery.com/jquery.ajax/). See [Helium Custom Web Content](/wiki/spaces/HTUT/pages/5738044/Helium+Custom+Web+Content) for code examples of loading static resources such as JS and CSS from Helium.

### Authenticating with Helium

To load a static resource the API call must be authenticated or Helium will respond with an HTTP status code of 401. To authenticate provide a query parameter '?hsid={hsid}' to API calls.

For example from a static content component if one desired a resource is called 'my_component.html' the base url could be declared as follows (in JavaScript)
    
    
    var baseUrl = '/web-api/services/app/exec/static/my_component.html?hsid=' + ${hsid}

At runtime the text pattern {hsid} will be replaced with the actual Helium session ID for the signed in user.

## Example

### Using the static content widget

The HTML file embedded_component.html is loaded into the DOM of the Helium application.

**View XML**
    
    
    <static source="embedded_component.html"/>

Assuming the following exists in in web-app/static/embedded_componenent.html the contents "Hello World!" will be rendered within a Header 1.

**View XML**
    
    
    <div>
    	<h1>Hello world!</h1>
    </div>
    
    
