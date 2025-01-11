# Description

The tooltip attribute can be added to input and output components the same way a label attribute is added but unlike a label attribute which is mandatory a tooltip attribute is optional. The value provided for the tooltip attribute needs to be a lang key (same as label attribute). If a tooltip attribute is defined for a component a visible info symbol will appear next to the components label during runtime. If the user hovers over the info symbol the text for the tooltip will appear underneath the symbol.

# Example
    
    
       <textfield label="info.email_address" tooltip="info.email_address_tooltip">
    		<binding variable="user">
    			<attribute name="emailAdress"/>
    		</binding>
    	</textfield>
    
    
    info.email_address = Email Address:
    info.email_address_tooltip = The users email address
