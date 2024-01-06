class ApiUtils {

    constructor(apiContext,loginPayload )  
    {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: this.loginPayload
        })
        const JsonloginResponse = await loginResponse.json()
        const token = JsonloginResponse.token
        console.log('token: '+token)
        return token
    }


    async createOrder(orderPayLoad){

        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
    {

        data: orderPayLoad,
        headers: {
            'Authorization': await this.getToken(),
            'Content-Type' : 'application/json'        
        }
    })

    const orderResponseJson = await orderResponse.json()
    const orderId = orderResponseJson.orders[0]
    console.log('order id: '+orderId)
   
    return orderId
    }

    async createOrder2(orderPayLoad){

        const response = {}
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
    {

        data: orderPayLoad,
        headers: {
            'Authorization': response.token,
            'Content-Type' : 'application/json'        
        }
    })

    const orderResponseJson = await orderResponse.json()
    const orderId = orderResponseJson.orders[0]
    console.log('order id: '+orderId)
    response.orderId = orderId
    
    return response
    }

}

module.exports = {ApiUtils}