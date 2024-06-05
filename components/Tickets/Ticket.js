import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';


export default function TicketsPDF(data) {
  
  const { shippingInfo, orderItems, paymentMethod, itemPrice, tax, shippingCharges, totalAmount } = data;

  const orderItemsHtml = orderItems.map(item => `
    <tr>
      <td style="padding: 12px; border: 1px solid #e0e0e0;">${item.name}</td>
      <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${item.price.toFixed(2)}$</td>
      <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${item.quantity}</td>
      <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${(item.price * item.quantity).toFixed(2)}$</td>
    </tr>
  `).join('');

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7f7f7;
          color: #333;
        }
        .container {
          width: 90%;
          margin: 30px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #4CAF50;
        }
        .details {
          margin-bottom: 20px;
          text-align: left;
        }
        .details h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #333;
        }
        .details p {
          margin: 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table th, table td {
          padding: 12px;
          border: 1px solid #e0e0e0;
        }
        table th {
          background-color: #f2f2f2;
          color: #333;
          text-align: left;
        }
        table td {
          text-align: left;
        }
        .totals {
          text-align: right;
          font-size: 18px;
          margin-top: 20px;
        }
        .totals p {
          margin: 5px 0;
        }
        .totals .total-amount {
          font-weight: bold;
          color: #333;
        }
        .thead{
          background: #1b1b1b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Factura</h1>
        <div class="details">
          <h2>Información de Envío</h2>
          <p><strong>Dirección:</strong> ${shippingInfo.address}</p>
          <p><strong>Ciudad:</strong> ${shippingInfo.city}</p>
          <p><strong>País:</strong> ${shippingInfo.country}</p>
          <p><strong>Método de Pago:</strong> ${paymentMethod === "COD" ? "Efectivo" : "Online (TARJETA CREDITO | DEBITO)"}</p>
        </div>
        <table>
          <thead class="thead">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>
        <div class="totals">
          <p>Subtotal: ${itemPrice.toFixed(2)}$</p>
          <p>IVA (16%): ${(itemPrice * tax).toFixed(2)}$</p>
          <p>Cargos de Envío (7%): ${(itemPrice * shippingCharges).toFixed(2)}$</p>
          <p class="total-amount">Total: ${totalAmount.toFixed(2)}$</p>
        </div>
      </div>
    </body>
  </html>
  `;

  async function generatePDF(){
    const file = await printToFileAsync({
      html: html,
      base64: false
    })

    await shareAsync(file.uri)
  }
  generatePDF()

}