// Load the library and kick off initializing thereof
$.ajax({
    url: "https://www.gstatic.com/charts/loader.js",
    dataType: 'script',
    success: initLibs,
    async: true
});

function initLibs() {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(loadPurchaseValueReport);
}

function loadPurchaseValueReport() {
    $.ajax({
        type: "GET",
        url: "/web-api/services/app/exec/v1/purchase/report/product/value?hsid=" + ${hsid},
        dataType: "json",
        success: function(data) {
            var result = {};
            result["purchaseValue"] = data;
            loadPurchaseQuantityReport(result);
        },
        async: true
    });
}

function loadPurchaseQuantityReport(dataConcat) {
    $.ajax({
        type: 'GET',
        url: '/web-api/services/app/exec/v1/purchase/report/product/quantity?hsid=' + ${hsid},
        dataType: 'json',
        success: function(data) {
            dataConcat["purchaseQuantity"] = data;
            loadPurchasePerFarmerReport(dataConcat);
        },
        async: true
    });
}

function loadPurchasePerFarmerReport(dataConcat) {
    $.ajax({
        type: 'GET',
        url: '/web-api/services/app/exec/v1/purchase/report/farmer/value?hsid=' + ${hsid},
        dataType: 'json',
        success: function(data) {
            dataConcat["purchasePerFarmer"] = data;
            console.log(dataConcat);
            drawChart(dataConcat);
        },
        async: true
    });
}

function drawChart(data) {
    // Draw the sales per stock item value pie chart
    var purchaseValueData = new google.visualization.DataTable();
    purchaseValueData.addColumn('string', 'Stock Item');
    purchaseValueData.addColumn('number', 'Value Sold');
    
    Object.keys(data["purchaseValue"]).forEach(function(key) {
        value = data["purchaseValue"][key];
        purchaseValueData.addRow([key, value]);
    });
    
    var purchaseValueDataOptions = {
        'title':'Total Sales Value Per Stock Item',
        'width': 600,
        'height': 400,
        'pieHole': 0.4
    };
    
    var pieChart = new google.visualization.PieChart(document.getElementById('salesValuePerStockItem'));
    pieChart.draw(purchaseValueData, purchaseValueDataOptions);
    
    // Draw the sales per stock item quantity pie chart
    var purchaseQuantityData = new google.visualization.DataTable();
    purchaseQuantityData.addColumn('string', 'Stock Item');
    purchaseQuantityData.addColumn('number', 'Quantity Sold');
    
    Object.keys(data["purchaseQuantity"]).forEach(function(key) {
        value = data["purchaseQuantity"][key];
        purchaseQuantityData.addRow([key, value]);
    });
    
    var purchaseQuantityDataOptions = {
        'title':'Total Sales Quantity Per Stock Item',
        'width': 600,
        'height': 400,
        'pieHole': 0.4
    };
    
    var pieChart = new google.visualization.PieChart(document.getElementById('salesQuatityPerStockItem'));
    pieChart.draw(purchaseQuantityData, purchaseQuantityDataOptions);
    
    // Draw the sales value per farmer column chart
    var purchasesPerFarmerData = new google.visualization.DataTable();
    purchasesPerFarmerData.addColumn('string', 'Farmer');
    purchasesPerFarmerData.addColumn('number', 'Purchases');
            
    Object.keys(data["purchasePerFarmer"]).forEach(function(key) {
        value = data["purchasePerFarmer"][key];
        purchasesPerFarmerData.addRow([key, value]);
    });

    var purchasesPerFarmerOptions = {
        'title':'Total Purchases Value Per Farmer',
        'width': 600,
        'height': 400
    };
    
    var columnChart = new google.visualization.ColumnChart(document.getElementById('purchasesPerFarmer'));
    columnChart.draw(purchasesPerFarmerData, purchasesPerFarmerOptions);
}