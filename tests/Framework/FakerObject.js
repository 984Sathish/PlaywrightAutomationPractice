import { faker } from '@faker-js/faker'

class FakerObject {

    get prodName() {
        return faker.commerce.productName()
    }

    get prodDesc() {
        return faker.commerce.productDescription()
    }

    get prodTag() {
        return faker.commerce.productAdjective()
    }

    get stockUnit() {
        return faker.commerce.isbn()
    }

    get manufacturePart() {
        return faker.commerce.productMaterial()
    }

    get categories() {
        return faker.helpers.arrayElement(['Computer', 'Electronics', 'Apparel', 'Digital downloads', 'Books', 'Jewelry', 'Gift Cards'])
    }

    get manufacture() {
        return faker.helpers.arrayElement(['Apple', 'HP', 'Nike'])
    }

    get prodType() {
        return faker.helpers.arrayElement(['Simple', 'Grouped (product with variants)'])
    }

    get custRoles() {
        return faker.helpers.arrayElement(['Administrators', 'Forum Moderators', 'Guests', 'Registered', 'Vendors'])
    }

    get limitStore() {
        return faker.helpers.arrayElement(['Your store name', 'Test store 2'])
    }

    get vendor() {
        return faker.helpers.arrayElement(['Vendor 1', 'Vendor 2'])
    }

    get startDate() {
        return faker.date.past().toUTCString()
    }

    get endDate() {
        return faker.date.future().toUTCString()
    }


    get price() {
        return faker.commerce.price()
    }

    get inventory() {
        return faker.helpers.arrayElement(['Track inventory'])
    }

}

module.exports = { FakerObject }