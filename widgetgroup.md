  * 1 Description
  * 2 Limitations
  * 3 Example



### Description

The widgetgroup widget allows for more control over the layout of your views by grouping widgets of your choice. You can specify the same layout options that are available for other widgets on the widgetgroup as well as each widget within the group. The widget group also supports the visibility bindings already available. 

`title` \- String which allows you to define a title for the group.

`border` \- Boolean which if true will display a border around the widgetgroup.

`pdfExport` \- Boolean which is true will display a pdf icon on the top right of the widgetgroup allowing for the group to be downloaded as a pdf.

### Limitations

The widgetgroup widget only supports one level of grouping. You cannot contain a widgetgroup within another widgetgroup.

### Example

`<widgetgroup cols-md="6" title="group_title.title" pdfExport="true" border="true"> ... </widgetgroup>`
