# mini-project
Welcome to mini project.

This repo contains the mini projet ( MINI API - Factory worker).

The api is able to :
    * Create a user and list them
    * Create an order with number of figures you want
    * Once the order is emitted, you can create the figures related to the order.
    # Once the api received a API call to create a figure, the API will emit an event, the event is catched by the factory-worker   and create the figure and call the API to updated the status to DONE once the figure is created.
    * When all figures related to an order are DONE, the order is READY and the API publish an event to send a notification ( email, sms)

    This project is not finished yet, we need to :
    * add security : 
        - only user can see his figures and orders, (oauth 2.0, or other solutions-
        - rate limiting with varnish
    * add more test
        - add unit tests
        - add all feature tests
        - add converage test with nyc lib for example
        - add test for the worker
        - add E2E test with worker
    * be more resilient
        - add more details error managment
    * add more logs


# CD
You need to have docker install :
```
    make run 
````
# Test
You need to have docker install :
```
    make test 
````


