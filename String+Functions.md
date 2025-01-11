  


## String Functions

These are built-in functions available on the `String` namespace.

#### `concat`

Returns a string value that is the concatenated result of two or more arguments passed to the function. Null values are treated as empty strings.

  

    
    
    string s = String:concat("abc","def");

#### `split`

Returns an array of string values that represent the tokens from the value expression that are separated by the separator expression.

> Note that in order to split a special character such as '|', one needs to escape the string with a '\' character. The '\' may need to be escaped as well, so in this case one will end up with String:split(someText, "\\\|").
    
    
    string[] result = String:split("abc def", " ");
    string first = result.get(0); //first = "abc"
    string second = result.get(1); //second = "def"

#### `length`

Returns the length of the string argument.
    
    
    int i = String:length("Hello world");

#### `substring`

Substring of a string based on index positions.
    
    
    string s = String:substring("Hello World", 1, 4); //s = "ello"

#### `lower`

Convert string to lowercase.
    
    
    string s = String:lower("Hello World"); //s = "hello world"

#### `upper`

Convert string to uppercase.
    
    
    string s = String:upper("Hello World"); //s = "HELLO WORLD"

#### `startsWith`

Check if the beginning part of a string matches another string.
    
    
    bool b = String:startsWith("Hello World", "Hello"); //b = true

  


#### `endsWith`

Check if the ending part of a string matches another string.
    
    
    bool b = String:endsWith("Hello World", "World"); //b = true

#### `indexOf`

Returns the index within this string of the first occurrence of the specified substring.
    
    
    int i = String:indexOf("Hello World", "llo W"); //i = 2

If the second string argument cannot be found within the first, a value of **null** is returned.

  


#### `join`

Joins a collection of strings into one result string with the specified join character.
    
    
    string[] strings;
    strings.append("abc");
    strings.append("def");
    string s = String:join(strings, " "); //s = "abc def"

  


#### `translate`

Fetches the translation from the **`lang`** file using the argument as key.

**en.lang**
    
    
    message.default_warning = You've been warned.
    
    
    string s = String:translate("message.default_warning"); //s = "You've been warned."

  


#### `regexMatch`

Compares a string with a regular expression and returns (boolean) `true` if it matches.
    
    
    if (String:regexMatch("27000111abc","^27[0-9]{9,}$") == false) {
    	Mez:alertError("alert.invalid.phonenum");
    }

  


The behaviour of the regexMatch in Helium is consistent with that of the java.util.regex implementation, so it is advised to consult the [java.util.regex JavaDoc](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) when troubleshooting. Take particular note of the following:

> Backslashes within string literals in Java source code are interpreted as required by The Java™ Language Specification as either Unicode escapes (section 3.3) or other character escapes (section 3.10.6) It is therefore necessary to double backslashes in string literals that represent regular expressions to protect them from interpretation by the Java bytecode compiler. The string literal "\b", for example, matches a single backspace character when interpreted as a regular expression, while "\\\b" matches a word boundary. The string literal "\\(hello\\)" is illegal and leads to a compile-time error; in order to match the string (hello) the string literal "\\\\(hello\\\\)" must be used.  
> 

This means, for example, that while online regex validators will accept a curly bracket escaped by a single backslash as valid, it need to be escaped with a double backslash in the DSL. For example:
    
    
    bool b = String:regexMatch("trying {out} regex", ".*\\{out\\}.*"); //true

Another example is when attempting to using the literal period ('.'). In such case, since period is a metacharacter representing wild card matches, it will need to be "double escaped" when used in a regular expression match in the DSL.

  


#### `regexReplaceFirst`

Matches a regex within a source string and replaces the first match with a replacement value.

Note that the same rules as mentioned before regarding escaping of characters applies here.
    
    
    string result = String:regexReplaceFirst("ab32c56desd111", "[0-9]", "X"); //abX2c56desd111

  


#### `regexReplaceAll`

Matches a regex within a source string and replaces all matches with a replacement value.

Note that the same rules as mentioned before regarding escaping of characters applies here.
    
    
    string result = String:regexReplaceAll("ab32c56desd111", "[0-9]", "X"); //abXXcXXdesdXXX

#### `replaceAll`

Matches a value within a source string and replaces all matches with a replacement value.
    
    
    string result = String:replaceAll("Hello World", "l", "L"); //HeLLo WorLd

  


#### `urlEncode`

Encodes the given argument into the HTML form encoding (UTF-8).
    
    
    string encodedNames = String:urlEncode("First Last Names");
    // encodedNames = First+Last+Names
    
    string encodedTest = String:urlEncode("The string ü@foo-bar");
    // encodedTest = The+string+%C3%BC%40foo-bar

Helium will always encode the given argument into the UTF-8 format. The following rules apply to the encoding:

  * The alphanumeric characters "`a`" through "`z`", "`A`" through "`Z`" and "`0`" through "`9`" remain the same.
  * The special characters "`.`", "`-`", "`*`", and "`_`" remain the same.
  * The space character " " is converted into a plus sign "`+`".
  * All other characters are unsafe and are first converted into one or more bytes using some encoding scheme. Then each byte is represented by the 3-character string "`%_xy_`", where _xy_ is the two-digit hexadecimal representation of the byte.



  


## Additional Mentions and References

  * [Quick Reference#StringBIFs](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-StringBIFs)
  * [Lesson 05: Model Objects, Enums#MakingUseOfStringBuiltInFunctions](/wiki/spaces/HTUT/pages/5739185/Lesson+05+Model+Objects+Enums#Lesson05:ModelObjects,Enums-MakingUseOfStringBuiltInFunctions)



  


  


  

