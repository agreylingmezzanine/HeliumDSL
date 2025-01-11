## Description

The data wall widget provides an alternative way of presenting a collection of entities than is provided by the [map](/wiki/spaces/HTUT/pages/5734637/map) or [table](/wiki/spaces/HTUT/pages/5740308/table) widgets. 

The example below describes the functionality that is provided by this widget. In addition, the widget can be hidden using [visibility bindings](/wiki/spaces/HTUT/pages/5739808/visible).

## Example

**View XML**
    
    
    <wall title="wall_title.tickets" defaultSort="receivedTime" commentHandler="handleComment">
        <collectionSource function="getUnresolvedTickets"/>
        <itemTitle value="getTicketTitle"/>
        <itemText value="getTicketText"/>
        <itemTime value="getTicketTime"/> 
        <itemIcon value="getTicketIcon"/>
        <itemAction label="wall_action.resolve" action="resolveTicket" />
        <itemAction label="wall_action.delete" action="deleteTicket" />
    </wall>

**Backing unit**
    
    
    void handleComment(string comment) {
        logComment(comment);
    }
    
    string getTicketTitle(SupportTicket ticket) {
        return ticket.senderNumber;
    }
    
    string getTicketText(SupportTicket ticket) {
        return ticket.text;
    }
    
    datetime getTicketTime(SupportTicket ticket) {
        return ticket.receivedTime;
    }
    
    string getTicketIcon(SupportTicket ticket) {
        return "Person";
    }
     
    SupportTicket[] getUnresolvedTickets() {
        return SupportTicket:and(
            equals(spam, false), 
            equals(resolved, false)
        );
    }
    
    void resolveTicket(SupportTicket ticket) {
        ticket.resolved = true;
        ticket.save();
    }
    
    void deleteTicket(SupportTicket ticket) {
        ticket.spam = true;
        ticket.save();
    }

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5746041/Screenshot%202017-03-13%2015.39.53.png?version=1&modificationDate=1489419702866&cacheVersion=1&api=v2)

In addition to the example above, item GPS coordinates can also be represented in the data wall widget. This is achieved in the same way as many other elements of the data wall:

**View XML**
    
    
    <itemLatitude value="getTicketLat"/>
    <itemLongitude value="getTicketLong"/>

**Backing unit**
    
    
    getTicketLat(SupportTicket ticket) {
        return ticket.lat;
    }
    
    getTicketLong(SupportTicket ticket) {
        return ticket.long;
    }

This provides an additional icon being displayed as well as an action that is triggered by clicking the icon. The screenshots below demonstrates this:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5746041/Screen%20Shot%202017-02-23%20at%209.20.56%20PM.png?version=1&modificationDate=1489419316452&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/5746041/Screen%20Shot%202017-02-23%20at%2010.26.26%20PM.png?version=1&modificationDate=1489419336817&cacheVersion=1&api=v2)

## Automatic Refresh

The data wall widget allows a time interval between 30 and 1800 seconds to be specified at which point the contents of the wall is refreshed without the need for any user intervention. This is specified using the `refreshIntervalSeconds` attribute.
    
    
    <wall title="wall_title.tickets" defaultSort="receivedTime" commentHandler="handleComment" refreshIntervalSeconds="30">
    .
    .
    .
    <wall>

## Additional Mentions and References

  * Devoted section in the Helium Tutorial [Lesson 14: Inbound SMS Messages and the Wall Widget](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Lesson+14%3A+Inbound+SMS+Messages+and+the+Wall+Widget#Lesson14:InboundSMSMessagesandtheWallWidget-DisplayingSupportTicketswiththeWallWidget)
  * [Helium DSL and View Quick Reference](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)


