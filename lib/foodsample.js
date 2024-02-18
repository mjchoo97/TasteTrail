const imgurl = [
  "/foodart.png",
  "/foodart2.jpg",
  "/foodart3.jpg",
  "/foodart4.jpg",
  "/foodart5.jpg",
  "/foodart6.jpg",
];
export const foodSampleImg = () => {
  const randint = Math.floor(Math.random() * imgurl.length);

  return imgurl[randint];
};
