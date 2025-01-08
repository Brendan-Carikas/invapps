import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ddagjnmyozbcwoymmuvo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWdqbm15b3piY3dveW1tdXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODI4MzYsImV4cCI6MjA1MTg1ODgzNn0.c7_otnxWo9ODWmhRMkJwcYZ8jOQx7BR9pVylGD8xyY4'
)

async function testAuth() {
  // Test signup
  console.log('Testing signup...')
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: 'test.user@example.com',
    password: 'testPassword123!'
  })
  console.log('Signup result:', signupError ? 'Error: ' + signupError.message : 'Success', signupData)

  // Test login
  console.log('\nTesting login...')
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'test.user@example.com',
    password: 'testPassword123!'
  })
  console.log('Login result:', loginError ? 'Error: ' + loginError.message : 'Success', loginData)

  // Test session
  console.log('\nTesting session...')
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  console.log('Session result:', sessionError ? 'Error: ' + sessionError.message : 'Success', session)

  // Test logout
  console.log('\nTesting logout...')
  const { error: logoutError } = await supabase.auth.signOut()
  console.log('Logout result:', logoutError ? 'Error: ' + logoutError.message : 'Success')
}

testAuth()
