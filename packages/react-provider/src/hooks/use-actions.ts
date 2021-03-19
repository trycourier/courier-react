import { sendClickedRequest } from '~/lib/events';
import useCourier from './use-courier';

export default () => {
  const { dispatch, clientKey } = useCourier();
  return {
    handleOnClick: (data) => {
      if (data?.clickedUrl) {
        sendClickedRequest(clientKey, data?.clickedUrl);
      }
    },
    initToast: (payload) => {
      dispatch({
        type: "INIT_TOAST",
        payload
      });
    },

    initInbox: (payload) => {
      dispatch({
        type: "INIT_INBOX",
        payload
      });
    }
  }
}
