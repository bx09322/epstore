import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // 1️⃣ Leer body
    const body = await req.json();
    const { email, password } = body;

    // 2️⃣ Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y password son obligatorios" },
        { status: 400 }
      );
    }

    // 3️⃣ Verificar si el usuario ya existe
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if ((existingUser.rowCount ?? 0) > 0) {

      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // 4️⃣ Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Insertar usuario
    await pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, 'USER')`,
      [email, hashedPassword]
    );

    // 6️⃣ Respuesta OK
    return NextResponse.json(
      { message: "Usuario creado correctamente" },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
