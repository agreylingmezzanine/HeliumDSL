## Description

The submenu widget is a widget that you can use to drill down in a page that you do not want to display in the lefthand menu. To see this widget in action go to the demo app **Helium Dev - Demo** on preprod under raw widget > sub menu widget

Open 

![Screenshot 2024-11-01 at 07.45.00.png](https://media-cdn.atlassian.com/file/c79d6f47-288c-46d4-9813-a9b57996c908/image/cdn?allowAnimated=true&client=bd33a061-8341-45b8-a8e7-f99056a55846&collection=contentId-310476838&height=450&max-age=2592000&mode=full-fit&source=mediaCard&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiZDMzYTA2MS04MzQxLTQ1YjgtYThlNy1mOTkwNTZhNTU4NDYiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOmNvbnRlbnRJZC0zMTA0NzY4MzgiOlsicmVhZCJdfSwiZXhwIjoxNzM2NjI2OTIwLCJuYmYiOjE3MzY2MjQwNDB9.yw91lndVXN15Pv4ka0UiNT6Pfs8-pVVb42jVguOldTw&width=760)

## Code

.mez

`rawSubMenuContent=/%  {  "activeId": 2,  "items": [  {  "id": 0,  "label": "Users",  "icon": "account",  "subMenuItems": [  {  "id": 2,  "label": "Members",  "icon": "account"  },  {  "id": 3,  "label": "Admin",  "icon": "account"  }  ]  },  {  "id": 10,  "label": "Organisation",  "icon": "office-building",  "subMenuItems": [  {  "id": 12,  "label": "Members"  },  {  "id": 13,  "label": "Admin"  }  ]  },  {  "id": 4,  "label": "Payments"  },  {  "id": 5,  "label": "Map",  "icon": "map"  }  ]  }  %/;  DSL_VIEWS subMenuAction(json retArg){  string selectedId = retArg.jsonGet("id");  rawSubMenuContent.jsonPut("activeId", selectedId);  ... // do action here  return null; }`

.vxml

` <raw cols-md="4" type="LayoutSubMenu" action="subMenuAction"> <content variable="rawSubMenuContent" /> </raw>`

## Attributes

On the base level you can set the 

  * **activeId** the of the item that was clicked. Once a user clicked the item the DSL will need to set this id to ensure that the menu opens up to the item selected.

  * **items** a set of menu items




On each menu item you can set:

  * **id** a unique variable that will indicate the menu item

  * **label** the text that will display on the link

  * **icon** that will prepend to the link. You can find the set of icon names at: Material Design Icons - Icon Library - Pictogrammers](https://pictogrammers.com/library/mdi/)

  * **subMenuItems** a set of submenu items. The widget only allows for a one layer for submenus. You can not set submenus on submenus



