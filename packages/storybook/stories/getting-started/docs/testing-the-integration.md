## Testing The Integration

Now that we have the **Frontend** setup and the **Studio** setup, we should be able to test the entire integration by sending a **Toast**. In this section, we will go back to the Courier Designer Studio, Create a Test Event, trigger a _Send_ request and verify a Message pops up in your web application.

1.  Navigate back to the Notification we recently created, or to the [**Notification List**](https://app.courier.com/designer/notifications) and select our Template.
2.  Let's create a Test Event. This will emulate what is send in a HTTPS POST request to Courier's backend. Below is an example of the "Brand Published" Test Event.

![image](https://user-images.githubusercontent.com/7017640/116159416-0cd48100-a6a5-11eb-9ebd-73a535429d5b.png)

> Note the USER_ID here, this is **VERY IMPORTANT** as this tells the Send request who we want to deliver the In-App Message to. If your Send request does **NOT** include `profile.courier.channel`, the message will not send.

3. Now we should have access to the Send Tab. Again, make sure the `profile.courier.channel` matches the `userId` and click "Send Notification". In our example, the Courier UI is the UI that we integrated the Courier Components into so when we clicked "Send Notification" ~ you can see our "Brand Published" event :).

![image](https://user-images.githubusercontent.com/7017640/116159782-b3b91d00-a6a5-11eb-8521-13c51e9586f6.png)

![image](https://user-images.githubusercontent.com/7017640/116159952-00045d00-a6a6-11eb-9784-8f0fd174cde3.png)
