import { getSupabaseBrowserClient } from './supabase'
import type { Politician, Promise, Statement, Scandal, Contribution, Rating } from './types'

// Auth actions
export async function login(email: string, password: string) {
    const supabase = getSupabaseBrowserClient()
    await new Promise(resolve => setTimeout(resolve, 500))
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) throw error
    return data
}

export async function register(email: string, password: string, name: string) {
    const supabase = getSupabaseBrowserClient()
    await new Promise(resolve => setTimeout(resolve, 500))
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                role: 'user'
            }
        }
    })
    if (error) throw error
    return data
}

export async function adminLogin(email: string, password: string) {
    const supabase = getSupabaseBrowserClient()
    await new Promise(resolve => setTimeout(resolve, 500))
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) throw error
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()
    if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required')
    }
    return data
}

// Politician actions
export async function getPoliticians() {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('politicians')
        .select('*')
        .order('name')
    if (error) {
        console.error('Error fetching politicians:', error)
        throw error
    }
    return data as Politician[]
}

export async function getPoliticianById(id: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('politicians')
        .select('*')
        .eq('id', id)
        .single()
    if (error) {
        console.error('Error fetching politician:', error)
        throw error
    }
    return data as Politician
}

export async function getPoliticiansByRegion(region: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('politicians')
        .select('*')
        .eq('region', region)
        .order('name')
    if (error) {
        console.error('Error fetching politicians by region:', error)
        throw error
    }
    return data as Politician[]
}

export async function getPoliticiansByState(state: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('politicians')
        .select('*')
        .eq('state', state)
        .order('name')
    if (error) {
        console.error('Error fetching politicians by state:', error)
        throw error
    }
    return data as Politician[]
}

// Promise actions
export async function getPoliticianPromises(politicianId: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('promises')
        .select('*')
        .eq('politician_id', politicianId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as Promise[]
}

// Statement actions
export async function getPoliticianStatements(politicianId: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('statements')
        .select('*')
        .eq('politician_id', politicianId)
        .order('date', { ascending: false })
    if (error) throw error
    return data as Statement[]
}

// Scandal actions
export async function getPoliticianScandals(politicianId: string) {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('scandals')
        .select('*')
        .eq('politician_id', politicianId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as Scandal[]
}

// Contribution actions
export async function createContribution(contribution: Omit<Contribution, 'id' | 'created_at' | 'user_id'>) {
    const supabase = getSupabaseBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User must be authenticated')
    const { data, error } = await supabase
        .from('contributions')
        .insert([{ ...contribution, user_id: user.id }])
        .select()
        .single()
    if (error) throw error
    return data as Contribution
}

export async function getUserContributions() {
    const supabase = getSupabaseBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User must be authenticated')
    const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as Contribution[]
}

// Rating actions
export async function ratePolitician(politicianId: string, rating: boolean) {
    const supabase = getSupabaseBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User must be authenticated')
    const { data, error } = await supabase
        .from('ratings')
        .upsert({
            politician_id: politicianId,
            user_id: user.id,
            rating
        })
        .select()
        .single()
    if (error) throw error
    return data as Rating
}

export async function getUserRating(politicianId: string) {
    const supabase = getSupabaseBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('politician_id', politicianId)
        .eq('user_id', user.id)
        .single()
    if (error && error.code !== 'PGRST116') throw error
    return data as Rating | null
} 