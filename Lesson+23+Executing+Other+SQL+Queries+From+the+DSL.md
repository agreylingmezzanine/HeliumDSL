> _As a System Admin I would like to resolve all current service tickets or mark all current service tickets as spam._

  


  


## Lesson Outcomes

By the end of this lesson you should know how to make use of the `sql:execute` built-in function to execute PostgreSQL queries that are not select queries.

  


  


## App Use Case Scenario

The support ticket menu item for the `"System Admin"` user role presents a data wall of service tickets. Each ticket can be individually resolved or marked as spam. The feature described in this lesson allows the user to resolve all current service tickets or mark all current service tickets as spam. A typical way to achieve this in a DSL presenter is to query the database for service tickets using a selector and then looping through the resulting service ticket collection one by one to resolve or mark as spam. A much simpler implementation is to make use of a single update query. This is demonstrated in the remainder of this lesson.

  


  


## New & Modified App Files

**`./web-app/views/user_management/Support.vxml`**

**`./web-app/presenters/user_management/Support.mez`**

**`./web-app/lang/en.lang`**

  


  


## View & Presenter Additions

The only additions needed for this lesson are two new buttons on the `Support` view and two new action functions for these buttons on the `Support `unit in the **`Support.mez`** presenter file. The view additions and skeleton code for our newly added presenter functions are shown below:
    
    
    <button label="button.resolve_all_tickets" action="resolveAllTickets"/>
    <button label="button.mark_all_tickets_as_spam" action="markAllTicketsAsSpam"/>
    
    
    DSL_VIEWS resolveAllTickets() {
    	.
    	.
    	.
        return DSL_VIEWS.Support;
    }
    
    DSL_VIEWS markAllTicketsAsSpam() {
        .
    	.
    	.
        return DSL_VIEWS.Support;
    }

  


  


  


## Query Execution

To update the service tickets we execute the update queries using the `sql:execute` built-in function. Note that the `sql:query` function is specifically for select queries while the `sql:execute` built-in function is specifically for insert, update and delete queries. Only update is demonstrated in this lesson but the others work similarly.

Once again the function requires the query as first argument followed by query parameters values where applicable. As mentioned in [Lesson 22](/wiki/spaces/HTUT/pages/5739546/Lesson+22+Executing+SQL+Select+Queries+From+the+DSL), these parameters are denoted by **`?`** in the query itself and replaced at runtime with the specified values.

The `sql:execute` built-in function returns an integer representing the number of records that were modified. The syntax requires the result of the function to be assigned to a variable and does not allow execution of the `sql:execute` function without this assignment.

Below are the action functions responsible for query execution in their entirety:
    
    
    // Resolve tickets that have not been resolved and not been marked as spam
    DSL_VIEWS resolveAllTickets() {
        string query = "update supportticket set resolved=true where resolved=? and spam=?";
        int updates = sql:execute(query, false, false);
        Mez:alert("alert.tickets_resolved");
        return DSL_VIEWS.Support;
    }
    
    // Mark tickets as spam that have not been marked as such and have not been resolved
    DSL_VIEWS markAllTicketsAsSpam() {
        string query = "update supportticket set spam=true where spam=? and resolved=?";
        int updates = sql:execute(query, false, false);
        Mez:alert("alert.tickets_marked_as_spam");
        return DSL_VIEWS.Support;
    }

  


  


NOTE: Prevent SQL Injection

Ensure to always use the parameter functionality of the `sql:execute` built-in function rather than building a query string via concatenation. Concatenating leaves your code exposed to potential SQL injection which could cause disastrous unintended data manipulation. Using the parameters as demonstrated to the left would prevent any form of [SQL injection](https://medium.com/@V-Blaze/sql-injection-protecting-your-postgresql-database-ce8c0cc43685).

Running Stored Functions and Procedures

It is also possible to run stored PostgreSQL functions and procedures using the `sql:execute` built-in function. Look at this note [here](https://mezzaninewiki.atlassian.net/wiki/spaces/HTUT/pages/5743282/Executing+SQL+Natively#ExecutingSQLNatively-ANoteonFunctionsandProcedures) to see how.

## A Note on Temp Tables

It's important to note that SQL making use of [temporary tables](https://www.postgresql.org/docs/11/sql-createtable.html) are, in most cases, not supported in Helium and in general the use of temporary tables in DSL apps is discouraged. Please see additional notes on this [here](/wiki/spaces/HTUT/pages/5744594/Avoiding+Temp+Tables+with+Native+SQL+Execution).

  


Avoid SQL using temporary tables in DSL apps.





  

