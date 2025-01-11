  


## Pay Built-In Functions

The `pay` BIF is available on a persistent object instance representing the payment sender, and takes three parameters:

  1. payment recipient
  2. currency code
  3. payment amount



Both the payer and payee needs to have an identifier. Depending on the Helium configuration for payments in the app this can either be a so called "MSISDN" or a mobile number attribute on both the payer and payee objects.

**pay BIF example**
    
    
    farmerPurchase.paymentId = farmer.pay(shop, "KES", farmerPurchase.finalCost);

The `pay` function returns a **`uuid`** that represents the internal Helium id for the payment. This, along with the **`@OnPaymentUpdate`** annotation, can be used to track the payment status in the app.

The `payWithRef` BIF is useful for adding a reference to the Helium core app's payments view. It has two additional parameters:

4\. payment reference  
5\. message string (omit message by providing an empty string)

**payWithRef BIF example**
    
    
    farmerPurchase.paymentId = farmer.payWithRef(
        shop, "KES", farmerPurchase.finalCost, farmerPurchase._id,
        Strings:concat(shop.name, " - ", shop.shopCode)
    );

  


  


  


## @OnPaymentUpdate Annotation for Payment Callback Functions 

Helium processes payments asynchronously. This means that a result of a call to the `pay` function will not be immediately available.

Helium provides a mechanism whereby an app function can be declared as a callback that will be invoked once Helium has an update on the payment status. This is implemented by means of the **`@OnPaymentUpdate`** annotation. Such a callback for payments made without an additional reference is included in the app in the `PaymentCallback` unit under the services folder:
    
    
    @OnPaymentUpdate
    void paymentUpdate(uuid id, PAYMENT_STATUS status, string message){
         
        // Find the associated purchase based on the internal Helium payment ID
        // Ids should be unique so we are only expecting one purchase in the resulting collection
        FarmerPurchase[] farmerPurchases = FarmerPurchase:equals(paymentId, id);
         
        if(farmerPurchases.length() >= 0) {
            FarmerPurchase farmerPurchase = farmerPurchases.first();
             
            // Update the payment status maintained on the farmer purchase
            farmerPurchase.paymentStatus = status;
             
            // Record the time stamp of the update
            farmerPurchase.paymentStatusUpdatedOn = Mez:now();
        }
    }

or payments that were made with an additional reference we can change the function signature as follows:
    
    
    @OnPaymentUpdate
    void paymentUpdateWithRef(uuid id, string reference, PAYMENT_STATUS status, string message){
    .
    .
    }

A summary of the possible `PAYMENT_STATUS` statuses and their meanings follow below.

Status| Description  
---|---  
`Pending`| An initial state indicating that the call to a pay function from the DSL application has been submitted and correctly interpreted by the back-end.  
`Registered`| The payment has been received by the Helium payment framework and is being processed.  
`Failed_Validation`| Processing of a payment contains a step where the provided information used in routing of the payment is validated. In some cases payments can use one of multiple accounts. If, during this step, the configuration for the application is read and applied and no matching account is found, the "Failed_Validation" status is returned.  
`Promise_To_Pay`| The payment is confirmed to be valid and routable and, bar any network or other technical failures, will be paid.  
`Instructed`| Communication has been completed between Helium and the payment gateway.  
`Result_Received`| A result has been received from the payment gateway for processing the status.  
`Confirmed`| Confirmed from the payment gateway result that the payment was a success.  
`Manual`| Confirmed from the payment gateway result that payment was a failure.  
  
  


  


  


## Mez:requestPaymentStatus for Manual Payment Status Requests 

Some payment aggregators are not able to reliably send payment status callbacks to Helium. In such cases payments wil at most progress to the **`Instructed`** state. This means that Helium has successfully sent the payment request to the aggregator, but no further update has been received from the aggregator.

In order to work around this issue, the Helium DSL provides a built-in function that can trigger a payment status request to the aggregator:
    
    
    Mez:requestPaymentStatus(paymentId)

This will trigger a payment status request that is handled asynchronously in the Helium platform. Once a response is received from the aggregator Helium will post that payment status back to the DSL app using the existing mechanism that makes use of the **`__payment_status_record__`** and **`__payment_with_ref_status_record__`** (depending on which built-in function that was used to trigger the payment itself) tables and the **`@OnPaymentUpdate`** annotation.

In the code snippet above, the paymentId value that is sent as argument is the value that is returned by the built-in payment functions. This id represents the value for the **`_id_`** column in the **`__payment_status_record__`** and **`__payment_with_ref_status_record__`** tables that are automatically included in all app schemas.

Note that a payment status request can only be triggered if the following is true:

  * If `commId` in the **`__payment_status_record__`** or **`__payment_with_ref_status_record__`** tables has been populated. The commId column represents a unique communication id between Helium and the aggregator and this value will only be available if the initial payment request to the aggregator was successful.
  * The payment was made using a payment driver that also has support for triggering payment status requests. At the time of writing this functionality is only available for the MTN MoMo and Safaricom M-pesa (Rest, C2B) payment driver. More support will be added in future.



  


## Additional Mentions and References

  * [Lesson 12: Payments, Widget Visiblity#PayBuilt-InFunctions](/wiki/spaces/HTUT/pages/5740726/Lesson+12+Payments+Widget+Visiblity#Lesson12:Payments,WidgetVisiblity-PayBuilt-InFunctions)
  * [Lesson 12: Payments, Widget Visiblity#%40OnPaymentUpdateAnnotationforPaymentCallbackFunctions](/wiki/spaces/HTUT/pages/5740726/Lesson+12+Payments+Widget+Visiblity#Lesson12:Payments,WidgetVisiblity-%40OnPaymentUpdateAnnotationforPaymentCallbackFunctions)
  * [Quick Reference#PersistentEntityBIFs](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-PersistentEntityBIFs)
  * [Quick Reference#FunctionAnnotations](/wiki/spaces/HTUT/pages/5737643/Quick+Reference#QuickReference-FunctionAnnotations)



  


  


  

