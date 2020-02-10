const nodemailer = require("nodemailer");
const main = async (id, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "abc@gmail.com",
      pass: "123"
    }
  });
  try {
    let info = await transporter.sendMail({
      from: "tariqmagsi125@gmail.com",
      to: email,
      subject: `Order No. ${id}`,

      html: `<h1>Order No. ${id}</h1><br/><br/><p>Your order is recieved successfully and your order no. is ${id}<br/><br/>Thank You For Shopping<br/><br/><b>Regards,<br/>Clothing.</b></p>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("Not Sent");
  }
};
const receive = async (id, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "tariqmagsi125@gmail.com",
      pass: "Tariq!123"
    }
  });
  try {
    let info = await transporter.sendMail({
      from: "tariqmagsi125@gmail.com",
      to: "tariqmagsi125@gmail.com",
      subject: `Order No. ${id}`,

      html: `<h1>Order No. ${id}</h1><br/><br/><p>Order is recieved successfully and order no. is ${id}</p>
      <br/>
      <br/>
      <h2>Order Detail</h2>
      <br/>
      <br/>
      <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid black;border-collapse: collapse;">Date</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Order Id</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Name</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Email</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Phone</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Country</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Address</th>
            <th style="border: 1px solid black;border-collapse: collapse;">State</th>
            <th style="border: 1px solid black;border-collapse: collapse;">City</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.Date
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${id}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.name
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.email
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.phone
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.country
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.address
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.state
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.city
            }</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${
              order.total
            }</td>
          </tr>  
        </tbody>      
      </table>
      <br/>
      <br/>
      <h2>Products</h2>
      <br/>
      <br/>
      <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid black;border-collapse: collapse;">Product Id</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Product Name</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Category</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Sub Category</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Size</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Quantity</th>
            <th style="border: 1px solid black;border-collapse: collapse;">Price</th>
          </tr>
        </thead>
        <tbody>
        ${order.products.map(
          row =>
            `<tr>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.product_id}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.product_name}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.category}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.subcategory}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.size}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.quantity}</td>
            <td style="border: 1px solid black;border-collapse: collapse;">${row.price}</td>
          </tr>`
        )}
        </tbody>
        
      </table>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("Not Sent");
  }
};
module.exports = { main, receive };
