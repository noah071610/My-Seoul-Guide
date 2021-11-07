export default function dataSlicer(res: any, sliceNum?: number) {
  let dataSet = res.data.response.body.items.item.slice(
    0,
    sliceNum ? sliceNum : res.data.response.body.items.item.length
  );
  return dataSet.map((v: any) => {
    return {
      title: { _text: v.title },
      firstimage: { _text: v.firstimage },
      mapx: { _text: v.mapx },
      mapy: { _text: v.mapy },
      contentid: { _text: v.contentid },
    };
  });
}
