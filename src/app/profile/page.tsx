"use client"

import React, { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true)

      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Error obteniendo sesión:", sessionError)
        setLoading(false)
        return
      }

      const userId = session?.user?.id
      if (!userId) {
        console.warn("No hay sesión activa o falta ID del usuario")
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("users")
        .select("name, username, email")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error al obtener datos del usuario:", error)
      } else {
        setUser(data)
      }

      setLoading(false)
    }

    fetchUserData()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Perfil del Usuario</h1>
      {loading ? (
        <p>Cargando datos del usuario...</p>
      ) : user ? (
        <div className="mt-4 space-y-2">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  )
}
