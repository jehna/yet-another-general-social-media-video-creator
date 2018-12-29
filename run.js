const ffmpeg = require("fluent-ffmpeg");
const argv = require("minimist")(process.argv.slice(2));
const path = require("path");

const {
  _: [infile, outfile],
  ["top-text"]: topText,
  ["bottom-text"]: bottomText
} = argv;

if (!infile || !outfile) {
  console.log(`//--------------------------------------------------------\\\\
|| Yet-Another-General-Social-Media-Video creator v1.0 📼 ||
\\\\--------------------------------------------------------//

Usage: node run.js [--top-text=<text>] [--bottom-text=<text>] <sourcefile> <outfile>

Made with ❤️`);
  return;
}

ffmpeg(path.resolve(infile))
  .output(path.resolve(outfile))
  .complexFilter(
    [
      {
        filter: "scale",
        options: "640:640",
        inputs: "v:0",
        outputs: "blurredbg"
      },
      {
        filter: "scale",
        options: "640:640:force_original_aspect_ratio=decrease",
        inputs: "v:0",
        outputs: "overlay"
      },
      {
        filter: "setdar",
        options: "1/1",
        inputs: "blurredbg",
        outputs: "blurredbg"
      },
      {
        filter: "boxblur",
        options: "30",
        inputs: "blurredbg",
        outputs: "blurredbg"
      },
      {
        filter: "overlay",
        options: "(main_w-overlay_w)/2:(main_h-overlay_h)/2",
        inputs: ["blurredbg", "overlay"],
        outputs: "output"
      },
      ...doTopText(topText),
      ...doBottomText(bottomText)
    ],
    ["output"]
  )
  .on("end", () => {
    console.log(`Wrote file: ${outfile}`);
  })
  .run();

function doTopText(topText) {
  if (!topText) return [];

  const hasUmlaut = /[äöå]/.test(topText.toLowerCase());

  return [
    {
      filter: "drawbox",
      options: "x=0:y=0:w=iw:h=100:c=black:t=fill",
      inputs: "output",
      outputs: "output"
    },
    {
      filter: "drawtext",
      options: `text='${topText.toUpperCase()}':x=(w-text_w)/2:y=${
        hasUmlaut ? 10 : 25
      }:fontfile=Oswald-Bold.ttf:fontsize=60:fontcolor=white`,
      inputs: "output",
      outputs: "output"
    }
  ];
}

function doBottomText(bottomText) {
  if (!bottomText) return [];

  return [
    {
      filter: "drawbox",
      options: "x=0:y=ih-100:w=iw:h=100:c=black:t=fill",
      inputs: "output",
      outputs: "output"
    },
    {
      filter: "drawtext",
      options: `text='${bottomText.toUpperCase()}':x=(w-text_w)/2:y=h-text_h-25:fontfile=Oswald-Bold.ttf:fontsize=60:fontcolor=white`,
      inputs: "output",
      outputs: "output"
    }
  ];
}
