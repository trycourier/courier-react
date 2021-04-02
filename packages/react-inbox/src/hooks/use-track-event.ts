import { useMutation } from 'urql';

export const TRACK_EVENT = `
  mutation TrackEvent($trackingId: String!) {
    trackEvent(trackingId: $trackingId) {
      id
    }
  }
`;


const useTrackEvent = () => {
  return useMutation(TRACK_EVENT);
};

export default useTrackEvent;
