import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChatRequest, AIResponse } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse<AIResponse>> {
  try {
    // Parse the incoming request
    const body = await request.json()
    const { doubt, subject }: ChatRequest = body

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set')
      return NextResponse.json(
        { response: '', error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // Use gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Create the prompt
    const prompt = `You are a friendly and patient teacher helping a student aged 6-12 understand ${subject}. 

The student has this doubt: "${doubt}"

Please:
- Explain the concept in simple, clear terms using everyday examples
- When appropriate, create memorable mnemonics or memory tricks to help remember formulas or concepts
- Use analogies that children can relate to
- Keep your response concise (under 200 words) but thorough
- End with a simple question to check understanding

Respond in a warm, encouraging tone.`

    // Generate response
    const result = await model.generateContent(prompt)
    const response = result.response
    
    // Get the text from the response
    const aiResponse = response.text()

    // Return as JSON with proper structure
    return NextResponse.json({ 
      response: aiResponse 
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    
    // Return error as JSON
    return NextResponse.json(
      { 
        response: '', 
        error: error?.message || 'Failed to get AI response from Gemini. Please try again.' 
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}
