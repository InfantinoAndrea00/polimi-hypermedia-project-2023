import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const id = event.context.params.id
    
    const client = serverSupabaseClient(event)

    const { data, error }= await client.from('Areas').select("id, name, description, Projects(id, title)").eq('id', id).limit(1).single()   // change later and add project image as well
    if(error) {
        throw createError({statusCode: 400, statusMessage: error.message})
    }
    
    return data
})