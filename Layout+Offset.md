  * 1 Description
  * 2 Breakpoints
  * 3 Understanding the grid layout
  * 4 Limitations
  * 5 Default behaviour
  * 6 Implementing a grid layout
  * 7 Implementing offsets
  * 8 Layout Break



### Description

All widgets within the DSL, excluding the LayoutBreak widget, support layout & offset options. The layout specification adopted by the DSL is largely based on the Bootstrap grid and allows for the creation of more interesting UI layouts as opposed to each widget being positioned underneath one another. Furthermore the layout can be adjusted according to predefined screen sizes or breakpoints, allowing control of layouts for any device.

### Breakpoints

Extra small| **xs**|  Small to large phone| < 600px  
---|---|---|---  
Small| **sm**|  Small to medium tablet| 600px > < 960px  
Medium| **md**|  Large tablet to laptop| 960px > < 1280px  
Large| **lg**|  Laptop to desktop| 1280px > < 1920px  
Extra large| **xl**|  1080p to 1440p desktop| 1920px > < 2560px  
Extra extra large| **xxl**|  4k and ultra-wide| > 2560px  
  
### Understanding the grid layout

When deciding on implementing a grid layout for your applications it is important to consider how the grid is setup. All widgets within the DSL are rendered within a containing `row` which essentially leads each widget to be wrapped in a `column`. Following the Bootstrap grid, which is based on having a maximum of 12 columns within a row, each widget can therefore be seen as 1 column.

1| 2| 3| 4| 5| 6| 7| 8| 9| 10| 11| 12  
---|---|---|---|---|---|---|---|---|---|---|---  
  
### Limitations

Having all widgets housed under one containing row comes with limitations in how you can structure you layouts. 

  1. Any one widget can only take up a maximum of 12 columns. 

  2. If we have two widgets (A & B) where A is assigned 6 columns and B is assigned 7, this would result in widget B dropping below widget A.

  3. Grouping of content is not possible (yet)




### Default behaviour

By default all widgets are assigned a column value of 12, meaning they will take up the full width of the containing row and result in a stacked layout on all screen sizes. 

Certain widgets such as the DataInput & DataOutput widgets have been limited to 50% on screen sizes larger than **XL** if no layout options are specified. This will however be overridden if any layout options are specified.

### Implementing a grid layout

Implementing a grid layout is done by applying layout options to a particular widget. You are free to specify all options or any particular option of your choice.

The layout options are:

  * `cols-xs="12"`

  * `cols-sm="12"`

  * `cols-md="12"`

  * `cols-lg="12"`

  * `cols-xl="12"`

  * `cols-xxl="12"`




It should be noted that `cols-xs` is the default option for layouts and will traverse up unless another option is specified. This also applies to options above a particular option, eg: If we set `cols-md="6"`, when the screen size is larger than 960px the widget will take up 50% of the container.

The below example illustrates two TextInput widgets with layout options applied for two screen sizes. On mobile each widget is assigned 12 columns, making each widget full width. When on a large tablet or above, each widget is assigned 6 columns, placing the two inputs next to each other.

`<textfield label="textfield.first_name" tooltip="textfield.first_name" cols-xs="12" cols-md="6"> <visible function="mustShowForm"/> <binding variable="farmer"> <attribute name="firstName"/> </binding> </textfield> <textfield label="textfield.last_name" tooltip="textfield.last_name" cols-xs="12" cols-md="6"> <visible function="mustShowForm"/> <binding variable="farmer"> <attribute name="lastName"/> </binding> </textfield>`

Open 

![Screenshot 2024-04-11 at 10.45.16.png](https://media-cdn.atlassian.com/file/cd4d712a-0761-40f6-b544-4a84bf7a1b5c/image/cdn?allowAnimated=true&client=bd33a061-8341-45b8-a8e7-f99056a55846&collection=contentId-153452631&height=409&max-age=2592000&mode=full-fit&source=mediaCard&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiZDMzYTA2MS04MzQxLTQ1YjgtYThlNy1mOTkwNTZhNTU4NDYiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOmNvbnRlbnRJZC0xNTM0NTI2MzEiOlsicmVhZCJdfSwiZXhwIjoxNzM2NjI2OTM1LCJuYmYiOjE3MzY2MjQwNTV9.w5Sj28IE9cb_5U3OPaFZSg_V1aELlYGN2JvS7UgdKXg&width=760)

Open 

![Screenshot 2024-04-11 at 10.46.06.png](https://media-cdn.atlassian.com/file/5c308e7e-bc33-4510-add8-919510276671/image/cdn?allowAnimated=true&client=bd33a061-8341-45b8-a8e7-f99056a55846&collection=contentId-153452631&height=113&max-age=2592000&mode=full-fit&source=mediaCard&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiZDMzYTA2MS04MzQxLTQ1YjgtYThlNy1mOTkwNTZhNTU4NDYiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOmNvbnRlbnRJZC0xNTM0NTI2MzEiOlsicmVhZCJdfSwiZXhwIjoxNzM2NjI2OTM1LCJuYmYiOjE3MzY2MjQwNTV9.w5Sj28IE9cb_5U3OPaFZSg_V1aELlYGN2JvS7UgdKXg&width=760)

### Implementing offsets

Offsets work in the same fashion as assigning columns to widgets. Offsets are useful if you would like to offset the starting position of a widget - positioning it in centre of the screen for example.

The offset options are:

  * `offset-xs="4"`

  * `offset-sm="4"`

  * `offset-md="4"`

  * `offset-lg="4"`

  * `offset-xl="4"`

  * `offset-xxl="4"`




The below example illustrates a text field which is offset on tablet but not on mobile

`<textfield label="textfield.first_name" tooltip="textfield.first_name" cols-xs="12" offset-xs="0" cols-md="6" offset-md="3"> <visible function="mustShowForm"/> <binding variable="farmer"> <attribute name="firstName"/> </binding> </textfield>`

### Layout Break

The layout break is useful for creating sections within a page. This widget takes one attribute of `render` which can either be set to `line` or `dash`

`<break render="line"/>`

It is also possible to omit the `render` attribute altogether which will simply result in a break without rendering a line or dash. Visibility bindings are also supported.
