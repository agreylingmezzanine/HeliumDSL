## 

## Description

The visible element is used to determine, at runtime, whether a widget or view element should be displayed on the frontend or not. It behaves much the same as the binding element except that its only purpose is to retrieve values from a unit variable or function and not to populate unit variables as with bindings for input widgets. The variables that are bound should be of type **`boolean`** and the functions that are bound should have a return type of **`boolean`**. Attributes of custom object unit variables can also be bound given that the attribute is of type **boolean**. If the values of the bound unit variable, attribute or function evaluates to true, the widget will be displayed and if it evaluates to false, it will not be displayed. By default, if `<visible/>` is not used in a widget, the widget is visible.

The following elements support the use of visibility bindings by means of the visible element:

  * [<textfield/>](/wiki/spaces/HTUT/pages/5736890/textfield)
  * [<textarea/>](/wiki/spaces/HTUT/pages/5735348/textarea)
  * [<datefield/>](/wiki/spaces/HTUT/pages/5735902/datefield)
  * [<checkbox/>](/wiki/spaces/HTUT/pages/5736105/checkbox)
  * [<select/>](/wiki/spaces/HTUT/pages/5743751/select)
  * [<fileupload/>](/wiki/spaces/HTUT/pages/5735757/fileupload)
  * [<info/>](/wiki/spaces/HTUT/pages/5735439/info)
  * [<filebrowser/>](/wiki/spaces/HTUT/pages/5738720/filebrowser)
  * [<map/>](/wiki/spaces/HTUT/pages/5734637/map)
  * [<table/>](/wiki/spaces/HTUT/pages/5740308/table)
  * [<wall/>](/wiki/spaces/HTUT/pages/5746041/wall)
  * [<button/>](/wiki/spaces/HTUT/pages/5736539/button)
  * [<submit/>](/wiki/spaces/HTUT/pages/5737528/submit)
  * [<action/>](/wiki/spaces/HTUT/pages/5738515/action)
  * [<column/>](/wiki/spaces/HTUT/pages/5740308/table)
  * [<rowAction/>](/wiki/spaces/HTUT/pages/5735360/rowAction)
  * [<markerAction/>](/wiki/spaces/HTUT/pages/5736512/markerAction)



## Examples

### Dynamically Hiding View Widgets Using Visibility Bindings to Functions

The example below shows a view with where widgets become visible as the user progresses through the logic flow of the use case. For widgets that are to be hidden a function visibility binding is used. This example is extracted from the Helium Tutorial [Lesson 12: Payments, Widget Visibility](/wiki/spaces/HTUT/pages/5740726/Lesson+12+Payments+Widget+Visiblity). Please refer to this lesson for the full source code of the example.

**View XML**
    
    
     <!-- visible by default to select shop to purchase from -->
    <select label="select.shop">
    	.
    	.
    </select>
    	
    <submit label="submit.select_shop" action="selectShop"/>
    <button label="button.reset_purchase" action="resetPurchase">
    	<visible function="showStockTable"/>
    </button>
    	
    <!-- visible once shop has been selected -->
    <info label="info.selected_shop">
    	<visible function="showStockTable"/>
    	.
    	.
    </info>
    	
    <table title="table_title.available_stock">
    	<visible function="showStockTable"/>
    	.
    	.
    </table>
    	
    	
    <!-- visible once shop and stock item has been selected -->
    <info label="info.selected_stock">
    	<visible function="showPurchaseForm"/>
    	.
    	.
    </info>
    	
    <info label="info.selected_stock_quantity_available">
    	<visible function="showPurchaseForm"/>
    	.
    	.
    </info>
    	
    <info label="info.selected_stock_price">
    	<visible function="showPurchaseForm"/>
    	.
    	.
    </info>
    	
    <textfield label="textarea.quantity_to_purchase">
    	<visible function="showPurchaseForm"/>
    	.
    	.
    </textfield>
    	
    <submit label="submit.calculate_cost" action="calculateCost">
    	<visible function="showPurchaseForm"/>
    </submit>
    	
    <!-- visible once the quantity has been validated and the cost has been calculated -->
    <info label="info.goods_cost">
    	<visible function="showSummary"/>
    	.
    	.
    </info>
    <info label="info.government_assistance_discount">
    	<visible function="governmentAssitanceApplicableAndSummary"/>
    	.
    	.
    </info>
    	
    <info label="info.final_cost">
    	<visible function="showSummary"/>
    	.
    	.
    </info>
    	
    <submit label="submit.make_purchase" action="makePurchase">
    	<visible function="showSummary"/>
    </submit>

**Backing unit functions**
    
    
    // Once a shop has been selected, the stock items for this shop can be displayed
    bool showStockTable() {
    	if(shop == null) {
    		return false;
    	}
    	return true;
    }
    
    // Once a stock item has been selected is can be displayed with a text field for the quantity to purchase
    bool showPurchaseForm() {
    	if(showStockTable() == false || selectedStock == null) {
    		return false;
    	}
    	return true;
    }
    
    // Once the purchase quantity has been validated and the price calculated the cost summary can be displayed
    bool showSummary() {
    	if(showPurchaseForm() == false || goodsCost == null) {
    		return false;
    	}
    	return true;
    }
    
    // In the case of a farmer with a government assistance certificate the discount related to this should 
    bool governmentAssitanceApplicableAndSummary() {
    	if(showSummary() == false || farmer.governmentAssistanceCertificate == null) {
    		return false;
    	}
    	return true;
    } 

The screenshots below show the progression of the view as the user progresses though the use case flow until the final "Make Purchase" button is available.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2015.05.35.png?version=1&modificationDate=1489158705728&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2015.05.50.png?version=1&modificationDate=1489158721156&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2015.06.11.png?version=1&modificationDate=1489158739521&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2015.06.28.png?version=1&modificationDate=1489158757774&cacheVersion=1&api=v2)

### Dynamically Hiding Data Table Columns Using a Visibility Binding to a Variable

The example below shows a dynamic table where some columns can potentially be hidden in order to only show essential columns in a table. Hiding or showing columns is achieved using a visibility binding bound to a unit variable. The value of the unit variable can be toggled between true and false using a button and accompanying action function. Note that this example also uses a dynamic label for the button in question. Please see the [View Reference section devoted to dynamic view labels](/wiki/spaces/HTUT/pages/5737784/Dynamic+Labels) for more information on how to use this. This example is extracted from the Helium Tutorial [Lesson 07: Dynamic Tables](/wiki/spaces/HTUT/pages/5743716/Lesson+07+Dynamic+Tables). Please refer to this lesson for the full source code of the example.

**View XML**
    
    
    <table title="table_title.farmers">
        <collectionSource function="getFarmers"/>
        <column heading="column_heading.registered_on">
            <attributeName>registeredOn</attributeName>
        </column>
        <column heading="column_heading.first_name">
            <attributeName>firstName</attributeName>
        </column>
        <column heading="column_heading.last_name">
            <attributeName>lastName</attributeName>
        </column>
        <column heading="column_heading.mobile_number">
            <attributeName>mobileNumber</attributeName>
        </column>
        <column heading="column_heading.email_address">
            <attributeName>emailAddress</attributeName>
        </column>
        <column heading="column_heading.farm_address">
            <attributeName>farmAddress</attributeName>
            <visible variable="showFarmerDetailInTable"/>
        </column>
        <column heading="column_heading.farm_size">
            <attributeName>farmSize</attributeName>
        <visible variable="showFarmerDetailInTable"/>
        </column>
        <column heading="column_heading.longitude">
            <attributeName>longitude</attributeName>
            <visible variable="showFarmerDetailInTable"/>
        </column>
        <column heading="column_heading.latitude">
            <attributeName>latitude</attributeName>
            <visible variable="showFarmerDetailInTable"/>
        </column>
        <column heading="column_heading.state">
            <attributeName>state</attributeName>
            <visible variable="showFarmerDetailInTable"/>
        </column>
        .
        .
        .
    </table>

**Backing unit**
    
    
    unit FarmerUserMgmt;
    Farmer farmer;
    bool showFarmerDetailInTable;
    .
    .
    void init() {
        farmer = Farmer:new();
        showFarmerDetailInTable = false;
        tableLable = "Fat table";
    }
    
    string toggleShowFarmerDetailsInTable() {
        if(showFarmerDetailInTable == false) {
            showFarmerDetailInTable = true;
            tableLable = "Slim table";
        }
        else{
            showFarmerDetailInTable = false;
            tableLable = "Fat table";
        }
        return null;
    }

Table with all columns visible

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2014.44.31.png?version=1&modificationDate=1489157237074&cacheVersion=1&api=v2)

Table with some columns hidded

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5739808/Screenshot%202017-03-10%2014.44.14.png?version=1&modificationDate=1489157254534&cacheVersion=1&api=v2)

## Additional Mentions and References

  * Visibility bindings are mentioned and demonstrated in the Helium Tutorial as part of various lessons:
    * [Lesson 07: Dynamic Tables](/wiki/spaces/HTUT/pages/5743716/Lesson+07+Dynamic+Tables)
    * [Lesson 12: Payments, Widget Visibility](/wiki/spaces/HTUT/pages/5740726/Lesson+12+Payments+Widget+Visiblity)
  * [Helium DSL and View Quick Reference](/wiki/spaces/HTUT/pages/5737643/Quick+Reference)
  * Helium View Reference: Dynamic View Component Labels


