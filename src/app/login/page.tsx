"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Email o contraseña incorrectos");
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card/80 backdrop-blur-md border border-border p-8 rounded-2xl w-full max-w-md space-y-5 shadow-2xl"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Bienvenido
          </h1>
          <p className="text-sm text-muted-foreground">
            Iniciá sesión para continuar
          </p>
        </div>

        <div className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition shadow-lg"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="text-center text-sm text-muted-foreground">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Registrate
          </Link>
        </div>
      </form>
    </div>
  );
}
