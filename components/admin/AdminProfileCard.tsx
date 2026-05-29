'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Lock, Check, Eye, EyeOff } from 'lucide-react'

export function AdminProfileCard({ email }: { email: string }) {
  const [newPassword, setNewPassword]     = useState('')
  const [confirmPass, setConfirmPass]     = useState('')
  const [showPass, setShowPass]           = useState(false)
  const [loading, setLoading]             = useState(false)
  const [success, setSuccess]             = useState(false)
  const [error, setError]                 = useState<string | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return }
    if (newPassword !== confirmPass) { setError('Les mots de passe ne correspondent pas.'); return }
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password: newPassword })
    if (err) { setError(err.message) } else {
      setSuccess(true)
      setNewPassword('')
      setConfirmPass('')
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
      <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
        <User size={16} className="text-neutral-400" />
        Mon profil
      </h2>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5">Email</label>
        <div className="border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-700 bg-neutral-50 select-all">
          {email}
        </div>
      </div>

      {/* Change password */}
      <form onSubmit={handleChangePassword} className="space-y-3">
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide flex items-center gap-1.5">
          <Lock size={11} />
          Changer le mot de passe
        </label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <input
          type={showPass ? 'text' : 'password'}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirmer le mot de passe"
          className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />

        {error   && <p className="text-xs text-red-600">{error}</p>}
        {success && <p className="text-xs text-green-600 flex items-center gap-1"><Check size={12} /> Mot de passe mis à jour.</p>}

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPass}
          className="bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-40"
        >
          {loading ? 'Mise à jour…' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}
