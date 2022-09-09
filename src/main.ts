import { createCanvas } from "./js/utils/createCanvas";

const downloadButton: any = document.getElementById("download")!;

const canvas = createCanvas(document.getElementById("canvas-wrapper")!, {
  id: "canvas",
  height: 200,
  width: 200,
});

const ctx = canvas.getContext("2d")!;

window.addEventListener("load", () => {
  const uploadBtn: HTMLInputElement = document.querySelector("#upload")!;
  let imageHeights: number[] = [];
  let canvasLastWidth = 0;
  let images: any[] = [];
  let element: any[][] = [];
  let canvasWidth = 500;
  canvas.width = canvasWidth;

  uploadBtn.addEventListener("change", (e: any) => {
    const files = e.target.files;
    //create blob from files
    for (let i = 0; i < files.length; i++) {
      images[i] = URL.createObjectURL(files[i]);
    }
    //map blobs
    let len = images.length;
    const arr = images.map((blob, index) => {
      const img = document.createElement("img");
      img.src = blob;
      img.id = `image-${index + new Date(Date.now()).valueOf()}`;

      img.onload = function () {
        let currentWidth = len * img.width;
        if (currentWidth > canvasLastWidth) {
          canvasLastWidth = currentWidth; //set canvaslastwidth to current to be used in next iteration
        }

        canvas.width = canvasLastWidth; //set canvas width to highest instance of sprites
        if (index === 0) {
          imageHeights.push(img.height);
          return;
        }
      };
      return img;
    });

    element.push(arr);
    images = []; //reset images array
  });

  animate();

  function animate() {
    if (imageHeights.length > 0) {
      const total = imageHeights.reduce((total, height) => {
        return (total += height);
      });
      canvas.height = total;

      let prevStartingPointX = 0;
      for (let column = 0; column < element.length; column++) {
        ctx.save();
        for (let row = 0; row < element[column].length; row++) {
          let el = element[column][row];
          ctx.drawImage(
            el, //image
            0, //image source x
            0, //image source y
            el.width, //image sprite width
            el.height, //image sprite height
            row * el.width, //position x
            prevStartingPointX, // position y
            el.width,
            el.height
          );
          //? For debugging purposes to track object position
          // ctx.strokeRect(
          //   column * el.width, //position x
          //   prevStartingPointX, // position y
          //   el.width, //image sprite width
          //   el.height //image sprite height
          // );
        }
        prevStartingPointX += imageHeights[column]; //increment position x in every image height
        ctx.restore();
      }
    }
    requestAnimationFrame(animate);
  }
});

downloadButton.addEventListener(
  "click",
  () => {
    const dt = canvas.toDataURL("image/png");
    downloadButton.href = dt;
  },
  false
);
