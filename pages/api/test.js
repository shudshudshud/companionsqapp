import { supabase } from '../../lib/supabase'
import { model } from '../../lib/gemini'

export default async function handler(req, res) {
  try {
    // Check if environment variables are loaded (without logging)
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasGeminiKey: !!process.env.GOOGLE_AI_API_KEY,
    }
    
    // Test Supabase connection by getting the current user
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      return res.status(500).json({ 
        error: 'Authentication service error',
        service: 'supabase'
      })
    }
    
    // Test Gemini
    const result = await model.generateContent('Say hello')
    const response = await result.response
    const text = response.text()
    
    res.status(200).json({ 
      status: 'success',
      services: {
        supabase: 'connected',
        gemini: 'connected'
      },
      message: 'All services working!' 
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Service error',
      status: 'error'
    })
  }
}