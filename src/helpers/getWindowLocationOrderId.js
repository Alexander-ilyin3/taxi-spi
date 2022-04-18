var test_url = "https://sjd-taxi.requestumdemo.com/book-now/?order_id=f9c9920ab7b616fed6d278df4358f232#/step-1"; //
// var url = new URL(url_string);
// var c = url.searchParams.get("order_id");


export const getOrderId = () => {
  /*------------------------------------------------------*/
  const link = false && process.env.NODE_ENV === 'development' ? test_url : window.location.href
  /*------------------------------------------------------*/
  const url = new URL(link)
  const orderIdParameter = url.searchParams.get("order_id")
  /*------------------------------------------------------*/
  // const match = test_url.match(/order_id=(.*?)(?:$|&|\?)/) 
  // const match = link.match(/order_id=(.*?)(?:$|&|#|\?)/)
  /*------------------------------------------------------*/
  // return match && match[1]
  return orderIdParameter
}
