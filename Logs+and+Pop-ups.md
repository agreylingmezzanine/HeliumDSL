## Logging Data

The `log`, `warn`, and `error` built-in functions on the `Mez` namespace writes a log message with level INFO, WARNING and SEVERE, respectively. These functions take a **`string`** as parameter, but if it matches a translation key, the translation value will be used. The logging entry is saved in the `__logging_log__` table of your application instance's schema. It will also be available via the [Logging Service](https://mezzaninewiki.atlassian.net/wiki/display/HP/App+Execution+Logging+Service).
    
    
    Mez:log("Hello, World");
    
    
    Mez:warn("translation.key");
    
    
    Mez:error("Invalid value detected.");

## Displaying Pop-ups

`Mez:alert(s)`, `Mez:alertWarn(s)`, and `Mez:alertError(s)` all displays an alert dialog in the UI with the given message. They differ in text color (blue, orange, and red). These functions expect a **`string`** containing a translation key as parameter.
    
    
    Mez:alert("translation.key");
    
    
    Mez:alertWarn("translation.key");
    
    
    Mez:alertError("translation.key");

## Additional Mentions and References

  * [Using the Logging Service](/wiki/spaces/HTUT/pages/5741051/Helium+Logging+Service)
  * [Mez BIFs](https://mezzaninewiki.atlassian.net/wiki/display/HTUT/Quick+Reference#QuickReference-MezBIFs) in the Quick Reference
  * The [last section](https://mezzaninewiki.atlassian.net/wiki/pages/viewpage.action?pageId=5737545#Lesson4:Persistence\(continued\)-ShowinganPop-upMessageWhenYouTrytoRemoveYourself) in Lesson 4 of the Tutorial covers pop-ups


