## Description

The invite widget is a widget that can be used to invite users to a Helium app with a specific role. It is bound to a variable specifying a mobile number. Note that it has since been replaced by the `invite` built-in function and although it is still available for use, use of the `invite` built-in function is recommended. For details on the `invite` built-in function, please see the [DSL Reference](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Functions+on+Persistent+Entities#FunctionsonPersistentEntities-invite).

## Example

The code snippet below demonstrates the usage of the invite widget.
    
    
    <invite label="invite.farmer_invitation_mobile_number">
        <binding variable="farmer"/>
        <role>Farmer</role>
    </invite>
