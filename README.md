# Native Stuff 10

How to use Expo Video (SDK 52) ... amongst other things.

- Note: expo-av is deprecated use expo-video
  - ❌ `import { Video, ResizeMode } from "expo-av";`

## DownloadVideo.js

This just downloads one of the test videos in the KyberVisionAPI. The video is then used in the PlayVideo.js and PlayVideoWithTimeline.js screens.

## PlayVideo.js

my best implementation of the video and listening to playing. In other, words as each second passes of the video playing, it will do an action

## PlayVideoWithTimeline.js

Create a timeline with bubbles for special points in video. Make them like buttons.

### current issues of this screen

- clicking on bubbles restarts videos because they take positionX is based on the little bubble and not the View timeline.

## PlayVideoWithTimeline02.js

Create a timeline with bubbles for special points in video. Make them like buttons.

- Corrects when clicking on bubbles to not start at the beginning

## Gesture01.js

Verify that one screen can have a view with one set of gestures, then overlay an other view on part of the view with a different set of gestures.

## Gesture02.js

Create a video view with a timeline. The Video will have a gesture set, the timeline will have a gesture set that impacts the video playback. The timeline will be sitting on top of the video.
