Feature: Ecommerce end to end validation

    @Validation
    Scenario: Place Order Product
    Given Login to valid "sathishsuresh984@gmail.com" and "Satz@984"  
    When Add "Zara coat 3" to cart
    Then Verify "Zara coat 3" is displayed in cart
    When Select country and Place Order
    Then Veirfy Order persent in orderHistory 