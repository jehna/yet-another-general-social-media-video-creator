# Yet-Another-General-Social-Media-Video creator v1.0 📼

> Because there wasn't a simple enough tool for the job

So this command-line script converts your videos to square format, adds blurred
background and additionally inserts a couple lines of text.

## Getting started

To use this repo, you must have `ffmpeg` with font support installed. Easiest
way to install it on MacOS is to type:

```
brew install ffmpeg --with-freetype
```

This installs the latest `ffmpeg` video tool with font support.

Next up you'll need to clone this repository:

```
git clone git@github.com:jehna/yet-another-general-social-media-video-creator.git
cd yet-another-general-social-media-video-creator
```

This clones the project to your local machine so you can run it.

Next up we can run the script itself:

```
node run.js --top-text='some boring' --bottom-text='caption to this video' yourvideo.mp4 output.mp4
```

This takes input from `yourvideo.mp4`, adds blurred background and texts, and
outputs the result to `output.mp4`. The result looks something like this:

![Screenshot](https://raw.githubusercontent.com/jehna/yet-another-general-social-media-video-creator/master/screenshot.png)

## Features

So, very simply this is a command-line script to `ffmpeg` that:

- Converts video to square
- Resizes to 640x640 pixels
- Blurs the input video to background
- Adds general-looking text with black background to top and bottom of the page

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
