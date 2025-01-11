## Description and Examples

### View navigation

View navigation can be used to define a criteria and destination for a navigation. The criteria is specified as a string literal in the "outcome" attribute and the target is the view name specified as a value for the "target" attribute. The following views components can generate an outcome.

  * <button />
    * Buttons can generate outcomes either by specifying a value for the "outcome" attribute or by returning a string from the action function
  * <submit />
    * Submit buttons can generate outcomes either by specifying a value for the "outcome" attribute or by returning a string from the action function
  * <action />
    * View actions can generate outcomes either by specifying a value for the "outcome" attribute or by returning a string from the button action function
  * [<rowAction />](/wiki/spaces/HTUT/pages/5735360/rowAction)
    * Row actions can generate outcomes by returning a string from the button action function


    
    
    <navigation outcome="menu" target="TraineeMenu"/>

### Dynamic navigation

From [Helium 1.4](/wiki/spaces/HTUT/pages/5752158/1.4.0+Release+Notes) dynamic navigation is also supported. See [Navigation](/wiki/spaces/HTUT/pages/5734533/Navigation) in the DSL Reference. This is the recommended method of navigation.
