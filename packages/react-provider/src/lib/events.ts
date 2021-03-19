import { COURIER_CLIENT_HEADER } from "../constants";

export function sendClickedRequest(clientKey, clickedUrl) {
  if (clientKey && clickedUrl) {
    fetch(`${clickedUrl}`, {
      method: "POST",
      headers: {
        [COURIER_CLIENT_HEADER]: clientKey,
      },
    });
  }
}

export function sendReadRequest(clientKey, readUrl) {
  if (clientKey && readUrl) {
    fetch(`${readUrl}`, {
      method: "POST",
      headers: {
        [COURIER_CLIENT_HEADER]: clientKey,
      },
    });
  }
}