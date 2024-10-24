import { TwitchClip } from "react-twitch-embed";
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from "react-player/types/lib";

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

export interface Clip {
  clip: string,
  date?: string,
  user?: {
    username?: string
  }
}

const ClipViewer = ({clip}: {clip: Clip}) => {
  return (
      <>
        {
          ((clip?.clip).includes('twitch.tv/'))
          ? <TwitchClip className="w-[100%] h-[auto] aspect-video" clip={clip?.clip.split('/').at(-1) as string} autoplay muted/>
          : <ReactPlayer className="w-[100%] h-[auto] aspect-video" width='100%' height='auto' url={clip?.clip} controls autoplay muted/>
        }
      </>
  );
};

export default ClipViewer;