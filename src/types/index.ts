export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timeStamp: Date
}

export interface DatePlan {
    id: string
    title: string
    description: string
    budget: number
    type: 'romantic' | 'adventurous' | 'chill' | 'food' | 'outdoor' | 'indoor'
    location: string
    duration: string
}

export interface ChatState {
    messages: Message[]
    isLoading: boolean
    currentPlan: DatePlan | null
}