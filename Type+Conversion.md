## Converting To String

Assigning a non-**`string`** value to a **`string`** variable implicitly converts the value to **`string`**.
    
    
    int i = 12; string s = i; //int to string
    decimal d = 12.34; string s = d; //decimal to string

## Converting From String

To convert from string to another primitive, use the `fromString(s)` BIFs available on the corresponding data type namespace.

**to int**
    
    
    string s = "12"; int i = Integer:fromString(s);

**to decimal**
    
    
    decimal d = Decimal:fromString("12.34");

**to uuid**
    
    
    uuid id = Uuid:fromString(user._id);
    
    
    date d = Date:fromString("2017-01-02");

For converting from string to **`datetime`** , use `Date:fromTimeString(s)`:
    
    
    datetime dt = Date:fromTimeString("2017-1-20 08:45:12 GMT");

## Additional Mentions and References

  * [Quick Reference#TypeConversion](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-TypeConversion)


