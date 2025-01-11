> _As a Farmer, I want to view a customizable table comparing stock prices at different shops._

## Lesson Outcomes

This lesson demonstrates using a combination of operators on primitives and `Math` and `Date` built-in functions to do calculations more complex compared to that of previous lessons.

## Scenario

We want to provide farmers with a price comparison tool. However, we have no guarantee that the stock prices at the various shops are current, because shop owners are under no obligation to do regular updates. To make this tool more useful, we decided to add an _inflation-based estimate_ for stock items that have not received recent price updates. To keep things simple the "inflation" will be based on user input and not historic data.

## New & Modified App Files

**`./model/objects/PriceEstimate.mez`  
**

**`./web-app/images/PriceCompare.png`  
**

**`./web-app/lang/en.lang`  
**

**`./web-app/presenters/farmer_ops/PriceComparison.mez`  
**

**`./web-app/views/farmer_ops/PriceComparison.vxml`  
**

**  
**

## Required View Elements

Create a view with the following widgets:

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5741933/Screen%20Shot%202017-02-21%20at%202.55.28%20PM.png?version=1&modificationDate=1487688951092&cacheVersion=1&api=v2&width=814&height=400)

This is to be accessible by farmers (i.e. add a `<menuitem>` also).

## Tutorial Aid

The stock update CSVs below has been added to speed up working through this tutorial. Upload them as per lesson 9. Select a different shop and past date for each.

[![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5741933/stockUpdate_shop1.csv?version=1&modificationDate=1487688988317&cacheVersion=1&api=v2&viewType=fileMacro)](/wiki/download/attachments/5741933/stockUpdate_shop1.csv?version=1&modificationDate=1487688988317&cacheVersion=1&api=v2)[![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5741933/stockUpdate_shop2.csv?version=1&modificationDate=1487688988471&cacheVersion=1&api=v2&viewType=fileMacro)](/wiki/download/attachments/5741933/stockUpdate_shop2.csv?version=1&modificationDate=1487688988471&cacheVersion=1&api=v2)[![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5741933/stockUpdate_shop3.csv?version=1&modificationDate=1487688988587&cacheVersion=1&api=v2&viewType=fileMacro)](/wiki/download/attachments/5741933/stockUpdate_shop3.csv?version=1&modificationDate=1487688988587&cacheVersion=1&api=v2)

## Calculating the Estimate

The calculation will involve the following built-in functions we haven't used in this tutorial before:

  * `Math:pow()`
  * `Date:daysBetween()`



For other built-in functions available via the `Math` and `Date` namespaces, see [Quick Reference](/wiki/spaces/HTUT/pages/5737643/Quick+Reference).

Stock item prices will be read from the database and the user will provide the inflation rate and date for which to calculate the estimate. The calculation will involve the following steps.

1\. For each shop, find the most recent price update for the selected stock item. (=C)
    
    
    PriceEstimate[] getEstimates() {
       ...
       Shop[] shops = getAllShops();
       for (int i = 0; i < shops.length(); i++) {
          Shop currentShop = shops.get(i);
          StockUpdate lastUpdate = getLastUpdate(currentShop);
          ...
    }
    
    StockUpdate getLastUpdate(Shop currentShop) {
       StockUpdate[] updates = StockUpdate:and(
             relationshipIn(shop, currentShop),
             relationshipIn(stock, selectedStock));
       if (updates.length() > 0) {
          updates.sortDesc("stocktakeDate");
          return updates.get(0);
       } else {
          return null;
       }
    }

2\. For each stock item's most recent price update, determine the time duration between the stocktake date and estimate date. (=t)
    
    
    PriceEstimate[] getEstimates() {
       ...
       Shop[] shops = getAllShops();
       for (int i = 0; i < shops.length(); i++) {
          Shop currentShop = shops.get(i);
          StockUpdate lastUpdate = getLastUpdate(currentShop);
          if (lastUpdate != null) {
             ...
             int durationDays = Date:daysBetween(lastUpdate.stocktakeDate, selectedDate);
             ...
    }

3\. Calculate using the formula: S=C(1+r)^t , where S is the inflated value after t years and r the inflation rate (r has to be divided by 100 so that we have a decimal representative of the percentage value).
    
    
    PriceEstimate[] getEstimates() {
       PriceEstimate[] result;
       Shop[] shops = getAllShops();
       for (int i = 0; i < shops.length(); i++) {
          Shop currentShop = shops.get(i);
          StockUpdate lastUpdate = getLastUpdate(currentShop);
          if (lastUpdate != null) {
             PriceEstimate estimate = PriceEstimate:new();
             estimate.shopName = currentShop.name;
             estimate.lastUpdatedDate = lastUpdate.stocktakeDate;
             estimate.lastUpdatedPrice = lastUpdate.price;
             int durationDays = Date:daysBetween(lastUpdate.stocktakeDate, selectedDate);
             estimate.estimatedPrice = getEstimatedPrice(lastUpdate, durationDays);  
             result.append(estimate);
          }   
       }   
       return result;
    }
    decimal getEstimatedPrice(StockUpdate lastUpdate, int durationDays) {
       decimal d = durationDays; //convert to decimal to not have the result
                                 //rounded off before assigning to t
       decimal t = d/365;
       decimal r = yearlyInflation/100;
       decimal latestPrice  = lastUpdate.price;
       return latestPrice * Math:pow(1+r, t);
    }

The results will go into a table, so we create a new object for its collection source:
    
    
    object PriceEstimate {
       string shopName;
       date lastUpdatedDate;
       decimal lastUpdatedPrice;
       decimal estimatedPrice;
    }

The steps above will be repeated for each shop, so naturally we add an item to the collection for each shop.

## Lesson Source Code

[Lesson 16.zip](/wiki/download/attachments/5741933/Lesson%2016.zip?version=4&modificationDate=1500292785449&cacheVersion=1&api=v2)
