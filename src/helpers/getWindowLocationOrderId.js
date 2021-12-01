var test_url = "https://sjd-taxi.requestumdemo.com/?page_id=15#/step-1?order_id=8c20c264a5f3e5bb1c96a676b762b1d4"; //
// var url = new URL(url_string);
// var c = url.searchParams.get("order_id");
// console.log(c);

export const getOrderId = () => {
  const link = window.location.href
  /*------------------------------------------------------*/
  // const match = test_url.match(/order_id=(.*?)(?:$|&|\?)/) 
  const match = link.match(/order_id=(.*?)(?:$|&|\?)/)
  /*------------------------------------------------------*/
  return match && match[1]
}
