const base = require('@playwright/test')

exports.customtest = base.test.extend({

    testDataForOrder: {
        "userName": "sathishsuresh984@gmail.com",
        "password": "Satz@984",
        "productName": "iphone 13 pro"
    }
}
)