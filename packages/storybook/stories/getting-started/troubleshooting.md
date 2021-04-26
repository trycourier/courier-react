## Troubleshooting

1. My Toast Message doesn't appear?!

If your message doesn't show up after making a Send request, the first thing we want to do is make sure we are connected via WebSockets.

Open your Dev Console to the **Network Tab** and click the **WS** button show below to verify the following information.

![image](https://user-images.githubusercontent.com/7017640/116160234-81f48600-a6a6-11eb-9b0e-d2c4c743ecf7.png)

From here, click "Messages" and you should see a "subscribe" call. This should contain your Client Key and your User Id. Make sure these match with the information being sent.

![image](https://user-images.githubusercontent.com/7017640/116160440-e1eb2c80-a6a6-11eb-8e66-c2e537ea8489.png)

After making the _Send_ request, we can see the incoming message like the following screenshot:

![image](https://user-images.githubusercontent.com/7017640/116160727-6c339080-a6a7-11eb-8ce6-f889a6342e21.png)
