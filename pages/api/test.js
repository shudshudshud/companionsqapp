import { supabase } from '../../lib/supabase'
import { model } from '../../lib/gemini'

export default async function handler(req, res) {
  try {
    // Check if environment variables are loaded
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasGeminiKey: !!process.env.GOOGLE_AI_API_KEY,
    }
    
    console.log('Environment check:', envCheck)
    
    // Test Supabase connection by getting the current user
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      throw new Error(`Supabase auth error: ${authError.message}`)
    }
    
    // Test Gemini
    const result = await model.generateContent('Say hello')
    const response = await result.response
    const text = response.text()
    
    res.status(200).json({ 
      envCheck,
      supabase: {
        connected: true,
        session: authData ? 'Session available' : 'No session'
      },
      gemini: text,
      message: 'All services working!' 
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    res.status(500).json({ 
      error: error.message,
      envCheck: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        hasGeminiKey: !!process.env.GOOGLE_AI_API_KEY,
      }
    })
  }
}