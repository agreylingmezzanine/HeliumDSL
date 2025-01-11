## Creating Scheduled Functions

#### `@Scheduled`

Function annotation which specifies a scheduled task to run at a certain interval.
    
    
    // Run at 2:15 AM every day
    @Scheduled("15 2 * * *")
    void foobar() { ... }
     
    // Run at 06:00 every week-day  (days 1 to 5)
    @Scheduled("0 6 * * 1-5")
    void foobar() { ... }
    
    // Run every ten minutes
    @Scheduled("*/10 * * * *")
    void foobar() { ... }

To summarize the schedule string format: 
    
    
    "minute hour day-of-month month day-of-week"

## Inspecting Scheduled Function Results

#### The `__scheduled_function_result__` Built-in Object

The `__scheduled_function_result__` object represents scheduled function results from Helium that are duplicated in the app schema for easy access to app developers. Records belonging to this object can be queried using the standard selectors.
    
    
    @NotTracked
    persistent object __scheduled_function_result__ {
        datetime datetimestampStarted;
        datetime datetimestampFinished;
        string qualifiedName;
        string schedule;
        string error;
        string stackTrace;
        bool success;
    }

#### @OnScheduledFunctionResultUpdate

Used to annotate a function that will be used as a callback function by Helium when there is any update on scheduled function results. The annotation cannot be used in conjunction with other function annotations and the function must take exactly one parameter of type `__scheduled_function_result__`.
    
    
    @OnScheduledFunctionResultUpdate
    void scheduledFunctionResultUpdateCallback(__scheduled_function_result__ scheduledFunctionResult) {
        if(scheduledFunctionResult.success == false) {
            FailedScheduledFunction failedScheduledFunction = FailedScheduledFunction:new();
            failedScheduledFunction.failureRecordedOn = Mez:now();
            failedScheduledFunction.scheduledFunctionResultId = scheduledFunctionResult._id;
            failedScheduledFunction.save();
        }
    }

Note that duplicating the data from the `__scheduled_function_result__` object in the above code snippet is done purely for demonstration purposes. Records from this object can be queried directly without needing to duplicate the data into a custom object.

## Additional Mentions and References

  * [Lesson 10: Scheduled Functions, Flow Control, Basic Messaging#ScheduledFunctions](/wiki/spaces/HTUT/pages/5735034/Lesson+10+Scheduled+Functions+Flow+Control+Basic+Messaging#Lesson10:ScheduledFunctions,FlowControl,BasicMessaging-ScheduledFunctions)
  * [Quick Reference#FunctionAnnotations](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-FunctionAnnotations)
  * [Quick Reference#Built-inObjects](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-Built-inObjects)


