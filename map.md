  


## Description

The map widget provides a way with which entities that have a gps longitude and latitude associated with them can be presented on the frontend. This is achieved by specifying a collection variable or function as a collection source and the attribute names of the attributes representing the longitude and latitude values.

Data is displayed as a marker on the map. Custom map marker icons can be specified per entity being displayed.

Further functionality includes specifying a custom title and description for map markers as well as marker actions. Marker actions are similar to [data table row actions](/wiki/spaces/HTUT/pages/5740308/table). 

Both the map widget and [marker actions](/wiki/spaces/HTUT/pages/5736512/markerAction), that can be specified for a map, supports [visibility bindings](/wiki/spaces/HTUT/pages/5739808/visible).

  


  


## Example

Note that as an alternative to the example below, the optional `lat` and `long` attributes can be used to specify the attributes representing latitude and longitude. Also note that the marker icon function can either return a string that references the image resource in the project source code, or it can return a blob type that can be queried from the database and used as the marker icon as with the dynamic map legend (this is available from version 1.33 of the Helium DevClient).

**View XML**
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude">
        <collectionSource function="getFarmers"/>
        <markerAction label="marker_action.view_farmer_details" action="viewFarmer">
            <binding variable="selectedFarmer"/>
    		<visible variable="uSystemConfig">
    			<attribute name="showGymMapMarkerActions"/>
    		</visible>
        </markerAction>
        <markerTitle value="getMarkerTitle"/>
        <markerIcon value="getMarkerIcon"/>
        <markerDesc value="getMarkerDescription"/>
    </map>

**Backing unit**
    
    
    unit FarmerMap;
    
    Farmer selectedFarmer;
    SystemConfig uSystemConfig;
     
    void init() {
    	uSystemConfig = ConfigUtil:getSystemConfig();
    }
    string getMarkerTitle(Farmer farmer) {
        return String:concat(farmer.firstName, " ", farmer.lastName);
    }
    
    string getMarkerDescription(Farmer farmer) {
        return farmer.farmAddress;
    }
    
    string getMarkerIcon(Farmer farmer) {
        return "Person";
    }
    
    Farmer[] getFarmers() {
        return Farmer:equals(deleted, false);
    }
    
    DSL_VIEWS viewFarmer() {
        return DSL_VIEWS.FarmerUserDetails;
    }

**en.lang file entry**
    
    
    marker_action.view_farmer_details = View details:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5734637/Screenshot%202017-03-13%2013.34.26.png?version=1&modificationDate=1489412469385&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5734637/Screenshot%202017-03-13%2013.34.40.png?version=1&modificationDate=1489412514985&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5734637/Screenshot%202017-03-13%2013.35.49.png?version=1&modificationDate=1489412538179&cacheVersion=1&api=v2)

The newline character, `\n`, can be used to split the text in map marker info windows into more than one line of text.

  


Icon recommendations

The recommended format for icons is a width of 40 pixels with a height of 30 pixels (or larger but with the same aspect ratio) png images with an alpha channel included.

## Automatic Refresh

The map widget allows a time interval between 30 and 1800 seconds to be specified at which point the contents of the map is refreshed without the need for any user intervention. This is specified using the `refreshIntervalSeconds` attribute.
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" refreshIntervalSeconds="30">
    .
    .
    .
    </map>

  


  


  


## Controlling the Zoom and Pan Behaviour

The google maps API provides some control over the zoom and pan behaviour of maps. This can also be controlled from the Helium view xml by specifying a value for the `gestureHandling` property as follows:
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" gestureHandling="greedy">
    .
    .
    .
    </map>

  


The possible values that can be specified are as follows:

  * greedy
  * cooperative
  * auto
  * none



These values correspond to the gesture handling options available in the google maps API and are documented [here](https://developers.google.com/maps/documentation/javascript/interaction).

  


  


## Maximum Default Zoom

Helium uses the map markers that are being displayed as bounds to the map. In some cases though, if the markers are very close together or if there is only one marker the default zoom level of the map will be the maximum zoom that is available and, as a result, won't provides users with enough contextual information as to the relative location of the marker. To overcome this Helium provides a `maxDefaultZoom` property for maps. It can be used as follows:
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" maxDefaultZoom="10">
    .
    .
    .
    </map>

  


In the above example if the default zoom will be capped at 10, ignoring the zoom level that is determined by using the map markers as map bounds.

  


  


## Zoom and Pan State During a Session

By default the zoom and pan state for a map widget wil reset to the initial defaults each time it is loaded. To override this behaviour and maintain the map zoom and pan state during a user's session the `maintainState` attribute can be used.
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" maintainState="true">
    .
    .
    .
    </map>

  


## Animated Map Markers

As of [Helium 1.13](/wiki/spaces/HTUT/pages/5734940/1.13+Release+Notes), map markers can be animated. This is done similarly to how a marker title, description or icon is specified, namely, by specifying a presenter function that can specify the animation for a map marker representing a specific object on your map. Two animations are supported to coincide with the animations provided by the Google Maps API, namely `Bounce` and `Drop`. In Helium, these animations are represented by a newly introduced built-in enumeration:
    
    
    enum DSL_ANIMATION {
        Bounce, Drop
    }

Using the bounce animation, markers will appear to bounce up and down. Using the drop animation, markers will appear to drop into position when the map loads.

Consider the example below where the map is used to represent `Gym` objects. In this example the default animation is for markers to make use of the drop animation. If a Gym has, however, been "Flagged for Removal", the bounce animation is to be used.

**Map Widget XML**
    
    
    <map latitudeAttribute="lat" longituteAttribute="long">
    	<collectionSource function="getAllGyms"/>
    
        <markerAction label="marker_action.flag_for_removal" action="flagForRemoval">
            <binding variable="uGym"/>
        </markerAction>
        
    	<markerTitle value="getMarkerTitle"/>
        <markerIcon value="getMarkerIcon"/>
        <markerDesc value="getMarkerDescription"/>
        <markerAnimation value="getMarkerAnimation"/>
    </map>

Note from the above code snippet how the `getMarkerAnimation` function is specified to determine what the animation for a map marker should be.

  


**Presenter Function for Marker Animation**
    
    
    DSL_ANIMATION getMarkerAnimation(Gym gym) {
    	if(gym.flaggedForRemoval == true) {
    		return DSL_ANIMATION.Bounce;
    	}
    	return DSL_ANIMATION.Drop;
    }

Note the use of `DSL_ANIMATION` as a return type for the `getMarkerAnimation` function. This is required and if a different return type is specified a compiler error will be generated. Returning null from the function above is allowed and will result in no animation for that map marker.

  


  


## Map Size

As of [Helium 1.13](/wiki/spaces/HTUT/pages/5734940/1.13+Release+Notes), the size for the data map widget can be specified as part of the widget view XML. This is achieved using the size attribute as shown below:
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" size="50%">
    .
    .
    .
    </map>

Currently only percentages are supported for specifying the map size. This requires specifying a numerical value followed by the percentage symbol as shown above. Values must be between 30% and 100%.

  


  


## Map Legend

As of [Helium 1.13](/wiki/spaces/HTUT/pages/5734940/1.13+Release+Notes), a map legend can be specified for the data map widget. Two different aspects of the legend is configurable namely the position of the legend on the map, and the keys represented by the legend. For each legend key, an icon and translated key label has to be specified.

### Specifying Map Legend Keys

Each map legend key is individually specified. For each legend key an icon and a label must be specified. The icon is specified by providing the file name, without file extension, of an icon image located in the **`web-app/images`** folder. The label for a legend key is specified by providing a lang file key that maps to the translated value for the legend key label. The code example and screenshot that follows demonstrates this:

**Map Legend Key Widget XML**
    
    
     <map latitudeAttribute="lat" longituteAttribute="long">
        <collectionSource function="getAllGyms"/>
        <markerAction label="marker_action.flag_for_removal" action="flagForRemoval">
            <binding variable="uGym"/>
        </markerAction>
        
        <markerTitle value="getMarkerTitle"/>
        <markerIcon value="getMarkerIcon"/>
        <markerDesc value="getMarkerDescription"/>
        <markerAnimation value="getMarkerAnimation"/>
    
        <legendKey label="legend_key.flagged_for_removal" icon="red_cross"/>
        <legendKey label="legend_key.home_gym" icon="home_gym"/>
        <legendKey label="legend_key.outdoor_gym" icon="outdoor_gym"/>
        <legendKey label="legend_key.commercial_gym" icon="commercial_gym"/>
    </map>

**Map Legend Lang File Entries**
    
    
    legend_key.flagged_for_removal = Flagged for Removal
    legend_key.home_gym = Home Gym
    legend_key.outdoor_gym = Outdoor Gym
    legend_key.commercial_gym = Commercial Gym

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5734637/Screenshot%202018-05-15%2013.38.54.png?version=1&modificationDate=1526391552808&cacheVersion=1&api=v2&width=859&height=400)

Note that the map legend keys also support [visibility bindings](/wiki/spaces/HTUT/pages/5739808/visible). This means that a specific map legend key can be hidden programmatically using logic that is defined in a presenter:

**Map Legend Key Visibility Binding**
    
    
    .
    .
    <legendKey label="legend_key.flagged_for_removal" icon="red_cross">
    	<visible function="showFlaggedForRemovalLegendKey"/>
    </legendKey>
    .
    .
    
    
    bool showFlaggedForRemovalLegendKey() {
    	.
    	.
    	.
    }

  


### Setting a dynamic list for the Map Legend

Helium allows for the map legend to be built dynamically as of version [1.32](https://wiki.mezzanineware.com/display/HTUT/1.32+Release+Notes), instead of defining several `<legendKey>` child elements in the **`.vxml`** file. A new child element, `<legend>`, has been introduced to the map widget which holds only a single binding. This binding contains a data source attribute that is either a `variable` or a `function` similarly to the `<collectionSource>`. Importantly this data source must be a collection of object type **`MezLegendKey`** which is a new non-persistent Helium built-in object introduced specifically for this use. This is the model for this object:
    
    
    object MezLegendKey {
        string label;
        blob icon;
    }

Both the **`label`** and **`icon`** attributes are comparable to the elements of the `<legendKey>` with the same names, where the **`label`** attribute contains a string label for the specific legend item and the **`icon`** contains a blob which will be used as the icon of the item. This **`blob icon`** can be of any **`image/?`** MIME type, however, it is advised to keep to Helium conventions and use **`.jpeg`** or **`.png`** images.

We can then replicate the map and legend above by using the following code:

**Map Legend Key Widget XML**
    
    
     <map latitudeAttribute="lat" longituteAttribute="long">
        <collectionSource function="getAllGyms"/>
        <markerAction label="marker_action.flag_for_removal" action="flagForRemoval">
            <binding variable="uGym"/>
        </markerAction>
        
        <markerTitle value="getMarkerTitle"/>
        <markerIcon value="getMarkerIcon"/>
        <markerDesc value="getMarkerDescription"/>
        <markerAnimation value="getMarkerAnimation"/>
    
        <legend function="getLegend"/>
    </map>

**Map Legend Widget Presenter**
    
    
    MezLegendKey[] getLegend() {
    	MezLegendKey[] result;
    	ObjectWithIcon[] iconList = ObjectWithIcon:equals(type, "Gym");
    	foreach(ObjectWithIcon obj: iconList){
    		MezLegendKey newLegend = MezLegendKey:new();
    		newLegend.icon = obj.iconAttribute;
    		newLegend.label = obj.labelAttribute;
    		result.append(newLegend);
    	}
    	return result;
    }

In this way we collect a list from the database which contains the icons we want to use and build our own legend leveraging any other DSL functionality. If the `<legend>` data source is empty, no legend will be displayed on the map.

NOTE: You cannot use both the `<legendKey>` and `<legend>` child elements at the same time on the same `<map>` widget.

### Specifying the Position for the Map Legend

In addition to specifying individual map legend keys, the relative position of the legend can also be specified using the `legendPosition` attribute on the map widget as follows:
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" legendPosition="right-center">
    .
    .
    .
    </map>

The possible values for the legend position are the following:

  * top-center
  * top-left
  * top-right
  * bottom-center
  * bottom-left
  * bottom-right
  * left-top
  * left-center
  * left-bottom
  * right-top
  * right-center
  * right-bottom



With the exception of "top-right", none of the above values displaces existing google map controls. A value of "top-right" causes the fullscreen button to be moved downward. Using "right-top", however, will not displace the fullscreen button while still positioning the map legend at the top right of the map.

If no legend position is specified for the map widget, a default value of "right-center" is used.

  


  


## Marker Clustering

As of [Helium 1.13](/wiki/spaces/HTUT/pages/5746190/Helium+Releases), Helium provides marker clustering. Marker clustering groups markers that are close together using a single marker. If the marker is clicked or if the map is zoomed, the cluster icon is replaced by either more clusters representing a reduced number of markers or the actual markers representing the DSL object instance represented in the map collection source. The clustering is done by grouping markers located in fixed grids on the map and is implemented using a default Google Map API clusterer. The cluster icons are also default icons and at this stage and cannot be customised in the Helium DSL.

In order to make use of marker clustering the `markerClustering` attribute can be used on the data map widget as follows:
    
    
    <map latitudeAttribute="latitude" longituteAttribute="longitude" markerClustering="enabled">
    .
    .
    .
    </map>

Valid values for the marker clustering attribute are "enabled" and "disabled". If marker clustering is not specified, a default value of "disabled" is used.

The screenshots below shows how marker clustering is useful when a map is used to present a large number of map markers:

With Marker Clustering Disbled

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5734637/Screenshot%202018-05-15%2014.47.01.png?version=1&modificationDate=1526395759934&cacheVersion=1&api=v2&width=859&height=400)

With Marker Clustering Enabled

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5734637/Screenshot%202018-05-15%2014.49.01.png?version=1&modificationDate=1526395759597&cacheVersion=1&api=v2&width=856&height=400)

  


## Location Actions

In addition to the existing marker actions, the data table widget also provides a secondary type of data action namely location actions.

Whereas marker actions bind to the object instance backing the selected marker, location actions bind to an object instance that is populated by Helium and contains fields relevant to the location from which the location action is triggered. These instances are of the built-in type `**MezMapLocation**.`

Location actions can be triggered from any point on a map except from a location that is already occupied by a marker.

To trigger a location action, users need to right click on the map. They will then be presented with a popup containing a title, the latitude and longitude coordinates of the selected point as wel as a list of the available location actions that can be executed.

The popup title can be specified as a value in the lang file and using the `locationActionTitle` attribute on the map widget xml. If not specified, the popup title will be blank. The coordinates are populated automatically using the google maps API.

Once an action is selected an instance of **`MezMapLocation`** is bound as specified and the specified action is executed.

The example below shows how a location action can be added to a map:

**Map Location Action Widget XML**
    
    
    <map locationActionTitle="popup_title.location_action" latitudeAttribute="lat" longituteAttribute="long">
        <collectionSource function="AllSelectors:getAllGyms"/>
    
        <locationAction label="location_action.post_location" action="postLocation">
            <binding variable="location"/>
        </locationAction>
        .
        .
        .
    </map>

**Location Action Presenter Variable**
    
    
    unit ManageGyms;
    
    MezMapLocation location;
    .
    .
    .

**Location Action Presenter Function**
    
    
    string postLocation() {
        AppLocation loc = AppLocation:new();
        loc.lat = location.latitude;
        loc.lng = location.longitude;
        loc.save();
    
        return null;
    }

**Lang File Entry for Popup Title**
    
    
    popup_title.location_action = Location Details
    location_action.post_location = Post location

The screenshot below shows the popup that is rended upon a right click action. From here a location action can be executed:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5734637/Screenshot%202022-10-07%20at%2009.45.06.png?version=1&modificationDate=1665135937272&cacheVersion=1&api=v2)

  


## Additional Mentions and Reference

  * Covered in the Helium Tutorial [Lesson 15: The Map Widget and Restricting Access to Data](/wiki/spaces/HTUT/pages/5744335/Lesson+15+The+Map+Widget+and+Restricting+Access+to+Data)

  * [Helium DSL and View Quick Reference](https://wiki.mezzanineware.com/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)



  


  

