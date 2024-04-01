type VideoPlayerProps = {
  videoLink: string;
  posterImage: string;
}

export default function VideoPlayer({videoLink, posterImage}: VideoPlayerProps) {
  return(
    <video src={videoLink} poster={posterImage} muted loop></video>
  );
}
