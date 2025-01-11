> _As a Shop Owner I want to do bulk updates to my stock levels by uploading CSV files, however I want every line to be added regardless of whether other lines have failed._

  


  


## Lesson Outcomes

By the end of this lesson you should:

  * Know how use CSV batch processing to process each line an a CSV file individually
  * Know how to use exception handling in the DSL to prevent a single invalid line in a CSV file from preventing the entire file from being processed.



  


  


  


## New & Modified App Files

**`./model/objects/CsvException.mez`**

**`./web-app/lang/en.lang`  
**

**`./web-app/presenters/StockLevelsUpdate.mez`  
**

**`./web-app/views/StockLevelsUpdate.vxml`**

  


  


  


## Standard CSV Processing vs Batch CSV Processing

Standard CSV Processing parses the entire blob object that represents the **.csv** file and results in a collection of object instances. If one invalid line is present in the CSV file, the entire process would halt and throw an error. This provides an added layer of protection when uploading a large amount of data that relates to each other. Everything is therefore dependent that everything else in the file processes correctly.

Batch CSV Processing, however, parses each line in the **.csv** file individually allowing developers to add their own exception handling for the cases when a single line fails. This is more applicable to files where each line represents its own individual identity and can be processed regardless of the status of the other lines in the file.

See [here](https://wiki.mezzanineware.com/display/HTUT/CSV+Processing) for more information on CSV Processing in Helium.

  


  


## Updating the old CSV upload

To demonstrate the difference between how CSV files are processed in Helium, we're just going to update the CSV processing already put in place during [Lesson 9](https://wiki.mezzanineware.com/display/HTUT/Lesson+9%3A+CSV+Upload+and+Parsing). We will also use some exception handling to illustrate how developers can have more control over their applications by allowing the program to still flow in a logical fashion even when an exception might be encountered.

While the Standard CSV Pocessing uses only one step, one built-in function (the fromCsv() function) that process the entire CSV file, Batch CSV Processing uses multiple steps.

  * First the `Mez:createBatch` built-in function is used to create a batch from a blob representing a valid CSV file. 
  * The built-in **`MezBatch`** and **`MezBatchItem`** objects are used to store the created batch.
  * The created batch can then be processed item by item using the `fromCsvLine()` built-in function.



We're going to update the `saveStockUpdate()`function in the **`StockLevelsUpdate.mez`** file as follows:

**presenter snippet (StockLevelsUpdate.mez)**
    
    
    void saveStockUpdate() {
    	//Create a batch from the uploaded csv file
    	MezBatch stockUpdateBatch = Mez:createBatch(fileUpload._id, fileUpload.data);
    
    	// Get the batch items related to the batch being processed
    	MezBatchItem[] stockUpdateBatchItems = MezBatchItem:relationshipIn(batch, stockUpdateBatch);
    
    	// Results from CSV processing will be stored in this collection
    	StockUpdate[] stockUpdates;
    
    	// Iterate over the batch items and process one by one using fromCsvLine
    	foreach(MezBatchItem stockUpdateBatchItem: stockUpdateBatchItems) {
    		//Create a stockUpdate instance for each MezBatchItem line
            StockUpdate stockUpdate = StockUpdate:fromCsvLine(stockUpdateBatch.header, stockUpdateBatchItem.value);
    		stockUpdate.stocktakeDate = selectedDateOfStocktake;
    		stockUpdate.shop = selectedShop;
    		stockUpdate.stock = getStockFromName(stockUpdate.stockName);
    		stockUpdate.save();
    		stockUpdates.append(stockUpdate);
    
            // Once a batch item has been successfully processed it can be marked as such
            stockUpdateBatchItem.processed = true;
    	}
    	Mez:alert("alert.uploaded_data_saved");
    	fileUpload = FileUpload:new();
    }

As described before, we first create a **`MezBatch`** instance from the uploaded file which creates a **`MezBatchItem`** instance for every line in that file and has a relationship to the created **`MezBatch`** (go read more [here](https://wiki.mezzanineware.com/display/HTUT/Batch+CSV+Processing) about these objects and Batch CSV Processing). Secondly, we populate a list of **`MezBatchItem`** instances by finding those with a relationship to the created **`MezBatch`**. Thirdly, we loop over this list of **`MezBatchItem`** instances and process each one with the `fromCsvLine()` function, contrary to before where we used the `fromCsv()` function to process the entire file.

This works just fine, but doesn't leverage the usefulness of processing each line individually and finding or handling issues or exceptions.

VERY IMPORTANT

These objects are persistent.  
Creating them will persist to the database.

If you expect/do regular csv uploads on your application please take note that these **`MezBatch`** and **`MezBatchItem`**` `records will be added to you schema.  
  
It is advisable that you clear these tables often to ensure your schema doesn't grow needlessly large.

  


  


## Exception Handling

Often developers can predict scenarios which might cause issues or errors in their programs and they will attempt to avoid these scenarios as much as possible. However, sometimes they are unavoidable and even very likely to happen but you'd rather not have the entire application crash as a result. Exception handling enables programmers to cater for these scenarios and override the normal program flow during runtime when these exceptions occur. You can find more about Exception Handling in Helium [here](https://wiki.mezzanineware.com/display/HTUT/Exception+Handling#space-menu-link-content) but in this lesson we're going to stick to a simpler example.

When trying to process each **`MezBatchItem`** instance in the function above, we want to catch any issues that might occur as Helium attempts to create a `StockUpdate` instance using the `fromCsvLine()` function. Helium provides exactly this functionality in a [Try Catch Block](https://wiki.mezzanineware.com/display/HTUT/Exception+Handling#ExceptionHandling-UsingaTryCatchBlock) which allows the other instances to continue processing without halting the entire application in the middle of processing the CSV file.

**presenter snippet (StockLevelsUpdate.mez)**
    
    
    void saveStockUpdate() {
    	MezBatch stockUpdateBatch = Mez:createBatch(fileUpload._id, fileUpload.data);
    
    	// Get the batch items related to the batch being processed
    	MezBatchItem[] stockUpdateBatchItems = MezBatchItem:relationshipIn(batch, stockUpdateBatch);
    
    	// Results from CSV processing will be stored in this collection
    	StockUpdate[] stockUpdates;
    
    	// Iterate over the batch items and process one by one using fromCsvLine
    	foreach(MezBatchItem stockUpdateBatchItem: stockUpdateBatchItems) {
        	try{
            	StockUpdate stockUpdate = StockUpdate:fromCsvLine(stockUpdateBatch.header, stockUpdateBatchItem.value);
    			stockUpdate.stocktakeDate = selectedDateOfStocktake;
    			stockUpdate.shop = selectedShop;
    			stockUpdate.stock = getStockFromName(stockUpdate.stockName);
    			stockUpdate.save();
    			stockUpdates.append(stockUpdate);
    
            	// Once a batch item has been successfully processed it can be marked as such
            	stockUpdateBatchItem.processed = true;
        	}
        	catch(exception) {
            	// Handle the exception by logging it and creating a follow up task
            	handleException(stockUpdateBatch, stockUpdateBatchItem, exception.message);
        	}
    	}
    	Mez:alert("alert.uploaded_data_saved");
    	fileUpload = FileUpload:new();
    }

This Try Catch Block will attempt to complete everything in the `try{}` code block from top to bottom, and if it encounters any Helium exceptions, it will jump immediately to the `catch{}` block to continue with processing until the entire function is resolved. Please note that the `handleException() `function in the `catch{}` block above has not yet been declared. Also that the `exception` caught in the `catch{}` block has [several values](https://wiki.mezzanineware.com/display/HTUT/Exception+Handling#ExceptionHandling-HandlingtheException) that can be used and here we are using the `message` value.

For our application we would like to display any exceptions that might occur to the Shop Owner so that they can rectify it and upload these corrections in a new csv file. We're going to give them a message explaining just that and show a table indicating exactly what was the exception. First we'll add a non-persistent object to the model that can logically house these exceptions temporarily as we don't want to keep these messages for use outside of their session.

**CsvException object**
    
    
    object CsvException {
    	string lineNumber;
        string header;
        string value;
        string exception;
    }

Then we can declare the `handleException()` function implemented in the `catch{}` block above, also adding a list (`unprocessedItems`) to the presenter that will house these exceptions and a boolean value (`showExceptions`) to toggle the table in the view which shows these exceptions to the user.

**presenter snippet (StockLevelsUpdate.mez)**
    
    
    unit StockLevelsUpdate;
    
    CsvException[] unprocessedItems;
    bool showExceptions;
    
    // Init function to initialize unit variables
    void init() {
    	showExceptions = false;
    	...
    }
    
    void saveStockUpdate() {
    	unprocessedItems.clear();
    	...
    	if (unprocessedItems.length() > 0) {
    		Mez:alert("alert.uploaded_data_saved_with_exc");
    		showExceptions = true;
    	} else {
    		Mez:alert("alert.uploaded_data_saved");
    		showExceptions = false;
    	}
    	fileUpload = FileUpload:new();
    }
    ...
    
    void handleException(MezBatch updateBatch, MezBatchItem updateItem, string exception){
    	//Mark that the MezBatchItem has not been processed successfully
    	updateItem.processed = false;
    	//Log the exception
    	Mez:log(exception);
    	//Add to exception list to display to User
    	CsvException item = CsvException:new();
    	item.lineNumber = updateItem.lineNumber;
    	item.header = updateBatch.header;
    	item.value = updateItem.value;
    	item.exception = exception;
    	unprocessedItems.append(item);
    }
    
    

The view just gets an added table that displays the `unprocessedItems` when the `showExceptions` is true.

**view snippet (StockLevelsUpdate.vxml)**
    
    
        <table>
          <visible variable="showExceptions"/>
          <collectionSource variable="unprocessedItems"/>
          <column heading="column_heading.header">
            <attributeName>header</attributeName>
          </column>
          <column heading="column_heading.value">
            <attributeName>value</attributeName>
          </column>
          <column heading="column_heading.exception">
            <attributeName>exception</attributeName>
          </column>
        </table>

This would be an example of what your application should look like then.

![](https://mezzaninewiki.atlassian.net/wiki/download/thumbnails/5735521/image2020-7-7_11-48-1.png?version=1&modificationDate=1594122482573&cacheVersion=1&api=v2&width=767&height=400)

As can be seen in the values, the user attempted to add values for level and price which could not be formatted to the expected column type. Instead of the whole csv processing throwing an error, only two lines failed and have to be corrected before uploading again while the other 8 were successfully persisted. Remember to update the **`en.lang`** file with the new translations and see the attached source code for any omitted parts if necessary.

Take note that, at present, exceptions resulting from SQLException cannot be handled by the try catch statement.

  


  


## Further Reading

Read more about CSV Processing here: [CSV Processing](/wiki/spaces/HTUT/pages/5735222/CSV+Processing), specifically [Batch CSV Processing](/wiki/spaces/HTUT/pages/5737248/Batch+CSV+Processing)

Read more about Exception Handling here: [Exception Handling](/wiki/spaces/HTUT/pages/5735597/Exception+Handling)

  


  


  






  

