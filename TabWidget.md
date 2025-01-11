  * 1 Description
  * 2 Attributes
  * 3 Example



## Description

The `TabWidget` provides a elegant way to display multiple “pages“ of related content within the same DSL view and an alternative to page actions or buttons. 

Open 

![Screenshot 2024-10-21 at 10.57.26.png](https://media-cdn.atlassian.com/file/533c4b37-33de-4a91-a03d-0e6e77926634/image/cdn?allowAnimated=true&client=bd33a061-8341-45b8-a8e7-f99056a55846&collection=contentId-298221708&height=101&max-age=2592000&mode=full-fit&source=mediaCard&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiZDMzYTA2MS04MzQxLTQ1YjgtYThlNy1mOTkwNTZhNTU4NDYiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOmNvbnRlbnRJZC0yOTgyMjE3MDgiOlsicmVhZCJdfSwiZXhwIjoxNzM2NjI2OTE3LCJuYmYiOjE3MzY2MjQwMzd9.etuOF5Irsa_48O1d_xm57u-sZNmJfBGXIkAbs5ltAlM&width=760)

## Attributes

`alignment`: String \- Determines the horizontal position of the tabs. Can be one of `left`, `center`, `right`

`direction`: String \- Determines orientation of the tabs. Can be one of `horizontal` or `vertical`

`stacked`: Boolean \- Used to display the icon for each tab above the label of the tab instead of before the label

`activeTab`: Number \- Used to identify the current active tab

`items`: JSON Array \- The actual tab items. Each item consists of `id`, `icon` and `label`

`id`: Number \- The ID of the Tab

`icon`: String || Null \- Icon name as determined from https://pictogrammers.com/library/mdi/](https://pictogrammers.com/library/mdi/)

`label`: String \- The tab label

A complete example of the JSON:

`{  "alignment": "left",  "direction": "horizontal",  "stacked": false,  "activeTab": 1,  "items": [  {  "id": 1,  "label": "Tab 1",  "icon": "home"  },  {  "id": 2,  "label": "Tab 2",  "icon": null  }  ] }`

## Example

.vxml

`<raw type="TabWidget" action="tabAction"> <content variable="rawTabContent" /> </raw> <info label="info.example" allowMarkdown="true" cols-md="12" cols-xs="12" variant="clear"> <visible function="showTabOneContent"/> <binding function="getTabOneContent"/> </info> <info label="info.example" allowMarkdown="true" cols-md="12" cols-xs="12" variant="clear"> <visible function="showTabTwoContent"/> <binding function="getTabTwoContent"/> </info>`

.mez

`unit TabWidget;  json rawTabContent;  void init() {  rawTabContent = /%  {  "alignment": "left",  "direction": "horizontal",  "stacked": false,  "activeTab": 1,  "items": [  {  "id": 1,  "label": "Tab 1",  "icon": "home"  },  {  "id": 2,  "label": "Tab 2",  "icon": null  }  ]  } %/; }  DSL_VIEWS tabAction(json tabResponse) {  tabItem.activeTab = tabResponse.jsonGet("id");  rawTabContent.jsonPut("activeTab", tabItem.activeTab);  string alertMessage = tabItem.activeTab;  Mez:alert("alert.alert_message");  return null; }  bool showTabOneContent(){  if(tabItem.activeTab == 1){  return true;  }  return false; }  bool showTabTwoContent(){  if(tabItem.activeTab == 2){  return true;  }  return false; }  string getTabOneContent() {  string result = /%  ### Tab One Content  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique facilisis sapien ut rhoncus. Duis ornare id quam eget mattis. Phasellus accumsan vel libero sit amet hendrerit. Nam vitae mollis purus. Sed ullamcorper vel quam eu dictum. Quisque faucibus, odio ut varius vulputate, justo orci pellentesque tortor, auctor sagittis ipsum magna eu neque. Proin hendrerit justo a odio accumsan, eget ultricies mi sagittis. %/;  return result;  }  string getTabTwoContent() {  string result = /%  ### Tab Two Content  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique facilisis sapien ut rhoncus. Duis ornare id quam eget mattis. Phasellus accumsan vel libero sit amet hendrerit. Nam vitae mollis purus. Sed ullamcorper vel quam eu dictum. Quisque faucibus, odio ut varius vulputate, justo orci pellentesque tortor, auctor sagittis ipsum magna eu neque. Proin hendrerit justo a odio accumsan, eget ultricies mi sagittis. %/;  return result;  }`
