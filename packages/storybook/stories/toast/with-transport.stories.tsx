import React, { useCallback, useEffect, useState } from "react";

import { Toast } from "@trycourier/react-toast";
import { CourierTransport, CourierProvider } from "@trycourier/react-provider";
import { Button, Input, Label } from "./styled";

export default {
  title: "Toast/Transport",
  component: Toast,
};

function tenantIdToClientKey(tenantId: string) {
  const buffer = Buffer.from(tenantId);
  return buffer.toString("base64");
}

export function CreateEvent() {
  const [subScribeChannel, setSubscribeChannel] = useState();
  const [subscribeEvent, setSubscribeEvent] = useState();
  const [transport, setTransport] = useState<any>(null);

  useEffect(() => {
    const courierTransport = new CourierTransport({
      wsOptions: {
        url: process.env.WS_URL,
      },
      clientKey: tenantIdToClientKey("a13941cb-d496-4bef-9112-1091841ce4f6"),
    });
    setTransport(courierTransport);
  }, []);

  const createTestEvent = useCallback(() => {
    transport.send({
      action: "notify",
      data: {
        channel: subScribeChannel,
        event: subscribeEvent,
        message: {
          title: "Success!",
          body: "We sent a toast with a websocket",
        },
      },
    });
  }, [subScribeChannel, subscribeEvent, transport]);
  const unsubscribe = useCallback(
    (channel, event) => {
      transport.unsubscribe(channel, event);
    },
    [transport]
  );
  const subscribe = useCallback(
    (channel, event) => {
      transport.subscribe(channel, event);
    },
    [transport]
  );
  return (
    <CourierProvider transport={transport}>
      <Toast />
      <CourierTransportExample
        subscribe={subscribe}
        unsubscribe={unsubscribe}
        channel={subScribeChannel}
        setSubscribeChannel={setSubscribeChannel}
        setSubscribeEvent={setSubscribeEvent}
        event={subscribeEvent}
        createTestEvent={createTestEvent}
      />
    </CourierProvider>
  );
}

function CourierTransportExample({
  createTestEvent,
  subscribe,
  unsubscribe,
  channel,
  event,
  setSubscribeEvent,
  setSubscribeChannel,
}) {
  const [unsubscribeChannel, setUnsubscribeChannel] = useState();
  const [unsubscribeEvent, setUnsubscribeEvent] = useState();
  return (
    <div>
      <Button onClick={createTestEvent}>Send Event</Button>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            maxWidth: 200,
            marginRight: 20,
          }}
        >
          <Label>Channel</Label>
          <Input
            placeholder="Channel"
            value={channel}
            onChange={(e) => setSubscribeChannel(e.target.value)}
          />
          <Label>Event</Label>
          <Input
            placeholder="Event"
            value={event}
            onChange={(e) => setSubscribeEvent(e.target.value)}
          />
          <Button onClick={() => subscribe(channel, event)}>Subscribe</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            maxWidth: 200,
          }}
        >
          <Label>Channel</Label>
          <Input
            placeholder="Channel"
            value={unsubscribeChannel}
            onChange={(e) => setUnsubscribeChannel(e.target.value)}
          />
          <Label>Event</Label>
          <Input
            placeholder="Event"
            value={unsubscribeEvent}
            onChange={(e) => setUnsubscribeEvent(e.target.value)}
          />
          <Button
            onClick={() => unsubscribe(unsubscribeChannel, unsubscribeEvent)}
          >
            Unsubscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
