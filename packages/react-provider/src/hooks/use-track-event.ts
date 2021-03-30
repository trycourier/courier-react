import { useMutation } from 'urql';

const TRACK_EVENT = `
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
