export type Politician = {
    id: string
    name: string
    image_url: string | null
    office: string
    region: string
    state: string
    party: string
    quote: string | null
    email: string | null
    twitter: string | null
    phone: string | null
    education: string[]
    previous_roles: string[]
    affiliations: string[]
    created_at: string
    updated_at: string
}

export type Promise = {
    id: string
    politician_id: string
    title: string
    details: string
    status: 'pending' | 'in-progress' | 'delivered'
    source: string
    created_at: string
    updated_at: string
}

export type Statement = {
    id: string
    politician_id: string
    quote: string
    date: string
    source: string
    created_at: string
}

export type Scandal = {
    id: string
    politician_id: string
    title: string
    details: string
    status: string
    sources: string[]
    created_at: string
    updated_at: string
}

export type Contribution = {
    id: string
    politician_id: string
    type: 'new_promise' | 'promise_update' | 'statement' | 'scandal' | 'background'
    title: string
    details: string
    source_url?: string
    source_date?: string
    status: 'pending' | 'approved' | 'rejected'
    created_at: string
    user_id: string
    politicians?: {
        name: string
        office: string
    }
}

export type Rating = {
    id: string
    user_id: string
    politician_id: string
    rating: boolean
    created_at: string
} 