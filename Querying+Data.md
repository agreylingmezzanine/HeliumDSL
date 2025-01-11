  


## Selector Built-in Functions

These functions are available via the object's namespace, e.g. `Person:{function}`.

They can be used to read sets of data from the persistence layer. The final four in the table below (`union`, `diff`, `intersect`, and `and`) can be used to build up a complex selector using a combination of other selector BIFs as parameters. The other selectors all take an object's attribute as first parameter, and one or more values as the next parameter(s).

  


Function| Syntax| Description| Example  
---|---|---|---  
`all`| `Obj:all()`| Returns all records from the table.| `Person[] plist = Person:all();`  
`equals`| `Obj:equals(a,b)`| Returns records with value of `a` equal to `b`.| `Person[] plist = Person:equals(deleted, false);`  
`notEquals`| `Obj:notEquals(a,b)`| Returns records with value of `a` not equal to `b`.| `Person[] plist = Person:notEquals(deleted, true);`  
`empty`| `Obj:empty(a)`| Returns records with `a` equal to **`null`**.| `Person[] plist = Person:empty(mobileNum);`  
`notEmpty`| `Obj:notEmpty(a)`| Returns records with `a` not equal to **`null`**.| `Person[] plist = Person:notEmpty(mobileNum);`  
`between`| `Obj:between(a,x,y)`| Returns records with value of `a` within the range of values between `x` and `y`.| `Person[] plist = Person:between(dob, date1, date2);`  
`notBetween`| `Obj:notBetween(a,x,y)`| Returns records with value of `a` not within the range of values between `x` and `y`.| `Person[] plist = Person:notBetween(dob, date1, date2);`  
`lessThanOrEqual  
`| `Obj:lessThanOrEqual(a,b)`| Returns records with value of `a` less than or equal to `b`.| `Person[] plist = Person:lessThanOrEqual(age, num);`  
`lessThan`| `Obj:lessThan(a,b)`| Returns records with value of `a` less than `b`.| `Person[] plist = Person:lessThan(age, num);`  
`greaterThan`| `Obj:greaterThan(a,b)`| Returns records with value of `a` greater than `b`.| `Person[] plist = Person:greaterThan(age, num);`  
`attributeIn`| `Obj:attributeIn(a,b)`| Returns records with value of `a` matching any of the values `b` (replace `b` with a list of values of the same type as `a`).| `Person[] plist = Person:attributeIn(state, state_list);`  
`notAttributeIn`| `Obj:notAttributeIn(a,b)`| Returns records with value of `a` not matching any of the values `b` (replace `b` with a list of values of the same type as `a`).| `Person[] plist = Person:notAttributeIn(state, state_list);`  
`relationshipIn`| `Obj:relationshipIn(a,b)`| Returns records with a relationship/link between `a` and `b`, with attribute `a` being annotated as **`@OneToMany`** , **`@ManyToOne`** , etc. and `b` a persistent object instance. Attribute `a` can be likened to a foreign key.| `Person[] plist = Person:relationshipIn(reportsTo, person);`  
`notRelationshipIn`| `Obj:notRelationshipIn(a,b)`| Returns records _without_ a relationship/link between `a` and `b`, with attribute `a` being annotated as  **`@OneToMany`** , **`@ManyToOne`** , etc. and `b` a persistent object instance. Attribute `a` can be likened to a foreign key.| `Person[] plist = Person:notRelationshipIn(reportsTo, person);`  
`contains`| `Obj:contains(a,b)`| Returns records with substring `b` found anywhere within value of `a`.| `Person[] plist = Person:contains(name, "a");`  
`beginsWith`| `Obj:beginsWith(a,b)`| Returns records with substring `b` found at the beginning of the value of `a`.| `Person[] plist = Person:beginsWith(name, "a");`  
`endsWith`| `Obj:endsWith(a,b)`| Returns records with substring `b` found at the end of the value of `a`.| `Person[] plist = Person:endsWith(name, "a");`  
`notContains`| `Obj:notContains(a,b)`| Returns records with substring `b` found nowhere within value of `a`.| `Person[] plist = Person:notContains(name, "a");`  
`notBeginWith`| `Obj:notBeginWith(a,b)`| Returns records with substring `b` not found at the beginning of the value of `a`.| `Person[] plist = Person:notBeginWith(name, "a");`  
`notEndsWith`| `Obj:notEndsWith(a,b)`| Returns records with substring `b` not found at the end of the value of `a`.| `Person[] plist = Person:notEndsWith(name, "a");`  
`union`| `Obj:union(selector1(a,b), selector2(x,y))`| Combines the results of two or more selectors. Does not return the same record twice.| `Person[] plist = Person:union(equals(rating, "good"), equals(rating, "excellent"));`  
`diff`| `Obj:diff(selector1(a,b), selector2(x,y))`| Compares the results of two or more selectors and returns only the difference.| `Person[] plist = Person:diff(equals(), equals());`  
`intersect`| `Obj:intersect(selector1(a,b), selector2(x,y))`| Returns records for which all the selectors are true.| `Person[] plist = Person:intersect(equals(deleted, false), equals(active, true));`  
`and`| `Obj:and(selector1(a,b), selector2(x,y))`| Returns records for which all the selectors are true.| `Person[] plist = Person:and(equals(deleted, false), equals(active, true));`  
  
  


  


  


## Data Subsets

Having populated a collection with a selector BIF, you can further refine your selection by assigning a subset of said collection to a new collection by using the `select` BIF. This BIF is available via the collection variable and takes one or a combination of the above selector BIFs as parameter. See the [Collections](/wiki/spaces/HTUT/pages/5738020/Collections) for details.

  


  


  


## Executing SQL

Helium provides functionality to execute SQL natively from the DSL. Details can be found [here](/wiki/spaces/HTUT/pages/5743282/Executing+SQL+Natively).

  


  


## Additional Mentions and References

  * [Quick Reference#SelectorBIFs](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-SelectorBIFs)
  * [Lesson 08: Functions on Collections](/wiki/spaces/HTUT/pages/5738249/Lesson+08+Functions+on+Collections)



  


  


  

