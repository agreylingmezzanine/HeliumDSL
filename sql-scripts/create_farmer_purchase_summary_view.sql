DO $$ BEGIN
    PERFORM __he_delete_table_or_view__('farmerpurchasesummary');
END $$;
CREATE MATERIALIZED VIEW farmerpurchasesummary AS 
SELECT 
farmerpurchase._id_, current_date, purchasedon, quantity, unitprice, goodscost, discount, finalcost, paymentstatusupdatedon, paymentstatus, paymentid, stock.name AS stockname, stock.stocktype AS stocktype, farmer.firstname || ' ' || farmer.lastname AS farmernames, farmer.mobilenumber AS farmermobilenumber, shop.shopcode AS shopcode, shop.name AS shopname 
FROM farmerpurchase 
LEFT JOIN stock on farmerpurchase.stock_fk = stock._id_ 
LEFT JOIN farmer on farmerpurchase.farmer_fk = farmer._id_
LEFT JOIN shop on farmerpurchase.shop_fk = shop._id_;