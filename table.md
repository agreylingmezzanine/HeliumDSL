  


## Description

The data table widget provides a feature rich and versatile way to present data on the frontend.

  


  


### Core Functionality

At its core, the data table provides a table where rows represent object instances in the provided collection source and columns represent attributes and concatenations of attributes.

  


  


### Row Actions

Row actions are buttons that can be used to act upon a specific row and thus object instance in the data table. They require a value to be specified for the `action` attribute. This represents a function that can be used for navigation or any other application logic. In addition the object representing the selected row can be bound to a unit variable.

For each row in the table, the row actions are grouped together in a column with no column heading:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-13%2016.17.15.png?version=1&modificationDate=1489421916167&cacheVersion=1&api=v2)

A confirm popup can also be displayed when a row action is selected. This is achieved using the `<confirm>` child element of `<rowaction>.`

The example below shows a confirm popup for the row action labelled "Remove" as this can be a dangerous operation and might have negative consequences if performed by accident.
    
    
    <rowAction label="button.remove" action="removeUser">
        <binding variable="farmer" />
        <confirm subject="confirm_subject.removing_user" body="confirm_body.removing_user" />
    </rowAction>

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-13%2016.22.31.png?version=1&modificationDate=1489422224862&cacheVersion=1&api=v2)

Note that although row actions are mostly used to act upon the object instance representing the selected row, this is not required and no binding needs to be provided. In this case the row action will simply execute the specified action.

[Visibility bindings](/wiki/spaces/HTUT/pages/5739808/visible) can also be specified for data table row actions. In order to make use of a visibility binding the above example can be updated as follows:
    
    
    <rowAction label="button.remove" action="removeUser">
        <binding variable="farmer" />
        <confirm subject="confirm_subject.removing_user" body="confirm_body.removing_user" />
    	<visible function="showRemoveFarmerRowAction"/>
    </rowAction>

Note that, in the example above, it is assumed that the backing unit/presenter has a function with name `showRemoveFarmerRowAction` that returns a boolean value.

  


  


### Cell Actions

As of Helium 1.51.0, data table cell actions are also supported.

Cell actions are actions that are specified on the columns of a data table but executed from the cells within the data table.

They are similar in function to row actions in that they can execute a function as an action. They can also bind the selected row to a unit variable. In addition, the text value that is selected when executing the cell action can optionally be bound to a string unit variable.

There are two methods with which cell actions can be specified on a data table's view xml.

The first method is by specifying it on the table. The label specified for the cell action is matched to a column heading to determine the column for which the cell action is active. If such a mapping cannot be done, a compiler error will be generated. Similarly if the same label is used more than once for different cell actions, a compiler error will be generated.
    
    
    <table>
      <collectionSource variable="AbstractMenu:uMenuItems"/>
    
      <column heading="column_heading.menu_name_col">
        <attributeName>name</attributeName>
      </column>
    
      <column heading="column_heading.menu_desc_col">
        <attributeName>description</attributeName>
      </column>
          
      <!-- Cell action is specified on the table -->
      <!-- The specified label has to match a column heading-->
      <!-- Action represents the function that will be executed -->
      <cellAction label="column_heading.menu_name_col" action="Navigate:navigate">
    
        <!-- The row in which the selected cell falls is bound to a unit variable-->
        <binding variable="AbstractMenu:currentMenuItem"/>
    
          <!-- The selected value itself is bound to a string unit variable -->
          <!-- Specifying a field binding is optional -->
          <field variable="selectedValue"/>
      </cellAction>
    </table>

The second method is to specify the cell action on the column itself. In this case no label is needed since the cell action is already specified in the relevant column and no mapping is needed.
    
    
    <table>
      <collectionSource variable="AbstractMenu:uMenuItems"/>
          
      <!-- This column has a cell action applied to it -->
      <column heading="column_heading.action">
        <attributeName>name</attributeName>
            
        <!-- This cell action will perform a navigation -->
        <!-- The currently selected row will be bound -->
        <!-- No field binding is applied -->
        <cellAction action="Navigate:navigate">
          <binding variable="AbstractMenu:currentMenuItem"/>
        </cellAction>
      </column>
          
      <column heading="column_heading.user_count">
        <attributeName>description</attributeName>
      </column>
    </table>

The two methods are functionally identical and interchangeable. Selecting between them is therefore a matter of preference.

Visibility bindings can be used to programmatically disable and hide a cell action:
    
    
    <table>
      <collectionSource variable="AbstractMenu:uMenuItems"/>
      .
      .
      <cellAction label="column_heading.menu_desc_col" action="Navigate:navigate">
        <binding variable="AbstractMenu:currentMenuItem"/>
          <field variable="selectedValue"/>
    	  <visible variable="visibleFalse"/>
      </cellAction>
      .
      .
    </table>
    
    
    <table>
      <collectionSource variable="AbstractMenu:uMenuItems"/>
       .
       .
      <column heading="column_heading.action">
        <attributeName>name</attributeName>
    
        <cellAction action="Navigate:navigate">
          <binding variable="AbstractMenu:currentMenuItem"/>
        </cellAction>
    	<visible variable="visibleFalse"/>
      </column>
      .
      .
    </table>

If a cell action is active for a column, the values within the column's cells will be underlined and clickable:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202023-07-25%20at%2014.31.49.png?version=1&modificationDate=1690288368628&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202023-07-25%20at%2014.32.07.png?version=1&modificationDate=1690288367602&cacheVersion=1&api=v2)

As with row actions, confirm dialogs are also supported:
    
    
    <table title="table_heading.invited_system_admins">
      <collectionSource function="SystemAdminSelectors:getAllSystemAdmins"/>
      .
      .
      <column heading="column_heading.name">
        <attributeName>name</attributeName>
        <cellAction label="column_heading.name" action="editSystemAdmin">
          <binding variable="uSystemAdmin"/>
          <confirm subject="confirm_subject.confirm" body="confirm_body.confirm" />
        </cellAction>
      </column>
      .
      .
    </table>

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202023-07-25%20at%2014.53.47.png?version=1&modificationDate=1690289667089&cacheVersion=1&api=v2)

  


### Paging

For large data sets the data table widget provides a paging mechanism. When a view with a data table is loaded the default behaviour will be to display 10 rows per page or the value specified for the defaultMaxRows attribute if present. This can, however, be adjusted by selecting the page size in the middle of the data table footer area.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-13%2016.31.26.png?version=1&modificationDate=1489422895709&cacheVersion=1&api=v2)

The page size options available start at 10 rows and is incremented by 10 all the way to a maximum of 100 records per page. Note that if the total number of records from the collection source is less that 100 and not a multiple of 10, the total number of rows will also be shown as an option. Also note that the page size option will only be visible when the number of records from the collection source exceeds 10.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-13%2016.32.24.png?version=1&modificationDate=1489423006515&cacheVersion=1&api=v2)

  


  


  


### Sorting

By default a table is sorted on it's first column in ascending order. To change the default sort column and direction the `defaultSortColumn` and `defaultSortDirection` attributes can be used.

The value for `defaultSortColumn` is the column index and starts at 0. It is required that a valid integer value be specified when using this attribute.

The only values for `defaultSortDirection` are `ascending` which is also the default bahaviour and `descending`.

  


  


### Basic Searching and Filtering

A basic search feature is included for tables. This features takes the provided search text and attempts to perform a "starts with" search on values for all rows and columns. This is only applicable to text and enum fields. In the case of enums a match will be attempted on both the [translated enum values](https://wiki.stb.mezzanineware.com/display/HTUT/Lesson+5%3A+Model+Objects%2C+Enums#Lesson5:ModelObjects,Enums-EnumTranslations) and the enum values as declared in the data model. The search box used for this features is located at the top left corner of the data table.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-14%2007.04.06.png?version=2&modificationDate=1489475734587&cacheVersion=1&api=v2)

  


  


### Advanced Searching and Filtering

An advanced searching and filtering feature is also provided. This allows for column specific criteria to be specified. The column specific criteria can either be a "begins with", "contains", "between" or "equals" comparison and is determined based on the type of the column. For string columns, for example, a "starts with" filter is applicable whereas for an integer column a "betweens" and "equals" comparison is applicable.

In addition to criteria for individual columns, it can also be specified whether a row should be displayed when only one of the criteria is met or all of the criteria and whether the column specific criteria should match of not match.

The screenshots below demonstrates some of the features mentioned above.

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-14%2006.59.31.png?version=1&modificationDate=1489475737782&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-14%2007.03.05.png?version=1&modificationDate=1489475736186&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-14%2007.11.54.png?version=1&modificationDate=1489475734396&cacheVersion=1&api=v2)

By default, and if not removed manually, filters on a data table will persist throughout the user's session. As of Helium 1.25 this behaviour can be overridden by means of a new boolean attribute on the data table, namely `resetFilters`:
    
    
    <table title="table_heading.historic_messages" resetFilters="true">
    </table>

By default the value for `resetFilters` is **`false`**.

For a value of **`true`** , the filters will be reset each time the view is reloaded, including when navigating from the view to itself. The filters will not be reset as a result of paging or initiating a CSV export on the data table.

  


  


  


### Filter Destination

The currently filtered records being displayed in a data table can be bound to a collection in a presenter using the `<filterdestination>` element.
    
    
    <table title="table_heading.historic_messages">
    	<collectionSource function="getMessages"/>
    	<column heading="column_heading.sent">
    		<attributeName>sentTstamp</attributeName>
    	</column>
    	<filterDestination variable="MyPresenter:filteredMessages"/>
    </table>

  


  


  


### CSV Export

By default CSV exporting is enabled for all data table widgets on the web and can be triggered by clicking the "Download CSV" icon on the bottom left of the widget. Only the columns represented in the table will be exported. The file name will be constructed using the title of the table, if it has been specified, and the current date/time. For certain tables, however, such as tables acting as custom menus, CSV export can be disabled as shown in the code snipped below:

  

    
    
    <table csvExport="disabled">
        <collectionSource variable="uMenuItems"/>
        <column heading="column_heading.name">
            <attributeName>name</attributeName>
        </column>
     
        <rowAction label="button.select" action="select">
            <binding variable="uMenuItem"/>
        </rowAction>
    </table>

Data table footer with CSV download icon on the left

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5740308/Screenshot%202017-03-13%2016.06.02.png?version=1&modificationDate=1489421183296&cacheVersion=1&api=v2)

The header line can be excluded using the csvColumnHeader attribute of a table and setting it to false (it defaults to true).
    
    
    <table csvColumnHeader="false">
    </table>

Specific columns can be excluded from the export by using the csvIgnore attribute of a column and setting it to true (it defaults to false).
    
    
    <column heading="column_heading.name" csvIgnore="true">
            <attributeName>name</attributeName>
    </column>

  


### Disabling Search

Searching can be disabled for a data table in two ways. Firstly by specifying a value for the the `searchRowLimit` attribute. If the number of records in the collection source for the table exceeds this, search functionality will not be rendered for the table on the front-end.
    
    
    <table searchRowLimit="10000">
    .
    .
    </table>

Secondly, search can also be disabled programatically using the `searchEnabled` binding. This binding works similarly to visibility bindings in that it evaluates a variable or function that returns a boolean value. The value that is returned for the binding determines whether the search functionality is rendered on the front-end.
    
    
    <table title="table_heading.gyms">
          <collectionSource function="getGymsWithLimit"/>
          <searchEnabled variable="showSearch"/>
    .
    .
    </table>

Note the two methods can also be used in conjunction. If either method indicates that search should be disabled, search functionality will not be rendered for the table on the front-end.

  


### Automatic Refresh

The data table widget allows a time interval between 30 and 1800 seconds to be specified at which point the contents of the table is refreshed without the need for any user intervention. This is specified using the `refreshIntervalSeconds` attribute.
    
    
    <table title="table_heading.historic_messages" refreshIntervalSeconds="30">
    .
    .
    .
    </table>

  


### Markdown

Specific columns can be allowed to render markdown using the optional "allowMarkdown" attribute. Markdown can be used to create hyperlinks or to otherwise style the text in the column.
    
    
    <column heading="column_heading.name" allowMarkdown="true">
            <attributeName>name</attributeName>
    </column>

The following text in a column that allows markdown will create a hyperlink.
    
    
    [Mezzanineware](https://mezzanineware.com)

  


## Additional Mentions And References

  * The Helium Tutorial [Lesson 02: The Table Widget and Basic Navigation](/wiki/spaces/HTUT/pages/5736773/Lesson+02+The+Table+Widget+and+Basic+Navigation)
  * The Helium Tutorial [Lesson 07: Dynamic Tables](/wiki/spaces/HTUT/pages/5743716/Lesson+07+Dynamic+Tables)
  * Various other lessons in the [Helium Tutorial](/wiki/spaces/HTUT/pages/5735883/Helium+Beginner+s+Tutorial)
  * [Helium DSL and View Quick Reference](/wiki/spaces/HTUT/pages/5737643/Quick+Reference)



  


  

