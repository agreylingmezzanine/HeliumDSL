  


## Overview

Helium Rapid provides functionality to generate and download existing jasper reports directly from DSL code.

This is only available for reports that are available in the jasper-reports folder of the app source code.

To trigger a report download from an action, the following is required:

  * A call to the Mez:downloadReport built-in function
  * A submission of the view to Helium's backed. This is done automatically when a DSL_VIEW value or null is returned from the actions function.
  * Upon the next view response, as a result from the above, the download will trigger.



Note that multiple downloads cannot currently be queued. So even if Mez:downloadReport is called multiple times before returning from the action function, only the last download request will be triggered on the user's browser.

In addition to directly downloading a report, a blob can be generated from a report using the Mez:generateReport. This can then be stored and downloaded at a later stage.

  


  


  


## Mez:downloadReport

The Mez:downloadReport built-in function can be called as follows:
    
    
    Mez:downloadReport(DSL_REPORTS.My_Report_Reference, reportArguments, DSL_REPORT_FORMAT.Pdf, optionalFilename)

The arguments specified here are described in the following sections.

  


  


  


### Report Reference

Description| Type| Required  
---|---|---  
A reference to the report as contained in the jasper-reports folder.| enum DSL_REPORTS| Yes  
  
The DSL_REPORTS enum is a new built-in enum provided with Helium Rapid. The values for this enum represents the report within the jasper-reports folder of the app source code.

The values for the enum is derived from the value for the "referenceName" field specified in each report's report.json file.

The values are derived by replacing all spaces with underscores. No underscores are allowed in the value for the "referenceName" field in report.json.

In addition the converted values need to be unique per app and should conform to the normal syntax rules for enums in the DSL.

Consider the following example report.json file:
    
    
    {
    	"name":"All Farmer Purchases",
    	"referenceName":"All the Farmer Purchases",
    	"actionsDisplay":"close",
    	"actionsLabel":"Menu",
    	"description":"All farmer purchases system wide",
    	"rolesAllowed":["System Admin"]
    }

Based on the above report.json the following value will be available in the app:
    
    
    DSL_REPORTS.All_the_Farmer_Purchases

  


  


  


### Report Arguments

Description| Type| Required  
---|---|---  
The arguments required by the report| json| Yes, but can be empty json such as "{}" if no parameters are specified for the report  
  
The report arguments represent values for the parameters specified in the report.json file for the report.

The key for the argument needs to match the parameter name specified in the report.json file.

In addition the type of the specified argument value should match the type specified in the report.json file. If not, a ProgramException will be thrown by Helium. These exceptions can be handled using the standard try catch functionality available in the DSL.

Consider the following example:
    
    
    {
    	"name":"Your Purchases",
    	"referenceName":"Your Purchases",
    	"description":"Your purchases",
    	"rolesAllowed":["Farmer"],
    	"parameters":[
    		{
    			"parameterName":"startDate",
    			"type":"date",
    			...
    		},
    		{
    			"parameterName":"endDate",
    			"type":"date",
    			...
    		},
    		{
    			"parameterName":"shopId",
    			"type":"uuid",
    			...
    		},
    		{
    			"parameterName":"minCost",
    			"type":"string"
    			...
    		}
    	]
    }
    
    
    string downloadPurchases() {
        date startDate = Date:addDays(Mez:now(), -7);
        date endDate = Date:addDays(Mez:now(), 1);
        int minPurchaseAmout = 0;
        uuid shopId = shop._id;
    
        json args = "{}";
        args.jsonPut("startDate", startDate);
        args.jsonPut("endDate", endDate);
        args.jsonPut("shopId", shopId);
        args.jsonPut("minCost", minPurchaseAmout);
    
        Mez:downloadReport(DSL_REPORTS.Your_Purchases, args, DSL_REPORT_FORMAT.Pdf);
    
        return null;
    }

  


  


  


### Report Format

Description| Type| Required  
---|---|---  
The file format of the resulting report download| enum DSL_REPORTS_FORMAT| Yes  
  
The file format for the report download. DSL_REPORTS_FORMAT is a new built-in enum that is available to all apps. The available values are as follows:

  * DSL_REPORTS_FORMAT.Pdf
  * DSL_REPORTS_FORMAT.Xls



  


  


  


### Optional File Name

Description| Type| Required  
---|---|---  
An optional argument for the file name of the resulting download| string| No. If not specified the report name as specified in report.json will be used.  
  
  


  


  


## Report Privileges

The same access restriction for report display / rendering applies to report downloads from DSL code. 

If "rolesAllowed" is specified in the report's report.json file, those access restrictions will also apply to the Mez:downloadReport built-in function.

If Mez:downloadReport is called from the context of a user who does not have access to the report, a ProgramException will be thrown. These exceptions can be handled using the standard try catch functionality available in the DSL.

  


  


  


## Exception Handling

In general, the built-in exception handling provided by the DSL's try catch mechanism can be used to handle exceptions with report generation.

At present, though, SQL exceptions that result from the report's queries cannot be handled in the same way.

  


  


  


## Mez:generateReport

Another option for downloading a report is to use Mez:generateReport first to generate a blob representing the rendered report content and to then download the resulting blob at a later stage using some of the existing file download functionality in Helium Rapid, such as the file browser widget.

The Mez:generateReport built-in function is similar to Mez:downloadReport with the following exceptions:

  * Mez:generateReport does not apply any role restrictions for the report. Blobs can be generated from the context of any user or even scheduled functions.
  * Mez:generateReport will not trigger a download on the frontend as Mez:downloadReport does
  * Mez:genreateReport returns a result containing the report blob and meta data whereas Mez:downloadReport does not return anything



  


  


  


  


## Mez:downloadReport Example

**View code**
    
    
    <table title="table_title.recent_purchases" csvExport="disabled" cols-md="6">
    	    <collectionSource function="getAllShops" />
    	    <searchEnabled function="showSearchOnRecentPurchasesShops"/>
    	    <column heading="column_heading.shop">
    		<attributeName>name</attributeName>
    	    </column>
    			
    	    <rowAction label="button.download_recent_purchases" action="downloadPurchases">
    		<binding variable="shop" />
    	    </rowAction>
    	</table>

**Presenter action**
    
    
    string downloadPurchases() {
        date startDate = Date:addDays(Mez:now(), -7);
        date endDate = Date:addDays(Mez:now(), 1);
        int minPurchaseAmout = 0;
        uuid shopId = shop._id;
    
        json args = "{}";
        args.jsonPut("startDate", startDate);
        args.jsonPut("endDate", endDate);
        args.jsonPut("shopId", shopId);
        args.jsonPut("minCost", minPurchaseAmout);
        Mez:downloadReport(DSL_REPORTS.Your_Purchases_1, args, DSL_REPORT_FORMAT.Pdf);
        return null;
    }

#### View table and download result:

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/194510849/Screenshot%202024-06-06%20at%2011.43.06.png?version=1&modificationDate=1717667141923&cacheVersion=1&api=v2)

![](https://mezzaninewiki.atlassian.net/wiki/download/attachments/194510849/Screenshot%202024-06-06%20at%2011.44.16.png?version=1&modificationDate=1717667118905&cacheVersion=1&api=v2)

[Your Purchases-2.pdf](/wiki/download/attachments/194510849/Your%20Purchases-2.pdf?version=1&modificationDate=1717667234155&cacheVersion=1&api=v2)

  


  


  


## Mez:generateReport

Another option for downloading a report is to use Mez:generateReport first to generate a blob representing the rendered report content and to then download the resulting blob at a later stage using some of the existing file download functionality in Helium Rapid, such as the file browser widget.

The Mez:generateReport built-in function is similar to Mez:downloadReport with the following exceptions:

  * Mez:generateReport does not apply any role restrictions for the report. Blobs can be generated from the context of any user or even scheduled functions.
  * Mez:generateReport will not trigger a download on the frontend as Mez:downloadReport does
  * Mez:generateReport returns a result containing the report blob and meta data whereas Mez:downloadReport does not return anything



The result returned by Mez:generateReport is contained in a non-persistent built-in object called MezReportResult.

  


  


  


## Mez:generateReport Example

**MezReportResult built-on object**
    
    
    object MezReportResult {
    	blob reportData;
    
    	// The following meta fields are added automatically by Helium
    	string reportData_fname__;
    	string reportData_mtype__;
    	int reportData_size__;
    }

**App model object to persist report blob**
    
    
    persistent object GeneratedReport {
    	blob reportData;
    
    	// The following meta fields are added automatically by Helium
    	string reportData_fname__;
    	string reportData_mtype__;
    	int reportData_size__;
    }

  

    
    
    // Arguments required / allowed is the same as for Mez:downloadReport
    MezReportResult reportResult = Mez:generateReport(DSL_REPORTS.Your_Purchases_1, args, farmerPurchasesFormat, fileName);
    
    // Here we populate our persistent object (as defined in the app model) with the blob data from the built-in report result
    // Meta fields are copied automatically
    GeneratedReport generatedReport = GeneratedReport:new();
    generatedReport.reportData = reportResult.reportData;
    generatedReport.save();
    
    

  


  


  


## Additional Mentions and References

Details on other features related to Jasper Reports can be found here:

  * [Lesson 13: Jasper Reports, E-mail Attachments](/wiki/spaces/HTUT/pages/5741994/Lesson+13+Jasper+Reports+E-mail+Attachments)
  * [Lesson 17: Jasper Reports (continued)](/wiki/spaces/HTUT/pages/5736516/Lesson+17+Jasper+Reports+continued)



  


  


  

