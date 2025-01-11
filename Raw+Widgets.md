A general raw widget is provided in the Helium Rapid DSL. This is used to facilitate general widget development in Helium Rapid. 

All implementations of the raw widget supports two bindings:

  * Value binding that represents the json content that is sent to the widget on the frontend.

    * The value can be represented by the result of a function, a unit variable or an attribute of an object.

  * Function binding that implements the action to be performed in the DSL when an action is triggered on the frontend widget. The bounded function expects a json argument that represents the content sent from the frontend widget back to the DSL upon triggering of an action.




The raw widget supports general layout attributes as well as visibility bindings.

Below is a general example of a raw widget being used in Helium Rapid DSL code. The value for type will depend on the specific raw widget implementation.

`<raw type="TabWidget" action="tabAction" cols-md="6"> <content variable="rawTabContent" /> </raw>`

`json rawTabContent() {  json tabContent = "{}";  // Logic that populates the widget content goes here  ...  return tabContent; }`

`DSL_VIEW tabAction(json actionContent) {  // Logic based on the actionContent goes here  ...  return DSL_VIEWS.TheNextView; }`

The children of this page will document specific implementations of the raw widget that is available to Helium Rapid applications.
